// § sight: which tiles are lit now, by the lantern, a burning torch, a glow (D-134) or daylight through the mouth (D-218). Plain
// data, no drawing. An enemy on a lit tile with a clear line to the hero sees them (D-126, D-226); it is
// drawn in memory's dim light too (D-153). A tile counts as lit by the rule that remembers it (D-059):
// the light reaches its centre, inside 95% of its reach. Torches count at
// their full reach, without their flicker.
import { CELL, LANTERN_AT, seenCells } from './light.js';
import { reach } from './oil.js';
import { get } from './registry.js';
import { mountAt } from './mount.js';
import { LIGHT_AT } from './lights.js';
import { glowsIn } from './stairs.js';
import { inDaylight } from './daytime.js';
import { mouthLight } from './mouth.js';
import { tileAt } from './room.js';

const TILE_SIZE = 16;
const NEAR = 0.95;

// The lantern's flame over the hero standing on x, y: the sprite sits 2 pixels up.
export const lanternFrom = (x, y) => ({ x: x * TILE_SIZE + LANTERN_AT.x, y: y * TILE_SIZE - 2 + LANTERN_AT.y });

// § sources: every light shining now, as { x, y, r } in pixels
export function lightsNow(state) {
  const out = state.lit ? [{ ...lanternFrom(state.hero.x, state.hero.y), r: reach(state.oil) }] : [];
  for (const l of state.lights) {
    const r = get(l.id).reach, m = mountAt(state.room, l.x, l.y);
    if (!r || !m) continue;
    const [ax, ay] = LIGHT_AT[m];
    out.push({ x: l.x * TILE_SIZE + ax, y: l.y * TILE_SIZE + ay, r: r * TILE_SIZE });
  }
  const sun = mouthLight(state); // daylight through the cave mouth (D-218)
  if (sun) out.push(sun);
  return out.concat(glowsIn(state.room, state.seen)); // a glow not yet found is no light (D-194)
}

// § lit: (state, x, y) → true when any light shining now reaches tile x, y
export function litAt(state, x, y) {
  if (inDaylight(state)) return true; // daylight lights every tile (D-209), until dusk (D-217)
  const { room } = state, cw = room.cols * TILE_SIZE / CELL;
  const mx = x * TILE_SIZE + TILE_SIZE / 2, my = y * TILE_SIZE + TILE_SIZE / 2;
  const cell = (my / CELL | 0) * cw + (mx / CELL | 0);
  return lightsNow(state).some((L) => {
    if (Math.hypot(mx - L.x, my - L.y) >= L.r * NEAR) return false;
    return seenCells(room, L.x, L.y, L.r, new Uint8Array(cw * room.rows * TILE_SIZE / CELL))[cell] === 1;
  });
}

// § clear line: (room, a, b) → true when no tile that blocks light stands on
// the straight line between the centres of tiles a and b (D-226). It walks
// the line in 3 pixel steps, as a light's ray does (light.js).
export function clearLine(room, a, b) {
  const x = a.x * TILE_SIZE + TILE_SIZE / 2, y = a.y * TILE_SIZE + TILE_SIZE / 2;
  const dx = (b.x - a.x) * TILE_SIZE, dy = (b.y - a.y) * TILE_SIZE, steps = Math.ceil(Math.hypot(dx, dy) / 3);
  for (let s = 1; s < steps; s++) {
    const tx = (x + dx * s / steps) >> 4, ty = (y + dy * s / steps) >> 4;
    if (tileAt(room, tx, ty).blocksLight) return false;
  }
  return true;
}
