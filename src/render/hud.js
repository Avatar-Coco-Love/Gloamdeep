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
