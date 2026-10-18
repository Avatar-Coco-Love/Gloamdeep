// § text line: the strip under the room where the game speaks (D-094).
// It shows the core's shown line (core/lines.js), centred; once its turns
// are used up it fades in half a second, or goes at once with reduced
// motion (D-095). Ordinary lines are the study's grey, warnings amber (D-097).
import { W, H, LINE_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';

const BG = '#0e0c16', GREY = '#9790a4', AMBER = '#ffc65c'; // the study's --muted and --amber
const FADE_MS = 500;
const TOP = H + 2; // 2 pixels under the room

export function createTextLine() {
  let drawn = null, img = null, fadeFrom = 0; // the last line, its pixels, when its fade began
  const paint = (line) => { // once per line, not every frame (TECH.md)
    img = document.createElement('canvas');
    img.width = W; img.height = FONT_H;
    drawText(img.getContext('2d'), line.text, Math.floor((W - textWidth(line.text)) / 2), 0, line.warn ? AMBER : GREY);
  };
  return {
    // line: the shown line or null; reduce: prefers-reduced-motion
    draw(c, line, t, reduce) {
      c.fillStyle = BG; c.fillRect(0, H, W, LINE_H);
      if (line) { if (line !== drawn) { drawn = line; paint(line); } fadeFrom = 0; } // said again: no fade
      if (!drawn) return;
      if (!line && !fadeFrom) fadeFrom = t;
      const a = fadeFrom ? (reduce ? 0 : 1 - (t - fadeFrom) / FADE_MS) : 1;
      if (a <= 0) { drawn = null; return; }
      c.globalAlpha = a; c.drawImage(img, 0, TOP); c.globalAlpha = 1;
    },
  };
}
