# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.26 · **Stage:** 0.3, the world (D-168)

## Next up
**Step 50, day and night outside** (D-025): the woods' daylight turns
to night and back. Read D-025, D-209 and D-210 first, then propose.

## Waiting on the owner
- Play 0.2.17 sideways: should the room fill the whole screen (Q-048)?
- The starting region's name (Q-045), any time.
- A bestiary: is there one, and does how to fight live there (Q-047)?
- Add the setup script line from the 0.2.1 PR to the cloud environment,
  so each conversation starts on the latest `main`.

## Build plan: stage 0.3, the world (D-168, order approved; may change)
Steps 1 to 30 are done; the list is in `archive/PROGRESS-LOG.md`. Tick
a step when merged and add its version.

- [x] 31 to 33, 0.1.27 to 0.2.1 · 42 The starting region, 0.2.6
The main menu (D-177 to D-181; step order proposed, may change)
- [x] 52 to 58: title screen, pause menu, Settings, motion, the seed,
  seeded first rooms, How to play, 0.2.7 to 0.2.13
Getting around
- [x] 43 Stairs must be found: dimmer, only where fog has lifted, 0.2.14
- [x] 44 The camera: a room bigger than the screen scrolls, 0.2.15
- [x] 45 Side openings: walk off an edge into the next room, 0.2.16
A region
- [x] 46 A region's layout from the seed, rooms joined by openings, 0.2.19
- [x] 46b Stairs line up between floors; depths 4 and 5 as grids, 0.2.20
- [x] 47 The map screen, and dev Reveal map, 0.2.21
- [x] 47b The map turns between floors, 0.2.22
The surface
- [x] 48b A lantern that switches itself, in Settings, 0.2.24
- [x] 48 The first outside room: woods, 0.2.23
- [x] 49 A cave entrance into the first cave, 0.2.25
- [x] 49b Depths move up one: the crypt is depth 0, 0.2.26
- [ ] 50 Day and night outside (D-025)
- [ ] 51 Daylight through the cave mouth (D-173)

Stage 0.2 steps waiting (D-168): 34 more rats deeper, 35 deepest depth
kept, 36 a proper fall, 37 saving, 38 a second creature, 39 experience,
40 levels, 41 first gear.

UI and dev tools (the owner's wish, before step 46)
- [x] U1 Sideways, the room uses the sides, 0.2.17
- [x] U2 The dev side drawer, in the pixel font, 0.2.18

Ideas for later: a Depth Meter to find or craft (the owner's idea); polish the outside art, and many generated looks for cave mouths (the owner's wish); menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); sounds; scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-20, 0.2.24, the lantern by itself.** Settings gains
  "Lantern: By hand"; set to By itself, the lantern goes out as you step
  into daylight and lights again back in the dark, only at that moment.
  Owner's picks: daylight only, By hand until picked, your switch
  holds, no line (D-210). Playtest: https://claude.ai/artifact/1Mh56fEwSg9iVqd6Awtn7Q
- **2026-10-20, 0.2.25, the cave mouth.** A dark mouth between two grey
  rocks on a woods edge the seed picks; walk through and you arrive on
  the crypt's facing side (up: the south room's bottom). Owner's picks
  from a mock-up of three looks (D-211). The owner's idea: a doorway
  keeps the depth, so the crypt becomes depth 0 next (D-212). Playtest: https://claude.ai/artifact/SAtpqZnboGwGDmHL9vZHWK
- **2026-10-21, 0.2.26, depths move up one.** The crypt is depth 0 and
  says SURFACE, the second room depth 1, the rock grids 2 to 4, earth
  from 5. Owner's picks: a seed keeps its rooms, the surface map shows
  the part you're in, dev Go to depth from 0 (D-213). D-201 to D-208
  archived. Playtest: https://claude.ai/artifact/9vZTdyesaddiWDq9hvgsNv
