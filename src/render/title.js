// § title: the title screen, the lantern in the dark (D-181). Pitch black,
// the hero on crypt floor in the lantern's dithered light, the name glowing
// warm above, carved, and a small flame marking the chosen line. Drawn with the
// game's own tiles, sprite, light and font.
import { makeRoom } from '../core/room.js';
import { LANTERN, LANTERN_AT } from '../core/light.js';
import { reach } from '../core/oil.js';
import { W, H, SCREEN_H, TILE } from './screen.js';
import { drawRoom } from './tiles.js';
import { drawHero } from './sprites.js';
import { drawLight, flicker } from './light.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawLines, drawHeading } from './menu.js';

const K = '#0e0c16', GOLD = '#ffd66b', EMBER = '#f39a3b', CORE = '#fff5d6';
const NAME = 'Gloamdeep', NAME_Y = 28, NAME_SCALE = 2; // the name at double size
const HERO = { x: 5, y: 6 }; // the middle of the room, in tiles
const LIGHT_OIL = 0.5; // a half-full lantern: the light stays between the name and the menu
export const MENU_Y = 166; // the first menu line's top

// § scene: the floor, drawn once; no tile is remembered, so only the light shows it
const room = makeRoom(Array.from({ length: H / TILE }, () => '.'.repeat(W / TILE)));
const unseen = new Uint8Array(room.cols * room.rows);
let floor = null, name = null;
function paint() {
  floor = document.createElement('canvas');
  floor.width = W; floor.height = H;
  drawRoom(floor.getContext('2d'), room);
  // § name: carved (D-186): a dark outline all round and an ember edge
  // underneath, drawn small once, then doubled with crisp pixels
  const w = textWidth(NAME), small = document.createElement('canvas');
  small.width = w + 2; small.height = FONT_H + 3;
  const s = small.getContext('2d');
  for (let dx = 0; dx <= 2; dx++) for (let dy = 0; dy <= 3; dy++) drawText(s, NAME, dx, dy, K);
  drawText(s, NAME, 1, 2, EMBER);
  drawText(s, NAME, 1, 1, GOLD);
  name = small;
}

const lights = [{ ...LANTERN, x: 0, y: 0, r: 0 }]; // reused every frame (TECH.md)
// menu: [{ text }]; chosen: its index; still: prefers-reduced-motion; heading: a page's name (Settings)
export function drawTitle(c, menu, chosen, t, still, heading = null) {
  if (!floor) paint();
  c.fillStyle = K; c.fillRect(0, 0, W, SCREEN_H);
  c.drawImage(floor, 0, 0);
  const hx = HERO.x * TILE, hy = HERO.y * TILE;
  drawHero(c, hx, hy);
  const L = lights[0];
  L.x = hx + LANTERN_AT.x; L.y = hy - 2 + LANTERN_AT.y;
  L.r = reach(LIGHT_OIL) * (still ? 1 : flicker(t, 1.7, 0.035));
  drawLight(c, room, lights, unseen);
  c.fillStyle = CORE; c.fillRect(L.x, L.y, 1, 1); // the flame's core is always bright
  c.drawImage(name, Math.floor((W - name.width * NAME_SCALE) / 2), NAME_Y, name.width * NAME_SCALE, name.height * NAME_SCALE);
  if (heading) drawHeading(c, heading, MENU_Y);
  drawLines(c, menu, chosen, MENU_Y, t, still);
}
