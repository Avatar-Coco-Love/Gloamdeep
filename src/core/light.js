// § light: which parts of the room a light can see (ART-DIRECTION.md, "Light").
// Plain data, no drawing. The room is checked in 4 × 4 pixel cells; a cell is
// seen when a ray from the light reaches its centre without crossing a tile
// that blocks light (style study 1, lines 309–332). On a wall, the ray aims at
// the wall tile's point nearest the light instead, so a seen wall is lit as a
// whole tile, not in teeth (D-058).
import { tileAt } from './room.js';

export const CELL = 4;
const TILE_SIZE = 16;

// The study lantern at full oil (study line 394); oil comes at step 14 (D-055).
export const LANTERN = { r: (1.6 + 3.6) * TILE_SIZE, cr: 1.45, cg: 1.2, cb: 0.86 };

const blocks = (room, tx, ty) => tileAt(room, tx, ty).blocksLight;

// Fills `out` (one byte per cell, cols*4 × rows*4 cells) with 1 where light
// at pixel x, y within radius r reaches, 0 elsewhere. Returns `out`.
export function seenCells(room, x, y, r, out) {
  const cw = room.cols * TILE_SIZE / CELL, ch = room.rows * TILE_SIZE / CELL;
  out.fill(0);
  const ltx = x >> 4, lty = y >> 4;
  const cx0 = Math.max(0, Math.floor((x - r) / CELL)), cx1 = Math.min(cw - 1, Math.floor((x + r) / CELL));
  const cy0 = Math.max(0, Math.floor((y - r) / CELL)), cy1 = Math.min(ch - 1, Math.floor((y + r) / CELL));
  for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
    let mx = cx * CELL + 2, my = cy * CELL + 2;
    if (Math.hypot(mx - x, my - y) > r) continue;
    const wtx = mx >> 4, wty = my >> 4;
    if (blocks(room, wtx, wty)) {
      mx = Math.max(wtx * TILE_SIZE, Math.min(wtx * TILE_SIZE + TILE_SIZE - 1, x));
      my = Math.max(wty * TILE_SIZE, Math.min(wty * TILE_SIZE + TILE_SIZE - 1, y));
    }
    const dx = mx - x, dy = my - y, d = Math.hypot(dx, dy);
    const ttx = mx >> 4, tty = my >> 4, steps = Math.ceil(d / 3);
    let ok = 1;
    for (let s = 1; s < steps; s++) {
      const tx = (x + dx * s / steps) >> 4, ty = (y + dy * s / steps) >> 4;
      if (tx === ltx && ty === lty) continue;
      if (tx === ttx && ty === tty) break;
      if (blocks(room, tx, ty)) { ok = 0; break; }
    }
    out[cy * cw + cx] = ok;
  }
  return out;
}
