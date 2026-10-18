// § boot: set up the screen, the room and the hero
import { VERSION } from './core/version.js';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from './core/room.js';
import { makeState, step, wait, switchLantern, toward, DIRS, FIRST_START, HERO_HEALTH } from './core/turn.js';
import { resetRoom } from './core/spawn.js';
import { enemyAt } from './core/enemies.js';
import { createScreen, TILE, W, H } from './render/screen.js';
import { drawRoom } from './render/tiles.js';
import { drawHero, drawItems, drawEnemies, LANTERN_AT } from './render/sprites.js';
import { drawLight, flicker } from './render/light.js';
import { drawBrackets, torchLights, drawFlames } from './render/torches.js';
import { LANTERN } from './core/light.js';
import { reach, setOil } from './core/oil.js';
import { drawOilBar, drawHearts } from './render/hud.js';
import { createTextLine } from './render/textline.js';
import { shownLine } from './core/lines.js';
import { remember, forget } from './core/fog.js';
import { createInput } from './input/input.js';
import { createLanternButton } from './input/lantern.js';
import { createDev } from './dev/dev.js';

const canvas = document.getElementById('game');
const ctx = createScreen(canvas);
document.getElementById('version').textContent = VERSION;

let state = makeState(makeRoom(FIRST_ROOM), FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

const startRoom = state.room;
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
const HIT_FLASH_MS = 140, SHAKE_MS = 120; // the study's (study line 470)
const settled = () => shown.x === state.hero.x && shown.y === state.hero.y;
const flashFor = () => { const now = performance.now(); return { until: now + HIT_FLASH_MS, shakeUntil: now + SHAKE_MS }; };

function tryStep(dir) {
  if (!settled()) { queued = dir; return; }
  const before = state;
  if (dir === 'wait') state = wait(state); // standing still, one turn (D-084)
  else {
    const next = step(state, dir);
    const [dx, dy] = DIRS[dir], foe = enemyAt(state, state.hero.x + dx, state.hero.y + dy);
    if (foe) hit = { enemy: foe, ...flashFor() };
    else if (next === state) nudgeToward(dir);
    state = next;
  }
  // A fall wakes the hero at the start: they appear there, with no slide (D-119).
  const fell = state.line !== before.line && state.line?.id === 'fall';
  if (fell || state.health < before.health) bitten = flashFor();
  if (fell) hit = null;
  if (fell || reduceMotion.matches) { shown.x = state.hero.x; shown.y = state.hero.y; }
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
  reset: () => resetRoom(state, startRoom, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES),
  forget: () => forget(state),
  setOil: (oil) => setOil(state, oil),
});

// § memory: once the hero stands still on a tile, the tiles their lantern
// reaches are remembered (D-059). Again after a dev change to the memory or oil,
// or when the lantern comes back on. Nothing new is remembered while it is off (D-082).
const lanternAt = (x, y) => ({ x: x * TILE + LANTERN_AT.x, y: y * TILE - 2 + LANTERN_AT.y });
let rememberedAt = null, rememberedSeen = null;
function rememberHere() {
  if (!state.lit) { rememberedAt = null; return; }
  const key = state.hero.x + ',' + state.hero.y + ',' + state.oil;
  if (key === rememberedAt && state.seen === rememberedSeen) return;
  state = remember(state, { ...lanternAt(state.hero.x, state.hero.y), r: reach(state.oil) });
  rememberedAt = key; rememberedSeen = state.seen;
}

const lights = [], torchGlow = []; // reused every frame (TECH.md)

// § loop: move the shown hero toward the real one, then draw
function approach(from, to) { return from + Math.sign(to - from) * Math.min(Math.abs(to - from), SLIDE); }
function frame(t) {
  shown.x = approach(shown.x, state.hero.x);
  shown.y = approach(shown.y, state.hero.y);
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
  if (state.room !== drawnRoom) { drawnRoom = state.room; drawRoom(base.getContext('2d'), drawnRoom); }
  ctx.drawImage(base, 0, 0);
  drawBrackets(ctx, state.room, state.lights);
  drawItems(ctx, state.items, t, reduceMotion.matches);
  const hx = Math.round(shown.x * TILE) + nx, hy = Math.round(shown.y * TILE) + ny;
  drawHero(ctx, hx, hy, !!bitten && t < bitten.until);
  // § enemies: drawn last before the light, which shows them only in real light (D-106)
  const lightOn = !dev.lightOff();
  const flashing = hit && t < hit.until ? hit.enemy : null;
  const under = lightOn && (state.enemies.length || flashing) // the picture before enemies, for the light
    ? ctx.getImageData(0, 0, W, H).data : null;
  drawEnemies(ctx, state.enemies, t, reduceMotion.matches, flashing);
  // § light: the lantern's flame is the light's centre, oil sets its reach (D-053 to D-056, D-064).
  // Switched off, the lantern gives no light: only torchlight and remembered tiles show (D-082, D-101).
  const lx = hx + LANTERN_AT.x, ly = hy - 2 + LANTERN_AT.y;
  if (lightOn) {
    const r = state.lit ? reach(state.oil) * (reduceMotion.matches ? 1 : flicker(t, 1.7, 0.035)) : 0;
    lights[0] = { ...LANTERN, x: lx, y: ly, r };
    lights.length = 1;
    lights.push(...torchLights(state.room, state.lights, t, reduceMotion.matches, torchGlow));
    drawLight(ctx, state.room, lights, dev.revealed() ? null : state.seen, under);
  }
  drawFlames(ctx, state.room, state.lights, t, reduceMotion.matches);
  if (state.lit) { ctx.fillStyle = '#fff5d6'; ctx.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
  // § shake: the room jumps a pixel left and right after a hit; none with reduced motion (study line 432, D-105)
  // A bite shakes it the same way (D-118).
  if (((hit && t < hit.shakeUntil) || (bitten && t < bitten.shakeUntil)) && !reduceMotion.matches) {
    const sx = Math.floor(t / 30) % 2 ? 1 : -1;
    ctx.drawImage(canvas, 0, 0, W, H, sx, 0, W, H);
    ctx.fillStyle = '#0e0c16'; ctx.fillRect(sx > 0 ? 0 : W - 1, 0, 1, H);
  }
  drawOilBar(ctx, state.oil);
  drawHearts(ctx, state.health, HERO_HEALTH);
  const line = shownLine(state);
  textLine.draw(ctx, line, t, reduceMotion.matches);
  if (line !== spokenLine) { spokenLine = line; if (line) spoken.textContent = line.text; }
  lanternButton.show(state.lit);
  dev.draw(ctx, state);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
