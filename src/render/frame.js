// § frame: draws one frame of play, or the title and its screens, from `app`
// (split from main.js, D-235). It changes nothing in the game; main.js moves
// the shown hero and enemies and takes the turns before each frame.
import { TILE, W, H } from './screen.js';
import { drawRoom } from './tiles.js';
import { drawHero, drawItems, drawEnemies } from './sprites.js';
import { drawLight, flicker } from './light.js';
import { drawBrackets, torchLights, drawFlames } from './torches.js';
import { drawStatus } from './hud.js';
import { drawTitle } from './title.js';
import { drawPause, veil } from './menu.js';
import { drawSeedPad } from './seedpad.js';
import { drawHowTo } from './howto.js';
import { drawMap } from './map.js';
import { drawMark, drawAlert } from './walk.js';
import { drawDoors } from './doors.js';
import { LANTERN, LANTERN_AT } from '../core/light.js';
import { reach } from '../core/oil.js';
import { HERO_HEALTH } from '../core/turn.js';
import { glowsIn } from '../core/stairs.js';
import { depthOf } from '../core/room.js';
import { shownLine } from '../core/lines.js';
import { recordText } from '../core/record.js';
import { daylight, darkNow } from '../core/daytime.js';
import { shownSeed, canGoBack } from '../core/explorer.js';
import { mouthLight } from '../core/mouth.js';
import { cameraAt } from '../core/camera.js';
import { PAUSE_MENU } from '../core/menu.js';
import { doorways } from '../core/openings.js';

export const FADE_MS = 200; // each way, taking stairs (D-135)

// 0 before a, 1 after b, and evenly between; a jump at a when b is not after it
const ramp = (t, a, b) => (b <= a ? (t >= a ? 1 : 0) : Math.min(1, Math.max(0, (t - a) / (b - a))));

