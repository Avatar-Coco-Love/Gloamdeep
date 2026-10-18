// § boot: set up the screen, the room and the hero
import { VERSION } from './core/version.js';
import { makeWorld, step, wait, switchLantern, toward, DIRS, HERO_HEALTH } from './core/turn.js';
import { resetRoom } from './core/spawn.js';
import { enemyAt } from './core/enemies.js';
import { glowsIn } from './core/stairs.js';
import { beginPlace, depthOf } from './core/room.js';
import { createScreen, TILE, W, H } from './render/screen.js';
import { drawRoom } from './render/tiles.js';
import { drawHero, drawItems, drawEnemies } from './render/sprites.js';
import { drawLight, flicker } from './render/light.js';
import { drawBrackets, torchLights, drawFlames } from './render/torches.js';
import { LANTERN, LANTERN_AT } from './core/light.js';
import { reach, setOil } from './core/oil.js';
import { drawOilBar, drawHearts, drawDepth } from './render/hud.js';
import { createTextLine } from './render/textline.js';
import { shownLine } from './core/lines.js';
import { remember, forget } from './core/fog.js';
import { lanternFrom } from './core/sight.js';
import { createInput } from './input/input.js';
import { createLanternButton } from './input/lantern.js';
import { createDev } from './dev/dev.js';

const canvas = document.getElementById('game');
const ctx = createScreen(canvas);
document.getElementById('version').textContent = VERSION;

let state = makeWorld();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

const textLine = createTextLine();
const spoken = document.getElementById('line'); // the same words for screen readers
let spokenLine = null;

// The room is drawn onto a hidden canvas, again only when it changes (a dev spawn).
const base = document.createElement('canvas');
base.width = W; base.height = H;
let drawnRoom = null;

// § moving: the hero slides to its new tile (D-043); one step or wait waits in line
// so a quick second tap or key is not lost.
const SLIDE = 0.18; // tiles per frame, as in the study
const HOLD_STEP_MS = 250; // a held finger walks about 4 steps a second (D-044)
const shown = { x: state.hero.x, y: state.hero.y };
let queued = null, nudge = null, lastHeldStep = 0; // nudge: { dx, dy, until } after bumping a wall
let hit = null; // { enemy, until, shakeUntil } after attacking an enemy (D-105, D-109)
let bitten = null; // { until, shakeUntil } after a bite: the hero flashes red (D-118)
let travel = null; // { from, mid, end } while taking stairs: the old room fades out, the new one in (D-135)
const FADE_MS = 200; // each way
const HIT_FLASH_MS = 140, SHAKE_MS = 120; // the study's (study line 470)
const settled = () => !travel && shown.x === state.hero.x && shown.y === state.hero.y;
const flashFor = () => { const now = performance.now(); return { until: now + HIT_FLASH_MS, shakeUntil: now + SHAKE_MS }; };

function tryStep(dir) {
  if (!settled()) { queued = dir; return; }
  const before = state;
  let to = before.hero;
  if (dir === 'wait') state = wait(state); // standing still, one turn (D-084)
  else {
    const next = step(state, dir);
    const [dx, dy] = DIRS[dir], foe = enemyAt(state, state.hero.x + dx, state.hero.y + dy);
    to = { x: before.hero.x + dx, y: before.hero.y + dy };
    if (foe) hit = { enemy: foe, ...flashFor() };
    else if (next.turn === state.turn) nudgeToward(dir); // a bump, or a torch the dark lantern can't light (D-122)
    state = next;
  }
  // A fall wakes the hero at the start: they appear there, with no slide (D-119).
  const fell = state.line !== before.line && state.line?.id === 'fall';
  if (fell || state.health < before.health) bitten = flashFor();
  if (fell) hit = null;
  const went = !fell && state.place !== before.place;
  if (went && !reduceMotion.matches) { // the hero walks onto the stairs as the old room fades (D-135)
    const now = performance.now();
    travel = { from: { ...before, hero: to }, mid: now + FADE_MS, end: now + 2 * FADE_MS };
  } else if (fell || went || reduceMotion.matches) { shown.x = state.hero.x; shown.y = state.hero.y; if (went) foeShown = new Map(); }
  else followFoes(before.enemies, state.enemies);
}

// § enemies sliding: a rat slides to its new tile like the hero (D-128).
// `foeShown` holds where each enemy is drawn; one it doesn't know yet (a spawn,
// a reset, a fall) shows on its tile at once. A turn keeps the enemies in order,
// less any the hit killed, so the new list pairs with the old one by place.
let foeShown = new Map();
function followFoes(was, now) {
  const alive = now.length < was.length ? was.filter((e) => e !== hit?.enemy) : was;
  if (alive.length !== now.length) return;
  const next = new Map();
  now.forEach((e, i) => next.set(e, foeShown.get(alive[i]) || { x: alive[i].x, y: alive[i].y }));
  foeShown = next;
}
function foeAt(e) {
  let p = foeShown.get(e);
  if (!p || reduceMotion.matches) { p = { x: e.x, y: e.y }; foeShown.set(e, p); }
  return p;
}
function nudgeToward(dir) {
  const [dx, dy] = DIRS[dir];
  nudge = { dx, dy, until: performance.now() + 90 };
}
// A tap on the hero waits a turn; a finger held on the hero does nothing (D-085).
const stepToward = (px, py, held = false) => {
  const h = state.hero, tx = Math.floor(px / TILE), ty = Math.floor(py / TILE);
  if (dev.place(tx, ty)) return; // a picked spawn takes the tap (D-049)
  const dir = toward(h.x, h.y, tx, ty);
  if (dir) tryStep(dir);
  else if (!held) tryStep('wait');
};

