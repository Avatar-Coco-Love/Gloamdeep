// § tiles: what each letter in a room map means (D-040). Step 11 grows this
// same table into the full content registry (TECH.md, "One content registry").
export const TILES = {
  '#': { id: 'wall', name: 'Wall', solid: true, blocksLight: true },
  '.': { id: 'floor', name: 'Floor', solid: false, blocksLight: false },
};

// Anything outside the map counts as wall, so rooms are always closed in.
export const OUTSIDE = '#';
