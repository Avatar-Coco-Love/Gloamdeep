// § map: the floor the hero is on, as the map screen shows it (D-176, D-205).
// Plain data, no drawing. Every room of the floor sits on its grid, found by
// walking the side openings from the hero's room; each is shown from the
// tiles the hero remembers, or in full with the dev Reveal map switch, which
// keeps the memory as it is.
import { sidesOf, depthOf, tileAt } from './room.js';
import { fresh } from './stairs.js';

const STEP = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// (state, reveal) → { depth, cols, rows, rooms: [{ id, x, y, room, seen }], hero }.
// A room's x, y is its top-left tile on the whole floor; cols, rows the floor's
// size in tiles. `seen` is null when everything shows (reveal). `hero` is the
// hero's tile on the floor.
export function floorPlan(state, reveal = false) {
  const cells = new Map([[state.place, { x: 0, y: 0 }]]), todo = [state.place];
  while (todo.length) {
    const id = todo.shift(), at = cells.get(id);
    for (const [dir, to] of Object.entries(sidesOf(id, state.seed))) {
      if (!cells.has(to)) { cells.set(to, { x: at.x + STEP[dir][0], y: at.y + STEP[dir][1] }); todo.push(to); }
    }
  }
  const known = (id) => (id === state.place ? state : state.elsewhere[id]) || (reveal && fresh(id, state.seed));
  const all = [...cells].map(([id, at]) => ({ id, at, p: known(id) }));
  // The grid's cell is as big as the floor's biggest room; rooms line up, so they match
  const w = Math.max(...all.filter((r) => r.p).map((r) => r.p.room.cols)), h = Math.max(...all.filter((r) => r.p).map((r) => r.p.room.rows));
  const x0 = Math.min(...all.map((r) => r.at.x)), y0 = Math.min(...all.map((r) => r.at.y));
  const x1 = Math.max(...all.map((r) => r.at.x)), y1 = Math.max(...all.map((r) => r.at.y));
  const rooms = all.filter((r) => r.p).map(({ id, at, p }) => ({ id, x: (at.x - x0) * w, y: (at.y - y0) * h, room: p.room, seen: reveal ? null : p.seen }));
  const here = rooms.find((r) => r.id === state.place);
  return { depth: depthOf(state.place), cols: (x1 - x0 + 1) * w, rows: (y1 - y0 + 1) * h, rooms, hero: { x: here.x + state.hero.x, y: here.y + state.hero.y } };
}

// § marks: (room, seen, x, y) → what the map shows at that tile: 'stairs' for a
// glowing tile, 'floor', 'wall' for a wall beside a floor (the rock behind it
// stays dark, so rooms show as outlines), or null. Only remembered tiles show,
// unless seen is null.
export function markAt(room, seen, x, y) {
  if (seen && !seen[y * room.cols + x]) return null;
  const t = tileAt(room, x, y);
  if (t.glow) return 'stairs';
  if (!t.solid) return 'floor';
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < room.cols && ny < room.rows && !tileAt(room, nx, ny).solid) return 'wall';
  }
  return null;
}

// How many rooms of the plan show at least one tile, for the screen reader's words
export const roomsFound = (plan) => plan.rooms.filter((r) => !r.seen || r.seen.some(Boolean)).length;
