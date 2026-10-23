// § save: the journey kept on this device, one at a time (D-238). The whole
// state is plain data, written after every turn and read back as it was; only
// the tile memories (Uint8Array, fog.js) need turning into lists and back.
// Plain data, no drawing.
import { withXp } from './xp.js';
import { withBag } from './bag.js';

// § upgrades: an older save is brought up to today's shape, one numbered step at a
// time (D-266), instead of dropped. When the state's shape changes, raise FORMAT and
// add the step from the old number to the new one; never edit a step once merged.
export const FORMAT = 2;
export const UPGRADES = {
  1: (s) => withBag(withXp(s)), // 1 → 2: experience (D-245), the bag and the held item (D-247, D-252)
};
// A save's state at today's shape, or null when no steps lead there (broken, or newer than this game)
export function upgradeState(format, state) {
  if (!Number.isInteger(format) || format < 1 || format > FORMAT) return null;
  let s = state;
  for (let f = format; f < FORMAT; f++) s = UPGRADES[f](s);
  return s;
}

// What is kept: the state, and whether a dev jump stopped the record counting (D-232)
export const packJourney = (state, jumped) => ({ format: FORMAT, jumped: !!jumped, state });
// A kept journey back, upgraded, or null when there is none or it can't be read (dropped quietly, D-266)
export function unpackJourney(kept) {
  const s0 = kept?.state;
  if (!s0?.hero || !s0.room || !s0.place || !s0.home) return null;
  const s = upgradeState(kept.format, s0);
  return s ? { state: s, jumped: !!kept.jumped } : null;
}

// A tile memory as { u8: [...] } in the text, and back
const toText = (k, v) => (v instanceof Uint8Array ? { u8: Array.from(v) } : v);
const fromText = (k, v) => (Array.isArray(v?.u8) && Object.keys(v).length === 1 ? Uint8Array.from(v.u8) : v);
export const journeyText = (state, jumped) => JSON.stringify(packJourney(state, jumped), toText);
export const readJourney = (text) => unpackJourney(JSON.parse(text, fromText));

// § storage: localStorage, wrapped (TECH.md); with storage blocked it lasts until the page closes
const KEY = 'gloamdeep-journey';
export function loadJourney() {
  let kept = null;
  try { kept = readJourney(localStorage.getItem(KEY)); } catch { /* not kept */ }
  return kept;
}
export function saveJourney(state, jumped) {
  try { localStorage.setItem(KEY, journeyText(state, jumped)); } catch { /* not kept */ }
}
