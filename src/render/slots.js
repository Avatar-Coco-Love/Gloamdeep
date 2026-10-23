// § slots: the slot screen (D-271), a dark page of its own like the Journal's. The
// heading Profiles, then a framed box for each of the 3 slots: a profile's name and
// its deepest depth, or Empty. Rename and Delete below them (D-273), and Back at the foot
// when the screen was opened from the title menu. While renaming or deleting, the heading
// asks which, and that line reads Cancel. The question after Delete, Delete …?, is
// drawn here too, with its note and Yes and No.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { LINE_GAP, drawHeading, drawMarker, drawLines } from './menu.js';
import { BACK_Y } from './history.js';
import { SLOTS, slotName } from '../core/profile.js';

const K = '#0e0c16', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6', DIM = '#4a4458';
const BOX_X = 12, BOX_W = W - 2 * BOX_X, BOX_H = 30; // each slot's box
const BOX_Y = 44, BOX_GAP = 36; // the first box's top, and from one box's top to the next
const TEXT_X = BOX_X + 10;
const RENAME_Y = BOX_Y + SLOTS * BOX_GAP + 10, DELETE_Y = RENAME_Y + LINE_GAP;
const TAP_PAD = 8; // game pixels above and below a line that still pick it; the nearest line wins
const HEADING_Y = 26; // the heading's line top, one line above it, as the Journal's
const ASK_TOP = 140; // the question's Yes, with No under it

// The lines under the boxes: Rename and Delete (the one being done reads Cancel), and Back
// when there is somewhere to go back to. picking: null, 'rename' or 'delete'
export const slotLines = (picking, back) => [
  { id: 'rename', text: picking === 'rename' ? 'Cancel' : 'Rename' },
  { id: 'delete', text: picking === 'delete' ? 'Cancel' : 'Delete' },
  ...(back ? [{ id: 'back', text: 'Back' }] : []),
];
const LINE_Y = { rename: RENAME_Y, delete: DELETE_Y, back: BACK_Y };
const HEADINGS = { rename: 'Rename which?', delete: 'Delete which?' };
export const slotsHeading = (picking) => HEADINGS[picking] ?? 'Profiles';

// What a tap at y in game pixels picks: a slot's number, a line's id, or null
export function slotsAt(y, lines) {
  for (let i = 0; i < SLOTS; i++) if (y >= BOX_Y + i * BOX_GAP - 3 && y < BOX_Y + i * BOX_GAP + BOX_H + 3) return i;
  const off = (l) => Math.abs(y - LINE_Y[l.id] - FONT_H / 2);
  const near = lines.filter((l) => off(l) < FONT_H / 2 + TAP_PAD).sort((a, b) => off(a) - off(b));
  return near.length ? near[0].id : null;
}
const frame = (c, x, y, w, h, colour) => {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1); c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
};

// § draw: ps, the profiles; chosen: a slot's number, else 3 and on for the lines; picking: as
// slotLines'; still: reduced motion
export function drawSlots(c, ps, chosen, picking, back, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  drawHeading(c, slotsHeading(picking), HEADING_Y);
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
  slotLines(picking, back).forEach((l, i) => {
    const x = Math.floor((W - textWidth(l.text)) / 2), y = LINE_Y[l.id], on = chosen === SLOTS + i;
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
