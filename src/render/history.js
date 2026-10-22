// § version history: the page of every version (D-254), on a dark page of its
// own. The heading Version history, then one row per version, newest first: its
// number in ember and its title, with + to open it or - while open. An open
// version shows its date and its changelog lines, wrapped, below its row. The
// list scrolls inside its window; Back stays put under it.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawHeading, drawMarker } from './menu.js';
import { HISTORY } from '../core/history.js';

const K = '#0e0c16', GOLD = '#ffd66b', GREY = '#9790a4', EMBER = '#f39a3b', CORE = '#fff5d6';
export const ROW_H = 11; // from one row's top to the next
export const LIST_Y = 22; // the window's top; the heading one line above
export const LIST_H = 16 * ROW_H; // the window shows 16 rows
export const BACK_Y = LIST_Y + LIST_H + 8;
const TAP_PAD = 8; // game pixels above and below Back that still pick it
const NUM_X = 14; // the numbers' left edge, with the flame before it
const TITLE_X = NUM_X + Math.max(...HISTORY.map((e) => textWidth(e.v))) + 5;
const SIGN_X = W - 9; // the + or -, 3 wide
export const TITLE_W = SIGN_X - 4 - TITLE_X; // the widest a title may be
const DOT_X = 15, BODY_X = 19; // a line's dot, and its words
export const BODY_W = W - 6 - BODY_X; // the widest a wrapped line may be

// § wrap: words into lines no wider than width; a word too wide alone is cut
export function wrap(text, width) {
  const lines = [];
  let line = '';
  for (let word of text.split(' ')) {
    while (textWidth(word) > width) { // cut it where it still fits
      let n = word.length - 1;
      while (n > 1 && textWidth(word.slice(0, n)) > width) n--;
      if (line) { lines.push(line); line = ''; }
      lines.push(word.slice(0, n)); word = word.slice(n);
    }
    const next = line ? `${line} ${word}` : word;
    if (textWidth(next) <= width) line = next;
    else { lines.push(line); line = word; }
  }
  if (line) lines.push(line);
  return lines;
}

// § rows: one per version, and for each open one its date and wrapped lines.
// Worked out when a version opens or closes, never each frame (TECH.md).
// kind: 'head', 'date', 'line' (a change's first line) or 'more'; i: its version
export function historyRows(open) {
  const rows = [];
  HISTORY.forEach((e, i) => {
    rows.push({ i, kind: 'head' });
    if (!open.has(e.v)) return;
    rows.push({ i, kind: 'date', text: e.date });
    for (const line of e.lines) wrap(line, BODY_W).forEach((text, j) => rows.push({ i, kind: j ? 'more' : 'line', text }));
  });
  return rows;
}
// The row a version's own row is on, and its last row
export const headRow = (rows, i) => rows.findIndex((r) => r.i === i);
export function lastRow(rows, i) { let r = headRow(rows, i); while (rows[r + 1]?.i === i) r++; return r; }

// What a tap at y in game pixels picks: { row } in the window, 'back', or null
export function historyAt(y, scroll, count) {
  if (y >= BACK_Y - TAP_PAD && y < BACK_Y + FONT_H + TAP_PAD) return 'back';
  if (y < LIST_Y || y >= LIST_Y + LIST_H) return null;
  const row = Math.floor((y - LIST_Y + scroll) / ROW_H);
  return row < count ? { row } : null;
}

// § draw: chosen is a version's index, or HISTORY.length for Back; still: reduced motion
export function drawHistory(c, rows, open, scroll, chosen, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H); // a dark page of its own, so nothing shows through the lines
  drawHeading(c, 'Version history', LIST_Y + 2);
  c.save();
  c.beginPath(); c.rect(0, LIST_Y, W, LIST_H); c.clip();
  for (let r = Math.floor(scroll / ROW_H); r < rows.length; r++) {
    const y = LIST_Y + r * ROW_H - scroll + 1;
    if (y >= LIST_Y + LIST_H) break;
    const row = rows[r], e = HISTORY[row.i], on = row.i === chosen;
    if (row.kind === 'head') {
      drawText(c, e.v, NUM_X, y, on ? GOLD : EMBER);
      drawText(c, e.title, TITLE_X, y, on ? GOLD : GREY);
      drawText(c, open.has(e.v) ? '-' : '+', SIGN_X, y, on ? GOLD : GREY);
      if (on) drawMarker(c, NUM_X - 7, y + 1, t, still);
    } else if (row.kind === 'date') drawText(c, row.text, BODY_X, y, GREY);
    else {
      if (row.kind === 'line') drawText(c, '·', DOT_X, y, GREY);
      drawText(c, row.text, BODY_X, y, CORE);
    }
  }
  c.restore();
  // § bar: where the window is in the whole list, a thin line at the right edge
  const all = rows.length * ROW_H;
  if (all > LIST_H) {
    c.fillStyle = GREY;
    c.fillRect(W - 2, LIST_Y + Math.round((scroll / all) * LIST_H), 1, Math.max(4, Math.round((LIST_H / all) * LIST_H)));
  }
  const back = chosen === HISTORY.length, x = Math.floor((W - textWidth('Back')) / 2);
  drawText(c, 'Back', x, BACK_Y, back ? GOLD : GREY);
  if (back) drawMarker(c, x - 7, BACK_Y + 1, t, still);
}