// § switch: the lantern button and the L key, free at any time (D-080, D-081)
const switchIt = () => { state = switchLantern(state); };
const lanternButton = createLanternButton(canvas, { onSwitch: switchIt });

const stage = document.getElementById('stage');
const input = createInput(stage, canvas, { onDir: tryStep, onPoint: stepToward, onLantern: switchIt, onWait: () => tryStep('wait') });
const dev = createDev(stage, canvas, { // on for everyone (D-086)
  get: () => state,
  set: (s) => { state = s; },
  reset: () => { // the room the hero is in, as it began
    const p = state.home.places[state.place] || beginPlace(state.place);
    return resetRoom(state, p.room, p.start, p.lights, p.enemies, p.items);
  },
  forget: () => forget(state),
  setOil: (oil) => setOil(state, oil),
});

// § memory: once the hero stands still on a tile, the tiles their lantern
// reaches are remembered (D-059). Again after a dev change to the memory or oil,
// or when the lantern comes back on. Nothing new is remembered while it is off (D-082).
let rememberedAt = null, rememberedSeen = null;
function rememberHere() {
  if (!state.lit) { rememberedAt = null; return; }
  const key = state.hero.x + ',' + state.hero.y + ',' + state.oil;
  if (key === rememberedAt && state.seen === rememberedSeen) return;
  state = remember(state, { ...lanternFrom(state.hero.x, state.hero.y), r: reach(state.oil) });
  rememberedAt = key; rememberedSeen = state.seen;
}

const lights = [], torchGlow = []; // reused every frame (TECH.md)

// § loop: move the shown hero toward the real one, then draw
function approach(from, to) { return from + Math.sign(to - from) * Math.min(Math.abs(to - from), SLIDE); }
function frame(t) {
  // § stairs: until the fade's middle the old room is shown, then the new one at once (D-135)
  if (travel && t >= travel.mid && travel.from) { travel.from = null; shown.x = state.hero.x; shown.y = state.hero.y; foeShown = new Map(); }
  if (travel && t >= travel.end) travel = null;
  const s = travel?.from || state;
  shown.x = approach(shown.x, s.hero.x);
  shown.y = approach(shown.y, s.hero.y);
  for (const e of s.enemies) { const p = foeAt(e); p.x = approach(p.x, e.x); p.y = approach(p.y, e.y); }
  if (settled()) {
    rememberHere();
    if (queued) { const d = queued; queued = null; tryStep(d); }
    else {
      const p = input.held();
      if (p && !dev.armed() && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; stepToward(...p, true); }
    }
  }
  let nx = 0, ny = 0;
  if (nudge && t < nudge.until && !reduceMotion.matches) { nx = nudge.dx; ny = nudge.dy; }
  if (s.room !== drawnRoom) { drawnRoom = s.room; drawRoom(base.getContext('2d'), drawnRoom); }
  ctx.drawImage(base, 0, 0);
  drawBrackets(ctx, s.room, s.lights);
  drawItems(ctx, s.items, t, reduceMotion.matches);
  const hx = Math.round(shown.x * TILE) + nx, hy = Math.round(shown.y * TILE) + ny;
  drawHero(ctx, hx, hy, !!bitten && t < bitten.until);
  // § enemies: drawn last before the light, which shows them only in real light (D-106)
  const lightOn = !dev.lightOff();
  const flashing = hit && t < hit.until ? hit.enemy : null;
  const under = lightOn && (s.enemies.length || flashing) // the picture before enemies, for the light
    ? ctx.getImageData(0, 0, W, H).data : null;
  drawEnemies(ctx, s.enemies, t, reduceMotion.matches, flashing, foeAt);
  // § light: the lantern's flame is the light's centre, oil sets its reach (D-053 to D-056, D-064).
  // Switched off, the lantern gives no light: only torchlight and remembered tiles show (D-082, D-101).
  const lx = hx + LANTERN_AT.x, ly = hy - 2 + LANTERN_AT.y;
  if (lightOn) {
    const r = s.lit ? reach(s.oil) * (reduceMotion.matches ? 1 : flicker(t, 1.7, 0.035)) : 0;
    lights[0] = { ...LANTERN, x: lx, y: ly, r };
    lights.length = 1;
    lights.push(...torchLights(s.room, s.lights, t, reduceMotion.matches, torchGlow), ...glowsIn(s.room));
    drawLight(ctx, s.room, lights, dev.revealed() ? null : s.seen, under);
  }
  drawFlames(ctx, s.room, s.lights, t, reduceMotion.matches);
  if (s.lit) { ctx.fillStyle = '#fff5d6'; ctx.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
  // § shake: the room jumps a pixel left and right after a hit; none with reduced motion (study line 432, D-105)
  // A bite shakes it the same way (D-118).
  if (((hit && t < hit.shakeUntil) || (bitten && t < bitten.shakeUntil)) && !reduceMotion.matches) {
    const sx = Math.floor(t / 30) % 2 ? 1 : -1;
    ctx.drawImage(canvas, 0, 0, W, H, sx, 0, W, H);
    ctx.fillStyle = '#0e0c16'; ctx.fillRect(sx > 0 ? 0 : W - 1, 0, 1, H);
  }
  if (travel) { // the room dims to the deepest dark and back; the hearts and oil stay
    ctx.globalAlpha = Math.max(0, 1 - Math.abs(t - travel.mid) / FADE_MS);
    ctx.fillStyle = '#0e0c16'; ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }
  drawOilBar(ctx, s.oil);
  drawHearts(ctx, s.health, HERO_HEALTH);
  drawDepth(ctx, depthOf(s.place));
  const line = shownLine(state);
  textLine.draw(ctx, line, t, reduceMotion.matches);
  if (line !== spokenLine) { spokenLine = line; if (line) spoken.textContent = line.text; }
  lanternButton.show(state.lit);
  dev.draw(ctx, state);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
