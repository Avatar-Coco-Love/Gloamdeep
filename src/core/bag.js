// § bag: what the hero carries (D-247). Six slots in a row; each holds one
// kind of item, as a stack with its count: [{ id, n }]. Items with `bag` in
// the registry go into it when walked onto. The weapon in hand is apart from
// it, in `state.held`: an item id, or null (D-252). Plain data, no drawing.
export const BAG_SLOTS = 6;
export const STACK_MAX = 3; // a stack holds at most 3; one more stays on the floor (D-250)

// The bag with one more of item `id`: on its stack, else in a new slot; null
// when it has no room, or its stack is full (it never spills to a new slot)
export function bagAdd(bag, id) {
  const i = bag.findIndex((s) => s.id === id);
  if (i >= 0) return bag[i].n < STACK_MAX ? bag.map((s, j) => (j === i ? { ...s, n: s.n + 1 } : s)) : null;
  return bag.length < BAG_SLOTS ? [...bag, { id, n: 1 }] : null;
}

// Whether item `id`'s stack is at the limit
export const stackFull = (bag, id) => bag.some((s) => s.id === id && s.n >= STACK_MAX);

// The bag with n (one unless said) taken from slot i; an emptied slot is
// gone, and the ones after it move up
export function bagTake(bag, i, n = 1) {
  const s = bag[i];
  if (!s) return bag;
  return s.n > n ? bag.map((o, j) => (j === i ? { ...o, n: o.n - n } : o)) : bag.filter((o, j) => j !== i);
}

// A state from a save older than the bag gets an empty one, and one older
// than the held slot an empty hand (D-252)
export const withBag = (state) => {
  const s = Array.isArray(state.bag) ? state : { ...state, bag: [] };
  return s.held === undefined ? { ...s, held: null } : s;
};
