// § journal: the Journal's page (D-262, D-270), dark like Version history's. The
// heading Journal, the tab row, Records and Growth (D-293), the open one framed,
// a rule under the row, then the tab's rows: each name in grey and its value in
// light at the right. Growth adds Add a heart under its rows, light while an
// ember can buy one. Back stays at the foot. The flame marks the line chosen.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawHeading, drawMarker } from './menu.js';
import { BACK_Y } from './history.js';
import { TABS, recordRows, growthRows, ADD_HEART } from '../core/journal.js';
import { canAddHeart } from '../core/growth.js';

const K = '#0e0c16', GOLD = '#ffd66b', GREY = '#9790a4', DIM = '#4a4458', CORE = '#fff5d6';
const TABS_Y = 24, EDGE = 8; // the tab row's words, and the rule's ends from the sides
const RULE_Y = TABS_Y + FONT_H + 2;
const ROWS_Y = RULE_Y + 10, ROW_H = 14, NAME_X = 14;
export const ADD_Y = ROWS_Y + 2 * ROW_H + 8; // Add a heart, under the Growth tab's two rows
const TAP_PAD = 8; // game pixels above and below Back that still pick it

// Each tab's left and right, in game pixels
const tabSpans = () => {
  let x = EDGE + 4;
  return TABS.map((tab) => { const w = textWidth(tab.text), span = { ...tab, x, w }; x += w + 9; return span; });
};

// What a tap at x, y in game pixels picks: 'back', 'heart' (on the Growth tab),
// a tab's id, or null
export function journalAt(x, y, tab = 'records') {
  if (y >= BACK_Y - TAP_PAD && y < BACK_Y + FONT_H + TAP_PAD) return 'back';
  if (y >= TABS_Y - 6 && y < RULE_Y + 4) return tabSpans().find((s) => x >= s.x - 4 && x < s.x + s.w + 5)?.id ?? null;
  if (tab === 'growth' && y >= ADD_Y - 5 && y < ADD_Y + FONT_H + 5) return 'heart';
  return null;
}

// § draw: records and played, the profile's; state, the journey's; tab, the one
// open; chosen, the line the flame marks (on Growth, 0 Add a heart, 1 Back);
// still: reduced motion
export function drawJournal(c, records, played, state, tab, chosen, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H); // a page of its own
  drawHeading(c, 'Journal', TABS_Y + 2);
  // § tabs: the open tab framed, its foot open onto the page below the rule
  let ruleFrom = EDGE;
  for (const s of tabSpans()) {
    const open = s.id === tab;
    if (open) {
      c.fillStyle = GREY;
      c.fillRect(s.x - 3, TABS_Y - 3, s.w + 6, 1); c.fillRect(s.x - 3, TABS_Y - 3, 1, RULE_Y - TABS_Y + 3); c.fillRect(s.x + s.w + 2, TABS_Y - 3, 1, RULE_Y - TABS_Y + 3);
      c.fillRect(ruleFrom, RULE_Y, s.x - 3 - ruleFrom, 1);
      ruleFrom = s.x + s.w + 3;
    }
    drawText(c, s.text, s.x, TABS_Y, open ? GOLD : GREY);
  }
  c.fillStyle = GREY; c.fillRect(ruleFrom, RULE_Y, W - EDGE - ruleFrom, 1);
  const rows = tab === 'growth' ? growthRows(state) : recordRows(records, played);
  rows.forEach((row, i) => {
    const y = ROWS_Y + i * ROW_H;
    drawText(c, row.text, NAME_X, y, GREY);
    drawText(c, row.value, W - NAME_X - textWidth(row.value), y, CORE);
  });
  if (tab === 'growth') {
    const can = canAddHeart(state);
    drawText(c, ADD_HEART.text, NAME_X, ADD_Y, can ? (chosen === 0 ? GOLD : CORE) : DIM);
    drawText(c, ADD_HEART.cost, W - NAME_X - textWidth(ADD_HEART.cost), ADD_Y, can ? GREY : DIM);
    if (chosen === 0) drawMarker(c, NAME_X - 7, ADD_Y + 1, t, still);
  }
  const bx = Math.floor((W - textWidth('Back')) / 2), onBack = tab !== 'growth' || chosen !== 0;
  drawText(c, 'Back', bx, BACK_Y, onBack ? GOLD : GREY);
  if (onBack) drawMarker(c, bx - 7, BACK_Y + 1, t, still);
}
