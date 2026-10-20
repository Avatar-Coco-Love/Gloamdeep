// § region: a generated depth laid out as a grid of rooms (D-169, D-201).
// Plain data, no drawing. Depth 3 is a 2 × 2 grid with one cell left empty
// by the seed, so its three rooms make an L, each joined to the corner room
// by a one-tile opening at a spot along their shared edge the seed picks.
// The seed also picks which room holds the stairs up and down; that room
// keeps the depth's own id (depth3), the others are depth3:x,y.
import { rng, int, pick, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';

// The depths laid out as grids; the rest are one room each, for now (D-201)
const GRIDS = [3];
const SIZE = 2;

// (seed, depth) → { cells: [{ id, x, y, seed, stairs, doors, sides }] }, or
// null when the depth is one room. `doors` are the room's openings, as
// { dir, at } (the column or row along that edge); `sides` the room beyond
// each, by direction, as openings.js reads them.
export function layoutAt(seed, depth) {
  if (!GRIDS.includes(depth)) return null;
  const base = seedFor(seed, depth), r = rng(base ^ 0x2c1b3c6d);
  const empty = int(r, 0, SIZE * SIZE - 1);
  const cells = [];
  for (let i = 0; i < SIZE * SIZE; i++) if (i !== empty) cells.push({ x: i % SIZE, y: Math.floor(i / SIZE), doors: [], sides: {} });
  const stairs = pick(r, cells);
  cells.forEach((c, i) => {
    c.stairs = c === stairs;
    c.id = c.stairs ? `depth${depth}` : `depth${depth}:${c.x},${c.y}`;
    c.seed = c.stairs ? base : (base + 1 + i) >>> 0;
  });
  // § joins: each pair of cells side by side, the opening's spot kept 2 tiles from the corners
  for (const a of cells) for (const b of cells) {
    if (b.x === a.x + 1 && b.y === a.y) join(a, b, 'right', 'left', int(r, 2, ROWS - 3));
    if (b.y === a.y + 1 && b.x === a.x) join(a, b, 'down', 'up', int(r, 2, COLS - 3));
  }
  return { cells };
}

function join(a, b, out, back, at) {
  a.doors.push({ dir: out, at }); a.sides[out] = b.id;
  b.doors.push({ dir: back, at }); b.sides[back] = a.id;
}

// The cell of a generated place in its depth's grid, or null
export function cellOf(seed, id, depth) {
  return layoutAt(seed, depth)?.cells.find((c) => c.id === id) || null;
}
