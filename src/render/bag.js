// § bag panel: a box like the map's over the room's foot, so the hero and the
// strip stay in view (D-247); over its top instead when the hero stands where
// the panel would hide them. "BAG" in ember at its top, then the six slots in
// a row, each an item's sprite with its count when more than one, the chosen
// slot framed in gold. Under them the chosen item's name, and Pour on the
// right for one that pours. No veil: the room shows above it.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth } from './font.js';
import { BAG_SLOTS } from '../core/bag.js';
import { get } from '../core/registry.js';

const K = '#0e0c16', LINE = '#2a2636', EMBER = '#f39a3b', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6';
const SLOT = 22, SLOT_GAP = 3;
export const PANEL = { x: 8, w: W - 16, h: 60, y: SCREEN_H - 4 - 60 };
const TOP_Y = 4; // the panel's top when it moves over the room's top
// Whether the panel goes to the top: the hero's tile, `heroY` pixels down the screen, would be under it
export const panelOnTop = (heroY) => heroY + 16 > PANEL.y - 4;
const ROW_X = Math.floor((W - (BAG_SLOTS * SLOT + (BAG_SLOTS - 1) * SLOT_GAP)) / 2);
const POUR = { text: 'POUR', w: textWidth('POUR') + 6, h: 11 };
POUR.x = PANEL.x + PANEL.w - 4 - POUR.w;
// The panel's rows from its top: the slots' row, and the name's line under it
const rows = (top) => { const y = top ? TOP_Y : PANEL.y, row = y + 15; return { y, row, foot: row + SLOT + 6 }; };
const slotX = (i) => ROW_X + i * (SLOT + SLOT_GAP);
const TAP_PAD = 4; // game pixels around a slot or Pour that still pick it

// What a tap at x, y picks: { slot: i }, 'pour', or null; outside the panel, 'out'
export function bagAt(x, y, top = false) {
  const p = rows(top);
  if (x < PANEL.x || x >= PANEL.x + PANEL.w || y < p.y || y >= p.y + PANEL.h) return 'out';
  if (y >= p.row - TAP_PAD && y < p.row + SLOT + TAP_PAD) {
    const i = Math.floor((x - ROW_X + SLOT_GAP / 2) / (SLOT + SLOT_GAP));
    return i >= 0 && i < BAG_SLOTS ? { slot: i } : null;
  }
  if (y >= p.foot - 2 - TAP_PAD && x >= POUR.x - TAP_PAD) return 'pour';
  return null;
}

function frame(c, x, y, w, h, colour) {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
}

// bag: [{ id, n }]; chosen: the slot picked; sprites: the item sprites, keyed by id; top: see panelOnTop
export function drawBag(c, bag, chosen, sprites, top = false) {
  const { x, w, h } = PANEL, { y, row, foot } = rows(top);
  c.fillStyle = K; c.fillRect(x, y, w, h);
  frame(c, x, y, w, h, LINE);
  drawText(c, 'BAG', Math.floor((W - textWidth('BAG')) / 2), y + 4, EMBER);
  for (let i = 0; i < BAG_SLOTS; i++) {
    const sx = slotX(i), s = bag[i];
    frame(c, sx, row, SLOT, SLOT, i === chosen ? GOLD : LINE);
    if (!s) continue;
    c.drawImage(sprites[s.id], sx + 3, row + 3);
    if (s.n > 1) {
      const n = String(s.n), nw = textWidth(n);
      c.fillStyle = K; c.fillRect(sx + SLOT - 3 - nw, row + SLOT - 10, nw + 2, 8);
      drawText(c, n, sx + SLOT - 2 - nw, row + SLOT - 9, CORE);
    }
  }
  const entry = bag[chosen] && get(bag[chosen].id);
  if (!entry) return;
  drawText(c, entry.name, x + 5, foot, GREY);
  if (!entry.oil) return;
  c.fillStyle = K; c.fillRect(POUR.x, foot - 2, POUR.w, POUR.h);
  frame(c, POUR.x, foot - 2, POUR.w, POUR.h, EMBER);
  drawText(c, POUR.text, POUR.x + 3, foot, GOLD);
}
