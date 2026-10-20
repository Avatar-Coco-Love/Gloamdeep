// § settings: the Controls switch (D-179, D-189): tap and swipe, tap only, or swipe only.
// It turns off only walking by taps or swipes in play; menus take both always.
// Kept on this device; if the browser's storage is blocked it stays Tap and swipe.
export const CONTROLS = [
  { id: 'both', text: 'Tap and swipe' },
  { id: 'tap', text: 'Tap only' },
  { id: 'swipe', text: 'Swipe only' },
];
// The next choice, or the one before with Left; it wraps round
export function nextControl(id, back = false) {
  const i = CONTROLS.findIndex((c) => c.id === id), n = CONTROLS.length;
  return CONTROLS[(i + (back ? n - 1 : 1)) % n].id;
}
export const controlsText = (id) => 'Controls: ' + (CONTROLS.find((c) => c.id === id) || CONTROLS[0]).text;
// What the switch lets walk: a swipe, or a tap toward a side and a held finger
export const swipesWalk = (id) => id !== 'tap';
export const tapsWalk = (id) => id !== 'swipe';

// § motion: the Motion switch (D-179, D-190): Full or Reduced. Until it is picked
// (null) it follows the device's own reduced-motion setting; once picked, the pick wins.
export const stillMotion = (motion, deviceReduced) => (motion ? motion === 'reduced' : deviceReduced);
export const motionText = (motion, deviceReduced) => 'Motion: ' + (stillMotion(motion, deviceReduced) ? 'Reduced' : 'Full');
// Two choices, so picking it, Left and Right all flip it
export const nextMotion = (motion, deviceReduced) => (stillMotion(motion, deviceReduced) ? 'full' : 'reduced');

// § storage: localStorage, wrapped (TECH.md)
const KEY = 'gloamdeep-settings';
export function loadSettings() {
  let s = null;
  try { s = JSON.parse(localStorage.getItem(KEY)); } catch { /* not kept */ }
  const controls = CONTROLS.some((c) => c.id === s?.controls) ? s.controls : 'both';
  const motion = s?.motion === 'full' || s?.motion === 'reduced' ? s.motion : null;
  return { controls, motion };
}
export function saveSettings(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* not kept */ }
}
