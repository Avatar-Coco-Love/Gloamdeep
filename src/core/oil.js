// § oil: how much oil the lantern holds, and how far that lets its light
// reach (D-014). Plain data, no drawing. Oil runs from 0 (empty) to 1 (full).
// The amounts are style study 1's (lines 278, 394, 475; D-064).

const TILE_SIZE = 16;
export const OIL = { start: 0.75, burn: 0.025 };

// Each passed turn burns a little, even standing still (D-037). Rounded to
// thousandths so 40 burns empty a full tank exactly.
export const burnOil = (oil) => Math.max(0, Math.round((oil - OIL.burn) * 1000) / 1000);

// § reach: 1.6 tiles plus 3.6 per full tank; an empty lantern is a 0.9-tile ember (D-015).
export const reach = (oil) => (oil > 0 ? 1.6 + 3.6 * oil : 0.9) * TILE_SIZE;

// § set: (state, amount) → new state, for the dev Refill and Empty buttons (D-066)
export const setOil = (state, oil) => ({ ...state, oil: Math.max(0, Math.min(1, oil)) });
