// § fog: which tiles the hero remembers (ART-DIRECTION.md, "Light"). Plain
// data, no drawing. `state.seen` holds one byte per tile, 1 once the lantern
// has reached it. A tile counts as seen when the light reaches its centre,
// inside 95% of its reach (the study's rule, line 410; D-059).
import { CELL, seenCells } from './light.js';

const TILE_SIZE = 16;
const NEAR = 0.95;

export const blankMemory = (room) => new Uint8Array(room.cols * room.rows);

// (state, light) → new state with the tiles that light reaches remembered.
// `light`: { x, y, r } in pixels. The same state comes back when nothing is new.
export function remember(state, light) {
  const { room } = state, cw = room.cols * TILE_SIZE / CELL;
  const vis = seenCells(room, light.x, light.y, light.r, new Uint8Array(cw * room.rows * TILE_SIZE / CELL));
  let seen = state.seen;
  for (let ty = 0; ty < room.rows; ty++) for (let tx = 0; tx < room.cols; tx++) {
    const i = ty * room.cols + tx;
    if (seen[i]) continue;
    const mx = tx * TILE_SIZE + TILE_SIZE / 2, my = ty * TILE_SIZE + TILE_SIZE / 2;
    if (!vis[(my / CELL | 0) * cw + (mx / CELL | 0)] || Math.hypot(mx - light.x, my - light.y) >= light.r * NEAR) continue;
    if (seen === state.seen) seen = seen.slice(); // copy once, the old state is not changed
    seen[i] = 1;
  }
  return seen === state.seen ? state : { ...state, seen };
}

// § daylight: (state) → new state with every tile of the room remembered, as
// daylight shows it all (D-209). The same state comes back when nothing is new.
export const rememberAll = (state) => (state.seen.every(Boolean) ? state : { ...state, seen: new Uint8Array(state.seen.length).fill(1) });

// § forget: a blank memory (the dev "Forget" button and "Reset room", D-061, D-062)
export const forget = (state) => ({ ...state, seen: blankMemory(state.room) });
