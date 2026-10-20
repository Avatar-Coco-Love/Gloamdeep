# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.24 · **Stage:** 0.3, the world (D-168)

## Next up
**Step 49, a cave entrance down to the first cave** (D-175, D-184,
Q-043). Read `docs/regions/starting-region.md`, D-209 and Q-043 first,
then propose.

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
- [x] 47 The map screen, and dev Reveal map, 0.2.21
- [x] 47b The map turns between floors, 0.2.22
The surface
- [x] 48b A lantern that switches itself, in Settings, 0.2.24
- [x] 48 The first outside room: woods, 0.2.23
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
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); sounds; scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-20, 0.2.22, the map turns.** Arrows beside "DEPTH 3",
  < and >, Page Up and Page Down, or a tap on found stairs show other
  floors seen; the hero stays put. Owner's picks: skip floors never seen; a
  floor opens whole; a generous stairs tap; dim grey arrows (D-207).
  D-194 to D-200 archived (D-208). Playtest: https://claude.ai/artifact/QpDNN5QC2X5dBshJ2fxxif
- **2026-10-20, 0.2.23, the woods.** The first outside room: woods
  from the seed, 17 × 20, in plain daylight, with one round tree a tile;
  dev Go outside leads there and the strip says SURFACE. Owner's picks
  from a mock-up of three tree looks (D-209). The owner's idea: a
  lantern that switches itself (Q-049). Playtest: https://claude.ai/artifact/9dRDwGZPLdwZ5mWrc9TVxk
- **2026-10-20, 0.2.24, the lantern by itself.** Settings gains
  "Lantern: By hand"; set to By itself, the lantern goes out as you step
  into daylight and lights again back in the dark, only at that moment.
  Owner's picks: daylight only, By hand until picked, your switch
  holds, no line (D-210). Playtest: https://claude.ai/artifact/1Mh56fEwSg9iVqd6Awtn7Q
