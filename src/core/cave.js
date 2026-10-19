// § cave: a generated room, caves joined by narrow gaps like the second room
// (D-147), from one seed (D-148), with a torch by the stairs up, a flask and
// a rat guarding it (D-149), and a herb (D-155). Plain data, no drawing. Same seed, same room.
import { rng, int, pick } from './rng.js';

// § sizes: the first rooms' 11 × 13, and the caves' sizes in tiles (D-147)
const COLS = 11, ROWS = 13;
const CAVES = [2, 4], CAVE_W = [3, 7], CAVE_H = [3, 6];
// At least this many open tiles, near the second room's 67 (D-147)
const MIN_OPEN = 45;
const TRIES = 200;
// The top row's tiles a torch can use, clear of the hearts, depth and oil
// bar boxes, as the first rooms' torches are (D-101)
const TOP_ROW_TORCH = [2, 3, 7];

// (seed) → { map, start, lights, enemies, items }, or null if no try worked
export function generateRoom(seed) {
  const r = rng(seed);
  for (let i = 0; i < TRIES; i++) {
    const room = tryRoom(r);
    if (room) return room;
  }
  return null;
}

function tryRoom(r) {
  const g = Array.from({ length: ROWS }, () => Array(COLS).fill('#'));
  const caves = placeCaves(r);
  if (caves.length < 2) return null;
  for (const c of caves) carveCave(r, g, c);
  joinCaves(r, g, caves);
  // a bite can cut off a tile or two; those go back to wall (D-152)
  const joined = reach(g, { x: caves[0].x + (caves[0].w >> 1), y: caves[0].y + (caves[0].h >> 1) });
  for (const f of tilesWhere(g, (x, y) => g[y][x] === '.')) if (!joined.has(key(f))) g[f.y][f.x] = '#';
  const floors = tilesWhere(g, (x, y) => g[y][x] === '.');
  if (floors.length < MIN_OPEN) return null;

  // § stairs: up on a floor tile with wall above, so the steps sink into it
  // (D-143); down as far along the way as can be. Neither may cut the room
  // in two, so the hero never has to cross a stair to get somewhere.
  const free = (x, y, cut) => reach(g, floors.find((f) => !cut.some((c) => c.x === f.x && c.y === f.y)), cut).size === floors.length - cut.length;
  const ups = floors.filter((f) => g[f.y - 1][f.x] === '#' && free(f.x, f.y, [f]));
  if (!ups.length) return null;
  const up = pick(r, ups);
  const far = reach(g, up);
  const downs = floors.filter((f) => far.get(key(f)) >= 8 && free(f.x, f.y, [up, f]));
  if (!downs.length) return null;
  const most = Math.max(...downs.map((f) => far.get(key(f))));
  const down = pick(r, downs.filter((f) => far.get(key(f)) >= most - 2));
  g[up.y][up.x] = '<'; g[down.y][down.x] = '>';

  // § torch: on a wall face near the stairs up, not right above them
  const faces = tilesWhere(g, (x, y) => g[y][x] === '#' && y + 1 < ROWS && g[y + 1][x] === '.' && (y > 0 || TOP_ROW_TORCH.includes(x)));
  const near = faces.filter((t) => dist(t, up) <= 3 && !(t.x === up.x && t.y === up.y - 1));
  if (!near.length) return null;
  const torch = pick(r, near);

  // § flask and rat: the flask well away from the stairs, the rat beside it,
  // at least 5 steps from the stairs up, and 3 tiles off counting across walls.
  // It starts in the dark, as the second room's does: out of the torch's
  // light (3 tiles, D-098) and the stairs' glow (1.5, D-134).
  const open = floors.filter((f) => !same(f, up) && !same(f, down));
  const flasks = open.filter((f) => far.get(key(f)) >= 5);
  if (!flasks.length) return null;
  const flask = pick(r, flasks);
  const rats = open.filter((f) => !same(f, flask) && dist(f, flask) <= 2 && far.get(key(f)) >= 5 && dist(f, up) >= 3 && dist(f, torch) >= 5 && dist(f, down) >= 3);
  if (!rats.length) return null;
  const rat = pick(r, rats);

  // § herb: anywhere open, at least 3 tiles from the flask and the rat (D-155).
  // Picked last, so the rest of a seed's room is as it was before herbs.
  const herbs = open.filter((f) => dist(f, flask) >= 3 && dist(f, rat) >= 3);
  if (!herbs.length) return null;
  const herb = pick(r, herbs);

  return {
    map: g.map((row) => row.join('')),
    start: { x: up.x, y: up.y },
    lights: [{ id: 'torch', x: torch.x, y: torch.y }],
    items: [{ id: 'flask', x: flask.x, y: flask.y }, { id: 'herb', x: herb.x, y: herb.y }],
    enemies: [{ id: 'rat', x: rat.x, y: rat.y }],
  };
}

