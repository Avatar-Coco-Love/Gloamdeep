// § slots: the slot screen (D-271), a dark page of its own like the Journal's. The
// heading Profiles, then a framed box for each of the 3 slots: a profile's hero in its look
// on a small lit patch of crypt floor, then its name and its deepest depth, or Empty (D-287). Rename, Change look (P3, D-289) and Delete below them (D-273), and Back at the foot
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
const BOX_Y = 42, BOX_GAP = 34; // the first box's top, and from one box's top to the next (closer for Look, P3)
const PATCH = 22, PATCH_X = BOX_X + 4, PATCH_TOP = 4; // the hero's lit patch, at the box's left
const TEXT_X = PATCH_X + PATCH + 6;
const RENAME_Y = BOX_Y + SLOTS * BOX_GAP + 10, LOOK_Y = RENAME_Y + LINE_GAP, DELETE_Y = LOOK_Y + LINE_GAP;
const TAP_PAD = 8; // game pixels above and below a line that still pick it; the nearest line wins
const HEADING_Y = 26; // the heading's line top, one line above it, as the Journal's
const ASK_TOP = 140; // the question's Yes, with No under it

// The lines under the boxes: Rename, Change look and Delete (the one being done reads Cancel), and Back
// when there is somewhere to go back to. picking: null, 'rename', 'look' or 'delete'
export const slotLines = (picking, back) => [
  { id: 'rename', text: picking === 'rename' ? 'Cancel' : 'Rename' },
  { id: 'look', text: picking === 'look' ? 'Cancel' : 'Change look' },
  { id: 'delete', text: picking === 'delete' ? 'Cancel' : 'Delete' },
  ...(back ? [{ id: 'back', text: 'Back' }] : []),
];
const LINE_Y = { rename: RENAME_Y, look: LOOK_Y, delete: DELETE_Y, back: BACK_Y };
const HEADINGS = { rename: 'Rename which?', look: 'Change whose look?', delete: 'Delete which?' };
export const slotsHeading = (picking) => HEADINGS[picking] ?? 'Profiles';

// What a tap at y in game pixels picks: a slot's number, a line's id, or null
export function slotsAt(y, lines) {
  for (let i = 0; i < SLOTS; i++) if (y >= BOX_Y + i * BOX_GAP - 3 && y < BOX_Y + i * BOX_GAP + BOX_H + 3) return i;
  const off = (l) => Math.abs(y - LINE_Y[l.id] - FONT_H / 2);
  const near = lines.filter((l) => off(l) < FONT_H / 2 + TAP_PAD).sort((a, b) => off(a) - off(b));
  return near.length ? near[0].id : null;
}
// § patch: a small square of crypt floor lit by the hero's lantern, as the Look boxes'; painted once (TECH.md)
let patch = null;
function paint() {
  patch = document.createElement('canvas');
  patch.width = PATCH; patch.height = PATCH;
  const c = patch.getContext('2d');
  c.fillStyle = '#3a4050'; c.fillRect(0, 0, PATCH, PATCH);
  for (let y = 0; y < PATCH; y++) for (let x = 0; x < PATCH; x++) {
    const n = (x * 37 + y * 91 + x * y * 13) % 29; // a fixed speckle, no randomness needed
    if (n === 0) { c.fillStyle = '#454c5e'; c.fillRect(x, y, 1, 1); } else if (n === 7) { c.fillStyle = '#22262f'; c.fillRect(x, y, 1, 1); }
  }
  const glow = c.createRadialGradient(PATCH / 2, PATCH / 2, 1, PATCH / 2, PATCH / 2, PATCH * 0.7);
  glow.addColorStop(0, 'rgba(255,214,107,.18)'); glow.addColorStop(1, 'rgba(14,12,22,.55)');
  c.fillStyle = glow; c.fillRect(0, 0, PATCH, PATCH);
}
// A hero's sprite, 1×, on its patch and shadow, in the box at y
function drawPatchHero(c, hero, y) {
  if (!patch) paint();
  const px = PATCH_X, py = y + PATCH_TOP, hx = px + 3, hy = py + 2;
  c.drawImage(patch, px, py);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(hx + 3, hy + 14, 10, 2); c.fillRect(hx + 4, hy + 16, 8, 1); // its shadow
  c.drawImage(hero, hx, hy);
}
const frame = (c, x, y, w, h, colour) => {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1); c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
};

// § draw: ps, the profiles; heroOf: a profile's hero sprite in its look (sprites.js, kept out of
// here so the tests can load this file); chosen: a slot's number, else 3 and on for the lines;
// picking: as slotLines'; still: reduced motion
export function drawSlots(c, ps, heroOf, chosen, picking, back, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  drawHeading(c, slotsHeading(picking), HEADING_Y);
  ps.slots.forEach((p, i) => {
    const y = BOX_Y + i * BOX_GAP, on = chosen === i;
    frame(c, BOX_X, y, BOX_W, BOX_H, on ? GOLD : DIM);
    if (p) {
      drawPatchHero(c, heroOf(p), y);
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
