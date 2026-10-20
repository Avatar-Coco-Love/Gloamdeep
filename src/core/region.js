// § region: a generated depth laid out as a grid of rooms (D-169, D-201).
// Plain data, no drawing. Depths 3 to 5 are each a 2 × 2 grid with one cell
// left empty by the seed, so their three rooms make an L, each joined to the
// corner room by a one-tile opening at a spot along their shared edge the
// seed picks. Deeper depths are one room, for now.
// § lining up (D-202, D-203): every floor sits on the same grid. The stairs
// up are in the same cell, at the same tile, as the stairs down one floor
// above; the stairs down in another room than them, at a tile the seed
// picks, which the floor below then fits. Under the crypt the seed picks the
// cell. The room with the stairs up keeps the depth's own id (depth3), the
// others are depth3:x,y.
import { rng, int, pick, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';

// The depths laid out as grids; the rest are one room each, for now (D-203)
const GRIDS = [3, 4, 5];
const SIZE = 2;
// The first generated depth, and the crypt's stairs down above it (SECOND_ROOM in room.js)
const FIRST = 3;
const CRYPT_DOWN = { x: 1, y: 11 };
// On a one-room floor, the stairs down are at least this many steps from the stairs up (cave.js)
const APART = 8;

// (seed, depth) → { cells: [{ id, x, y, seed, up, down, doors, sides }], up,
// down }, or null above the generated depths. `up` and `down` are the stairs
// tiles, in a cell's own `up` or `down` (null when it has none) and for the
// whole floor as { x, y, cell }. `doors` are a room's openings, as { dir, at }
// (the column or row along that edge); `sides` the room beyond each, by
// direction, as openings.js reads them. Worked out once per seed and depth.
const laid = new Map();
export function layoutAt(seed, depth) {
  if (depth < FIRST) return null;
  const k = `${seed}:${depth}`;
  if (!laid.has(k)) laid.set(k, lay(seed, depth));
  return laid.get(k);
}

function lay(seed, depth) {
  const base = seedFor(seed, depth), r = rng(base ^ 0x2c1b3c6d), above = layoutAt(seed, depth - 1);
  const upAt = above ? above.down : CRYPT_DOWN;
  if (!GRIDS.includes(depth)) {
    const { cell } = above.down, down = spot(r, (t) => dist(t, upAt) < APART);
    const one = { id: `depth${depth}`, x: cell.x, y: cell.y, seed: base, up: tile(upAt), down, doors: [], sides: {} };
    return { cells: [one], up: { ...tile(upAt), cell }, down: { ...down, cell } };
  }
  // § cells: the empty one is never under the stairs down above
  const under = above?.down.cell, at = (i) => ({ x: i % SIZE, y: Math.floor(i / SIZE) });
  const empty = pick(r, [...Array(SIZE * SIZE).keys()].filter((i) => !under || i !== under.y * SIZE + under.x));
  const cells = [];
  for (let i = 0; i < SIZE * SIZE; i++) if (i !== empty) cells.push({ ...at(i), up: null, down: null, doors: [], sides: {} });
  const ups = under ? cells.find((c) => c.x === under.x && c.y === under.y) : pick(r, cells);
  ups.up = tile(upAt);
  cells.forEach((c, i) => {
    c.id = c === ups ? `depth${depth}` : `depth${depth}:${c.x},${c.y}`;
    c.seed = c === ups ? base : (base + 1 + i) >>> 0;
  });
  // § joins: each pair of cells side by side, the opening's spot kept 2 tiles
  // from the corners, and clear of the stairs up
  for (const a of cells) for (const b of cells) {
    if (b.x === a.x + 1 && b.y === a.y) join(a, b, 'right', 'left', door(r, ROWS, a, b, (n) => [{ x: COLS - 2, y: n }, { x: 1, y: n }]));
    if (b.y === a.y + 1 && b.x === a.x) join(a, b, 'down', 'up', door(r, COLS, a, b, (n) => [{ x: n, y: ROWS - 2 }, { x: n, y: 1 }]));
  }
  // § stairs down: in another room than the stairs up, anywhere 2 tiles in from its edges
  const downs = pick(r, cells.filter((c) => c !== ups));
  downs.down = spot(r, () => false);
  return { cells, up: { ...tile(upAt), cell: tile(ups) }, down: { ...downs.down, cell: tile(downs) } };
}

// An opening's spot along an edge `len` long, redrawn while the tile just
// inside it, in a (first) or b (second), would be that room's stairs up or
// the wall above them
function door(r, len, a, b, inner) {
  const near = (t, up) => up && t.x === up.x && (t.y === up.y || t.y === up.y - 1);
  let n;
  do n = int(r, 2, len - 3);
  while (near(inner(n)[0], a.up) || near(inner(n)[1], b.up));
  return n;
}

function join(a, b, out, back, at) {
  a.doors.push({ dir: out, at }); a.sides[out] = b.id;
  b.doors.push({ dir: back, at }); b.sides[back] = a.id;
}

// A tile 2 in from the room's edges, redrawn while `bad` holds
function spot(r, bad) {
  let t;
  do t = { x: int(r, 2, COLS - 3), y: int(r, 2, ROWS - 3) };
  while (bad(t));
  return t;
}

const tile = ({ x, y }) => ({ x, y });
const same = (a, b) => a.x === b.x && a.y === b.y;
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// The cell of a generated place in its depth's grid, or null
export function cellOf(seed, id, depth) {
  return layoutAt(seed, depth)?.cells.find((c) => c.id === id) || null;
}

// The id of the room with the stairs down at a generated depth
export const downPlaceIn = (seed, depth) => layoutAt(seed, depth).cells.find((c) => c.down).id;
