// § woods: a generated woods room on the surface (step 48, D-209), from one
// seed. Plain data, no drawing. Same seed, same room. Trees stand thick at
// the edges and thinner inside; every open tile is joined to the start.
import { rng } from './rng.js';
import { COLS, ROWS } from './cave.js';

// § trees: the chance a tile holds a tree, by how many tiles in from the edge
// it is: the edge itself is always trees; deeper in than the list, the last one
const TREES = [1, 0.6, 0.35, 0.15];
// At least this many open tiles, as in a cave of this size (cave.js)
const MIN_OPEN = 107;
const TRIES = 200;

// (seed) → { map, start, lights, enemies, items }. Nothing lives in the woods
// yet (starting-region.md, "Creatures and finds"). The hero starts in the middle.
export function generateWoods(seed) {
  const r = rng(seed), start = { x: COLS >> 1, y: ROWS >> 1 };
  let g = null;
  for (let i = 0; i < TRIES && !g; i++) g = grow(r, start);
  g = g || Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) => (depthIn(x, y) === 0 ? 'T' : '.')));
  return { map: g.map((row) => row.join('')), start, lights: [], enemies: [], items: [] };
}

// How many tiles in from the room's edge tile x, y is: 0 on it
const depthIn = (x, y) => Math.min(x, y, COLS - 1 - x, ROWS - 1 - y);

// One try: trees by chance, the start kept open, then any open tile cut off
// from the start becomes a tree. Null when too little is left open.
function grow(r, start) {
  const g = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) =>
    (r() < TREES[Math.min(depthIn(x, y), TREES.length - 1)] ? 'T' : '.')));
  g[start.y][start.x] = '.';
  const joined = new Set([start.y * COLS + start.x]), queue = [start];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = t.x + dx, y = t.y + dy;
      if (g[y]?.[x] !== '.' || joined.has(y * COLS + x)) continue;
      joined.add(y * COLS + x); queue.push({ x, y });
    }
  }
  if (joined.size < MIN_OPEN) return null;
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (!joined.has(y * COLS + x)) g[y][x] = 'T';
  return g;
}
