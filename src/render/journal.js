// § journal: the Journal's page (D-262, D-270), dark like Version history's. The
// heading Journal, the tab row with its one tab, Records, open, a rule under the
// row, then each record's name in grey and its value in light at the right. Back
// stays at the foot, chosen, as only Back can be picked for now.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawHeading, drawMarker } from './menu.js';
import { BACK_Y } from './history.js';
import { TABS, recordRows } from '../core/journal.js';

const K = '#0e0c16', GOLD = '#ffd66b', GREY = '#9790a4', EMBER = '#f39a3b', CORE = '#fff5d6';
const TABS_Y = 24, EDGE = 8; // the tab row's words, and the rule's ends from the sides
const RULE_Y = TABS_Y + FONT_H + 2;
const ROWS_Y = RULE_Y + 10, ROW_H = 14, NAME_X = 14;
const TAP_PAD = 8; // game pixels above and below Back that still pick it

// What a tap at y in game pixels picks: 'back' or null
export const journalAt = (y) => (y >= BACK_Y - TAP_PAD && y < BACK_Y + FONT_H + TAP_PAD ? 'back' : null);

// § draw: records, the profile's; still: reduced motion
export function drawJournal(c, records, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H); // a page of its own
  drawHeading(c, 'Journal', TABS_Y + 2);
  // § tabs: the open tab framed, its foot open onto the page below the rule
  let x = EDGE + 4;
  TABS.forEach((tab, i) => {
    const w = textWidth(tab.text);
    c.fillStyle = GREY;
    c.fillRect(x - 3, TABS_Y - 3, w + 6, 1); c.fillRect(x - 3, TABS_Y - 3, 1, RULE_Y - TABS_Y + 3); c.fillRect(x + w + 2, TABS_Y - 3, 1, RULE_Y - TABS_Y + 3);
    c.fillRect(EDGE, RULE_Y, x - 3 - EDGE, 1);
    drawText(c, tab.text, x, TABS_Y, i === 0 ? GOLD : GREY);
    x += w + 9;
  });
  c.fillStyle = GREY; c.fillRect(x - 6, RULE_Y, W - EDGE - (x - 6), 1);
  recordRows(records).forEach((row, i) => {
    const y = ROWS_Y + i * ROW_H;
    drawText(c, row.text, NAME_X, y, GREY);
    drawText(c, row.value, W - NAME_X - textWidth(row.value), y, CORE);
  });
  const bx = Math.floor((W - textWidth('Back')) / 2);
  drawText(c, 'Back', bx, BACK_Y, GOLD);
  drawMarker(c, bx - 7, BACK_Y + 1, t, still);
}
