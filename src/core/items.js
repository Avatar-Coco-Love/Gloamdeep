// § items: every item kind, keyed by id (D-048, D-077). Items lie on floor
// tiles, one per tile, in `state.items`. registry.js gathers this table.
// Taken, a kind with `regrow` lies there again that many turns later, out of
// sight (regrow.js): a day for mushrooms and herbs, three for a flask (D-306).
import { DAY_TURNS } from './daytime.js';
// How far a mushroom's tone may shift (D-305, the owner's pick of three)
const MUSHROOM_TONE = { hue: 12, light: 7 };
export const ITEMS = {
  // Walking onto it puts it in the bag; poured from there into the lantern,
  // never above full (D-078, D-247). Over a full stack it stays, with its
  // `full` line (D-250).
  flask: { id: 'flask', kind: 'item', name: 'Oil flask', oil: 0.45, bag: true, full: 'flaskFull', regrow: 3 * DAY_TURNS },
  // Walking onto it heals 2 hearts, never above full; at full health it is
  // left on the floor for later (D-155, D-156).
  // The first weapon (D-252): walking onto it puts it in the hero's hand, in the
  // held slot apart from the bag, with its line. Held, it hits for `hit` in
  // place of the lantern's 1. It lies only in depth 2's first room, and not
  // while the hero holds one (cave.js, stairs.js).
  knife: { id: 'knife', kind: 'item', name: 'Knife', hit: 2, hold: true, says: 'knifeTake' },
  herb: { id: 'herb', kind: 'item', name: 'Healing herb', heal: 2, says: 'herbEat', regrow: DAY_TURNS },
  // The first resource (D-296): an amber mushroom, one in every generated room.
  // Walking onto it puts it in the bag with one of its `says` lines, in turn;
  // choosing its slot in the bag says one of its `look` lines (D-297). Make,
  // in the bag, turns `of` of them into one `into`, with its `says` line (D-299).
  // Each one a room lays out shifts its cap's colour by up to `tone`: degrees of
  // hue and points of lightness, either way (tones.js, D-305).
  oilcap: { id: 'oilcap', kind: 'item', name: 'Oilcap', bag: true, says: 'oilcapTake', look: 'oilcapLook', full: 'oilcapFull', tone: MUSHROOM_TONE, regrow: DAY_TURNS,
    craft: { into: 'flask', of: 3, says: 'flaskMake' } },
  // A bright red mushroom in about half the rooms (D-303), into the bag the
  // oilcap's way, with its own lines and its own tones. Eating it and its potion come later.
  heartcap: { id: 'heartcap', kind: 'item', name: 'Heartcap', bag: true, says: 'heartcapTake', look: 'heartcapLook', full: 'heartcapFull', tone: MUSHROOM_TONE, regrow: DAY_TURNS },
};
