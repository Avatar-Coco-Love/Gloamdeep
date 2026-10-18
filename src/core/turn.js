// § turn: the game state and the turn rules, as plain data (TECH.md,
// "Turn rules are pure functions"). Nothing moves until the player acts (D-016).
import { tileAt } from './room.js';
import { blankMemory } from './fog.js';
import { OIL, burnOil } from './oil.js';
import { get } from './registry.js';

// § directions: four only, no diagonals (D-042)
export const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// The hero starts where style study 1 put them (study line 277).
export const FIRST_START = { x: 5, y: 11 };

export function makeState(room, start = FIRST_START) {
  return { room, hero: { x: start.x, y: start.y }, turn: 0, seen: blankMemory(room), oil: OIL.start, lit: true, items: [] };
}

// § step: (state, direction) → new state. Walking into something solid
// changes nothing and passes no turn, so the same state comes back (D-043).
// A passed turn burns oil while the lantern is lit (D-037, D-026). A flask on the new tile is then poured in,
// never above full, and is gone (D-078).
export function step(state, dir) {
  const [dx, dy] = DIRS[dir];
  const x = state.hero.x + dx, y = state.hero.y + dy;
  if (tileAt(state.room, x, y).solid) return state;
  const next = { ...state, hero: { x, y }, turn: state.turn + 1, oil: state.lit ? burnOil(state.oil) : state.oil };
  const found = itemAt(state, x, y);
  if (!found) return next;
  const items = state.items.filter((it) => it !== found);
  return { ...next, items, oil: Math.min(1, next.oil + get(found.id).oil) };
}

// § switch: the lantern on or off, whenever the player likes. It is free:
// no turn passes and no oil burns (D-015, D-080, D-081).
export const switchLantern = (state) => ({ ...state, lit: !state.lit });

// § items: the item lying on tile x, y, or undefined
export const itemAt = (state, x, y) => state.items.find((it) => it.x === x && it.y === y);

// § toward: the direction from one point to another, along whichever side is
// farther (a tap steps toward where it lands, D-042). Null when they match.
export function toward(fromX, fromY, toX, toY) {
  const dx = toX - fromX, dy = toY - fromY;
  if (dx === 0 && dy === 0) return null;
  if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? 'right' : 'left';
  return dy > 0 ? 'down' : 'up';
}
