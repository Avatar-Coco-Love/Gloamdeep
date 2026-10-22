# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.41 · **Stage:** 0.2, the last steps (36 to 41), in the
world of 0.3 (D-168, D-237)

## Next up
**37 Saving** (stage 0.2, D-168): the journey kept on this device, with
Continue on the title once it works (D-178). Read D-019, D-021 and D-178
before proposing.

## Waiting on the owner
- Play 0.2.17 sideways: should the room fill the whole screen (Q-048)?
- The starting region's name (Q-045), any time.
- When creatures should show their next move (Q-049), any time.
- A bestiary: is there one, and does how to fight live there (Q-047)?
- Add the setup script line from the 0.2.1 PR to the cloud environment,
  so each conversation starts on the latest `main`.

## Build plan: stage 0.3, the world (D-168, order approved; may change)
Steps 1 to 30 are done; the list is in `archive/PROGRESS-LOG.md`. Tick
a step when merged and add its version.

- [x] 31 to 33, 0.1.27 to 0.2.1 · 42 The starting region, 0.2.6
The main menu (D-177 to D-181; step order proposed, may change)
- [x] 52 to 58: the title screen to How to play, 0.2.7 to 0.2.13
Getting around, a region
- [x] 43 to 45: stairs to find, the camera, side openings, 0.2.14 to 0.2.16
- [x] 46 to 47b: a region's layout to turning floors, 0.2.19 to 0.2.22
The surface
- [x] 48, 48b The woods; a lantern that switches itself, 0.2.23, 0.2.24
- [x] 49 A cave entrance into the first cave, 0.2.25
- [x] 49b Depths move up one: the crypt is depth 0, 0.2.26
The Seed Explorer (D-214, before step 50)
- [x] E1 The Explorer: the map, all revealed, the seed and its buttons, 0.2.27
- [x] E2 The whole surface on the Explorer's map, 0.2.28
- [x] 50 to 51d: day and night to the doorway line, 0.2.29 to 0.2.33
- [x] 59 Deeper floors as grids: burrow floors are warrens, 0.2.35 (D-227)
- [x] 59b The dungeon from depth 8: six halls, one loop, 0.2.36 (D-228)
- [x] 59c Darker, colder bricks for the dungeon, 0.2.37 (D-229)
- [x] 34 More rats deeper: two a room from depth 5, 0.2.38 (D-231)
- [x] 35 Deepest depth kept, on the title screen, 0.2.39 (D-232)
- [x] M1 The map names the area, in its colour, 0.2.40 (D-233)
- [x] 36 A proper fall: lie down, the dark, then wake, 0.2.41 (D-234)

Stage 0.2 steps waiting (D-168): 37 saving, 38 a second creature, 39 experience, 40 levels, 41a the
inventory (D-230), 41 first gear.

UI and dev tools (the owner's wish, before step 46)
- [x] U1 Sideways, the room uses the sides, 0.2.17
- [x] U2 The dev side drawer, in the pixel font, 0.2.18

Ideas for later (and the owner's wish list in `RESEARCH.md`): painting rooms and saving them to a file (D-214); a Depth Meter to find or craft (the owner's idea); polish the outside art, and many generated looks for cave mouths (the owner's wish); menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); sounds; scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-21, 0.2.39, deepest depth kept.** The game remembers the
  deepest depth walked to, on this device, and the title screen shows it
  under the menu; dev jumps don't count (D-232).
  Playtest: https://claude.ai/artifact/KT9HBosAuBtexwPMmcnVT4
- **2026-10-21, 0.2.40, the map names the area.** The map and the Seed
  Explorer say "DEPTH 9 · DUNGEON", and walls take their area's colour
  (D-233, the owner's idea).
  Playtest: https://claude.ai/artifact/KrUG8Eo7XTiWXw2nYCdfTo
- **2026-10-22, 0.2.41, a proper fall.** At 0 health the hero lies down
  where they fell and the light closes to dark, then opens where they
  wake (D-234). `main.js` split (D-235), D-219 to D-233
  archived (D-236), Stage label fixed (D-237).
  Playtest: https://claude.ai/artifact/94xckauod2Q6KCCai69MGH
