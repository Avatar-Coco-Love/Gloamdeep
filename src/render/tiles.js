// § tiles: tile drawing, taken from style study 1 (drawFloor and drawWall,
// lines 182–239). Cobwebs are left out (step 8 choice, D-040).
import { hash } from '../core/noise.js';
import { isWall, tileAt } from '../core/room.js';
import { stairsFacing } from '../core/stairs.js';
import { TILE as T } from './screen.js';

const px = (c, x, y, col) => { c.fillStyle = col; c.fillRect(x, y, 1, 1); };

// § floor: crypt floor slab, with an optional split, grit and a rare crack
export function drawFloor(c, room, tx, ty) {
  const x0 = tx * T, y0 = ty * T, r = hash(tx, ty, 1);
  c.fillStyle = '#3a4050'; c.fillRect(x0, y0, T, T);
  c.fillStyle = '#22262f'; c.fillRect(x0, y0, T, 1); c.fillRect(x0, y0, 1, T);
  c.fillStyle = '#454c5e'; c.fillRect(x0 + 1, y0 + 1, 13, 1); c.fillRect(x0 + 1, y0 + 2, 1, 9);
  if (r < 0.4) { // split into two slabs
    const j = 4 + Math.floor(hash(tx, ty, 2) * 8);
    c.fillStyle = '#22262f'; c.fillRect(x0, y0 + 8, T, 1); c.fillRect(x0 + j, y0 + 8, 1, 8);
    c.fillStyle = '#454c5e'; c.fillRect(x0 + 1, y0 + 9, j - 2, 1);
  }
  for (let i = 0; i < 9; i++) {
    const nx = 1 + Math.floor(hash(tx, ty, 10 + i) * 14), ny = 1 + Math.floor(hash(tx, ty, 30 + i) * 14);
    px(c, x0 + nx, y0 + ny, hash(tx, ty, 50 + i) < 0.5 ? '#434a5b' : '#323744');
  }
  if (hash(tx, ty, 3) < 0.16) { // crack
    let cx = 3 + Math.floor(hash(tx, ty, 4) * 9), cy = 3 + Math.floor(hash(tx, ty, 5) * 5);
    for (let i = 0; i < 7; i++) {
      px(c, x0 + cx, y0 + cy, '#262a34');
      cx += hash(tx, ty, 60 + i) < 0.5 ? 1 : 0; cy += 1;
      if (cy > 14) break;
    }
  }
  const nearWall = isWall(room, tx - 1, ty) || isWall(room, tx + 1, ty) || isWall(room, tx, ty - 1) || isWall(room, tx, ty + 1);
  if (nearWall && hash(tx, ty, 6) < 0.3) { // moss
    const mx = 2 + Math.floor(hash(tx, ty, 7) * 9), my = 4 + Math.floor(hash(tx, ty, 8) * 8);
    for (const [dx, dy, col] of MOSS) px(c, x0 + mx + dx, y0 + my + dy, col);
  }
  if (isWall(room, tx, ty - 1)) { // shade cast by the wall face above
    c.fillStyle = 'rgba(6,6,12,.45)'; c.fillRect(x0, y0, T, 2);
    c.fillStyle = 'rgba(6,6,12,.22)'; c.fillRect(x0, y0 + 2, T, 2);
  }
}
const MOSS = [[0, 0, '#3c6e3a'], [1, 0, '#3c6e3a'], [2, 0, '#6fb04e'], [1, -1, '#6fb04e'],
  [3, 1, '#3c6e3a'], [0, 1, '#3c6e3a'], [2, 1, '#3c6e3a'], [4, 1, '#6fb04e']];

