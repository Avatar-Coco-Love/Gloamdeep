# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.29 · **Stage:** 0.3, the world (D-168)

## Next up
**Step 51, daylight through the cave mouth** (D-173): the mouth lets
the woods' light into the crypt, following the time of day (D-217).
Read D-173, D-211, D-217, Q-040 and `docs/WORLD.md` first, then propose.

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
Getting around, a region
- [x] 43 to 45: stairs to find, the camera, side openings, 0.2.14 to 0.2.16
- [x] 46 to 47b: a region's layout, stairs lining up, the map screen,
  turning floors, 0.2.19 to 0.2.22
The surface
- [x] 48b A lantern that switches itself, in Settings, 0.2.24
- [x] 48 The first outside room: woods, 0.2.23
- [x] 49 A cave entrance into the first cave, 0.2.25
- [x] 49b Depths move up one: the crypt is depth 0, 0.2.26
The Seed Explorer (D-214, before step 50)
- [x] E1 The Explorer: the map, all revealed, the seed and its buttons, 0.2.27
- [x] E2 The whole surface on the Explorer's map, 0.2.28
- [x] 50 Day and night outside, 0.2.29
- [ ] 51 Daylight through the cave mouth (D-173)

Stage 0.2 steps waiting (D-168): 34 more rats deeper, 35 deepest depth
kept, 36 a proper fall, 37 saving, 38 a second creature, 39 experience,
40 levels, 41 first gear.

UI and dev tools (the owner's wish, before step 46)
- [x] U1 Sideways, the room uses the sides, 0.2.17
- [x] U2 The dev side drawer, in the pixel font, 0.2.18

Ideas for later: painting rooms and saving them to a file (D-214); a Depth Meter to find or craft (the owner's idea); polish the outside art, and many generated looks for cave mouths (the owner's wish); menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); sounds; scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-21, 0.2.27, the Seed Explorer.** "Seed Explorer", the
  title's last line, opens a seed's map, all floors in full, no hero; a
  bar at the bottom shows the seed with Back, Type and Reseed. Owner's
  picks: the plain last line, the bottom bar, the Settings seed else a
  random one, Back through every seed (D-215). Playtest: https://claude.ai/artifact/MdzkiLPyfsTdW7CK24K7ZH
- **2026-10-21, 0.2.28, the whole surface.** The Explorer's surface map
  shows the woods and the crypt together, the crypt where walking
  through the cave mouth takes you. Owner's picks from a mock-up of
  three layouts: joined at the mouth, the mouth plain floor (D-216). Playtest: https://claude.ai/artifact/D9KGuEKFcvxk9vpCHJS6np
- **2026-10-21, 0.2.29, day and night outside.** A day is 300 turns:
  full day, a 30-turn dusk, night, a 30-turn dawn. At night the woods are
  dark like a cave, memory a moonlit blue; By itself lights the lantern
  at dusk. No clock, only the light. Dev TIME +10 and +50 (D-217).
  Playtest: https://claude.ai/artifact/NwZb81B6ztLxqggsaqfztk
