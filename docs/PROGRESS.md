# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.48 · **Stage:** 0.2, the last steps (36 to 41), in the
world of 0.3 (D-168, D-237)

## Next up
**41a3 A stack limit of 3** (D-248): a stack holds at most 3 flasks; a
flask over it stays on the floor. The details are settled at that step.

## Waiting on the owner
- Play 0.2.17 sideways: should the room fill the whole screen (Q-048)?
- The starting region's name (Q-045), any time.
- When creatures should show their next move (Q-049), any time.
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
- [x] 41a The bag: flasks go in it, tap then Pour, 0.2.47 (D-247)
- [x] 41a2 Flasks: By itself, poured at 55% or lower, 0.2.48 (D-249)

Stage 0.2 steps waiting (D-168, D-248): 41a3 a stack
limit of 3, 41 first gear. The stash chest comes with the home base.

UI and dev tools (the owner's wish, before step 46)
- [x] U1 Sideways, the room uses the sides, 0.2.17
- [x] U2 The dev side drawer, in the pixel font, 0.2.18

Ideas for later (and the owner's wish list in `RESEARCH.md`): painting rooms and saving them to a file (D-214); a Depth Meter to find or craft (the owner's idea); polish the outside art, and many generated looks for cave mouths (the owner's wish); menu themes, a changing or moving title background and hero (D-181); landmarks, NPC houses, special items, a second region,
lit rooms glowing ahead, swimming (Q-039); the lantern by itself at
low oil (D-210); sounds; scarcer light deeper
(D-159); more kinds of place (D-152, D-163); dev God mode (D-154); the
rat fleeing; a floor torch; trees, weather, sun and moon (Q-034, Q-035).

## Log (last 3)
- **2026-10-22, 0.2.46, levels.** Experience adds up to levels, 10
  more each (2 at 10, 3 at 30). "LV 1" shows after the hearts, and the
  text line says "You feel stronger. Level 2." (D-246).
  Playtest: https://claude.ai/artifact/LECkPyWkbvZaFK516tp5kz
- **2026-10-22, 0.2.47, the bag.** Flasks go into a 6-slot bag and
  stack; a bag button (or I) opens it over the room's foot, or its top
  when that would hide the hero. Tap a flask, then Pour: one turn. Kept
  through a fall (D-247). Next steps set: Auto, a limit of 3 (D-248).
  Playtest: https://claude.ai/artifact/VuFwsChhVZPWqhAsNKM8uj
- **2026-10-22, 0.2.48, flasks by themselves.** "Flasks: By itself" in
  Settings pours a flask, free, at 55% oil or lower: "You pour a flask."
  The title's hero sits a tile higher under Settings (D-249).
  Playtest: https://claude.ai/artifact/BipaLvkGACYmNEsJYfRpZb
