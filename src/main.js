// § boot: set up the screen, the room and the hero
import { VERSION } from './core/version.js';
import { makeRoom, FIRST_ROOM } from './core/room.js';
import { makeState, step, wait, switchLantern, toward, DIRS, FIRST_START } from './core/turn.js';
import { resetRoom } from './core/spawn.js';
import { createScreen, TILE, W, H } from './render/screen.js';
import { drawRoom } from './render/tiles.js';
import { drawHero, drawItems, LANTERN_AT } from './render/sprites.js';
import { drawLight, flicker } from './render/light.js';
import { LANTERN } from './core/light.js';
import { reach, setOil } from './core/oil.js';
import { drawOilBar } from './render/hud.js';
import { remember, forget } from './core/fog.js';
import { createInput } from './input/input.js';
import { createLanternButton } from './input/lantern.js';
import { createDev } from './dev/dev.js';

const canvas = document.getElementById('game');
const ctx = createScreen(canvas);
document.getElementById('version').textContent = VERSION;

let state = makeState(makeRoom(FIRST_ROOM));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

const startRoom = state.room;

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
const settled = () => shown.x === state.hero.x && shown.y === state.hero.y;

function tryStep(dir) {
  if (!settled()) { queued = dir; return; }
  if (dir === 'wait') { state = wait(state); return; } // standing still, one turn (D-084)
  const next = step(state, dir);
  if (next === state) nudgeToward(dir);
  state = next;
  if (reduceMotion.matches) { shown.x = state.hero.x; shown.y = state.hero.y; }
}
function nudgeToward(dir) {
  const [dx, dy] = DIRS[dir];
  nudge = { dx, dy, until: performance.now() + 90 };
}
// A tap on the hero waits a turn; a finger held on the hero does nothing (D-085).
const stepToward = (px, py, held = false) => {
  const h = state.hero, tx = Math.floor(px / TILE), ty = Math.floor(py / TILE);
  if (dev && dev.place(tx, ty)) return; // a picked spawn takes the tap (D-049)
  const dir = toward(h.x, h.y, tx, ty);
  if (dir) tryStep(dir);
  else if (!held) tryStep('wait');
};

// § switch: the lantern button and the L key, free at any time (D-080, D-081)
const switchIt = () => { state = switchLantern(state); };
const lanternButton = createLanternButton(canvas, { onSwitch: switchIt });

const stage = document.getElementById('stage');
const input = createInput(stage, canvas, { onDir: tryStep, onPoint: stepToward, onLantern: switchIt, onWait: () => tryStep('wait') });
const dev = createDev(stage, canvas, { // null unless dev mode is on (D-030, D-045)
  get: () => state,
  set: (s) => { state = s; },
  reset: () => resetRoom(state, startRoom, FIRST_START),
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
      if (p && !(dev && dev.armed()) && t - lastHeldStep >= HOLD_STEP_MS) { lastHeldStep = t; stepToward(...p, true); }
    }
  }
  let nx = 0, ny = 0;
  if (nudge && t < nudge.until && !reduceMotion.matches) { nx = nudge.dx; ny = nudge.dy; }
  if (state.room !== drawnRoom) { drawnRoom = state.room; drawRoom(base.getContext('2d'), drawnRoom); }
  ctx.drawImage(base, 0, 0);
  drawItems(ctx, state.items, t, reduceMotion.matches);
  const hx = Math.round(shown.x * TILE) + nx, hy = Math.round(shown.y * TILE) + ny;
  drawHero(ctx, hx, hy);
  // § light: the lantern's flame is the light's centre, oil sets its reach (D-053 to D-056, D-064).
  // Switched off, there is no light at all: only remembered tiles show, dimly (D-082).
  const lx = hx + LANTERN_AT.x, ly = hy - 2 + LANTERN_AT.y;
  if (!(dev && dev.lightOff())) {
    const r = state.lit ? reach(state.oil) * (reduceMotion.matches ? 1 : flicker(t, 1.7, 0.035)) : 0;
    drawLight(ctx, state.room, { ...LANTERN, x: lx, y: ly, r }, dev && dev.revealed() ? null : state.seen);
  }
  if (state.lit) { ctx.fillStyle = '#fff5d6'; ctx.fillRect(lx, ly, 1, 1); } // the lit flame's core is always bright (study line 446)
  drawOilBar(ctx, state.oil);
  lanternButton.show(state.lit);
  if (dev) dev.draw(ctx, state);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
