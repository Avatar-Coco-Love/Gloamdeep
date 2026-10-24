// § bag panel: a box like the map's over the room's foot, so the hero and the
// strip stay in view (D-247); over its top instead when the hero stands where
// the panel would hide them. "BAG" in ember at its top, then the held slot
// with "HELD" beside it, the weapon in hand (D-252), then the six slots in
// a row, each an item's sprite with its count when more than one, the chosen
// slot framed in gold. Under them the chosen item's name, and on the right
// Pour for one that pours, Make for one that crafts, dim with too few
// (D-299), or Eat (Drink for a potion) for one that heals, dim at full health
// (D-308); heartcaps both make and heal, so Make sits left of Eat (D-309). No veil: the room shows above it.
import { W, H } from './screen.js';
import { drawText, textWidth } from './font.js';
import { BAG_SLOTS } from '../core/bag.js';
import { get } from '../core/registry.js';

const K = '#0e0c16', LINE = '#2a2636', EMBER = '#f39a3b', GOLD = '#ffd66b', GREY = '#9790a4', CORE = '#fff5d6';
const SLOT = 22, SLOT_GAP = 3;
export const PANEL = { x: 8, w: W - 16, h: 86, y: H - 4 - 86 }; // above the text line, so its lines show (D-298)
const TOP_Y = 4; // the panel's top when it moves over the room's top
// Whether the panel goes to the top: the hero's tile, `heroY` pixels down the screen, would be under it
export const panelOnTop = (heroY) => heroY + 16 > PANEL.y - 4;
const ROW_X = Math.floor((W - (BAG_SLOTS * SLOT + (BAG_SLOTS - 1) * SLOT_GAP)) / 2);
// The button for an item: Pour, Make, Eat or Drink, the same size, at the foot's right end;
// Make, for an item that also heals, just left of it
const BUTTON = { w: Math.max(textWidth('POUR'), textWidth('MAKE'), textWidth('EAT'), textWidth('DRINK')) + 6, h: 11 };
BUTTON.x = PANEL.x + PANEL.w - 4 - BUTTON.w;
const MAKE_X = BUTTON.x - 4 - BUTTON.w;
const buttonText = (entry) => (entry.oil ? 'POUR' : entry.eats ? entry.verb ?? 'EAT' : entry.craft ? 'MAKE' : null);
// Whether an item shows Make beside its Eat
export const twoButtons = (entry) => !!(entry?.craft && entry.eats);
// The panel's rows from its top: the held slot's, the slots' row, and the name's line under it
const rows = (top) => { const y = top ? TOP_Y : PANEL.y, held = y + 15, row = held + SLOT + 4; return { y, held, row, foot: row + SLOT + 6 }; };
const HELD_X = Math.floor((W - SLOT) / 2), HELD = 'HELD';
const slotX = (i) => ROW_X + i * (SLOT + SLOT_GAP);
const TAP_PAD = 4; // game pixels around a slot or the button that still pick it

// What a tap at x, y picks: { slot: i }, 'act' (Pour, Make, Eat or Drink), 'make' (Make beside
// Eat, when `two`), or null; outside the panel, 'out'
export function bagAt(x, y, top = false, two = false) {
  const p = rows(top);
  if (x < PANEL.x || x >= PANEL.x + PANEL.w || y < p.y || y >= p.y + PANEL.h) return 'out';
  if (y >= p.row - TAP_PAD && y < p.row + SLOT + TAP_PAD) {
    const i = Math.floor((x - ROW_X + SLOT_GAP / 2) / (SLOT + SLOT_GAP));
    return i >= 0 && i < BAG_SLOTS ? { slot: i } : null;
  }
  if (y >= p.foot - 2 - TAP_PAD && x >= BUTTON.x - (two ? 2 : TAP_PAD)) return 'act';
  if (two && y >= p.foot - 2 - TAP_PAD && x >= MAKE_X - TAP_PAD) return 'make';
  return null;
}

function frame(c, x, y, w, h, colour) {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
}

// bag: [{ id, n }]; chosen: the slot picked; sprites: the item sprites, keyed by id; top: see panelOnTop;
// held: the weapon in hand's id, or null; full: whether the hero is at full health
export function drawBag(c, bag, chosen, sprites, top = false, held = null, full = false) {
  const { x, w, h } = PANEL, { y, held: hy, row, foot } = rows(top);
  c.fillStyle = K; c.fillRect(x, y, w, h);
  frame(c, x, y, w, h, LINE);
  drawText(c, 'BAG', Math.floor((W - textWidth('BAG')) / 2), y + 4, EMBER);
  drawText(c, HELD, HELD_X - 5 - textWidth(HELD), hy + 8, GREY);
  frame(c, HELD_X, hy, SLOT, SLOT, LINE);
  if (held) c.drawImage(sprites[held], HELD_X + 3, hy + 3);
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
  const text = buttonText(entry);
  if (!text) return;
  const few = entry.craft && bag[chosen].n < entry.craft.of;
  button(c, BUTTON.x, foot, text, entry.eats ? full : few);
  if (twoButtons(entry)) button(c, MAKE_X, foot, 'MAKE', few);
}

function button(c, bx, foot, text, dim) {
  c.fillStyle = K; c.fillRect(bx, foot - 2, BUTTON.w, BUTTON.h);
  frame(c, bx, foot - 2, BUTTON.w, BUTTON.h, dim ? LINE : EMBER);
  drawText(c, text, bx + Math.floor((BUTTON.w - textWidth(text)) / 2), foot, dim ? GREY : GOLD);
}
