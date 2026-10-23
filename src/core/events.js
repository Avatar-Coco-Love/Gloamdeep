// § events: what happened this turn, as a short list on the state (D-263,
// D-267). The turn rules write it; sounds read it now, and later Records,
// quests and feats. Plain data, no drawing. Each passed turn, and each free
// action (the lantern's switch), starts a new list; what follows in the same
// action (the lantern or a flask by itself) adds to it.
//
// The kinds, each { type, ...details }:
//   step                 the hero walked onto a new tile
//   hit { id, held }     the hero hit creature `id`, with the item held (or null, the lantern)
//   beat { id }          that creature was beaten
//   bite { id, hurt }    creature `id` bit, taking `hurt` hearts
//   fall                 the hero fell (D-119)
//   lantern { lit }      the lantern went on or off
//   enter { place }      the hero came into another room
//   found { place }      a room never stood in before (D-245)
//   level { n }          level n reached (D-246)
//   take { id }          an item went into the bag or the hand
//   eat { id }           a herb was eaten
//   pour { id, by }      a flask was poured, by 'hand' or by 'self' (D-249)
//   torch                a torch was lit (D-121)

// (state, type, details) → the state with that event added to this turn's list
export const note = (state, type, details) => ({ ...state, events: [...state.events, { type, ...details }] });
// A new, empty list, for a turn or a free action starting
export const fresh = (state) => ({ ...state, events: [] });
// The events an action brought, from the state before it to the one after:
// those added to the list it had, or a new list; none when the action changed
// nothing, as a bump into a wall (D-043)
export function eventsSince(before, after) {
  const was = before.events, now = after.events;
  return was.every((e, i) => now[i] === e) ? now.slice(was.length) : now;
}
// Whether a list holds an event of that type
export const has = (events, type) => events.some((e) => e.type === type);
