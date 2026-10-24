# Glossary

The game's words, what each means, and the decision behind it (D-264).
Use these words in the game, the docs and the code, so names stay the
same as the world grows. A new word goes here when it is decided. Where
this page and a decision disagree, the decision wins.

## The journey
- **Journey:** one game, kept on this device, saved after every turn
  (D-019, D-238). Not a "run": the world stays and the journey goes on.
- **Seed:** the number that sets a world's randomness; the same seed
  makes the same world (D-019, D-148).
- **Fall:** what happens at 0 hearts: the hero lies down and wakes at
  the start, keeping their level (D-234, D-246).
- **Record:** the deepest depth walked to, kept for good (D-232, D-260).

## The world (more in `WORLD.md`)
- **World, region, cell, room, opening:** see `WORLD.md`, "Words we
  use" (D-169, D-171). In the code a room is a "place".
- **Surface:** depth 0, the woods and the way into the crypt (D-233).
- **Depth:** how far down a floor is. **Floor:** all the rooms at one
  depth.
- **Area:** a depth's kind of place: Crypt (1), Cave (2 to 4), Warren
  (5 to 7), Dungeon (8 on) (D-233).

## The hero
- **Hearts:** the hero's health, 5, and up to 5 more bought (D-115, D-293). **LV:** the level (D-246).
- **Embers:** 1 for each level past the first, spent in Growth (D-293).
- **Experience:** 1 per creature beaten and per new room (D-245).
- **Lantern, oil:** the light the hero carries and what it burns.
- **Flask:** oil to pour into the lantern, from the bag (D-247, D-249).
- **Bag:** what the hero carries, in stacks of up to 3 (D-247, D-250).
- **Oilcap:** an amber mushroom, the first resource, one in every
  generated room; 3 make an oil flask (D-296, D-299).
- **Heartcap:** a bright red mushroom in about half the rooms; Eat, in the
  bag, heals 1 heart (D-303, D-308); its potion comes later.
- **Eat:** the bag's button for a heartcap (D-308).
- **Tone:** a mushroom's own slight shift of colour (D-304, D-305).
- **Grow back:** a picked thing returning after its time (D-306).
- **Craft, Make:** turning things in the bag into another; Make is its
  button in the bag (D-299).
- **Gear, held:** what the hero holds in hand, first the knife (D-252).

## Creatures
- **Rat:** chases once it notices the hero (D-126, D-226), and once hurt flees for 4 turns or stands its ground, on a coin toss (D-292, D-301).
- **Gloamling:** chases, and shuns light (D-240).
- **Chases, Shuns light:** the ways creatures have so far (D-269).

## Menus and tools
- **Journal:** one book with tabs: Records first, then Growth, later
  quests, a bestiary and feats (D-262, D-293).
- **Growth:** the Journal's tab for spending embers (D-293).
- **Records:** the Journal's facts about how you've played: deepest,
  beaten, falls, rooms found, steps, flasks poured, torches lit, time played
  (D-262, D-270, D-283, D-285, D-286, D-291).
- **Seed Explorer:** the title's map of a whole seed (D-214).
- **Dev tools:** on for everyone (D-086, `DEV-TOOLS.md`).

## In the code (D-263)
- **Event:** one thing that happened in a turn ("rat died"); each turn
  writes a short list of them, `state.events`; the kinds are listed in
  `src/core/events.js` (D-267).
- **Profile:** one person's save on a device, in one of 3 slots: a
  name, a look, Records, its play time (D-290) and their own journey (D-268).
- **Slot:** one of the 3 places for a profile; empty or in use (D-268).
- **Slot screen, Profiles:** where the game opens, to pick, start or
  delete a profile (D-271).
- **Name pad:** the page of letters for naming a new profile (D-272), or
  renaming one (D-273).
- **Cloak, eyes, trim, clothes, look:** a profile's look is what its hero
  wears: the cloak's colour, the eyes' colour and the lantern's trim (its
  cap and base), six of each, and the clothes, four shapes (Cloak, Belted,
  Short, Tattered), chosen after the name or with Change look on the slot
  screen (D-275 to D-278, D-289).
- **Behaviour, way:** a reusable way a creature acts, named in its
  registry entry's `ways`, defined in `src/core/behaviours.js` (D-269).
- **Registry:** the one list of all content (TECH.md, D-048).
