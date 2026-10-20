# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.6 · **Stage:** 0.3, the world (D-168)

## Next up
**Step 52, the title screen.** Read D-177 to D-181, `TECH.md` and
`ART-DIRECTION.md`. Propose how it is built (2 or 3 options), then build
the title screen with New journey, in the lantern in the dark look.

## Waiting on the owner
- The starting region's name (Q-045), any time.
- Add the setup script line from the 0.2.1 PR to the cloud environment,
  so each conversation starts on the latest `main`.

## Build plan: stage 0.3, the world (D-168, order approved; may change)
Steps 1 to 30 are done; the list is in `archive/PROGRESS-LOG.md`. Tick
a step when merged and add its version.

- [x] 31 Plan 0.2, 0.1.27 · 32 Natural caves, 0.2.0 · 33 Depths change
  kind, 0.2.1
- [x] 42 Design the starting region, 0.2.6
The main menu (D-177 to D-181; step order proposed, may change)
- [ ] 52 A title screen with New journey, the lantern in the dark (D-181)
- [ ] 53 The pause menu: Resume, Back to title
- [ ] 54 Settings, with the tap or swipe switch
- [ ] 55 The motion switch · 56 The seed · 57 How to play
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

After the menu, at the owner's wish: UI and dev tool improvements.

Ideas for later: menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); sounds; scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-19, 0.2.4, the world planned.** The owner's ideas for the
  world: regions as grids of rooms with their own rules, ways between
  rooms that line up, rooms of every size with a following camera,
  light through openings, stairs that must be found, a world map. Owner's
  picks: stage 0.3 is the world, next; today's game becomes the first
  cave. Written in `WORLD.md` (D-168 to D-176, Q-036 to Q-043). The
  owner approved the stage 0.3 order and asked for a main menu soon.
- **2026-10-20, 0.2.5, the main menu planned.** Owner's picks: a title
  screen with the menu on it and a pause menu in play; buttons only for
  what works; Settings holds a tap or swipe switch, a motion switch and
  a seed, plus How to play; the menu comes after step 42; its look is
  the lantern in the dark, drawn with the game's own art (D-177 to
  D-181). Mock-up of the looks shown:
  https://claude.ai/artifact/5cKubwaAFaAoH6ot3JAm7A
- **2026-10-20, 0.2.6, the starting region designed.** Owner's picks:
  3 × 3, all 9 cells used, home in the centre; mountains in the north
  row, woods elsewhere; one cave, its entrance beside home (side from
  the seed); no NPC houses yet; ways to other regions later; the first
  cave ends at 5 levels, a portal to the endless depths at its bottom
  (D-182 to D-185). Name still open (Q-045). Burrows past the bottom:
  Q-046. Rule sheet: `docs/regions/starting-region.md`.
