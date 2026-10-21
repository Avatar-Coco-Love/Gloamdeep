// § walk marks: the held walk's target and its stop (D-220), in room pixels.
import { drawText } from './font.js';

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
