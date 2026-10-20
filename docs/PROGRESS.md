# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.13 · **Stage:** 0.3, the world (D-168)

## Next up
**The menu is done.** Ask the owner which UI and dev tool improvements
come first (their wish, after the menu), or whether to go on to step 43,
stairs must be found (D-174, Q-041).

## Waiting on the owner
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
- **2026-10-20, 0.2.11, the seed.** Settings gains "Seed: Random"
  and a drawn seed pad. Owner's picks: a number pad in the game's own
  style; a typed seed stays until set back to Random; from the pause
  menu, Random names this journey's seed (D-191). Playtest:
  https://claude.ai/artifact/URrtmYoVAoC6VdShbanKLK
- **2026-10-20, 0.2.12, every room changes with the seed.** Owner's
  note: the first levels looked the same each world. Owner's picks: a
  standing rule that every room takes something from the seed, some
  hand-made with seeded parts, some wholly generated; the crypt rooms
  keep their shape, the seed places the flask and the rat (D-192).
  Playtest: https://claude.ai/artifact/EfiGHjpCzfiriucdqGc4Zn
- **2026-10-20, 0.2.13, How to play.** The title and pause menus gain
  How to play. Owner's picks: a page each for Touch, Mouse and Keyboard,
  flipped with Left and Right, opening on the way last used; under New
  journey on the title; Walk, Wait, Lantern and Pause only, how to hit
  a rat perhaps in a bestiary (Q-047); it follows the Controls switch
  (D-193). Playtest: https://claude.ai/artifact/EDXra2gLfuLS6LerFmgzSp
