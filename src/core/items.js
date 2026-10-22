// § items: every item kind, keyed by id (D-048, D-077). Items lie on floor
// tiles, one per tile, in `state.items`. registry.js gathers this table.
export const ITEMS = {
  // Walking onto it puts it in the bag; poured from there into the lantern,
  // never above full (D-078, D-247). Over a full stack it stays, with its
  // `full` line (D-250).
  flask: { id: 'flask', kind: 'item', name: 'Oil flask', oil: 0.45, bag: true, full: 'flaskFull' },
  // Walking onto it heals 2 hearts, never above full; at full health it is
  // left on the floor for later (D-155, D-156).
  herb: { id: 'herb', kind: 'item', name: 'Healing herb', heal: 2, says: 'herbEat' },
};