// § wall: a dark cap, light edges next to open ground, and a brick front face
// when the tile below is not a wall (ART-DIRECTION.md, "View")
export function drawWall(c, room, tx, ty) {
  const x0 = tx * T, y0 = ty * T, face = !isWall(room, tx, ty + 1);
  c.fillStyle = '#1f222c'; c.fillRect(x0, y0, T, T);
  for (let i = 0; i < 6; i++) px(c, x0 + Math.floor(hash(tx, ty, 70 + i) * 16), y0 + Math.floor(hash(tx, ty, 80 + i) * (face ? 4 : 16)), '#282c38');
  c.fillStyle = '#56607a';
  if (!isWall(room, tx - 1, ty)) c.fillRect(x0, y0, 1, face ? 5 : T);
  if (!isWall(room, tx + 1, ty)) c.fillRect(x0 + 15, y0, 1, face ? 5 : T);
  if (!isWall(room, tx, ty - 1)) c.fillRect(x0, y0, T, 1);
  if (!face) return;
  c.fillStyle = '#6b7790'; c.fillRect(x0, y0 + 4, T, 1); // lip
  c.fillStyle = '#2b303c'; c.fillRect(x0, y0 + 5, T, 11); // mortar
  COURSES.forEach(([cy, ch], i) => { // three brick courses, staggered per row and column
    const off = ((i + tx) % 2) ? 4 : 0;
    for (let bx = -8 + off; bx < 16; bx += 8) {
      const xa = Math.max(0, bx), xb = Math.min(15, bx + 6);
      if (xb < xa) continue;
      const dark = hash(tx * 3 + bx, ty * 5 + i, 90) < 0.25;
      c.fillStyle = dark ? '#475064' : '#535d72'; c.fillRect(x0 + xa, y0 + cy, xb - xa + 1, ch);
      c.fillStyle = dark ? '#58627a' : '#69748b'; c.fillRect(x0 + xa, y0 + cy, xb - xa + 1, 1);
    }
  });
  c.fillStyle = '#16181f'; c.fillRect(x0, y0 + 15, T, 1); // base line
}
const COURSES = [[5, 3], [9, 3], [13, 2]]; // [top row, height]

// § stairs: the study's stairs down (drawStairs, lines 244–254): five violet-
// lipped steps narrowing into a dark pit (D-133). They sink toward the wall
// beside them, the top step at the floor (D-143). The stairs up narrow the
// same way but brighten toward the wall, rising to the light above.
const STEP_SHADES = ['#6a7288', '#535a6e', '#3e4456', '#2c3040', '#1d2030'];
const STEP_LIPS = ['#b9a4ec', '#9682cf', '#6f5ea6', '#4b3f78', '#2f2850'];
function drawSteps(c, room, tx, ty, up) {
  const x0 = tx * T, y0 = ty * T, dir = stairsFacing(room, tx, ty);
  c.fillStyle = '#0c0b12'; c.fillRect(x0, y0, T, T);
  for (let i = 0; i < 5; i++) { // i: 0 the step at the floor, 4 the one at the wall
    const m = 1 + i, k = up ? 4 - i : i, w = 16 - 2 * m;
    const a = dir === 'up' || dir === 'left' ? 12 - i * 3 : 1 + i * 3; // the step's 3 px band
    const lip = dir === 'up' || dir === 'left' ? a + 2 : a; // its edge on the floor side
    const band = (p, size) => (dir === 'up' || dir === 'down' ? c.fillRect(x0 + m, y0 + p, w, size) : c.fillRect(x0 + p, y0 + m, size, w));
    c.fillStyle = STEP_SHADES[k]; band(a, 3);
    c.fillStyle = STEP_LIPS[k]; band(lip, 1);
  }
}

// § room: draw every tile of a room, by registry id (D-048)
const DRAW = {
  wall: drawWall, floor: drawFloor,
  stairsDown: (c, room, x, y) => drawSteps(c, room, x, y, false),
  stairsUp: (c, room, x, y) => drawSteps(c, room, x, y, true),
};
export function drawRoom(c, room) {
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    DRAW[tileAt(room, x, y).id](c, room, x, y);
  }
}
