// § record: the profile's Records, kept for good (D-021, D-232, D-268, D-270): the
// deepest depth the hero has walked to, and counts read from each action's events
// (events.js). Dev jumps don't count: once Go to depth is used, the journey stops
// counting until a New journey. Plain data, no drawing.

// The record after a turn: the depth now, if it is deeper and was walked to
export const deeper = (record, depth, jumped = false) => (!jumped && depth > record ? depth : record);
// The record's line, or null while the hero has not gone below the surface; off the title
// screen since D-260, kept for a stats page later
export const recordText = (record) => (record > 0 ? `Deepest: depth ${record}` : null);

// § counts: the Records after an action's events: a creature beaten, a fall, a room found, a step (D-283),
// a flask poured, by hand or by itself (D-285)
const COUNTED = { beat: 'beaten', fall: 'falls', found: 'found', step: 'steps', pour: 'poured' };
export function counted(records, events, jumped = false) {
  if (jumped || !events.some((e) => COUNTED[e.type])) return records;
  const next = { ...records };
  for (const e of events) if (COUNTED[e.type]) next[COUNTED[e.type]]++;
  return next;
}
