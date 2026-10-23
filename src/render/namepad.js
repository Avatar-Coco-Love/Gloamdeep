// § name pad: the page for naming a new profile (D-272) or renaming one (D-273), dark like
// the slot screen's. The heading Name your profile (or Rename profile), the letters typed so far with a cursor, then the keys
// on a 7-column grid, Back last (D-288); the chosen key gold with the menu's flame.
import { NAME_PAD, NAME_ROWS, NAME_COLS, NAME_MAX } from '../core/namepad.js';
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { LINE_GAP, drawHeading, drawMarker } from './menu.js';

const K = '#0e0c16', GOLD = '#ffd66b', GREY = '#9790a4';
const CELL = 22; // a grid column's width
const LEFT = Math.floor((W - NAME_COLS * CELL) / 2);
const TAP_PAD = 4; // game pixels around a key that still press it
// The entry line's top; the heading sits one line above, the keys from two lines below
const TOP = Math.floor((SCREEN_H - (NAME_ROWS + 1) * LINE_GAP - FONT_H) / 2) + LINE_GAP / 2;
const keysTop = TOP + 2 * LINE_GAP;

const keyX = (k) => LEFT + k.col * CELL + Math.floor((k.span * CELL - textWidth(k.text)) / 2);

// The key under a tap at x, y in game pixels, as its index, or -1
export function nameKeyAt(x, y) {
  const row = Math.floor((y - keysTop + TAP_PAD) / LINE_GAP);
  if (row < 0 || row >= NAME_ROWS || x < LEFT || x >= LEFT + NAME_COLS * CELL) return -1;
  const col = Math.floor((x - LEFT) / CELL);
  return NAME_PAD.findIndex((k) => k.row === row && col >= k.col && col < k.col + k.span);
}

// entry: the letters typed; chosen: a key's index; still: reduced motion (the cursor stays lit)
export function drawNamePad(c, entry, chosen, t, still, heading = 'Name your profile') {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  drawHeading(c, heading, TOP);
  const w = textWidth(entry), cursor = entry.length < NAME_MAX, x = Math.floor((W - w - (cursor ? 5 : 0)) / 2);
  drawText(c, entry, x, TOP, GOLD);
  if (cursor && (still || Math.floor(t / 500) % 2 === 0)) { c.fillStyle = GOLD; c.fillRect(x + w + (entry ? 1 : 0), TOP + 7, 4, 1); }
  NAME_PAD.forEach((k, i) => {
    const kx = keyX(k), ky = keysTop + k.row * LINE_GAP;
    drawText(c, k.text, kx, ky, i === chosen ? GOLD : GREY);
    if (i === chosen) drawMarker(c, kx - 7, ky + 1, t, still);
  });
}
