// § menu lines: a menu's lines centred in the pixel font, the chosen one gold with
// a small flame beside it (D-181). Shared by the title screen and the pause menu (D-187).
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';

const K = '#0e0c16', GOLD = '#ffd66b', EMBER = '#f39a3b', CORE = '#fff5d6', GREY = '#9790a4';
export const LINE_GAP = 16; // from one line's top to the next
const TAP_PAD = 8; // game pixels above and below a line that still pick it
const VEIL = 0.7; // how dark the pause menu's veil over the room is (D-187)

// The tapped line of a menu whose first line's top is `top`, or -1. y in game pixels.
export function lineAt(y, count, top) {
  for (let i = 0; i < count; i++) {
    const at = top + i * LINE_GAP;
    if (y >= at - TAP_PAD && y < at + FONT_H + TAP_PAD) return i;
  }
  return -1;
}

// § flame: the chosen line's marker, 3 × 5, its tip leaning each beat; still with reduced motion
const FLAME = [
  [[1, 0], [0, 1], [1, 1], [2, 1], [0, 2], [2, 2], [0, 3], [2, 3], [1, 4]],
  [[2, 0], [1, 1], [0, 1], [2, 1], [0, 2], [2, 2], [0, 3], [2, 3], [1, 4]],
];
function drawMarker(c, x, y, t, still) {
  const f = FLAME[still ? 0 : Math.floor(t / 180) % 2];
  c.fillStyle = EMBER; for (const [px, py] of f) c.fillRect(x + px, y + py, 1, 1);
  c.fillStyle = GOLD; c.fillRect(x + 1, y + 2, 1, 2);
  c.fillStyle = CORE; c.fillRect(x + 1, y + 3, 1, 1);
}

// menu: [{ text }]; chosen: its index; top: the first line's top; still: prefers-reduced-motion
export function drawLines(c, menu, chosen, top, t, still) {
  menu.forEach((line, i) => {
    const w = textWidth(line.text), x = Math.floor((W - w) / 2), y = top + i * LINE_GAP;
    drawText(c, line.text, x, y, i === chosen ? GOLD : GREY);
    if (i === chosen) drawMarker(c, x - 7, y + 1, t, still);
  });
}

// § pause: the room darkened behind a veil, the lines in the middle of the picture (D-187)
export const pauseTop = (count) => Math.floor((SCREEN_H - (count - 1) * LINE_GAP - FONT_H) / 2);
export function drawPause(c, menu, chosen, t, still) {
  c.globalAlpha = VEIL; c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H); c.globalAlpha = 1;
  drawLines(c, menu, chosen, pauseTop(menu.length), t, still);
}
