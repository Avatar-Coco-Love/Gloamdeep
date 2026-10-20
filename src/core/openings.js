// § openings: walking off a room's edge into the room beside it (D-171,
// D-197). Plain data, no drawing. Both sides line up: out of one room's
// bottom edge at column x, in at the next room's top edge at column x, and
// so on for each side. The room left waits, as stairs leave it (stairs.js).
import { PLACES, tileAt } from './room.js';
import { arrive, fresh } from './stairs.js';

// True when x, y lies outside the room
export const offEdge = (room, x, y) => x < 0 || y < 0 || x >= room.cols || y >= room.rows;

// (state, direction) → the state in the room beyond that edge, the hero on
// its matching edge tile. Null when that edge has no opening there: no room
// beyond, or the matching tile is solid.
export function walkOff(state, dir) {
  const to = PLACES[state.place]?.sides?.[dir];
  if (!to) return null;
  const there = state.elsewhere[to] || fresh(to, state.seed), { cols, rows } = there.room;
  const { x, y } = state.hero;
  const spot = { up: { x, y: rows - 1 }, down: { x, y: 0 }, left: { x: cols - 1, y }, right: { x: 0, y } }[dir];
  if (tileAt(there.room, spot.x, spot.y).solid) return null;
  return arrive(state, to, there, spot);
}
