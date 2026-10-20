// § light: multiply every pixel by the light reaching it; darkness is the
// default (ART-DIRECTION.md, "Light"; style study 1, lines 403–429).
// Shadow edges blend over one 4 × 4 cell into the dithered bands (D-053).
// The room sets the darkness and the remembered tiles' look (D-063); their
// edge fades over one cell (D-060). Lights and cells are in room pixels; the
// camera picks which of them land on the screen (D-195).
import { CELL, seenCells } from '../core/light.js';
import { TILE, W, H } from './screen.js';

let CW = 0, CH = 0; // the room's size in cells
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const BANDS = 5;
let known = new Uint8Array(0); // cells on remembered tiles

// How much of `cells` covers pixel x, y (0 to 1): the four nearest cell
// centres mixed by distance, so an edge fades across one cell.
function blend(cells, x, y) {
  const fx = (x + 0.5) / CELL - 0.5, fy = (y + 0.5) / CELL - 0.5;
  const x0 = Math.floor(fx), y0 = Math.floor(fy), ax = fx - x0, ay = fy - y0;
  const xa = x0 < 0 ? 0 : x0, xb = x0 + 1 >= CW ? CW - 1 : x0 + 1;
  const ya = (y0 < 0 ? 0 : y0) * CW, yb = (y0 + 1 >= CH ? CH - 1 : y0 + 1) * CW;
  return (cells[ya + xa] * (1 - ax) + cells[ya + xb] * ax) * (1 - ay) + (cells[yb + xa] * (1 - ax) + cells[yb + xb] * ax) * ay;
}

// `lights`: [{ x, y, r, cr, cg, cb }] in screen pixels: the lantern and any
// torches (D-101). r 0 is no light at all, the lantern switched off (D-082).
// `memory`: one byte per tile, 1 when remembered; null shows every tile remembered.
// `cam`: the room pixel at the screen's top-left (src/core/camera.js).
const NO_SHIFT = { x: 0, y: 0 }; // a screen-sized room, as on the title
let seenBy = []; // one cell buffer per light, reused every frame
export function drawLight(ctx, room, lights, memory, cam = NO_SHIFT) {
  if (room.cols * TILE / CELL !== CW || room.rows * TILE / CELL !== CH) { // a new room size: new buffers
    CW = room.cols * TILE / CELL; CH = room.rows * TILE / CELL;
    known = new Uint8Array(CW * CH); seenBy = [];
  }
  const lit = [];
  for (const L of lights) {
    if (L.r <= 0) continue;
    const cells = seenBy[lit.length] || (seenBy[lit.length] = new Uint8Array(CW * CH));
    seenCells(room, L.x, L.y, L.r, cells);
    lit.push({ L, cells });
  }
  for (let cy = 0; cy < CH; cy++) for (let cx = 0; cx < CW; cx++) {
    known[cy * CW + cx] = memory ? memory[(cy >> 2) * room.cols + (cx >> 2)] : 1;
  }
  const img = ctx.getImageData(0, 0, W, H), d = img.data;
  const { unseen, remembered } = room.dark;
  for (let sy = 0; sy < H; sy++) for (let sx = 0; sx < W; sx++) {
    const x = sx + cam.x, y = sy + cam.y; // the room pixel; the dither keeps to the room, not the screen
    const th = BAYER[((y & 3) << 2) | (x & 3)];
    const amb = blend(known, x, y) > th ? remembered : unseen;
    let lr = 0, lg = 0, lb = 0;
    for (let i = 0; i < lit.length; i++) {
      const { L, cells } = lit[i], dx = x - L.x, dy = y - L.y;
      let f = 1 - Math.sqrt(dx * dx + dy * dy) / L.r;
      if (f <= 0) continue;
      const s = blend(cells, x, y);
      if (s <= 0) continue;
      f = Math.floor(Math.pow(f, 1.25) * s * BANDS + th) / BANDS;
      lr += f * L.cr; lg += f * L.cg; lb += f * L.cb;
    }
    const k = (sy * W + sx) * 4;
    d[k] = Math.min(255, d[k] * (amb[0] + lr));
    d[k + 1] = Math.min(255, d[k + 1] * (amb[1] + lg));
    d[k + 2] = Math.min(255, d[k + 2] * (amb[2] + lb));
  }
  ctx.putImageData(img, 0, 0);
}

// § flicker: a sum of three sine waves, about ±3.5% for the lantern, ±9% for torches (study line 333)
export function flicker(t, seed, amount) {
  return 1 + amount * (Math.sin(t * 0.011 + seed) * 0.5 + Math.sin(t * 0.023 + seed * 2.3) * 0.3 + Math.sin(t * 0.047 + seed * 5.1) * 0.2);
}
