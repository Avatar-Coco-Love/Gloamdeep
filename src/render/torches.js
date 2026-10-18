// § torches: wall torches as in style study 1 (lines 358–363, 396–399,
// 437–445). The bracket is drawn before the light, so the light falls on it;
// the flame and its embers are drawn after, always bright (ART-DIRECTION.md).
// Each torch takes the look of its mount (D-099); a side mount pokes out over
// the open tile next to it.
import { get } from '../core/registry.js';
import { mountAt } from '../core/mount.js';
import { hash } from '../core/noise.js';
import { flicker } from './light.js';
import { TILE as T } from './screen.js';

const K = '#0e0c16', N = '#6b4a33', NL = '#9c6f45'; // outline, wood, wood highlight
const FLAME_Y = '#f39a3b', FLAME_y = '#ffd66b', CORE = '#fff5d6';

// [x, y, w, h, colour] in the torch's tile, drawn in order. 'face' is the
// study's bracket; 'right' is the side one, 'left' its mirror (D-099).
const BRACKET = {
  face: [[6, 8, 4, 1, K], [7, 9, 2, 4, K], [7, 7, 2, 1, N], [7, 9, 2, 3, N], [7, 9, 1, 3, NL]],
  right: [[15, 8, 1, 5, K], [16, 11, 3, 1, K], [16, 8, 4, 1, K], [17, 7, 2, 1, N], [16, 9, 3, 2, N], [16, 9, 3, 1, NL]],
};
BRACKET.left = BRACKET.right.map(([x, y, w, h, c]) => [16 - x - w, y, w, h, c]);
// How far the flame sits from the study's spot, and where the light comes from.
const FLAME_DX = { face: 0, right: 10, left: -10 };
const LIGHT_AT = { face: [8, 13], right: [18, 10], left: [-2, 10] };

const mounted = (room, lights) => lights.map((l) => ({ l, m: mountAt(room, l.x, l.y) })).filter((e) => e.m);

// § brackets: before the light
export function drawBrackets(c, room, lights) {
  for (const { l, m } of mounted(room, lights)) {
    for (const [x, y, w, h, col] of BRACKET[m]) { c.fillStyle = col; c.fillRect(l.x * T + x, l.y * T + y, w, h); }
  }
}

// § glow: each torch as a light for drawLight, its reach and colour flickering
// together by about ±9% (study line 397); still with reduced motion. Fills `out`.
export function torchLights(room, lights, t, still, out) {
  out.length = 0;
  mounted(room, lights).forEach(({ l, m }, i) => {
    const e = get(l.id), f = still ? 1 : flicker(t, i * 3.1, e.flicker), [ax, ay] = LIGHT_AT[m];
    out.push({ x: l.x * T + ax, y: l.y * T + ay, r: e.reach * T * f, cr: e.cr * f, cg: e.cg * f, cb: e.cb * f });
  });
  return out;
}

// § flames: after the light. Three frames of sway, 110 ms each, and embers that
// rise and drift (study lines 437–445). No sway or embers with reduced motion.
const embers = [];
let emberCount = 0;
export function drawFlames(c, room, lights, t, still) {
  mounted(room, lights).forEach(({ l, m }, i) => {
    const x0 = l.x * T + FLAME_DX[m], y0 = l.y * T, ph = still ? 0 : Math.floor(t / 110 + i) % 3;
    c.fillStyle = FLAME_Y; c.fillRect(x0 + 6, y0 + 4, 4, 3);
    c.fillStyle = FLAME_y; c.fillRect(x0 + 7, y0 + 3, 2, 4); c.fillRect(x0 + [7, 8, 7][ph], y0 + 2 - (ph === 1 ? 1 : 0), 1, 2);
    c.fillStyle = CORE; c.fillRect(x0 + 7, y0 + 5, 2, 2);
    // the study's 1 in 20 chance a frame, from noise rather than Math.random
    if (!still && hash(emberCount++, i, 7) < 0.05) embers.push({ x: x0 + 7 + hash(emberCount, i, 8) * 2, y: y0 + 3, life: 1 });
  });
  for (let i = embers.length - 1; i >= 0; i--) {
    const e = embers[i];
    if ((e.life -= 0.02) <= 0 || still) { embers.splice(i, 1); continue; }
    e.y -= 0.25; e.x += Math.sin(e.y * 0.5) * 0.15;
    c.fillStyle = e.life > 0.5 ? FLAME_y : FLAME_Y; c.fillRect(Math.round(e.x), Math.round(e.y), 1, 1);
  }
}
