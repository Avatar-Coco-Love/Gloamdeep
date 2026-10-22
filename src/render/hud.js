// § hud: the hearts, depth and oil, drawn in the strip above the room (D-198)
// or in the column beside it (D-199), and the buttons' icons.
import { W } from './screen.js';
import { drawText, textWidth } from './font.js';

// § status: the boxes in the strip, hearts left with the level after them,
// depth middle, oil right; or stacked in the column at the room's left when
// the strip is that narrow one (D-199): hearts, depth, oil, then the level
// from the top, 2 pixels apart (D-246).
export function drawStatus(c, { oil, health, max, depth, level }) {
  if (c.canvas.width === W) {
    drawHearts(c, health, max, 2, BOX_Y);
    drawBox(c, `LV ${level}`, 2 + heartsW(max) + 2, BOX_Y);
    drawDepth(c, depth, null, BOX_Y);
    drawOilBar(c, oil, W - BOX_W - 2, BOX_Y);
  } else {
    drawHearts(c, health, max, 2, 2);
    drawDepth(c, depth, 2, 12);
    drawOilBar(c, oil, 2, 25);
    drawBox(c, `LV ${level}`, 2, 35);
  }
}

// § oil bar: style study 1's 10 amber segments (study lines 37–40, 522), drawn
// in pixels in the top right corner, away from the dev wrench (D-065). A
// segment is lit while the oil is above its share, as in the study.
const SEG_W = 3, SEG_H = 4, GAP = 1, SEGS = 10;
const BOX_W = SEGS * SEG_W + (SEGS - 1) * GAP + 4, BOX_H = SEG_H + 4;
const BOX_Y = 2;

function drawOilBar(c, oil, bx, by) {
  c.fillStyle = '#0e0c16'; c.fillRect(bx, by, BOX_W, BOX_H);
  c.fillStyle = '#2a2636'; // the study's --line, its border
  c.fillRect(bx, by, BOX_W, 1); c.fillRect(bx, by + BOX_H - 1, BOX_W, 1);
  c.fillRect(bx, by, 1, BOX_H); c.fillRect(bx + BOX_W - 1, by, 1, BOX_H);
  for (let i = 0; i < SEGS; i++) {
    const x = bx + 2 + i * (SEG_W + GAP), y = by + 2;
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
const heartsW = (max) => max * HEART_W + (max - 1) * GAP + 4;
function drawHearts(c, health, max, bx, by) {
  const w = heartsW(max), h = HEART.length + 4;
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

// § depth: how deep the hero is, "DEPTH 1" for the second room, in the top
// middle between the hearts and the oil bar, in a box like theirs and the
// text line's grey (D-146). A null x centres it. Outside, depth 0, it says
// SURFACE until places have names (D-209).
function drawDepth(c, depth, x, by) {
  const text = depth === 0 ? 'SURFACE' : `DEPTH ${depth}`;
  drawBox(c, text, x ?? Math.floor((W - textWidth(text) - 6) / 2), by);
}

// § box: a word in the text line's grey in a box like the oil bar's, the
// depth's and the level's ("LV 2", D-246)
function drawBox(c, text, bx, by) {
  const w = textWidth(text) + 6, h = 7 + 4;
  c.fillStyle = '#0e0c16'; c.fillRect(bx, by, w, h);
  c.fillStyle = '#2a2636';
  c.fillRect(bx, by, w, 1); c.fillRect(bx, by + h - 1, w, 1);
  c.fillRect(bx, by, 1, h); c.fillRect(bx + w - 1, by, 1, h);
  drawText(c, text, bx + 3, by + 2, '#9790a4'); // the study's --muted
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

// § pause icon: two bars in the lantern icon's stone grey, a 5 × 5 map (D-187)
export function drawPauseIcon(c) {
  c.clearRect(0, 0, 5, 5);
  c.fillStyle = '#9790a4'; c.fillRect(1, 0, 1, 5); c.fillRect(3, 0, 1, 5);
}

// § map icon: three rooms in an L, like a floor of the grid, in the stone grey (D-205)
const MAP_ICON = ['xx.xx', 'xx.xx', '.....', 'xx...', 'xx...'];
export function drawMapIcon(c) {
  c.clearRect(0, 0, 5, 5);
  c.fillStyle = '#9790a4';
  MAP_ICON.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === 'x') c.fillRect(x, y, 1, 1); }));
}

// § close icon: the map button while the map is open, a cross in the same grey (D-205)
export function drawCloseIcon(c) {
  c.clearRect(0, 0, 5, 5);
  c.fillStyle = '#9790a4';
  for (let i = 0; i < 5; i++) { c.fillRect(i, i, 1, 1); c.fillRect(4 - i, i, 1, 1); }
}

// § bag icon: a pouch tied at the neck, in the same grey (D-247)
const BAG_ICON = ['.x.x.', '..x..', '.xxx.', 'xxxxx', '.xxx.'];
export function drawBagIcon(c) {
  c.clearRect(0, 0, 5, 5);
  c.fillStyle = '#9790a4';
  BAG_ICON.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === 'x') c.fillRect(x, y, 1, 1); }));
}
