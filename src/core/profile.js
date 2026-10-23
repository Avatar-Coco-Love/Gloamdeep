// § profile: who plays on this device (D-268). Three slots, each empty or one
// person's profile: a name, a look and Records. Each profile's journey is saved
// apart, in its own place (save.js), so a turn rewrites only the one in play.
// Until the slot screen comes, the first slot is the one in use. Plain data, no drawing.

export const SLOTS = 3;
// A new profile: no name or look chosen yet, no Records
export const newProfile = (deepest = 0) => ({ name: '', look: {}, records: { deepest } });
// The profiles at the start: the first slot in use, the others empty
export const newProfiles = (deepest = 0) => ({ current: 0, slots: [newProfile(deepest), ...Array(SLOTS - 1).fill(null)] });

// § upgrades: as the journey save's (D-266). When the profiles' shape changes,
// raise FORMAT and add the step from the old number to the new; never edit a merged step.
export const FORMAT = 1;
export const UPGRADES = {};

// § reading: a kept profile list, checked and upgraded, or null when it can't be read
const isProfile = (p) => typeof p?.name === 'string' && typeof p.look === 'object' && p.look !== null
  && Number.isInteger(p.records?.deepest) && p.records.deepest >= 0;
export function unpackProfiles(kept) {
  if (!Number.isInteger(kept?.format) || kept.format < 1 || kept.format > FORMAT) return null;
  let ps = kept.profiles;
  for (let f = kept.format; f < FORMAT; f++) ps = UPGRADES[f](ps);
  const { current, slots } = ps ?? {};
  if (!Array.isArray(slots) || slots.length !== SLOTS || !slots.every((p) => p === null || isProfile(p))) return null;
  return Number.isInteger(current) && slots[current] ? ps : null;
}
export const packProfiles = (profiles) => ({ format: FORMAT, profiles });

// The profile in play, and the profiles with it changed
export const playing = (ps) => ps.slots[ps.current];
export const withPlaying = (ps, p) => ({ ...ps, slots: ps.slots.map((q, i) => (i === ps.current ? p : q)) });
// The profiles after a new deepest depth (the rule is record.js's deeper)
export const withDeepest = (ps, deepest) => withPlaying(ps, { ...playing(ps), records: { ...playing(ps).records, deepest } });

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
