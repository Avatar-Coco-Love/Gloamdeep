// § mouth: the first cave's mouth, on an edge of the woods (step 49, D-211).
// Plain data, no drawing. The seed picks the edge (D-184) and a spot along
// it, kept from the corners, so the rock beside it stays off them. Walking
// through it arrives on the crypt's facing side, at a gap in its wall: going
// up, the south room's bottom, then on up into the first room; going down,
// left or right, the first room. And back out onto the mouth.
import { rng, int, pick, seedFor } from './rng.js';
import { COLS, ROWS } from './cave.js';

// The crypt room and its gap, by the way the hero walks into the mouth
const INTO = {
  up: { room: 'south', gap: { x: 5, y: 12 } },
  down: { room: 'first', gap: { x: 5, y: 0 } },
  left: { room: 'first', gap: { x: 10, y: 3 } },
  right: { room: 'first', gap: { x: 0, y: 3 } },
};
const BACK = { up: 'down', down: 'up', left: 'right', right: 'left' };

// (seed) → { dir, tile, room, gap }: the way in, the mouth's tile in the
// woods, and the crypt room and gap it leads to. Worked out once per seed.
const made = new Map();
export function mouthOf(seed = 1) {
  if (!made.has(seed)) {
    const r = rng(seedFor(seed, 0) ^ 0x6d0c7e11), dir = pick(r, Object.keys(INTO));
    const n = int(r, 2, (dir === 'up' || dir === 'down' ? COLS : ROWS) - 3);
    const tile = { up: { x: n, y: 0 }, down: { x: n, y: ROWS - 1 }, left: { x: 0, y: n }, right: { x: COLS - 1, y: n } }[dir];
    made.set(seed, { dir, tile, ...INTO[dir] });
  }
  return made.get(seed);
}

// The way through the mouth from place `id`, as { direction: place }, or {}
export function mouthSides(id, seed = 1) {
  const m = mouthOf(seed);
  if (id === 'woods') return { [m.dir]: m.room };
  if (id === m.room) return { [BACK[m.dir]]: 'woods' };
  return {};
}

// The tile the hero arrives on, walking from place `from` into `to` through
// the mouth, or null when that way isn't the mouth
export function mouthSpot(seed, from, to) {
  const m = mouthOf(seed);
  if (from === 'woods' && to === m.room) return m.gap;
  if (from === m.room && to === 'woods') return m.tile;
  return null;
}

// A crypt room's map with its gap cut, when the mouth leads to it
export function withGap(id, map, seed) {
  const { room, gap } = mouthOf(seed);
  if (id !== room) return map;
  return map.map((line, y) => (y === gap.y ? line.slice(0, gap.x) + '.' + line.slice(gap.x + 1) : line));
}