// `ui`: the canvases, the text line, the spoken line, the lantern button, the dev
// tools, the screens, and still() and foeAt(e) from main.js.
export function createFrame(app, ui) {
  const { ctx, hudCtx, hud, canvas, textLine, spoken, lanternButton, dev, screens, still, foeAt } = ui;
  // The room is drawn onto a hidden canvas, again only when it changes (a dev spawn),
  // as big as the whole room; the camera shows the screen's part of it (D-195).
  const base = document.createElement('canvas');
  let drawnRoom = null, doors = []; // the room drawn into `base`, and its doorways (D-225)
  const lights = [], torchGlow = []; // reused every frame (TECH.md)

  // Draws in room pixels, moved by the camera and kept off the text strip below the room
  function inRoom(draw) {
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip();
    ctx.translate(-app.cam.x, -app.cam.y);
    draw();
    ctx.restore();
  }

  function onTitleScreens(t) {
    const { screen } = app;
    if (screen === 'explore') { drawTitle(ctx, [], 0, t, still()); drawMap(ctx, app.view, t, still(), screens.turns(), { seed: shownSeed(app.seeds), back: canGoBack(app.seeds) }); }
    else if (screen === 'seed') { drawTitle(ctx, [], 0, t, still()); drawSeedPad(ctx, app.entry, app.chosen, t, still()); }
    else if (screen === 'howto') { drawTitle(ctx, [], 0, t, still()); drawHowTo(ctx, app.page, app.settings.controls, app.chosen, t, still()); }
    else drawTitle(ctx, screens.menuOf(screen), app.chosen, t, still(), screen === 'settings' ? 'Settings' : null, screen === 'title' ? recordText(app.deepest) : null);
  }

  function draw(t) {
    hudCtx.fillStyle = '#0e0c16'; hudCtx.fillRect(0, 0, hud.width, hud.height); // the strip stays empty on the title
    if (screens.onTitle()) { onTitleScreens(t); return; }
    const { state, shown, nudge, hit, bitten, travel, fall, walk } = app;
    const s = travel?.from || fall?.from || state;
    let nx = 0, ny = 0;
    if (nudge && t < nudge.until && !still()) { nx = nudge.dx; ny = nudge.dy; }
    if (s.room !== drawnRoom) {
      drawnRoom = s.room; doors = doorways(s.place, s.room, s.seed);
      base.width = drawnRoom.cols * TILE; base.height = drawnRoom.rows * TILE;
      drawRoom(base.getContext('2d'), drawnRoom);
    }
    // § fall: the hero lies down, the light closes to the deepest dark, then opens where they wake (D-234)
    const lying = !!fall?.from && t >= fall.lieAt;
    const dark = !fall ? 0 : fall.from ? ramp(t, fall.lieAt, fall.darkAt) : 1 - ramp(t, fall.mid, fall.end);
    // § camera: centred on the sliding hero, a bump's nudge left out (D-195)
    const sx = Math.round(shown.x * TILE), sy = Math.round(shown.y * TILE);
    const cam = app.cam = cameraAt(sx, sy, s.room, W, H);
    ctx.drawImage(base, cam.x, cam.y, W, H, 0, 0, W, H);
    inRoom(() => {
      drawBrackets(ctx, s.room, s.lights);
      drawItems(ctx, s.items, t, still());
      drawHero(ctx, sx + nx, sy + ny, !!bitten && t < bitten.until, lying);
      // § enemies: shaded by the light like the floor, so seen in memory's dim light too (D-153)
      drawEnemies(ctx, s.enemies, t, still(), hit && t < hit.until ? hit.enemy : null, foeAt);
    });
    // Full daylight needs no lantern (D-025, D-209); dusk dims the sky and the lights show more (D-217)
    const sun = s.room.dark.sky ? daylight(s.turn) : 0, lightOn = !dev.lightOff() && sun < 1;
    // § light: the lantern's flame is the light's centre, oil sets its reach (D-053 to D-056, D-064).
    // Switched off, the lantern gives no light: only torchlight and remembered tiles show (D-082, D-101).
    const lx = sx + nx + LANTERN_AT.x, ly = sy + ny - 2 + LANTERN_AT.y;
    if (lightOn) {
      const r = s.lit ? reach(s.oil) * (still() ? 1 : flicker(t, 1.7, 0.035)) * (1 - dark) : 0;
      lights[0] = { ...LANTERN, x: lx, y: ly, r };
      lights.length = 1;
      lights.push(...torchLights(s.room, s.lights, t, still(), torchGlow), ...glowsIn(s.room, dev.revealed() ? null : s.seen));
      const sunIn = mouthLight(s); // daylight through the cave mouth, steady, no flicker (D-218)
      if (sunIn) lights.push(sunIn);
      drawLight(ctx, s.room, lights, dev.revealed() ? null : s.seen, cam, darkNow(s.room, s.turn), 1 - sun);
    }
    inRoom(() => {
      drawFlames(ctx, s.room, s.lights, t, still());
      if (s.lit && !lying) { ctx.fillStyle = '#fff5d6'; ctx.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
      drawDoors(ctx, doors, dev.revealed() ? null : s.seen, s.room.cols, t, still()); // over the light, so remembered ones show (D-225)
      if (walk && !walk.stopped && !travel) drawMark(ctx, walk.tx, walk.ty, t, still());
      if (t < app.alertUntil) drawAlert(ctx, sx + nx, sy + ny);
    });
    // § shake: the room jumps a pixel left and right after a hit; none with reduced motion (study line 432, D-105)
    // A bite shakes it the same way (D-118).
    if (((hit && t < hit.shakeUntil) || (bitten && t < bitten.shakeUntil)) && !still()) {
      const jx = Math.floor(t / 30) % 2 ? 1 : -1;
      ctx.drawImage(canvas, 0, 0, W, H, jx, 0, W, H);
      ctx.fillStyle = '#0e0c16'; ctx.fillRect(jx > 0 ? 0 : W - 1, 0, 1, H);
    }
    // Taking stairs, the room dims to the deepest dark and back (D-135); a fall closes it the same way; the hearts and oil stay
    const dim = travel ? Math.max(0, 1 - Math.abs(t - travel.mid) / FADE_MS) : dark;
    if (dim > 0) {
      ctx.globalAlpha = dim;
      ctx.fillStyle = '#0e0c16'; ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
    // § strip: the hearts, depth and oil above the room or beside it, covering none of it (D-198, D-199)
    drawStatus(hudCtx, { oil: s.oil, health: s.health, max: HERO_HEALTH, depth: depthOf(s.place) });
    if (app.screen !== 'play') veil(hudCtx); // dimmed with the room under a menu
    const line = fall?.from ? null : shownLine(state); // the fall's line once the hero wakes
    textLine.draw(ctx, line, t, still());
    if (line !== app.spokenLine) { app.spokenLine = line; if (line) spoken.textContent = line.text; }
    lanternButton.show(state.lit);
    if (app.screen === 'paused') drawPause(ctx, PAUSE_MENU, app.chosen, t, still());
    else if (app.screen === 'settings') drawPause(ctx, screens.menuOf(app.screen), app.chosen, t, still(), 'Settings');
    else if (app.screen === 'seed') drawSeedPad(ctx, app.entry, app.chosen, t, still());
    else if (app.screen === 'howto') drawHowTo(ctx, app.page, app.settings.controls, app.chosen, t, still());
    else if (app.screen === 'map') drawMap(ctx, app.view, t, still(), screens.turns());
    else dev.draw(ctx, state, cam);
  }

  // A new journey draws its room afresh
  const redraw = () => { drawnRoom = null; };
  return { draw, redraw };
}
