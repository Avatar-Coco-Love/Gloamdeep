// § spawn: dev mode's spawn tool as plain rules (DEV-TOOLS.md, D-049).
// (state, id, x, y) → new state. Spawning never passes a turn. When nothing
// can change, the same state comes back.
import { get } from './registry.js';
import { tileAt, withTile } from './room.js';
import { blankMemory } from './fog.js';
import { itemAt } from './turn.js';
import { lightAt } from './lights.js';
import { mountAt } from './mount.js';
import { enemyAt } from './enemies.js';

export function spawn(state, id, x, y) {
  const entry = get(id), room = state.room;
  if (!entry || x < 0 || y < 0 || x >= room.cols || y >= room.rows) return state;
  if (entry.kind === 'tile') {
    if (tileAt(room, x, y) === entry) return state;
    const onHero = state.hero.x === x && state.hero.y === y;
    if (onHero && entry.solid) return state; // a wall can't go on the hero (D-049)
    if (entry.solid && (itemAt(state, x, y) || enemyAt(state, x, y))) return state; // nor on an item or enemy (D-079, D-108)
    const next = withTile(room, x, y, entry);
    // every light must still have somewhere to sit; it turns to fit if it can (D-099, D-102)
    if (state.lights.some((l) => !mountAt(next, l.x, l.y))) return state;
    return { ...state, room: next };
  }
  if (entry.kind === 'item' || entry.kind === 'enemy') { // on floor, off the hero, one thing per tile (D-079, D-108)
    const onHero = state.hero.x === x && state.hero.y === y;
    if (onHero || tileAt(room, x, y).solid || itemAt(state, x, y) || enemyAt(state, x, y)) return state;
    const list = entry.kind === 'item' ? 'items' : 'enemies';
    return { ...state, [list]: [...state[list], { id, x, y }] };
  }
  if (entry.kind === 'light') { // where it can sit, one per tile (D-100)
    if (!mountAt(room, x, y) || lightAt(state, x, y)) return state;
    return { ...state, lights: [...state.lights, { id, x, y }] };
  }
  return state; // other kinds arrive with their own steps
}

// § reset: the starting room comes back (D-050). If the hero now stands in a
// wall, they go back to their starting tile. The memory is forgotten too (D-062),
// spawned items are gone (D-079), and the starting lights and enemies come
// back (D-102, D-108).
export function resetRoom(state, room, start, lights = [], enemies = []) {
  const hero = tileAt(room, state.hero.x, state.hero.y).solid ? { x: start.x, y: start.y } : state.hero;
  return { ...state, room, hero, seen: blankMemory(room), items: [], lights, enemies };
}
