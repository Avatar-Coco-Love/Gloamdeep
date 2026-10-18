// § oil: how much oil the lantern holds, and how far that lets its light
// reach (D-014). Plain data, no drawing. Oil runs from 0 (empty) to 1 (full).
// The amounts are style study 1's (lines 278, 394), burning a third slower (D-064, D-069),
// starting with a full tank (D-142).

const TILE_SIZE = 16;
export const OIL = { start: 1, burn: 1 / 60 };

// Each passed turn burns a little, even standing still (D-037). Counted in
// whole burns so 60 empty a full tank exactly, with no rounding drift.
export const burnOil = (oil) => Math.max(0, Math.round(oil / OIL.burn - 1) * OIL.burn);

// § reach: 1.6 tiles plus 3.6 per full tank; an empty lantern is a 0.9-tile ember (D-015).
export const reach = (oil) => (oil > 0 ? 1.6 + 3.6 * oil : 0.9) * TILE_SIZE;

// § set: (state, amount) → new state, for the dev Refill and Empty buttons (D-066)
export const setOil = (state, oil) => ({ ...state, oil: Math.max(0, Math.min(1, oil)) });
