// § map screen: the floor the hero is on, each room drawn small from the
// tiles remembered (D-176, D-205): floors in the floor's grey, walls beside
// them in the brick's top edge, found stairs in their violet, the hero a
// blinking gold dot (still with reduced motion), "DEPTH 3" above it.
// A tap, M or Esc closes it (main.js).
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth } from './font.js';
import { markAt } from '../core/map.js';

const K = '#0e0c16', EMBER = '#f39a3b', GREY = '#9790a4', GOLD = '#ffd66b';
const SHOWN = { floor: '#363b48', wall: '#69748b', stairs: '#a58ce0' }; // ART-DIRECTION.md
const BIG = 6; // pixels per tile at most
const TOP = 18, BOTTOM = 16; // the heading's room above the map, the hint's below
const HINT = 'Tap or M to close';

// The plan drawn once, into its own canvas, k pixels per tile
const drawn = document.createElement('canvas');
let plan = null, k = 1;
export function setMap(next) {
  plan = next;
  k = Math.max(1, Math.min(BIG, Math.floor((W - 8) / plan.cols), Math.floor((SCREEN_H - TOP - BOTTOM) / plan.rows)));
  drawn.width = plan.cols * k; drawn.height = plan.rows * k;
  const c = drawn.getContext('2d');
  c.clearRect(0, 0, drawn.width, drawn.height);
  for (const { x: ox, y: oy, room, seen } of plan.rooms) {
    for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
      const mark = markAt(room, seen, x, y);
      if (mark) { c.fillStyle = SHOWN[mark]; c.fillRect((ox + x) * k, (oy + y) * k, k, k); }
    }
  }
}

export function drawMap(c, t, still) {
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  const head = `DEPTH ${plan.depth}`;
  drawText(c, head, Math.floor((W - textWidth(head)) / 2), 5, EMBER);
  const mx = Math.floor((W - drawn.width) / 2), my = TOP + Math.floor((SCREEN_H - TOP - BOTTOM - drawn.height) / 2);
  c.drawImage(drawn, mx, my);
  if (still || Math.floor(t / 400) % 2 === 0) { c.fillStyle = GOLD; c.fillRect(mx + plan.hero.x * k, my + plan.hero.y * k, k, k); }
  drawText(c, HINT, Math.floor((W - textWidth(HINT)) / 2), SCREEN_H - 12, GREY);
}
