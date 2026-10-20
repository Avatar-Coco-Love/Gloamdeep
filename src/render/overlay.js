// § overlay: dev mode's grid and pointed-tile outline (D-045). Drawn on top
// of the game; it only reads where things are, it never changes them.
import { TILE, W, H } from './screen.js';

const GRID = 'rgba(255,255,255,.2)';
const POINTED = '#ffc65c'; // the page's focus colour

// § grid: one faint 1-pixel line on the top and left edge of every tile,
// moved with the camera (D-195); none on the screen's own edge
export function drawGrid(c, cam) {
  c.fillStyle = GRID;
  for (let x = TILE - cam.x % TILE; x < W; x += TILE) if (x > 0) c.fillRect(x, 0, 1, H);
  for (let y = TILE - cam.y % TILE; y < H; y += TILE) if (y > 0) c.fillRect(0, y, W, 1);
}

// § pointed: a bright 1-pixel box just inside the tile under the finger or mouse;
// tx, ty in screen tiles, which the camera can leave between whole tiles
export function drawPointed(c, tx, ty) {
  const x = Math.round(tx * TILE), y = Math.round(ty * TILE);
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
