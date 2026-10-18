// § overlay: dev mode's grid and pointed-tile outline (D-045). Drawn on top
// of the game; it only reads where things are, it never changes them.
import { TILE, COLS, ROWS, W, H } from './screen.js';

const GRID = 'rgba(255,255,255,.2)';
const POINTED = '#ffc65c'; // the page's focus colour

// § grid: one faint 1-pixel line on the top and left edge of every tile
export function drawGrid(c) {
  c.fillStyle = GRID;
  for (let x = 1; x < COLS; x++) c.fillRect(x * TILE, 0, 1, H);
  for (let y = 1; y < ROWS; y++) c.fillRect(0, y * TILE, W, 1);
}

// § pointed: a bright 1-pixel box just inside the tile under the finger or mouse
export function drawPointed(c, tx, ty) {
  const x = tx * TILE, y = ty * TILE;
  c.fillStyle = POINTED;
  c.fillRect(x, y, TILE, 1);
  c.fillRect(x, y + TILE - 1, TILE, 1);
  c.fillRect(x, y + 1, 1, TILE - 2);
  c.fillRect(x + TILE - 1, y + 1, 1, TILE - 2);
}

// § wrench: the dev button's icon, a 12 × 12 pixel map (D-047)
const WRENCH = [
  '..##....##..',
  '..##....##..',
  '..###..###..',
  '...######...',
  '....####....',
  '.....##.....',
  '.....##.....',
  '.....##.....',
  '.....##.....',
  '....####....',
  '....#..#....',
  '....####....',
];
export function drawWrench(c) {
  c.fillStyle = POINTED;
  WRENCH.forEach((row, y) => [...row].forEach((ch, x) => { if (ch === '#') c.fillRect(x, y, 1, 1); }));
}
