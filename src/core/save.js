// § save: the journey kept on this device, one for each profile (D-238, D-268). The whole
// state is plain data, written after every turn and read back as it was; only
// the tile memories (Uint8Array, fog.js) need turning into lists and back.
// Plain data, no drawing.
import { withXp } from './xp.js';
import { withBag } from './bag.js';

// § upgrades: an older save is brought up to today's shape, one numbered step at a
// time (D-266), instead of dropped. When the state's shape changes, raise FORMAT and
// add the step from the old number to the new one; never edit a step once merged.
export const FORMAT = 5;
export const UPGRADES = {
  1: (s) => withBag(withXp(s)), // 1 → 2: experience (D-245), the bag and the held item (D-247, D-252)
  2: (s) => ({ ...s, events: [] }), // 2 → 3: the turn's events, none yet (D-267)
  3: (s) => ({ ...s, told: {} }), // 3 → 4: which line each list says next, all from the first (D-297)
  4: withTaken, // 4 → 5: what each room had taken, nothing yet: things taken before stay gone (D-307)
};
// Every room's taken list, empty (regrow.js)
function withTaken(s) {
  const elsewhere = {};
  for (const [id, p] of Object.entries(s.elsewhere || {})) elsewhere[id] = { ...p, taken: [] };
  return { ...s, taken: [], elsewhere };
}
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

// § storage: localStorage, wrapped (TECH.md); with storage blocked it lasts until the page closes.
// Each profile's journey has its own place (D-268); the first slot's is where the one journey was kept before.
export const journeyKey = (slot = 0) => (slot === 0 ? 'gloamdeep-journey' : `gloamdeep-journey-${slot + 1}`);
export function loadJourney(slot = 0) {
  let kept = null;
  try { kept = readJourney(localStorage.getItem(journeyKey(slot))); } catch { /* not kept */ }
  return kept;
}
export function saveJourney(state, jumped, slot = 0) {
  try { localStorage.setItem(journeyKey(slot), journeyText(state, jumped)); } catch { /* not kept */ }
}
// A deleted profile's journey goes with it (D-271)
export function dropJourney(slot) {
  try { localStorage.removeItem(journeyKey(slot)); } catch { /* not kept */ }
}
