// § record: the deepest depth the hero has walked to, kept on this device for
// good (D-021, D-232). Dev jumps don't count: once Go to depth is used, the
// journey stops counting until a New journey. Plain data, no drawing.

// The record after a turn: the depth now, if it is deeper and was walked to
export const deeper = (record, depth, jumped = false) => (!jumped && depth > record ? depth : record);
// The title screen's line, or null while the hero has not gone below the surface
export const recordText = (record) => (record > 0 ? `Deepest: depth ${record}` : null);

// § storage: localStorage, wrapped (TECH.md); with storage blocked it lasts until the page closes
const KEY = 'gloamdeep-deepest';
export function loadDeepest() {
  let n = 0;
  try { n = JSON.parse(localStorage.getItem(KEY)); } catch { /* not kept */ }
  return Number.isInteger(n) && n > 0 ? n : 0;
}
export function saveDeepest(n) {
  try { localStorage.setItem(KEY, JSON.stringify(n)); } catch { /* not kept */ }
}
