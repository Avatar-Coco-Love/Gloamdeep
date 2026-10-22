// § save: the journey kept on this device, one at a time (D-238). The whole
// state is plain data, written after every turn and read back as it was; only
// the tile memories (Uint8Array, fog.js) need turning into lists and back.
// Plain data, no drawing.
import { withXp } from './xp.js';

// Raise FORMAT when the state's shape changes; an older save is then dropped quietly
export const FORMAT = 1;
// What is kept: the state, and whether a dev jump stopped the record counting (D-232)
export const packJourney = (state, jumped) => ({ format: FORMAT, jumped: !!jumped, state });
// A kept journey back, or null when there is none, it is from an older format, or it is broken
export function unpackJourney(kept) {
  const s = kept?.state;
  if (kept?.format !== FORMAT || !s?.hero || !s.room || !s.place || !s.home) return null;
  return { state: withXp(s), jumped: !!kept.jumped };
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
