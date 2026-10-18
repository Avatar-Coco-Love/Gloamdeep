// § spawn: dev mode's spawn tool as plain rules (DEV-TOOLS.md, D-049).
// (state, id, x, y) → new state. Spawning never passes a turn. When nothing
// can change, the same state comes back.
import { get } from './registry.js';
import { tileAt, withTile } from './room.js';

export function spawn(state, id, x, y) {
  const entry = get(id), room = state.room;
  if (!entry || x < 0 || y < 0 || x >= room.cols || y >= room.rows) return state;
  if (entry.kind === 'tile') {
    if (tileAt(room, x, y) === entry) return state;
    const onHero = state.hero.x === x && state.hero.y === y;
    if (onHero && entry.solid) return state; // a wall can't go on the hero (D-049)
    return { ...state, room: withTile(room, x, y, entry) };
  }
  return state; // other kinds arrive with their own steps
}

// § reset: the starting room comes back (D-050). If the hero now stands in a
// wall, they go back to their starting tile.
export function resetRoom(state, room, start) {
  const hero = tileAt(room, state.hero.x, state.hero.y).solid ? { x: start.x, y: start.y } : state.hero;
  return { ...state, room, hero };
}