// § caves: 2 to 4 boxes inside the outer wall, a wall at least between them
function placeCaves(r) {
  const want = int(r, CAVES[0], CAVES[1]), caves = [];
  for (let i = 0; i < 80 && caves.length < want; i++) {
    const w = int(r, CAVE_W[0], CAVE_W[1]), h = int(r, CAVE_H[0], CAVE_H[1]);
    const c = { x: int(r, 1, COLS - 1 - w), y: int(r, 1, ROWS - 1 - h), w, h };
    if (!caves.some((o) => c.x <= o.x + o.w && o.x <= c.x + c.w && c.y <= o.y + o.h && o.y <= c.y + c.h)) caves.push(c);
  }
  return caves;
}

// § rough: a cave's box as floor, with edges bitten back to wall here and
// there: corners and edge tiles, and some bites a tile deeper (D-152)
const ROUGH_CORNER = 0.6, ROUGH_EDGE = 0.3, ROUGH_DEEP = 0.3;
function carveCave(r, g, c) {
  for (let y = c.y; y < c.y + c.h; y++) for (let x = c.x; x < c.x + c.w; x++) g[y][x] = '.';
  for (let y = c.y; y < c.y + c.h; y++) for (let x = c.x; x < c.x + c.w; x++) {
    const left = x === c.x, right = x === c.x + c.w - 1, top = y === c.y, bottom = y === c.y + c.h - 1;
    if (!(left || right || top || bottom)) continue;
    if (r() >= ((left || right) && (top || bottom) ? ROUGH_CORNER : ROUGH_EDGE)) continue;
    g[y][x] = '#';
    // a deeper bite: the next tile inward, if the cave is wide enough to keep a middle
    const ix = x + (left ? 1 : right ? -1 : 0), iy = y + (top ? 1 : bottom ? -1 : 0);
    const inside = ix > c.x && ix < c.x + c.w - 1 || iy > c.y && iy < c.y + c.h - 1;
    if (c.w > 3 && c.h > 3 && inside && r() < ROUGH_DEEP) g[iy][ix] = '#';
  }
}

// § gaps: each cave joins the nearest one already joined, by a narrow,
// one-tile path that turns once
function joinCaves(r, g, caves) {
  const mid = (c) => ({ x: c.x + (c.w >> 1), y: c.y + (c.h >> 1) });
  const joined = [caves[0]], left = caves.slice(1);
  while (left.length) {
    let best = null;
    for (const a of left) for (const b of joined) if (!best || dist(mid(a), mid(b)) < best.d) best = { a, b, d: dist(mid(a), mid(b)) };
    const from = mid(best.a), to = mid(best.b), across = r() < 0.5;
    const turn = across ? { x: to.x, y: from.y } : { x: from.x, y: to.y };
    carveLine(g, from, turn); carveLine(g, turn, to);
    joined.push(best.a); left.splice(left.indexOf(best.a), 1);
  }
}
function carveLine(g, a, b) {
  for (let x = Math.min(a.x, b.x); x <= Math.max(a.x, b.x); x++) for (let y = Math.min(a.y, b.y); y <= Math.max(a.y, b.y); y++) g[y][x] = '.';
}

// § helpers
const key = (t) => t.y * COLS + t.x;
const same = (a, b) => a.x === b.x && a.y === b.y;
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
function tilesWhere(g, test) {
  const out = [];
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (test(x, y)) out.push({ x, y });
  return out;
}
// Steps from `from` to every floor tile it can walk to, not through `cut`
function reach(g, from, cut = []) {
  const out = new Map([[key(from), 0]]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (g[n.y]?.[n.x] !== '.' || out.has(key(n)) || cut.some((c) => same(c, n))) continue;
      out.set(key(n), out.get(key(t)) + 1); queue.push(n);
    }
  }
  return out;
}
