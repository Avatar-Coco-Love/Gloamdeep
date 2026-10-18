// § lights: every light source kind, keyed by id (D-024, D-098). Lights sit on
// tiles, one per tile, in `state.lights`. registry.js gathers this table.
// `reach` is in tiles; the colour and flicker are the study torch's (study line 397).
export const LIGHTS = {
  torch: { id: 'torch', kind: 'light', name: 'Torch', reach: 3, cr: 1.2, cg: 0.78, cb: 0.42, flicker: 0.09 },
};

// § lookups: the light on tile x, y, or undefined
export const lightAt = (state, x, y) => state.lights.find((l) => l.x === x && l.y === y);
