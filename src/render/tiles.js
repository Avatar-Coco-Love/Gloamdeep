// § tiles: tile drawing, taken from style study 1 (drawFloor, lines 186–199).
// Moss and wall shade come back at step 8, when walls exist.
import { hash } from '../core/noise.js';
import { TILE as T } from './screen.js';

const px = (c, x, y, col) => { c.fillStyle = col; c.fillRect(x, y, 1, 1); };

// § floor: crypt floor slab, with an optional split, grit and a rare crack
export function drawFloor(c, tx, ty) {
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
}
