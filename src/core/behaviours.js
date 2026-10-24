// § behaviours: the ways a creature can act, keyed by id (D-263, D-269).
// A creature's entry in enemies.js names its ways in `ways`, and a new
// creature mixes them by name. Each way is plain data that the turn rules
// in turn.js read through `traits`; a later way in the list wins.
export const BEHAVIOURS = {
  // It comes for the hero a tile a turn once it notices them (D-126 to D-129):
  // from a lit tile along a clear line (D-226), or on a bite or a hit (D-157).
  chases: { id: 'chases', name: 'Chases', notices: 'inLight', moves: 'toward' },
  // It never steps onto a lit tile, backs out of light into the dark, and doesn't
  // bite while lit. It sees the hero along a clear line, lit or not (D-240, D-241, D-243).
  shunsLight: { id: 'shunsLight', name: 'Shuns light', notices: 'anyLine', intoLight: false, bitesLit: false, whenLit: 'backAway' },
  // Once hurt, it steps a tile a turn away from the hero until it dies or they
  // fall, and bites only when it can't step away (D-292).
  fleesHurt: { id: 'fleesHurt', name: 'Flees when hurt', whenHurt: 'flee' },
};

// § traits: (entry) → how the creature acts, its ways merged. With no way it
// never notices or moves, steps into light, bites lit or not, and never flees.
const BASE = { notices: null, moves: null, intoLight: true, bitesLit: true, whenLit: null, whenHurt: null };
export function traits(entry) {
  return Object.assign({ ...BASE }, ...(entry.ways ?? []).map((w) => {
    const { id, name, ...way } = BEHAVIOURS[w];
    return way;
  }));
}
