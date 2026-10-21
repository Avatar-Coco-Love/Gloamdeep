// § walk: a held finger walks the hero around walls to the tile under it
// (D-219, D-220). Plain data, no drawing. The way goes only over tiles the hero
// remembers, around enemies, and onto stairs only when they are the goal.
import { tileAt } from './room.js';
import { enemyAt } from './enemies.js';
import { litAt } from './sight.js';
import { DIRS } from './turn.js';

// (state, x, y) → the first step's direction on the shortest way to tile x, y,
// or null when no remembered way leads there (or the hero stands on it).
// Ties go up, down, left, right, so the same room always gives the same way.
export function wayStep(state, x, y) {
  const { room, seen, hero } = state, goal = y * room.cols + x;
  const open = (tx, ty) => {
    if (tx < 0 || ty < 0 || tx >= room.cols || ty >= room.rows || !seen[ty * room.cols + tx]) return false;
    const tile = tileAt(room, tx, ty);
    if (tile.solid || enemyAt(state, tx, ty)) return false;
    return !tile.leads || ty * room.cols + tx === goal; // stairs are taken, so only as the goal
  };
  if ((hero.x === x && hero.y === y) || !open(x, y)) return null;
  const first = new Map([[hero.y * room.cols + hero.x, null]]), queue = [[hero.x, hero.y]];
  for (let i = 0; i < queue.length; i++) {
    const [cx, cy] = queue[i], from = first.get(cy * room.cols + cx);
    for (const [dir, [dx, dy]] of Object.entries(DIRS)) {
      const nx = cx + dx, ny = cy + dy, n = ny * room.cols + nx;
      if (first.has(n) || !open(nx, ny)) continue;
      first.set(n, from || dir);
      if (n === goal) return from || dir;
      queue.push([nx, ny]);
    }
  }
  return null;
}

// § in view: the creatures and items on lit tiles now
export const inView = (state) => [...state.enemies, ...state.items].filter((t) => litAt(state, t.x, t.y));

// (before, after) → true when a creature or an item came into view with the
// step, so the walk stops by itself (D-219). An item counts by itself; a
// creature by how many are in view, since a turn makes each one anew.
export function cameIntoView(before, after) {
  const was = inView(before), now = inView(after);
  const foes = (list, s) => list.filter((t) => s.enemies.includes(t)).length;
  return foes(now, after) > foes(was, before) || now.some((t) => after.items.includes(t) && !was.includes(t));
}
