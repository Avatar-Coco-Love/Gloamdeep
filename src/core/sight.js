// § sight: which tiles are lit now, by the lantern, a burning torch or a glow (D-134). Plain
// data, no drawing. An enemy on a lit tile sees the hero (D-126); it is
// drawn in memory's dim light too (D-153). A tile counts as lit by the rule that remembers it (D-059):
// the light reaches its centre, inside 95% of its reach. Torches count at
// their full reach, without their flicker.
import { CELL, LANTERN_AT, seenCells } from './light.js';
import { reach } from './oil.js';
import { get } from './registry.js';
import { mountAt } from './mount.js';
import { LIGHT_AT } from './lights.js';
import { glowsIn } from './stairs.js';

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
  return out.concat(glowsIn(state.room));
}

// § lit: (state, x, y) → true when any light shining now reaches tile x, y
export function litAt(state, x, y) {
  const { room } = state, cw = room.cols * TILE_SIZE / CELL;
  const mx = x * TILE_SIZE + TILE_SIZE / 2, my = y * TILE_SIZE + TILE_SIZE / 2;
  const cell = (my / CELL | 0) * cw + (mx / CELL | 0);
  return lightsNow(state).some((L) => {
    if (Math.hypot(mx - L.x, my - L.y) >= L.r * NEAR) return false;
    return seenCells(room, L.x, L.y, L.r, new Uint8Array(cw * room.rows * TILE_SIZE / CELL))[cell] === 1;
  });
}
