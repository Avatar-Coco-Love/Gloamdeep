// § items: every item kind, keyed by id (D-048, D-077). Items lie on floor
// tiles, one per tile, in `state.items`. registry.js gathers this table.
export const ITEMS = {
  // Walking onto it puts it in the bag; poured from there into the lantern,
  // never above full (D-078, D-247). Over a full stack it stays, with its
  // `full` line (D-250).
  flask: { id: 'flask', kind: 'item', name: 'Oil flask', oil: 0.45, bag: true, full: 'flaskFull' },
  // Walking onto it heals 2 hearts, never above full; at full health it is
  // left on the floor for later (D-155, D-156).
  // The first weapon (D-252): walking onto it puts it in the hero's hand, in the
  // held slot apart from the bag, with its line. Held, it hits for `hit` in
  // place of the lantern's 1. It lies only in depth 2's first room, and not
  // while the hero holds one (cave.js, stairs.js).
  knife: { id: 'knife', kind: 'item', name: 'Knife', hit: 2, hold: true, says: 'knifeTake' },
  herb: { id: 'herb', kind: 'item', name: 'Healing herb', heal: 2, says: 'herbEat' },
  // The first resource (D-296): an amber mushroom, one in every generated room.
  // Walking onto it puts it in the bag with one of its `says` lines, in turn;
  // choosing its slot in the bag says one of its `look` lines (D-297).
  oilcap: { id: 'oilcap', kind: 'item', name: 'Oilcap', bag: true, says: 'oilcapTake', look: 'oilcapLook', full: 'oilcapFull' },
};
