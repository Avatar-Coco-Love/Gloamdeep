// § bag: what the hero carries (D-247). Six slots in a row; each holds one
// kind of item, as a stack with its count: [{ id, n }]. Items with `bag` in
// the registry go into it when walked onto. Plain data, no drawing.
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

// The bag with one taken from slot i; an emptied slot is gone, and the ones
// after it move up
export function bagTake(bag, i) {
  const s = bag[i];
  if (!s) return bag;
  return s.n > 1 ? bag.map((o, j) => (j === i ? { ...o, n: o.n - 1 } : o)) : bag.filter((o, j) => j !== i);
}

// A state from a save older than the bag gets an empty one
export const withBag = (state) => (Array.isArray(state.bag) ? state : { ...state, bag: [] });
