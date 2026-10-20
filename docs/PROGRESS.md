# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.4 · **Stage:** 0.3, the world (D-168)

## Next up
**Step 42, design the starting region.** Read `WORLD.md`, then Q-036,
Q-037, Q-038 and Q-043. With the owner, one multiple choice round at a
time: its name, grid size, used cells, kinds of room, landmarks, cave
entrances, NPC houses, promises for every seed. Write its rule sheet in
`docs/regions/`. Docs only, build nothing.

## Waiting on the owner
- Add the setup script line from the 0.2.1 PR to the cloud environment,
  so each conversation starts on the latest `main`.

## Build plan: stage 0.3, the world (D-168, order approved; may change)
Steps 1 to 30 are done; the list is in `archive/PROGRESS-LOG.md`. Tick
a step when merged and add its version.

- [x] 31 Plan 0.2, 0.1.27 · 32 Natural caves, 0.2.0 · 33 Depths change
  kind, 0.2.1
- [ ] 42 Design the starting region (docs only)
Getting around
- [ ] 43 Stairs must be found: dimmer, only where fog has lifted (D-174)
- [ ] 44 The camera: a room bigger than the screen scrolls (D-172)
- [ ] 45 Side openings: walk off an edge into the next room (D-171)
A region
- [ ] 46 A region's layout from the seed, rooms joined by openings
- [ ] 47 The map screen, and dev Reveal map (D-176)
The surface
- [ ] 48 The first outside room: woods (Q-034)
- [ ] 49 A cave entrance down to the first cave (D-175, Q-043)
- [ ] 50 Day and night outside (D-025)
- [ ] 51 Daylight through the cave mouth (D-173)

Stage 0.2 steps waiting (D-168): 34 more rats deeper, 35 deepest depth
kept, 36 a proper fall, 37 saving, 38 a second creature, 39 experience,
40 levels, 41 first gear.

Soon, at the owner's wish: a main menu with its options, then UI and
dev tool improvements (Q-044); where it fits in the plan is asked then.

Ideas for later: landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); sounds; scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-19, 0.2.2, stairs that match the place.** Owner's picks of
  options shown: in grey rock and earth the steps are pale stone with
  violet lips, in a square opening of the ground's colour that darkens
  going down, inside a dark rim; the crypt keeps its stairs. Rough-cut
  steps and a dug hole were too distorted (D-167). Playtest:
  https://claude.ai/artifact/B2Futybpzz4XofbEzZggL7
- **2026-10-19, 0.2.3, ideas from a surface sketch.** At the owner's
  request, a sketch (not in the game) of a woods clearing with a cave
  mouth, at morning, noon, dusk or night. Owner's notes: trees need
  work, and a lantern shadow should follow a tree's shape, not its whole
  tile; tree kinds, wind, weather and sun or moon shadows are for later
  (Q-034, Q-035). Sketch:
  https://claude.ai/artifact/NNdk6rD2Cgg1FkNguoaKg4
- **2026-10-19, 0.2.4, the world planned.** The owner's ideas for the
  world: regions as grids of rooms with their own rules, ways between
  rooms that line up, rooms of every size with a following camera,
  light through openings, stairs that must be found, a world map. Owner's
  picks: stage 0.3 is the world, next; today's game becomes the first
  cave. Written in `WORLD.md` (D-168 to D-176, Q-036 to Q-043). The
  owner approved the stage 0.3 order and asked for a main menu soon.
