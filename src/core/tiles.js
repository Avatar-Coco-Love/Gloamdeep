// § tiles: every tile kind, keyed by id (D-040, D-048). `letter` is how a
// room map writes it. registry.js gathers this table with the other kinds.
export const TILES = {
  wall: { id: 'wall', kind: 'tile', letter: '#', name: 'Wall', solid: true, blocksLight: true },
  floor: { id: 'floor', kind: 'tile', letter: '.', name: 'Floor', solid: false, blocksLight: false },
};

// Anything outside the map counts as wall, so rooms are always closed in.
export const OUTSIDE = '#';
