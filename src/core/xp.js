// § experience: what the hero earns by fighting and finding (D-038, D-245).
// Plain data, no drawing. `state.xp` is the total; `state.found` lists the
// rooms (place ids) the hero has stood in, so a room pays only once.
import { isGenerated } from './room.js';

export const XP_FOE = 1; // a creature beaten
export const XP_ROOM = 1; // a room never stood in before

export const gain = (state, n) => ({ ...state, xp: state.xp + n });

// § levels: experience adds up to levels, each costing XP_STEP more than the
// one before: level 2 at 10, level 3 at 30, level 4 at 60 (D-246). A level
// gives nothing yet; it only shows.
export const XP_STEP = 10;
export const xpFor = (level) => (XP_STEP * (level - 1) * level) / 2; // the total that reaches it
export function levelOf(xp) {
  let level = 1;
  while (xp >= xpFor(level + 1)) level++;
  return level;
}

// (before, after) → after, with a room's worth added when the turn brought
// the hero into a room not in `found`, and that room added to it
export function discover(before, after) {
  if (after.place === before.place || after.found.includes(after.place)) return after;
  return gain({ ...after, found: [...after.found, after.place] }, XP_ROOM);
}

// After a fall the generated depths are new rooms, as their maps are
// forgotten (D-148); the hand-made rooms stay found (D-021).
export const foundAfterFall = (found) => found.filter((id) => !isGenerated(id));

// For a journey saved before experience: the rooms already remembered on the
// map count as found, and each pays now, as it would have when found; the
// first room, where every journey starts, pays nothing (D-245). Creatures
// beaten then were never recorded, so they can't count.
export function withXp(state) {
  if (Array.isArray(state.found)) return state;
  const found = ['first'];
  if (state.place !== 'first') found.push(state.place);
  for (const [id, p] of Object.entries(state.elsewhere || {})) if (id !== 'first' && p.seen?.some?.((v) => v)) found.push(id);
  return { ...state, xp: (found.length - 1) * XP_ROOM, found };
}
