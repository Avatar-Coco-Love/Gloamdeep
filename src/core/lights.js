// § lights: every light source kind, keyed by id (D-024, D-098). Lights sit on
// tiles, one per tile, in `state.lights`. registry.js gathers this table.
// `reach` is in tiles; the colour and flicker are the study torch's (study line 397).
export const LIGHTS = {
  torch: { id: 'torch', kind: 'light', name: 'Torch', reach: 3, cr: 1.2, cg: 0.78, cb: 0.42, flicker: 0.09 },
  // Gives no light until the hero lights it with the lantern; then it is a torch (D-121).
  unlitTorch: { id: 'unlitTorch', kind: 'light', name: 'Unlit torch', reach: 0, lightsTo: 'torch' },
};

// § lookups: the light on tile x, y, or undefined
export const lightAt = (state, x, y) => state.lights.find((l) => l.x === x && l.y === y);

// § open side: the floor tile a mounted light faces, where the hero stands to
// light it (D-121): below a face, beside a side mount. Null for no mount.
const OPEN = { face: [0, 1], left: [-1, 0], right: [1, 0] };
export function openSide(mount, x, y) {
  const d = OPEN[mount];
  return d ? { x: x + d[0], y: y + d[1] } : null;
}
