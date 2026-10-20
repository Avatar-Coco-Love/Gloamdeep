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

// (seed, mouth) → { map, start, lights, enemies, items }. Nothing lives in the
// woods yet (starting-region.md, "Creatures and finds"). The hero starts in
// the middle. `mouth` (mouth.js), when given, opens the cave mouth in its
// edge with a rock either side, the two tiles in front of it open and
// joined to the start (D-211).
export function generateWoods(seed, mouth = null) {
  const r = rng(seed), start = { x: COLS >> 1, y: ROWS >> 1 }, front = mouth ? inFront(mouth) : [];
  let g = null;
  for (let i = 0; i < TRIES && !g; i++) g = grow(r, start, front);
  g = g || Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) => (depthIn(x, y) === 0 ? 'T' : '.')));
  if (mouth) {
    const { tile: t, dir } = mouth, [ax, ay] = dir === 'up' || dir === 'down' ? [1, 0] : [0, 1];
    g[t.y][t.x] = 'M'; g[t.y - ay][t.x - ax] = 'R'; g[t.y + ay][t.x + ax] = 'R';
  }
  return { map: g.map((row) => row.join('')), start, lights: [], enemies: [], items: [] };
}

// The two tiles in front of the mouth, nearest first
function inFront({ tile: t, dir }) {
  const [dx, dy] = { up: [0, 1], down: [0, -1], left: [1, 0], right: [-1, 0] }[dir];
  return [1, 2].map((k) => ({ x: t.x + dx * k, y: t.y + dy * k }));
}

// How many tiles in from the room's edge tile x, y is: 0 on it
const depthIn = (x, y) => Math.min(x, y, COLS - 1 - x, ROWS - 1 - y);

// One try: trees by chance, the start and `keep` tiles kept open, then any
// open tile cut off from the start becomes a tree. Null when too little is
// left open, or a `keep` tile is cut off.
function grow(r, start, keep) {
  const g = Array.from({ length: ROWS }, (_, y) => Array.from({ length: COLS }, (_, x) =>
    (r() < TREES[Math.min(depthIn(x, y), TREES.length - 1)] ? 'T' : '.')));
  for (const t of [start, ...keep]) g[t.y][t.x] = '.';
  const joined = new Set([start.y * COLS + start.x]), queue = [start];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const x = t.x + dx, y = t.y + dy;
      if (g[y]?.[x] !== '.' || joined.has(y * COLS + x)) continue;
      joined.add(y * COLS + x); queue.push({ x, y });
    }
  }
  if (joined.size < MIN_OPEN || keep.some((t) => !joined.has(t.y * COLS + t.x))) return null;
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) if (!joined.has(y * COLS + x)) g[y][x] = 'T';
  return g;
}
