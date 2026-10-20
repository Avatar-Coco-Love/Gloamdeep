// § map screen: a floor, in a box like the hearts' over the room under its
// veil (D-205), "DEPTH 3" inside at the top between an up arrow and a down
// arrow that turn the map a floor, ember while there is a floor that way,
// else greyed (D-206). Each room is
// drawn small from the tiles remembered: floors in the floor's grey, walls
// beside them in the brick's top edge, found stairs in their violet, the
// hero a blinking gold dot on their own floor (still with reduced motion). It scrolls and zooms
// in its window (the view, core/map.js); a tap outside the box closes it (main.js).
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth } from './font.js';
import { veil } from './menu.js';
import { markAt } from '../core/map.js';

const K = '#0e0c16', LINE = '#2a2636', EMBER = '#f39a3b', GOLD = '#ffd66b', DIM = '#46405a';
const SHOWN = { floor: '#363b48', wall: '#69748b', stairs: '#a58ce0' }; // ART-DIRECTION.md
// The box, 8 pixels in from the picture's edges, and the map's window inside it, under the heading
export const BOX = { x: 8, y: 8, w: W - 16, h: SCREEN_H - 16 };
export const VIEW = { x: BOX.x + 4, y: BOX.y + 16, w: BOX.w - 8, h: BOX.h - 20 };
export const inBox = (x, y) => x >= BOX.x && y >= BOX.y && x < BOX.x + BOX.w && y < BOX.y + BOX.h;
// What a tap at x, y turns the map: 'up' in the heading's left half, 'down' in its right, else null
export const turnAt = (x, y) => (inBox(x, y) && y < VIEW.y ? (x < W / 2 ? 'up' : 'down') : null);
const GAP = 4; // between "DEPTH 3" and each arrow
function arrow(c, x, y, down, colour) { // 5 × 3, pointing up or down
  c.fillStyle = colour;
  for (let i = 0; i < 3; i++) c.fillRect(x + i, down ? y + i : y + 2 - i, 5 - 2 * i, 1);
}

// The plan drawn into its own canvas at k pixels per tile, again when k changes
const drawn = document.createElement('canvas');
let plan = null, k = 0;
export function setMap(next) { plan = next; k = 0; }
function redraw(at) {
  k = at;
  drawn.width = plan.cols * k; drawn.height = plan.rows * k;
  const c = drawn.getContext('2d');
  for (const { x: ox, y: oy, room, seen } of plan.rooms) {
    for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
      const mark = markAt(room, seen, x, y);
      if (mark) { c.fillStyle = SHOWN[mark]; c.fillRect((ox + x) * k, (oy + y) * k, k, k); }
    }
  }
}

// view: { k, x, y } (core/map.js); turns: { up, down }, whether each arrow turns the map
export function drawMap(c, view, t, still, turns) {
  if (view.k !== k) redraw(view.k);
  veil(c);
  const { x, y, w, h } = BOX;
  c.fillStyle = K; c.fillRect(x, y, w, h);
  c.fillStyle = LINE;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
  const head = plan.depth === 0 ? 'SURFACE' : `DEPTH ${plan.depth}`; // as the strip says it (D-209)
  const hx = Math.floor((W - textWidth(head)) / 2);
  drawText(c, head, hx, y + 5, EMBER);
  arrow(c, hx - GAP - 5, y + 7, false, turns.up ? EMBER : DIM);
  arrow(c, hx + textWidth(head) + GAP, y + 7, true, turns.down ? EMBER : DIM);
  c.save();
  c.beginPath(); c.rect(VIEW.x, VIEW.y, VIEW.w, VIEW.h); c.clip();
  const mx = VIEW.x - view.x, my = VIEW.y - view.y;
  c.drawImage(drawn, mx, my);
  if (plan.hero && (still || Math.floor(t / 400) % 2 === 0)) { c.fillStyle = GOLD; c.fillRect(mx + plan.hero.x * k, my + plan.hero.y * k, k, k); }
  c.restore();
}
