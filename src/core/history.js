// § history: every version, newest first (D-254): its number, date, a short
// title and its changelog lines, word for word. The Version history page in
// Settings shows it. Plain data, and the list's scrolling, with no drawing.
import { HISTORY_00 } from './history-0.0.js';
import { HISTORY_01 } from './history-0.1.js';
import { HISTORY_02 } from './history-0.2.js';

export const HISTORY = [...HISTORY_02, ...HISTORY_01, ...HISTORY_00];

// What a screen reader says for a version, with its lines while it is open
export const versionWords = (e, open) => (open ? `${e.v}, ${e.date}. ${e.title}. ${e.lines.join(' ')}` : `${e.v}, ${e.title}`);

// § scroll: in game pixels from the list's top; never past its ends
export const clampScroll = (s, contentH, viewH) => Math.max(0, Math.min(s, contentH - viewH));
// The scroll that shows rows a to b (b included) as far as they fit, moving as
// little as it can; when they don't all fit, row a stays at the top
export function scrollToShow(scroll, a, b, rowH, viewH, count) {
  let s = Math.max(scroll, (b + 1) * rowH - viewH);
  if (a * rowH < s) s = a * rowH;
  return clampScroll(s, count * rowH, viewH);
}
