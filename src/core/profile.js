// § profile: who plays on this device (D-268). Three slots, each empty or one
// person's profile: a name, a look and Records. Each profile's journey is saved
// apart, in its own place (save.js), so a turn rewrites only the one in play.
// The slot screen picks the one in use (D-271); with every slot empty, none is. Plain data, no drawing.

export const SLOTS = 3;
// A new profile: no name or look chosen yet, no Records. Records: the deepest depth,
// creatures beaten, falls and rooms found, on all its journeys (D-262, D-270)
export const COUNTS = ['beaten', 'falls', 'found'];
export const newProfile = (deepest = 0) => ({ name: '', look: {}, records: { deepest, beaten: 0, falls: 0, found: 0 } });
// The profiles at the start: the first slot in use, the others empty
export const newProfiles = (deepest = 0) => ({ current: 0, slots: [newProfile(deepest), ...Array(SLOTS - 1).fill(null)] });

// § upgrades: as the journey save's (D-266). When the profiles' shape changes,
// raise FORMAT and add the step from the old number to the new; never edit a merged step.
export const FORMAT = 2;
export const UPGRADES = {
  // 1 → 2: the Records' counts, none yet (D-270)
  1: (ps) => ({ ...ps, slots: ps.slots.map((p) => p && { ...p, records: { beaten: 0, falls: 0, found: 0, ...p.records } }) }),
};

// § reading: a kept profile list, checked and upgraded, or null when it can't be read
const isCount = (n) => Number.isInteger(n) && n >= 0;
const isProfile = (p) => typeof p?.name === 'string' && typeof p.look === 'object' && p.look !== null
  && ['deepest', ...COUNTS].every((k) => isCount(p.records?.[k]));
export function unpackProfiles(kept) {
  if (!Number.isInteger(kept?.format) || kept.format < 1 || kept.format > FORMAT) return null;
  let ps = kept.profiles;
  for (let f = kept.format; f < FORMAT; f++) ps = UPGRADES[f](ps);
  const { current, slots } = ps ?? {};
  if (!Array.isArray(slots) || slots.length !== SLOTS || !slots.every((p) => p === null || isProfile(p))) return null;
  return (Number.isInteger(current) && slots[current]) || (current === null && slots.every((p) => p === null)) ? ps : null;
}
export const packProfiles = (profiles) => ({ format: FORMAT, profiles });

// The profile in play, and the profiles with it changed
export const playing = (ps) => ps.slots[ps.current];
export const withPlaying = (ps, p) => ({ ...ps, slots: ps.slots.map((q, i) => (i === ps.current ? p : q)) });
// The profiles after a new deepest depth (the rule is record.js's deeper)
export const withDeepest = (ps, deepest) => withRecords(ps, { ...playing(ps).records, deepest });
// The profiles with the Records of the profile in play replaced
export const withRecords = (ps, records) => withPlaying(ps, { ...playing(ps), records });

// § slots: the slot screen's rules (D-271). An unnamed profile shows as Profile and its slot's number.
export const slotName = (p, i) => p.name || `Profile ${i + 1}`;
// The profiles with slot i in use; an empty slot gets a new profile, named as typed (D-272) or unnamed
export const usingSlot = (ps, i, name = '') => ({ current: i, slots: ps.slots.map((p, j) => (j === i ? p ?? { ...newProfile(), name } : p)) });
// The profiles with slot i emptied; if it was in use, the first slot still in use takes over, or none
export function withoutSlot(ps, i) {
  const slots = ps.slots.map((p, j) => (j === i ? null : p));
  const first = slots.findIndex((p) => p), current = ps.current !== i ? ps.current : first >= 0 ? first : null;
  return { current, slots };
}

// § storage: localStorage, wrapped (TECH.md); with storage blocked it lasts until the page closes.
// The first time, the record kept before profiles (record.js, D-232) moves into the first slot.
const KEY = 'gloamdeep-profiles', OLD_DEEPEST = 'gloamdeep-deepest';
function oldDeepest() {
  let n = 0;
  try { n = JSON.parse(localStorage.getItem(OLD_DEEPEST)); } catch { /* not kept */ }
  return Number.isInteger(n) && n > 0 ? n : 0;
}
export function loadProfiles() {
  let ps = null;
  try { ps = unpackProfiles(JSON.parse(localStorage.getItem(KEY))); } catch { /* not kept */ }
  return ps ?? newProfiles(oldDeepest());
}
export function saveProfiles(ps) {
  try { localStorage.setItem(KEY, JSON.stringify(packProfiles(ps))); } catch { /* not kept */ }
}
