// § how to play: the page of the controls (D-193), over the darkened title or room.
// The heading How to play, the page's name between two arrows, its rows (the
// action on the left, the ways on the right), then Back. The chosen line is
// gold with the menu's flame; Back stays put whichever page shows.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { LINE_GAP, veil, drawHeading, drawMarker } from './menu.js';
import { howtoRows, pageName } from '../core/howto.js';

const GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6';
const ROW_H = 11; // from one row line's top to the next
const MOST_LINES = 5; // the tallest page's row lines (Touch and Mouse)
const WAYS_X = 38; // the ways' left edge; the actions start at LEFT
const LEFT = Math.floor((W - WAYS_X - textWidth('Drag, or hold the button')) / 2);
const TAP_PAD = 8; // game pixels above and below a line that still pick it
// The page line's top; the heading one line above, the rows below, then Back
const HEIGHT = LINE_GAP + 6 + MOST_LINES * ROW_H + 10 + FONT_H;
export const PAGE_Y = Math.floor((SCREEN_H - HEIGHT) / 2) + LINE_GAP / 2;
const ROWS_Y = PAGE_Y + LINE_GAP + 6;
const BACK_Y = ROWS_Y + MOST_LINES * ROW_H + 10;
const ARROW_L = LEFT, ARROW_R = W - LEFT - 3; // the arrows' left edges, 3 wide

// What a tap at x, y in game pixels picks: 'prev', 'next', 'back' or null.
// On the page line, the left third goes back a page and the rest on.
export function howtoAt(x, y) {
  if (y >= PAGE_Y - TAP_PAD && y < PAGE_Y + FONT_H + TAP_PAD) return x < W / 3 ? 'prev' : 'next';
  if (y >= BACK_Y - TAP_PAD && y < BACK_Y + FONT_H + TAP_PAD) return 'back';
  return null;
}

function arrow(c, x, y, right, color) { // 3 × 5, pointing left or right
  c.fillStyle = color;
  for (let i = 0; i < 3; i++) c.fillRect(right ? x + i : x + 2 - i, y + i, 1, 5 - 2 * i);
}
function line(c, text, y, chosen, t, still) {
  const x = Math.floor((W - textWidth(text)) / 2);
  drawText(c, text, x, y, chosen ? GOLD : GREY);
  if (chosen) drawMarker(c, x - 7, y + 1, t, still);
}

// page: 'touch', 'mouse' or 'keyboard'; controls: the Controls switch;
// chosen: 0 the page line, 1 Back; still: reduced motion
export function drawHowTo(c, page, controls, chosen, t, still) {
  veil(c);
  drawHeading(c, 'How to play', PAGE_Y);
  line(c, pageName(page), PAGE_Y, chosen === 0, t, still);
  arrow(c, ARROW_L, PAGE_Y + 1, false, chosen === 0 ? GOLD : GREY);
  arrow(c, ARROW_R, PAGE_Y + 1, true, chosen === 0 ? GOLD : GREY);
  let y = ROWS_Y;
  for (const row of howtoRows(page, controls)) {
    drawText(c, row.action, LEFT, y, GREY);
    for (const way of row.ways) { drawText(c, way, LEFT + WAYS_X, y, CORE); y += ROW_H; }
  }
  line(c, 'Back', BACK_Y, chosen === 1, t, still);
}
