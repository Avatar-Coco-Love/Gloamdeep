// § map screen: the floor the hero is on, in a box like the hearts' over the
// room under its veil (D-205), "DEPTH 3" inside at the top. Each room is
// drawn small from the tiles remembered: floors in the floor's grey, walls
// beside them in the brick's top edge, found stairs in their violet, the
// hero a blinking gold dot (still with reduced motion). It scrolls and zooms
// in its window (the view, core/map.js); a tap outside the box closes it (main.js).
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth } from './font.js';
import { veil } from './menu.js';
import { markAt } from '../core/map.js';

const K = '#0e0c16', LINE = '#2a2636', EMBER = '#f39a3b', GOLD = '#ffd66b';
const SHOWN = { floor: '#363b48', wall: '#69748b', stairs: '#a58ce0' }; // ART-DIRECTION.md
// The box, 8 pixels in from the picture's edges, and the map's window inside it, under the heading
export const BOX = { x: 8, y: 8, w: W - 16, h: SCREEN_H - 16 };
export const VIEW = { x: BOX.x + 4, y: BOX.y + 16, w: BOX.w - 8, h: BOX.h - 20 };
export const inBox = (x, y) => x >= BOX.x && y >= BOX.y && x < BOX.x + BOX.w && y < BOX.y + BOX.h;

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

// view: { k, x, y } (core/map.js)
export function drawMap(c, view, t, still) {
  if (view.k !== k) redraw(view.k);
  veil(c);
  const { x, y, w, h } = BOX;
  c.fillStyle = K; c.fillRect(x, y, w, h);
  c.fillStyle = LINE;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
  const head = `DEPTH ${plan.depth}`;
  drawText(c, head, Math.floor((W - textWidth(head)) / 2), y + 5, EMBER);
  c.save();
  c.beginPath(); c.rect(VIEW.x, VIEW.y, VIEW.w, VIEW.h); c.clip();
  const mx = VIEW.x - view.x, my = VIEW.y - view.y;
  c.drawImage(drawn, mx, my);
  if (still || Math.floor(t / 400) % 2 === 0) { c.fillStyle = GOLD; c.fillRect(mx + plan.hero.x * k, my + plan.hero.y * k, k, k); }
  c.restore();
}
