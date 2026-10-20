// § how to play: the controls, one page per way of playing (D-179, D-193).
// Touch, Mouse and Keyboard; Left and Right flip between them. Walking by
// touch or mouse follows the Controls switch, so only what works is shown (D-189).
// Plain data, no drawing.
import { swipesWalk, tapsWalk } from './settings.js';

export const HOWTO_PAGES = ['touch', 'mouse', 'keyboard'];
const NAMES = { touch: 'Touch', mouse: 'Mouse', keyboard: 'Keyboard' };
export const pageName = (id) => NAMES[id];

// The next page, or the one before with back; it wraps round
export function nextPage(id, back = false) {
  const i = HOWTO_PAGES.indexOf(id), n = HOWTO_PAGES.length;
  return HOWTO_PAGES[(i + (back ? n - 1 : 1)) % n];
}

// § walking by pointer: a tap or click toward a side, a swipe or drag, a held
// finger or button; a tap or click on the hero always waits (D-085, D-189)
function walkWays(controls, tap, swipe, hold) {
  const taps = tapsWalk(controls), swipes = swipesWalk(controls);
  if (!taps) return [swipe];
  return [`${tap} a side of the hero`, swipes ? `${swipe}, or hold ${hold}` : `or hold ${hold}`];
}

// The page's rows: [{ action, ways: [text, …] }], one text per drawn line
export function howtoRows(page, controls) {
  if (page === 'keyboard') {
    return [
      { action: 'Walk', ways: ['Arrows or WASD'] },
      { action: 'Wait', ways: ['Space'] },
      { action: 'Lantern', ways: ['L'] },
      { action: 'Pause', ways: ['Esc or P'] },
    ];
  }
  const touch = page === 'touch';
  return [
    { action: 'Walk', ways: touch ? walkWays(controls, 'Tap', 'Swipe', 'a finger') : walkWays(controls, 'Click', 'Drag', 'the button') },
    { action: 'Wait', ways: [touch ? 'Tap the hero' : 'Click the hero'] },
    { action: 'Lantern', ways: ['The lantern button'] },
    { action: 'Pause', ways: ['The pause button'] },
  ];
}

// The page in words, for screen readers
export const howtoWords = (page, controls) =>
  `How to play, ${pageName(page)}. ` + howtoRows(page, controls).map((r) => `${r.action}: ${r.ways.join(' ')}.`).join(' ') +
  ' Left or Right for another page. Back.';

// § lines: the page's name, then Back; Up and Down move between them
export const HOWTO_LINES = ['page', 'back'];
