// § walk marks: the held walk's target and its stop (D-220), in room pixels.
import { drawText, textWidth } from './font.js';

const AMBER = '#ffc65c', DARK = '#0e0c16'; // the menu's amber, outlined in the deepest dark

// § mark: a small amber corner frame on the held tile, pulsing; steady with reduced motion
export function drawMark(c, tx, ty, t, still) {
  const x = tx * 16, y = ty * 16;
  c.globalAlpha = still ? 1 : 0.6 + 0.4 * (Math.sin(t / 160) + 1) / 2;
  c.fillStyle = AMBER;
  for (const [cx, cy, sx, sy] of [[0, 0, 1, 1], [15, 0, -1, 1], [0, 15, 1, -1], [15, 15, -1, -1]]) {
    c.fillRect(x + cx + (sx < 0 ? -3 : 0), y + cy, 4, 1);
    c.fillRect(x + cx, y + cy + (sy < 0 ? -3 : 0), 1, 4);
  }
  c.globalAlpha = 1;
}

// § stop: a "!" over the hero when something came into view; x, y: the hero's tile in pixels
export function drawAlert(c, x, y) {
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) drawText(c, '!', x + 7 + dx, y - 11 + dy, DARK);
  drawText(c, '!', x + 7, y - 11, AMBER);
}

// § gain: a "+1" rising over the hero as experience is earned (D-245), in the
// "!"'s amber and outline. It rises 6 pixels and fades over GAIN_MS from
// `at`; with reduced motion it stays put and goes at the end.
export const GAIN_MS = 900;
export function drawGain(c, n, x, y, t, at, still) {
  const k = (t - at) / GAIN_MS;
  if (k < 0 || k >= 1) return;
  const text = `+${n}`, gx = x + 8 - Math.floor(textWidth(text) / 2), gy = Math.max(1, y - 11 - (still ? 0 : Math.round(6 * k))); // kept inside the room on its top row
  c.globalAlpha = still ? 1 : Math.min(1, 3 * (1 - k));
  for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) drawText(c, text, gx + dx, gy + dy, DARK);
  drawText(c, text, gx, gy, AMBER);
  c.globalAlpha = 1;
}
