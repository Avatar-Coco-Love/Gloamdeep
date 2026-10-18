// § light: multiply every pixel by the light reaching it; darkness is the
// default (ART-DIRECTION.md, "Light"; style study 1, lines 403–429).
// Shadow edges blend over one 4 × 4 cell into the dithered bands (D-053).
// The room sets the darkness and the remembered tiles' look (D-063); their
// edge fades over one cell (D-060).
import { CELL, seenCells } from '../core/light.js';
import { W, H } from './screen.js';

const CW = W / CELL, CH = H / CELL;
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const BANDS = 5;
const seen = new Uint8Array(CW * CH); // cells the light reaches now
const known = new Uint8Array(CW * CH); // cells on remembered tiles

// How much of `cells` covers pixel x, y (0 to 1): the four nearest cell
// centres mixed by distance, so an edge fades across one cell.
function blend(cells, x, y) {
  const fx = (x + 0.5) / CELL - 0.5, fy = (y + 0.5) / CELL - 0.5;
  const x0 = Math.floor(fx), y0 = Math.floor(fy), ax = fx - x0, ay = fy - y0;
  const xa = x0 < 0 ? 0 : x0, xb = x0 + 1 >= CW ? CW - 1 : x0 + 1;
  const ya = (y0 < 0 ? 0 : y0) * CW, yb = (y0 + 1 >= CH ? CH - 1 : y0 + 1) * CW;
  return (cells[ya + xa] * (1 - ax) + cells[ya + xb] * ax) * (1 - ay) + (cells[yb + xa] * (1 - ax) + cells[yb + xb] * ax) * ay;
}

// `light`: { x, y, r, cr, cg, cb } in screen pixels. One light for now (the lantern).
// `memory`: one byte per tile, 1 when remembered; null shows every tile remembered.
export function drawLight(ctx, room, light, memory) {
  seenCells(room, light.x, light.y, light.r, seen);
  for (let cy = 0; cy < CH; cy++) for (let cx = 0; cx < CW; cx++) {
    known[cy * CW + cx] = memory ? memory[(cy >> 2) * room.cols + (cx >> 2)] : 1;
  }
  const img = ctx.getImageData(0, 0, W, H), d = img.data;
  const { x: lx, y: ly, r, cr, cg, cb } = light, { unseen, remembered } = room.dark;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const th = BAYER[((y & 3) << 2) | (x & 3)];
    const amb = blend(known, x, y) > th ? remembered : unseen;
    let lr = amb[0], lg = amb[1], lb = amb[2];
    const dx = x - lx, dy = y - ly;
    let f = 1 - Math.sqrt(dx * dx + dy * dy) / r;
    if (f > 0) {
      const s = blend(seen, x, y);
      if (s > 0) {
        f = Math.floor(Math.pow(f, 1.25) * s * BANDS + th) / BANDS;
        lr += f * cr; lg += f * cg; lb += f * cb;
      }
    }
    const k = (y * W + x) * 4;
    d[k] = Math.min(255, d[k] * lr); d[k + 1] = Math.min(255, d[k + 1] * lg); d[k + 2] = Math.min(255, d[k + 2] * lb);
  }
  ctx.putImageData(img, 0, 0);
}

// § flicker: a sum of three sine waves, about ±3.5% for the lantern (study line 333)
export function flicker(t, seed, amount) {
  return 1 + amount * (Math.sin(t * 0.011 + seed) * 0.5 + Math.sin(t * 0.023 + seed * 2.3) * 0.3 + Math.sin(t * 0.047 + seed * 5.1) * 0.2);
}
