// § rock: the grey rock of generated depths (D-164). Same view as the crypt
// (ART-DIRECTION.md, "View"): a dark cap, a front face where open floor lies
// below, shade on the floor under it. But the rock's edges don't keep to the
// tiles: corners round off and edges wander a few pixels. Walking is still by
// tile, and a floor tile's middle is never covered. Drawn once per room;
// tiles.js draws the stairs on top.
import { hash } from '../core/noise.js';
import { isWall, tileAt } from '../core/room.js';
import { TILE as T, W, H } from './screen.js';

// § palette: the study's cool blue-greys, as rock
const CAP = '#1c1f28', CAP_GRIT = '#252935', CAP_EDGE = '#5a6478';
const FACE = ['#4b5468', '#555e73', '#434b5d'], FACE_TOP = ['#6a7489', '#5f697e'];
const SEAM = '#262a35', FOOT = '#14161d';
const FLOOR = '#363b48', FLOOR_LIGHT = '#404656', FLOOR_DARK = '#282c36', PEBBLE = '#4a5163';
const PUDDLE = '#262d3d', PUDDLE_SHINE = '#3a4660';
const FACE_H = 11; // the front face's height in pixels, the crypt's 5 to 15
const WOBBLE = 0.55; // how far an edge wanders, as a share of half a tile
const PUDDLES = 0.12; // the share of floor tiles with a puddle

// § mask: 1 for rock, for every pixel. Tile middles are 1 (wall) or 0, mixed
// between middles and cut at a level that wobbles in 3-pixel steps, so edges
// stay chunky pixel art.
function mask(room) {
  const m = new Uint8Array(W * H), wall = (x, y) => +isWall(room, x, y);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const tx = x / T | 0, ty = y / T | 0, ix = x % T, iy = y % T;
    const fx = (x + 0.5) / T - 0.5, fy = (y + 0.5) / T - 0.5, x0 = Math.floor(fx), y0 = Math.floor(fy), ax = fx - x0, ay = fy - y0;
    const v = (wall(x0, y0) * (1 - ax) + wall(x0 + 1, y0) * ax) * (1 - ay) + (wall(x0, y0 + 1) * (1 - ax) + wall(x0 + 1, y0 + 1) * ax) * ay;
    let rock = v > 0.5 - (hash(x / 3 | 0, y / 3 | 0, 7) - 0.5) * WOBBLE;
    if (isWall(room, tx, ty) && v > 0.95) rock = true;
    if (!isWall(room, tx, ty) && (tileAt(room, tx, ty).leads || ix > 3 && ix < 12 && iy > 3 && iy < 12)) rock = false;
    m[y * W + x] = rock ? 1 : 0;
  }
  return m;
}

// § face: piled chunks of rock, each the nearest of a few hashed points, with
// dark seams between and the top of each chunk catching the light
function face(x, y) {
  let best = 1e9, second = 1e9, id = 0;
  const cx = x / 7 | 0, cy = y / 6 | 0;
  for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) {
    const px = (cx + i) * 7 + hash(cx + i, cy + j, 21) * 7, py = (cy + j) * 6 + hash(cx + i, cy + j, 22) * 6;
    const d = (x - px) ** 2 + ((y - py) * 1.3) ** 2;
    if (d < best) { second = best; best = d; id = hash(cx + i, cy + j, 23); } else if (d < second) second = d;
  }
  if (second - best < 10) return SEAM;
  if (second - best < 22 && y % 6 < 3) return FACE_TOP[id < 0.5 ? 0 : 1];
  return FACE[Math.min(2, id * 3 | 0)];
}

// § floor: uneven stone with gravel and pebbles, the odd puddle
function floor(x, y) {
  const tx = x / T | 0, ty = y / T | 0, h = hash(x, y, 5);
  if (hash(tx, ty, 12) < PUDDLES) {
    const px = x % T - 8, py = y % T - 9, e = px * px / 16 + py * py / 6;
    if (e < 0.3 && py < 0) return PUDDLE_SHINE;
    if (e < 1) return PUDDLE;
  }
  return h < 0.06 ? PEBBLE : h < 0.14 ? FLOOR_DARK : hash(x / 3 | 0, y / 3 | 0, 6) < 0.3 ? FLOOR_LIGHT : FLOOR;
}

const rgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const RGB = new Map();
const toRgb = (h) => RGB.get(h) || (RGB.set(h, rgb(h)), RGB.get(h));

export function drawRock(c, room) {
  const m = mask(room), rock = (x, y) => x < 0 || y < 0 || x >= W || y >= H || m[y * W + x] === 1;
  const img = c.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    let col, shade = 1;
    if (rock(x, y)) {
      let down = 0; // rock pixels below this one, down to open floor
      while (down < FACE_H && y + down + 1 < H && rock(x, y + down + 1)) down++;
      if (down < FACE_H && y + down + 1 < H) col = down === FACE_H - 1 ? CAP_EDGE : down === 0 ? FOOT : face(x, y);
      else col = !rock(x - 1, y) || !rock(x + 1, y) || !rock(x, y - 1) ? CAP_EDGE : hash(x >> 1, y >> 1, 9) < 0.15 ? CAP_GRIT : CAP;
    } else {
      col = floor(x, y);
      for (let k = 1; k <= 4; k++) if (rock(x, y - k)) { shade = k <= 2 ? 0.55 : 0.78; break; } // shade under the face
    }
    const [r, g, b] = toRgb(col), k = (y * W + x) * 4;
    d[k] = r * shade; d[k + 1] = g * shade; d[k + 2] = b * shade; d[k + 3] = 255;
  }
  c.putImageData(img, 0, 0);
}
