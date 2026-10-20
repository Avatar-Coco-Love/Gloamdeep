// § woods: grass and round trees, one tree a tile, lit from the top left
// (step 48 mock-up B, D-209). Grass colours are the 0.2.3 sketch's.
import { hash } from '../core/noise.js';
import { tileAt } from '../core/room.js';
import { TILE as T } from './screen.js';

// Value noise: hash at whole points, mixed between them
function noise(x, y, s) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
  const a = hash(x0, y0, s), b = hash(x0 + 1, y0, s), c = hash(x0, y0 + 1, s), d = hash(x0 + 1, y0 + 1, s);
  return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
}
const RGB = new Map();
const rgb = (hex) => RGB.get(hex) || RGB.set(hex, [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))).get(hex);

// § grass: three greens in soft patches, a rare paler blade two pixels tall
function grass(put, x, y) {
  const n = noise(x / 5, y / 5, 1), r = hash(x, y, 2);
  put(x, y, n < 0.33 ? '#345a2c' : n > 0.7 ? '#4a7a3a' : '#3f6b34');
  if (r > 0.975 && y > 0) { put(x, y, '#5a8c44'); put(x, y - 1, '#5a8c44'); }
}

// § tree: a ground shadow, a short trunk, and a lumpy round crown with a dark
// rim, lighter toward the top left. `put` sets a pixel, `shade` darkens one.
const CROWN = { y: 6, r: 6.6, lump: 1.2 };
export function paintTree(put, shade, tx, ty) {
  const s = tx * 7 + ty * 13, cx = 7.5 + (hash(tx, ty, 3) - 0.5), cy = CROWN.y;
  for (let ly = 0; ly < T; ly++) for (let lx = 0; lx < T; lx++) {
    const x = tx * T + lx, y = ty * T + ly;
    const sx = (lx - 8) / 6.5, sy = (ly - 14) / 1.6;
    if (sx * sx + sy * sy < 1) shade(x, y, 0.5);
    if (lx >= 7 && lx <= 8 && ly >= 10 && ly <= 14) put(x, y, lx === 7 ? '#6a4c36' : '#3e2c20');
    const r = CROWN.r + noise(Math.atan2(ly - cy, lx - cx) * 1.6 + 9, s, 4) * CROWN.lump, d = Math.hypot(lx - cx, ly - cy);
    if (d > r) continue;
    if (d > r - 1) { put(x, y, '#13241a'); continue; }
    const k = ((lx - cx) * -0.6 + (ly - cy) * -0.8) / r + (noise(x / 2.2, y / 2.2, 14 + s) - 0.5) * 0.7;
    put(x, y, k > 0.45 ? (hash(x, y, 5) > 0.75 ? '#6fb04e' : '#4f8a3f') : k > 0 ? '#36633a' : k > -0.4 ? '#2c5230' : '#1d3620');
  }
}

// § room: the whole woods room at once, pixel by pixel
export function drawWoods(c, room) {
  const w = room.cols * T, img = c.createImageData(w, room.rows * T), d = img.data;
  const put = (x, y, hex) => { const [r, g, b] = rgb(hex), i = (y * w + x) * 4; d[i] = r; d[i + 1] = g; d[i + 2] = b; d[i + 3] = 255; };
  const shade = (x, y, k) => { const i = (y * w + x) * 4; d[i] *= k; d[i + 1] *= k; d[i + 2] *= k; };
  for (let y = 0; y < room.rows * T; y++) for (let x = 0; x < w; x++) grass(put, x, y);
  for (let ty = 0; ty < room.rows; ty++) for (let tx = 0; tx < room.cols; tx++) {
    if (tileAt(room, tx, ty).id === 'tree') paintTree(put, shade, tx, ty);
  }
  c.putImageData(img, 0, 0);
}

// § spawned: a tree the dev spawn tool puts in another room, on its floor
export function drawTree(c, room, tx, ty) {
  const put = (x, y, hex) => { c.fillStyle = hex; c.fillRect(x, y, 1, 1); };
  const shade = (x, y, k) => { c.fillStyle = `rgba(0,0,0,${1 - k})`; c.fillRect(x, y, 1, 1); };
  paintTree(put, shade, tx, ty);
}
