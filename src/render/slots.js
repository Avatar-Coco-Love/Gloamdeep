// § slots: the slot screen (D-271), a dark page of its own like the Journal's. The
// heading Profiles, then a framed box for each of the 3 slots: a profile's name and
// its deepest depth, or Empty. Delete below them, and Back at the foot when the
// screen was opened from the title menu. While deleting, the heading asks which,
// and Delete reads Cancel. The question after it, Delete …?, is
// drawn here too, with its note and Yes and No.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawHeading, drawMarker, drawLines } from './menu.js';
import { BACK_Y } from './history.js';
import { SLOTS, slotName } from '../core/profile.js';

const K = '#0e0c16', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6', DIM = '#4a4458';
const BOX_X = 12, BOX_W = W - 2 * BOX_X, BOX_H = 30; // each slot's box
const BOX_Y = 44, BOX_GAP = 36; // the first box's top, and from one box's top to the next
const TEXT_X = BOX_X + 10;
const DELETE_Y = BOX_Y + SLOTS * BOX_GAP + 10;
const TAP_PAD = 8; // game pixels above and below a line that still pick it
const HEADING_Y = 26; // the heading's line top, one line above it, as the Journal's
const ASK_TOP = 140; // the question's Yes, with No under it

// The lines under the boxes: Delete (or Cancel), and Back when there is somewhere to go back to
export const slotLines = (deleting, back) => [{ id: 'delete', text: deleting ? 'Cancel' : 'Delete' }, ...(back ? [{ id: 'back', text: 'Back' }] : [])];
const lineY = (id) => (id === 'back' ? BACK_Y : DELETE_Y);

// What a tap at y in game pixels picks: a slot's number, a line's id, or null
export function slotsAt(y, lines) {
  for (let i = 0; i < SLOTS; i++) if (y >= BOX_Y + i * BOX_GAP - 3 && y < BOX_Y + i * BOX_GAP + BOX_H + 3) return i;
  const line = lines.find((l) => y >= lineY(l.id) - TAP_PAD && y < lineY(l.id) + FONT_H + TAP_PAD);
  return line ? line.id : null;
}
const frame = (c, x, y, w, h, colour) => {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1); c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
};

// § draw: ps, the profiles; chosen: a slot's number, else 3 and on for the lines; still: reduced motion
export function drawSlots(c, ps, chosen, deleting, back, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  drawHeading(c, deleting ? 'Delete which?' : 'Profiles', HEADING_Y);
  ps.slots.forEach((p, i) => {
    const y = BOX_Y + i * BOX_GAP, on = chosen === i;
    frame(c, BOX_X, y, BOX_W, BOX_H, on ? GOLD : DIM);
    if (p) {
      drawText(c, slotName(p, i), TEXT_X, y + 6, on ? GOLD : CORE);
      drawText(c, `Deepest  ${p.records.deepest}`, TEXT_X, y + 17, GREY);
      drawText(c, String(i + 1), BOX_X + BOX_W - 10 - textWidth(String(i + 1)), y + 6, DIM);
    } else drawText(c, 'Empty', Math.floor((W - textWidth('Empty')) / 2), y + 11, DIM);
    if (on) drawMarker(c, BOX_X - 6, y + 13, t, still);
  });
  slotLines(deleting, back).forEach((l, i) => {
    const x = Math.floor((W - textWidth(l.text)) / 2), y = lineY(l.id), on = chosen === SLOTS + i;
    drawText(c, l.text, x, y, on ? GOLD : GREY);
    if (on) drawMarker(c, x - 7, y + 1, t, still);
  });
}

// § ask: Delete Coco? Lost for good. Yes and No (D-271), as Start over? asks (D-238)
export function drawAsk(c, name, menu, chosen, note, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  drawHeading(c, `Delete ${name}?`, HEADING_Y);
  drawText(c, note, Math.floor((W - textWidth(note)) / 2), HEADING_Y + 4, GREY);
  drawLines(c, menu, chosen, ASK_TOP, t, still);
}
export const askTop = ASK_TOP;
