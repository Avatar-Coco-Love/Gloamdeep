# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.62 · **Stage:** 0.2, the last steps (36 to 41), in the
world of 0.3 (D-168, D-237)

## Next up
**J1 The Journal, its Records tab** (D-262): Claude proposes 2 or 3
options with a mock-up first. Read D-262 and `src/core/profile.js`.

## Waiting on the owner
- Play 0.2.17 sideways: should the room fill the whole screen (Q-048)?
- The starting region's name (Q-045), any time.
- When creatures should show their next move (Q-049), any time.
- What a profile's slot shows (Q-051), before P1.
- What a level gives (Q-050), before levels matter.
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
- [x] 59 to 59c, 34 to 39, M1: deeper floors to experience, 0.2.35 to 0.2.45
- [x] 40 Levels: 10 more each, "LV" after the hearts, 0.2.46 (D-246)
- [x] 41a to 41a3 The bag, flasks By itself, stacks of 3, 0.2.47 to 0.2.49
- [x] 41 First gear: a knife in the first cave, held, hits for 2, 0.2.50 (D-252)
- [x] 41b The knife's stab, a quick jab, 0.2.51 (D-253)
- [x] Version history in Settings, 0.2.52 (D-254, the owner's wish)
- [x] S1 to S4 Sounds: a step, the lantern's tick, a hit, a rat's bite, 0.2.53 to 0.2.56

Stage 0.2's steps are all built. The stash chest comes with the home base.
Built to grow (D-261 to D-263; order may change)
- [x] G1 Old saves upgraded, 0.2.59
- [x] G2 Events, 0.2.60
- [x] G3 Profiles, 0.2.61
- [x] G4 Behaviours as data, 0.2.62
- [ ] J1 The Journal, its Records tab (D-262)
- [ ] P1 to P6 (D-268): slot screen, name, cloak, eyes, lantern trim, clothes

- [x] U1, U2 UI and dev tools: sideways, the dev drawer, 0.2.17, 0.2.18

Ideas for later (and the owner's wish list in `RESEARCH.md`): painting rooms and saving them to a file (D-214); a Depth Meter to find or craft (the owner's idea); polish the outside art, and many generated looks for cave mouths (the owner's wish); menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); music and more sounds (`RESEARCH.md`); scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-23, 0.2.60, what happened.** Each turn writes a list of
  events on the state; the sounds play from it (D-267). Nothing visible.
- **2026-10-23, 0.2.61, profiles.** Up to 3 profiles on a device, each
  with a name, a look, Records and its own journey; the first is used
  for now (D-268). Nothing visible.
- **2026-10-23, 0.2.62, creatures' ways.** Each creature names its ways
  (chases, shuns light); the turn rules read them (D-269). Nothing visible.
