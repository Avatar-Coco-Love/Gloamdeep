// § seed pad: the page for typing a seed (D-191), over the darkened title or room.
// The heading Seed, the digits typed so far with a cursor, then the keys on a
// 4-column grid; the chosen key gold with the menu's flame.
import { PAD, PAD_ROWS, PAD_COLS } from '../core/seedpad.js';
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { LINE_GAP, veil, drawHeading, drawMarker } from './menu.js';

const GOLD = '#ffd66b', GREY = '#9790a4';
const CELL = 24; // a grid column's width
const LEFT = Math.floor((W - PAD_COLS * CELL) / 2);
const TAP_PAD = 4; // game pixels around a key that still press it
// The entry line's top; the heading sits one line above, the keys from two lines below
export const PAD_TOP = Math.floor((SCREEN_H - (PAD_ROWS + 1) * LINE_GAP - FONT_H) / 2) + LINE_GAP / 2;
const keysTop = PAD_TOP + 2 * LINE_GAP;

const keyX = (k) => LEFT + k.col * CELL + Math.floor((k.span * CELL - textWidth(k.text)) / 2);

// The key under a tap at x, y in game pixels, as its index, or -1
export function keyAt(x, y) {
  const row = Math.floor((y - keysTop + TAP_PAD) / LINE_GAP);
  if (row < 0 || row >= PAD_ROWS || x < LEFT || x >= LEFT + PAD_COLS * CELL) return -1;
  const col = Math.floor((x - LEFT) / CELL);
  return PAD.findIndex((k) => k.row === row && col >= k.col && col < k.col + k.span);
}

// entry: the digits typed; chosen: a key's index; still: reduced motion (the cursor stays lit)
export function drawSeedPad(c, entry, chosen, t, still) {
  veil(c);
  drawHeading(c, 'Seed', PAD_TOP);
  const w = textWidth(entry), cursor = entry.length < 5, x = Math.floor((W - w - (cursor ? 5 : 0)) / 2);
  drawText(c, entry, x, PAD_TOP, GOLD);
  if (cursor && (still || Math.floor(t / 500) % 2 === 0)) { c.fillStyle = GOLD; c.fillRect(x + w + (entry ? 1 : 0), PAD_TOP + 7, 4, 1); }
  PAD.forEach((k, i) => {
    const kx = keyX(k), ky = keysTop + k.row * LINE_GAP;
    drawText(c, k.text, kx, ky, i === chosen ? GOLD : GREY);
    if (i === chosen) drawMarker(c, kx - 7, ky + 1, t, still);
  });
}
