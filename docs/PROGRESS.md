# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.20 · **Stage:** 0.3, the world (D-168)

## Next up
**Step 47, the map screen:** players see the rooms they have uncovered,
and dev Reveal map shows them all (D-176, Q-042). Read `WORLD.md`,
Q-042, D-176 and `src/core/fog.js` first.

## Waiting on the owner
- Play 0.2.17 sideways: should the room fill the whole screen (Q-048)?
- The starting region's name (Q-045), any time.
- A bestiary: is there one, and does how to fight live there (Q-047)?
- Add the setup script line from the 0.2.1 PR to the cloud environment,
  so each conversation starts on the latest `main`.

## Build plan: stage 0.3, the world (D-168, order approved; may change)
Steps 1 to 30 are done; the list is in `archive/PROGRESS-LOG.md`. Tick
a step when merged and add its version.

- [x] 31 Plan 0.2, 0.1.27 · 32 Natural caves, 0.2.0 · 33 Depths change
  kind, 0.2.1
- [x] 42 Design the starting region, 0.2.6
The main menu (D-177 to D-181; step order proposed, may change)
- [x] 52 A title screen with New journey, the lantern in the dark, 0.2.7
- [x] 53 The pause menu: Resume, Back to title, 0.2.8
- [x] 54 Settings, with the tap or swipe switch, 0.2.9
- [x] 55 The motion switch, 0.2.10 · 56 The seed, 0.2.11 · 57 The first
  rooms change with the seed, 0.2.12
- [x] 58 How to play, 0.2.13
Getting around
- [x] 43 Stairs must be found: dimmer, only where fog has lifted, 0.2.14
- [x] 44 The camera: a room bigger than the screen scrolls, 0.2.15
- [x] 45 Side openings: walk off an edge into the next room, 0.2.16
A region
- [x] 46 A region's layout from the seed, rooms joined by openings, 0.2.19
- [x] 46b Stairs line up between floors; depths 4 and 5 as grids, 0.2.20
- [ ] 47 The map screen, and dev Reveal map (D-176)
The surface
- [ ] 48 The first outside room: woods (Q-034)
- [ ] 49 A cave entrance down to the first cave (D-175, Q-043)
- [ ] 50 Day and night outside (D-025)
- [ ] 51 Daylight through the cave mouth (D-173)

Stage 0.2 steps waiting (D-168): 34 more rats deeper, 35 deepest depth
kept, 36 a proper fall, 37 saving, 38 a second creature, 39 experience,
40 levels, 41 first gear.

UI and dev tools (the owner's wish, before step 46)
- [x] U1 Sideways, the room uses the sides, 0.2.17
- [x] U2 The dev side drawer, in the pixel font, 0.2.18

Ideas for later: menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); sounds; scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-20, 0.2.18, the dev drawer.** The dev tools slide out from
  the left edge, sections stacked as tabs, all words in the pixel font.
  Owner's picks: left, full height; a word per tab; 44 px rows; the
  stats line in the pixel font, bottom left (D-200).
  Playtest: https://claude.ai/artifact/PdsgM2BVcrBiPcFFzSCF9j
- **2026-10-20, 0.2.19, depth 3 as a grid.** Depth 3 is three cave
  rooms in an L, from a 2 × 2 grid with one cell empty, joined by
  one-tile openings. Owner's picks: depth 3 first; the seed picks the
  stairs room; a flask, rat and herb in the others; depths 4 and 5 wait
  (D-201). The owner's idea: stairs line up between floors, step 46b
  (D-202). Playtest: https://claude.ai/artifact/HXDUsvKafDfgcE9791My4V
- **2026-10-20, 0.2.20, stairs line up.** Stairs down lead to stairs
  up at the same tile in the same cell one floor down; depths 4 and 5
  are L grids too. Owner's picks: stairs down in another room; the seed
  picks the room under the crypt; depth 6 and down line up as well
  (D-203). Playtest: https://claude.ai/artifact/QjizYhRsMhB1eJSom6kKjS
