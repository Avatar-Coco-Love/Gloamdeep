// § map screen: a floor, in a box like the hearts' over the room under its
// veil (D-205), "DEPTH 3" inside at the top between an up arrow and a down
// arrow that turn the map a floor, ember while there is a floor that way,
// else greyed (D-206). Each room is
// drawn small from the tiles remembered: floors in the floor's grey, walls
// beside them in the brick's top edge, found stairs in their violet, the
// hero a blinking gold dot on their own floor (still with reduced motion).
// Rooms sit a tile apart, a dark seam between them, and a pale blue line
// bridges each doorway found (D-224). It scrolls and zooms
// in its window (the view, core/map.js); a tap outside the box closes it (main.js).
// In the Seed Explorer (D-214) a bar at the box's bottom shows the seed, with
// Back on its left and Type and Reseed on its right; the window is shorter.
import { W, SCREEN_H } from './screen.js';
import { drawText, textWidth } from './font.js';
import { veil } from './menu.js';
import { markAt } from '../core/map.js';
import { areaAt } from '../core/room.js';

const K = '#0e0c16', LINE = '#2a2636', EMBER = '#f39a3b', GOLD = '#ffd66b', DIM = '#46405a';
const SHOWN = { floor: '#363b48', wall: '#69748b', stairs: '#a58ce0' }; // ART-DIRECTION.md
// Walls in each room's own tone, and the heading's area name in its floor's (D-233):
// crypt brick, cave rock, warren earth, the dungeon's cold blue (D-229), woods green
const TONE = { crypt: '#69748b', rock: '#7a8396', earth: '#8e7a62', dungeon: '#4c5a84', woods: '#4f8a3f' };
const wallOf = (room) => TONE[room.look] || SHOWN.wall;
const DOOR = '#a6e0e4'; // the cloak's pale blue, not the stairs' violet or the lantern's amber
// The box, 8 pixels in from the picture's edges, and the map's window inside it, under the heading
export const BOX = { x: 8, y: 8, w: W - 16, h: SCREEN_H - 16 };
export const VIEW = { x: BOX.x + 4, y: BOX.y + 16, w: BOX.w - 8, h: BOX.h - 20 };
const BAR_H = 24; // the Explorer's bar, its line above included
export const EXPLORE_VIEW = { ...VIEW, h: VIEW.h - BAR_H };
const BAR = { y: EXPLORE_VIEW.y + EXPLORE_VIEW.h + 2, h: BAR_H - 4 }; // the buttons' row, under a line and a gap
// The bar's buttons, left to right, each just wide enough for its word; the seed fills the space between
const button = (id, text, x) => ({ id, text, x, w: textWidth(text) + 6 });
const back = button('back', 'BACK', BOX.x + 4), reseed = button('reseed', 'RESEED', 0), type = button('type', 'TYPE', 0);
reseed.x = BOX.x + BOX.w - 4 - reseed.w; type.x = reseed.x - 3 - type.w;
const BUTTONS = [back, type, reseed];
// Which button a tap at x, y presses, its id, or null; a tap anywhere in the bar
// goes to the nearest button on its side of the seed, so no tap is lost
export function barAt(x, y) {
  if (!inBox(x, y) || y < BAR.y - 2) return null;
  if (x < BUTTONS[0].x + BUTTONS[0].w + 4) return 'back';
  if (x >= BUTTONS[2].x - 1) return 'reseed';
  if (x >= BUTTONS[1].x - 4) return 'type';
  return null;
}
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
      if (mark) { c.fillStyle = mark === 'wall' ? wallOf(room) : SHOWN[mark]; c.fillRect((ox + x) * k, (oy + y) * k, k, k); }
    }
  }
  c.fillStyle = DOOR;
  for (const { x, y } of plan.doors) c.fillRect(x * k, y * k, k, k);
}

// The Explorer's bar: bar.seed the seed shown, bar.back whether Back has a seed to go to
function drawBar(c, bar) {
  c.fillStyle = LINE; c.fillRect(BOX.x + 1, BAR.y - 2, BOX.w - 2, 1);
  for (const b of BUTTONS) {
    const on = b.id !== 'back' || bar.back;
    c.fillStyle = LINE;
    c.fillRect(b.x, BAR.y, b.w, 1); c.fillRect(b.x, BAR.y + BAR.h - 1, b.w, 1);
    c.fillRect(b.x, BAR.y, 1, BAR.h); c.fillRect(b.x + b.w - 1, BAR.y, 1, BAR.h);
    drawText(c, b.text, b.x + 3, BAR.y + 6, on ? EMBER : DIM);
  }
  const text = `SEED ${bar.seed}`, left = BUTTONS[0].x + BUTTONS[0].w, right = BUTTONS[1].x;
  drawText(c, text, Math.floor((left + right - textWidth(text)) / 2), BAR.y + 6, GOLD);
}

// view: { k, x, y } (core/map.js); turns: { up, down }, whether each arrow turns the map;
// bar: the Explorer's seed and Back (drawBar), or null in the game
export function drawMap(c, view, t, still, turns, bar = null) {
  if (view.k !== k) redraw(view.k);
  veil(c);
  const { x, y, w, h } = BOX;
  c.fillStyle = K; c.fillRect(x, y, w, h);
  c.fillStyle = LINE;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
  c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
  // As the strip says it (D-209), then the area's name in its tone (D-233)
  const depth = plan.depth === 0 ? 'SURFACE' : `DEPTH ${plan.depth}`, area = areaAt(plan.depth);
  const name = area ? ` · ${area.area}` : '', head = depth + name;
  const hx = Math.floor((W - textWidth(head)) / 2);
  drawText(c, depth, hx, y + 5, EMBER);
  if (area) drawText(c, name, hx + textWidth(depth), y + 5, TONE[area.look]);
  arrow(c, hx - GAP - 5, y + 7, false, turns.up ? EMBER : DIM);
  arrow(c, hx + textWidth(head) + GAP, y + 7, true, turns.down ? EMBER : DIM);
  if (bar) drawBar(c, bar);
  const win = bar ? EXPLORE_VIEW : VIEW;
  c.save();
  c.beginPath(); c.rect(win.x, win.y, win.w, win.h); c.clip();
  const mx = win.x - view.x, my = win.y - view.y;
  c.drawImage(drawn, mx, my);
  if (plan.hero && (still || Math.floor(t / 400) % 2 === 0)) { c.fillStyle = GOLD; c.fillRect(mx + plan.hero.x * k, my + plan.hero.y * k, k, k); }
  c.restore();
}
