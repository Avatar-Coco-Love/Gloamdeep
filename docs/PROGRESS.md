# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.2.10 · **Stage:** 0.3, the world (D-168)

## Next up
**Step 56, the seed.** Read D-179, D-148 and D-190. Propose how
"Seed: random, or one typed in" sits in Settings, and how a phone types
a number on the game's canvas (2 or 3 options).

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
- [x] 52 A title screen with New journey, the lantern in the dark, 0.2.7
- [x] 53 The pause menu: Resume, Back to title, 0.2.8
- [x] 54 Settings, with the tap or swipe switch, 0.2.9
- [x] 55 The motion switch, 0.2.10
- [ ] 56 The seed · 57 How to play
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
- **2026-10-20, 0.2.8, the pause menu.** A button with two bars beside
  the lantern button, or Esc or P, opens Resume and Back to title over
  the darkened room. Owner's picks: the button plus keys; drawn over the
  dimmed room; Back to title ends the journey, New journey starts a new
  world (D-187). D-159 to D-167 archived (D-188). Playtest:
  https://claude.ai/artifact/GrAnLZBHYTHMH87mtgr5w6
- **2026-10-20, 0.2.9, Settings.** Settings joins the title and pause
  menus: a page with "Controls: Tap and swipe" and Back. Owner's picks:
  one line that cycles (Left and Right too); on both menus; kept on
  this device; it changes only walking, menus take both (D-189).
  Playtest:
  https://claude.ai/artifact/UWBYLdgQua9oFYhXimdpcP
- **2026-10-20, 0.2.10, the Motion switch.** Settings gains "Motion:
  Full / Reduced" under Controls. Owner's picks: under Controls, picked
  or flipped with Left and Right like Controls; it follows the device's
  reduced-motion setting until picked, then the pick wins and is kept
  (D-190). Playtest:
  https://claude.ai/artifact/U8nbNvay7vcMURLEk9PY6c
