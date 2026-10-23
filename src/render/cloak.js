// § cloak screen: choosing a profile's cloak (P3), dark like the slot screen. The heading
// Choose a cloak, the six heroes three to a row, each 2× on a patch of lit crypt floor in its
// cloak, the picked one framed in gold; then OK and Back. The arrows' choice is the picked
// hero, or the flame on OK or Back.
import { CLOAK_PAD, CLOAK_COLS } from '../core/looks.js';
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawHeading, drawMarker } from './menu.js';
import { heroIn } from './sprites.js';

const K = '#0e0c16', GOLD = '#ffd66b', GREY = '#9790a4', DIM = '#4a4458';
const HEADING_Y = 26; // as the slot screen's
const BOX_W = 42, BOX_H = 48, GAP = 4, ROW_GAP = 52; // a hero's framed box; boxes' spacing
const LEFT = Math.floor((W - CLOAK_COLS * BOX_W - (CLOAK_COLS - 1) * GAP) / 2), TOP = 40;
const LINE_Y = [156, 172]; // OK, then Back
const TAP_PAD = 3; // game pixels around a box or line that still pick it

const boxX = (k) => LEFT + k.col * (BOX_W + GAP), boxY = (k) => TOP + k.row * ROW_GAP;
const isLine = (k) => k.span === CLOAK_COLS;
const lineText = (k) => (k.id === 'ok' ? 'OK' : 'Back');
const lineY = (k) => LINE_Y[k.row - 2];

// The key under a tap at x, y in game pixels, as its index in CLOAK_PAD, or -1
export function cloakKeyAt(x, y) {
  return CLOAK_PAD.findIndex((k) => (isLine(k)
    ? y >= lineY(k) - TAP_PAD - 4 && y < lineY(k) + FONT_H + TAP_PAD + 4
    : x >= boxX(k) - TAP_PAD && x < boxX(k) + BOX_W + TAP_PAD && y >= boxY(k) - TAP_PAD && y < boxY(k) + BOX_H + TAP_PAD));
}

// § ground: the crypt floor under each hero, lit by its lantern; painted once (TECH.md)
let ground = null;
function paint() {
  ground = document.createElement('canvas');
  ground.width = BOX_W - 2; ground.height = BOX_H - 2;
  const c = ground.getContext('2d'), w = ground.width, h = ground.height;
  c.fillStyle = '#3a4050'; c.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const n = (x * 37 + y * 91 + x * y * 13) % 29; // a fixed speckle, no randomness needed
    if (n === 0) { c.fillStyle = '#454c5e'; c.fillRect(x, y, 1, 1); } else if (n === 7) { c.fillStyle = '#22262f'; c.fillRect(x, y, 1, 1); }
  }
  c.fillStyle = '#22262f'; c.fillRect(0, 13, w, 1); c.fillRect(0, 29, w, 1); c.fillRect(12, 0, 1, 13); c.fillRect(28, 14, 1, 15); c.fillRect(12, 30, 1, h - 30);
  const glow = c.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w * 0.6);
  glow.addColorStop(0, 'rgba(255,214,107,.18)'); glow.addColorStop(1, 'rgba(14,12,22,.4)');
  c.fillStyle = glow; c.fillRect(0, 0, w, h);
}
const frame = (c, x, y, w, h, colour) => {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1); c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
};

// § draw: picked, the cloak framed in gold; chosen: the key the flame is on; still: reduced motion
export function drawCloaks(c, picked, chosen, t, still) {
  if (!ground) paint();
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  drawHeading(c, 'Choose a cloak', HEADING_Y);
  c.imageSmoothingEnabled = false;
  CLOAK_PAD.forEach((k, i) => {
    if (isLine(k)) {
      const text = lineText(k), x = Math.floor((W - textWidth(text)) / 2), y = lineY(k);
      drawText(c, text, x, y, i === chosen ? GOLD : GREY);
      if (i === chosen) drawMarker(c, x - 7, y + 1, t, still);
      return;
    }
    const x = boxX(k), y = boxY(k);
    c.drawImage(ground, x + 1, y + 1);
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 13, y + 36, 16, 3); c.fillRect(x + 15, y + 39, 12, 1); // its shadow, 2×
    c.drawImage(heroIn(k.id), x + 5, y + 5, 32, 32);
    frame(c, x, y, BOX_W, BOX_H, k.id === picked ? GOLD : DIM);
  });
}
