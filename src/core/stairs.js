// § stairs: going from room to room (D-130 to D-132). Plain data, no drawing.
// The room the hero is in lives at the top of the state as before; every
// other room waits in `state.elsewhere`, by place id, just as it was left
// (D-019): its tiles, lights, enemies, items and memory. A depth never
// visited begins fresh as its plan says (D-144).
import { placeBeside, beginPlace, tileAt, isWall } from './room.js';
import { blankMemory } from './fog.js';
import { say } from './lines.js';

// § take: (state) → the state in the room the stairs under the hero lead to,
// standing on its matching stair, with the stairs' line said. Null when the
// hero isn't on stairs, or they lead nowhere (stairs up placed by the dev
// spawn tool in the first room, or stairs with no match where they lead).
export function takeStairs(state) {
  const { hero } = state, entry = tileAt(state.room, hero.x, hero.y);
  const to = entry.leads && placeBeside(state.place, entry.leads);
  const there = to && (state.elsewhere[to] || fresh(to));
  const spot = there && find(there.room, entry.arrive);
  if (!spot) return null;
  const here = { room: state.room, lights: state.lights, enemies: state.enemies, items: state.items, seen: state.seen };
  const elsewhere = { ...state.elsewhere, [state.place]: here };
  delete elsewhere[to];
  return say({ ...state, ...there, place: to, elsewhere, hero: spot }, entry.line);
}

// A place never visited, as it begins, with nothing remembered
function fresh(id) {
  const { room, lights, enemies, items } = beginPlace(id);
  return { room, lights, enemies, items, seen: blankMemory(room) };
}

// The first tile of kind `id` in the room, row by row, or null
function find(room, id) {
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    if (tileAt(room, x, y).id === id) return { x, y };
  }
  return null;
}

// § facing: which way the steps sink, toward a wall beside the stairs, so the
// top step starts at the floor (D-143): the wall above first, then left,
// then right, else down.
export function stairsFacing(room, x, y) {
  if (isWall(room, x, y - 1)) return 'up';
  if (isWall(room, x - 1, y)) return 'left';
  if (isWall(room, x + 1, y)) return 'right';
  return 'down';
}

// § glows: every glowing tile in a room as a light, { x, y, r, cr, cg, cb }
// in pixels from the tile's centre (D-134). Worked out once per room.
const TILE_SIZE = 16;
const glowCache = new WeakMap();
export function glowsIn(room) {
  let out = glowCache.get(room);
  if (out) return out;
  out = [];
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    const g = tileAt(room, x, y).glow;
    if (g) out.push({ x: x * TILE_SIZE + TILE_SIZE / 2, y: y * TILE_SIZE + TILE_SIZE / 2, r: g.reach * TILE_SIZE, cr: g.cr, cg: g.cg, cb: g.cb });
  }
  glowCache.set(room, out);
  return out;
}
