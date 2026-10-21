// § region: a generated depth laid out as a grid of rooms (D-169, D-201).
// Plain data, no drawing. Depths 2 to 4 are each a 2 × 2 grid with one cell
// left empty by the seed, so their three rooms make an L, each joined to the
// corner room by a one-tile opening at a spot along their shared edge the
// seed picks. From depth 5 each depth is a warren: five rooms in a 3 × 3
// grid, grown as a winding chain (D-227).
// § lining up (D-202, D-203): every floor sits on the same grid. The stairs
// up are in the same cell, at the same tile, as the stairs down one floor
// above; the stairs down in another room than them, at a tile the seed
// picks, which the floor below then fits. Under the crypt the seed picks the
// cell. The room with the stairs up keeps the depth's own id (depth2), the
// others are depth2:x,y.
// § seeds: the depths moved up one (D-212), but every place below the
// surface keeps the numbers of its old depth, so a seed keeps its rooms (D-213).
import { rng, int, pick, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';

// Depths 2 to 4 are L-shaped 2 × 2 grids (D-203); from depth 5, where the
// earth burrows start (room.js, D-165), every depth is a warren (D-227).
const SIZE = 2;
const WARRENS = 5, WARREN = { size: 3, rooms: 5 };
// The first generated depth, and the crypt's stairs down above it (SECOND_ROOM in room.js)
const FIRST = 2;
const CRYPT_DOWN = { x: 1, y: 11 };

// (seed, depth) → { cells: [{ id, x, y, seed, up, down, doors, sides }], up,
// down }, or null above the generated depths. `up` and `down` are the stairs
// tiles, in a cell's own `up` or `down` (null when it has none) and for the
// whole floor as { x, y, cell }. `doors` are a room's openings, as { dir, at }
// (the column or row along that edge); `sides` the room beyond each, by
// direction, as openings.js reads them. Worked out once per seed and depth.
const laid = new Map();
export const seedAt = (seed, depth) => seedFor(seed, depth + 1);
export function layoutAt(seed, depth) {
  if (depth < FIRST) return null;
  const k = `${seed}:${depth}`;
  if (!laid.has(k)) laid.set(k, lay(seed, depth));
  return laid.get(k);
}

function lay(seed, depth) {
  const base = seedAt(seed, depth), r = rng(base ^ 0x2c1b3c6d), above = layoutAt(seed, depth - 1);
  const upAt = above ? above.down : CRYPT_DOWN, under = above?.down.cell;
  const warren = depth >= WARRENS;
  const { cells, ups, joins } = warren ? warrenCells(r, under) : ellCells(r, under);
  ups.up = tile(upAt);
  cells.forEach((c, i) => {
    c.id = c === ups ? `depth${depth}` : `depth${depth}:${c.x},${c.y}`;
    c.seed = c === ups ? base : (base + 1 + i) >>> 0;
  });
  // § joins: the opening's spot kept 2 tiles from the corners, and clear of the stairs up
  for (const [a, b] of joins) {
    if (b.x === a.x + 1) join(a, b, 'right', 'left', door(r, ROWS, a, b, (n) => [{ x: COLS - 2, y: n }, { x: 1, y: n }]));
    else join(a, b, 'down', 'up', door(r, COLS, a, b, (n) => [{ x: n, y: ROWS - 2 }, { x: n, y: 1 }]));
  }
  // § stairs down: in another room than the stairs up, anywhere 2 tiles in from
  // its edges; in a warren, the room farthest from the stairs up (D-227)
  const downs = pick(r, warren ? farthest(cells, joins, ups) : cells.filter((c) => c !== ups));
  downs.down = spot(r, () => false);
  return { cells, up: { ...tile(upAt), cell: tile(ups) }, down: { ...downs.down, cell: tile(downs) } };
}

const cellAt = (x, y) => ({ x, y, up: null, down: null, doors: [], sides: {} });

// § the L (D-201, D-203): a 2 × 2 grid, one cell left empty, never the one
// under the stairs down above; every pair of cells side by side is joined
function ellCells(r, under) {
  const at = (i) => cellAt(i % SIZE, Math.floor(i / SIZE));
  const empty = pick(r, [...Array(SIZE * SIZE).keys()].filter((i) => !under || i !== under.y * SIZE + under.x));
  const cells = [];
  for (let i = 0; i < SIZE * SIZE; i++) if (i !== empty) cells.push(at(i));
  const ups = under ? cells.find((c) => c.x === under.x && c.y === under.y) : pick(r, cells);
  const joins = [];
  for (const a of cells) for (const b of cells) if ((b.x === a.x + 1 && b.y === a.y) || (b.y === a.y + 1 && b.x === a.x)) joins.push([a, b]);
  return { cells, ups, joins };
}

// § the warren (D-227): a 3 × 3 grid, 5 rooms grown one at a time from the
// cell under the stairs down above, each joined only to the room it grew
// from, so there are dead ends and one way through
function warrenCells(r, under) {
  const ups = cellAt(under.x, under.y), cells = [ups], joins = [];
  const has = (x, y) => cells.some((c) => c.x === x && c.y === y);
  while (cells.length < WARREN.rooms) {
    const ways = [];
    for (const c of cells) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = c.x + dx, y = c.y + dy;
      if (x >= 0 && y >= 0 && x < WARREN.size && y < WARREN.size && !has(x, y)) ways.push([c, x, y]);
    }
    const [from, x, y] = pick(r, ways), to = cellAt(x, y);
    cells.push(to);
    joins.push(to.x > from.x || to.y > from.y ? [from, to] : [to, from]);
  }
  return { cells, ups, joins };
}

// The rooms the most joins away from `start`
function farthest(cells, joins, start) {
  const away = new Map([[start, 0]]), todo = [start];
  while (todo.length) {
    const c = todo.shift();
    for (const [a, b] of joins) for (const [u, v] of [[a, b], [b, a]]) if (u === c && !away.has(v)) { away.set(v, away.get(c) + 1); todo.push(v); }
  }
  const most = Math.max(...away.values());
  return cells.filter((c) => away.get(c) === most);
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

// The cell of a generated place in its depth's grid, or null
export function cellOf(seed, id, depth) {
  return layoutAt(seed, depth)?.cells.find((c) => c.id === id) || null;
}

// The id of the room with the stairs down at a generated depth
export const downPlaceIn = (seed, depth) => layoutAt(seed, depth).cells.find((c) => c.down).id;
