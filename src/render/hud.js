// § hud: things drawn over the game after the light, so they are always bright.
import { W } from './screen.js';

// § oil bar: style study 1's 10 amber segments (study lines 37–40, 522), drawn
// in pixels in the top right corner, away from the dev wrench (D-065). A
// segment is lit while the oil is above its share, as in the study.
const SEG_W = 3, SEG_H = 4, GAP = 1, SEGS = 10;
const BOX_W = SEGS * SEG_W + (SEGS - 1) * GAP + 4, BOX_H = SEG_H + 4;
const BOX_X = W - BOX_W - 2, BOX_Y = 2;

export function drawOilBar(c, oil) {
  c.fillStyle = '#0e0c16'; c.fillRect(BOX_X, BOX_Y, BOX_W, BOX_H);
  c.fillStyle = '#2a2636'; // the study's --line, its border
  c.fillRect(BOX_X, BOX_Y, BOX_W, 1); c.fillRect(BOX_X, BOX_Y + BOX_H - 1, BOX_W, 1);
  c.fillRect(BOX_X, BOX_Y, 1, BOX_H); c.fillRect(BOX_X + BOX_W - 1, BOX_Y, 1, BOX_H);
  for (let i = 0; i < SEGS; i++) {
    const x = BOX_X + 2 + i * (SEG_W + GAP), y = BOX_Y + 2;
    if (oil > i / SEGS + 0.001) {
      c.fillStyle = '#ffc65c'; c.fillRect(x, y, SEG_W, SEG_H - 1); // --amber
      c.fillStyle = '#a8642c'; c.fillRect(x, y + SEG_H - 1, SEG_W, 1); // --amber-deep, its lower edge
    } else {
      c.fillStyle = '#2a2636'; c.fillRect(x, y, SEG_W, SEG_H);
    }
  }
}

// § hearts: the hero's health as small pixel hearts in the top left, in a
// box like the oil bar's (D-116). A full heart is the hostile red with the
// study's deeper red (PAL p, R) under it; an empty one is an empty oil segment's colour.
const HEART = ['.x.x.', 'xxxxx', '.xxx.', '..x..'], HEART_W = 5;
export function drawHearts(c, health, max) {
  const w = max * HEART_W + (max - 1) * GAP + 4, h = HEART.length + 4, bx = 2, by = BOX_Y;
  c.fillStyle = '#0e0c16'; c.fillRect(bx, by, w, h);
  c.fillStyle = '#2a2636';
  c.fillRect(bx, by, w, 1); c.fillRect(bx, by + h - 1, w, 1);
  c.fillRect(bx, by, 1, h); c.fillRect(bx + w - 1, by, 1, h);
  for (let i = 0; i < max; i++) {
    const x0 = bx + 2 + i * (HEART_W + GAP), full = i < health;
    HEART.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch !== 'x') return;
      const low = y === HEART.length - 1 || HEART[y + 1][x] !== 'x'; // the heart's lower edge
      c.fillStyle = !full ? '#2a2636' : low ? '#c4473a' : '#e8786a';
      c.fillRect(x0 + x, by + 2 + y, 1, 1);
    }));
  }
}

// § lantern icon: the hero's lantern pixels (sprites.js) for the switch button,
// a 5 × 5 map. The flame is lit, or the empty oil segments' colour when off (D-080).
const LANTERN_ICON = ['..k..', '.kak.', 'kywyk', 'kYyYk', '.kOk.'];
const ON = { k: '#9790a4', a: '#e8d5a0', y: '#ffd66b', w: '#efe6cc', Y: '#f39a3b', O: '#a8642c' };
const OFF = { ...ON, a: '#3a3446', y: '#2a2636', w: '#2a2636', Y: '#2a2636', O: '#3a3446' };
export function drawLanternIcon(c, lit) {
  const pal = lit ? ON : OFF;
  c.clearRect(0, 0, 5, 5);
  LANTERN_ICON.forEach((row, y) => [...row].forEach((ch, x) => {
    if (pal[ch]) { c.fillStyle = pal[ch]; c.fillRect(x, y, 1, 1); }
  }));
}
