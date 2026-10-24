// § tiles: every tile kind, keyed by id (D-040, D-048). `letter` is how a
// room map writes it. registry.js gathers this table with the other kinds.
// The stairs' glow: the art's stairs violet (#a58ce0), faint (D-134), and since
// D-194 half as bright, reaching 1 tile: the stairs and a touch beside them.
const GLOW = { reach: 1, cr: 0.325, cg: 0.275, cb: 0.44 };

export const TILES = {
  wall: { id: 'wall', kind: 'tile', letter: '#', name: 'Wall', solid: true, blocksLight: true },
  floor: { id: 'floor', kind: 'tile', letter: '.', name: 'Floor', solid: false, blocksLight: false },
  // One round tree a tile, in the woods (D-209): solid, and the view stops at it.
  tree: { id: 'tree', kind: 'tile', letter: 'T', name: 'Tree', solid: true, blocksLight: true },
  // The first cave's mouth on a woods edge, with a rock either side (D-211). Walking
  // off the edge from the mouth goes into the cave, as through any opening (D-197).
  caveMouth: { id: 'caveMouth', kind: 'tile', letter: 'M', name: 'Cave mouth', solid: false, blocksLight: false },
  outcrop: { id: 'outcrop', kind: 'tile', letter: 'R', name: 'Rock', solid: true, blocksLight: true },
  // A lump of veined rock on a cave floor, to mine later (D-282, D-310): solid, but light passes over it.
  deposit: { id: 'deposit', kind: 'tile', letter: 'O', name: 'Deposit', solid: true, blocksLight: false },
  // Stepping onto stairs takes them (D-130); they glow a faint, steady violet once found (D-134, D-194).
  stairsDown: { id: 'stairsDown', kind: 'tile', letter: '>', name: 'Stairs down', solid: false, blocksLight: false, leads: 'down', arrive: 'stairsUp', line: 'stairsDown', glow: GLOW },
  stairsUp: { id: 'stairsUp', kind: 'tile', letter: '<', name: 'Stairs up', solid: false, blocksLight: false, leads: 'up', arrive: 'stairsDown', line: 'stairsUp', glow: GLOW },
};

// Anything outside the map counts as wall, so rooms are always closed in.
export const OUTSIDE = '#';
