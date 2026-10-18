// § items: every item kind, keyed by id (D-048, D-077). Items lie on floor
// tiles, one per tile, in `state.items`. registry.js gathers this table.
export const ITEMS = {
  // Walking onto it pours it into the lantern, even a full one (D-078).
  flask: { id: 'flask', kind: 'item', name: 'Oil flask', oil: 0.45 },
};
