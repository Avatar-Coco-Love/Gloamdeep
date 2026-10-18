// § boot: set up the screen, the room and the hero
import { VERSION } from './core/version.js';
import { makeRoom, FIRST_ROOM } from './core/room.js';
import { makeState, step, toward, DIRS } from './core/turn.js';
import { createScreen, TILE, W, H } from './render/screen.js';
import { drawRoom } from './render/tiles.js';
import { drawHero } from './render/sprites.js';
import { createInput } from './input/input.js';

const canvas = document.getElementById('game');
const ctx = createScreen(canvas);
document.getElementById('version').textContent = VERSION;

let state = makeState(makeRoom(FIRST_ROOM));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

// The room never changes, so it is drawn once onto a hidden canvas.
const base = document.createElement('canvas');
base.width = W; base.height = H;
drawRoom(base.getContext('2d'), state.room);

// § moving: the hero slides to its new tile (D-043); one step waits in line
// so a quick second tap or key is not lost.
const SLIDE = 0.18; // tiles per frame, as in the study
const shown = { x: state.hero.x, y: state.hero.y };
let queued = null, nudge = null; // nudge: { dx, dy, until } after bumping a wall
const settled = () => shown.x === state.hero.x && shown.y === state.hero.y;

function tryStep(dir) {
  if (!settled()) { queued = dir; return; }
  const next = step(state, dir);
  if (next === state) nudgeToward(dir);
  state = next;
  if (reduceMotion.matches) { shown.x = state.hero.x; shown.y = state.hero.y; }
}
function nudgeToward(dir) {
  const [dx, dy] = DIRS[dir];
  nudge = { dx, dy, until: performance.now() + 90 };
}
const stepToward = (px, py) => {
  const h = state.hero;
  const dir = toward(h.x, h.y, Math.floor(px / TILE), Math.floor(py / TILE));
  if (dir) tryStep(dir);
};

const input = createInput(document.getElementById('stage'), canvas, { onDir: tryStep, onPoint: stepToward });

// § loop: move the shown hero toward the real one, then draw
function approach(from, to) { return from + Math.sign(to - from) * Math.min(Math.abs(to - from), SLIDE); }
function frame(t) {
  shown.x = approach(shown.x, state.hero.x);
  shown.y = approach(shown.y, state.hero.y);
  if (settled()) {
    if (queued) { const d = queued; queued = null; tryStep(d); }
    else { const p = input.held(); if (p) stepToward(...p); }
  }
  let nx = 0, ny = 0;
  if (nudge && t < nudge.until && !reduceMotion.matches) { nx = nudge.dx; ny = nudge.dy; }
  ctx.drawImage(base, 0, 0);
  drawHero(ctx, Math.round(shown.x * TILE) + nx, Math.round(shown.y * TILE) + ny);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
