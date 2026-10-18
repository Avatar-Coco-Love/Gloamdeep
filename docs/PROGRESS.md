# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.18 · **Stage:** foundation (the first code)

## Next up
**Step 23: the owner picks it** from the ideas after step 22 in the
build plan below. Propose the picked step as multiple choice.
Read: `DESIGN.md`, and the open question the step touches, if any.

## Waiting on the owner
- Pick step 23: stairs and a second room, more light (lighting an unlit
  torch, a standing torch on the floor), or the rat moving (chasing or
  fleeing, and noticing the hero less in the dark, D-026).

## Build plan (proposed; the order may change as we go)
Each line is a step. Small decision steps may share a PR (D-018). Tick it when merged and add its version (D-071).

Pre-production (0.0.x): decisions only
- [x] 1 Inspirations and must-keeps (Q-001, Q-002), PRs #1 and #2
- [x] 2 Design pillars approved (Q-003), PR #3
- [x] 3 The lantern and oil rule (Q-004, Q-005), PR #4
- [x] 4 Turns, movement and bumping (Q-006, Q-007), PR #4
- [x] 5 Shape of a run (Q-008, Q-009, Q-010), PR #5
- [x] 6 One-page design brief (`docs/DESIGN.md`) from steps 1 to 5, approved, PRs #8 and #9

Foundation (0.1.x): one small visible thing per step
- [x] 7 Page (replaces the `index.html` that opens the study, D-012), canvas and pixel-perfect scaling, one floor tile on screen, PR #10
- [x] 8 A room built from data: floor and walls with brick faces, PR #11
- [x] 9 The hero drawn, moving one tile per tap or key, PR #12
- [x] 10 Dev mode switch, plus a first tool (grid and coordinates overlay), PR #13
- [x] 11 Content registry, plus a dev spawn tool for what exists so far, PR #14
- [x] 12 Lantern light with shadows, PR #15
- [x] 13 Fog of war (seen tiles stay dimly visible), PR #16
- [x] 14 Oil drains per step, with the oil bar (D-067 split off the flask), PR #17
- [x] 15 Oil flask pickup, the first item, 0.1.10
- [x] 16 Lantern on/off switch, 0.1.11
- [x] 17 Wait a turn, 0.1.12
- [x] Dev tools for everyone, a tidier panel, 0.1.13 (between steps)
- [x] 18 A text line, 0.1.14
- [x] 19 Torches, 0.1.15
- [x] 20 The first enemy, a rat that holds its ground, 0.1.16
- [x] 21 Fighting the rat: two lantern hits kill it, 0.1.17
- [x] 22 The rat fights back: bites, hearts and falling, 0.1.18
- Ideas after 22, order open: stairs and a second room, more light
  (unlit torches to light, floor mounts), the rat moving

## Log (last 3)
- **2026-10-18, 0.1.16, the rat.** The first enemy, redrawn from the
  study's rat (option A), sits at 2,10 and bobs. Walking into it flashes
  it white, shakes the room a pixel and says "The rat squeaks and holds
  its ground."; no turn passes. It shows only in real light, never in
  memory. Spawn has an Enemies group (D-104 to D-108, Q-030 opened).
  Playtest: https://claude.ai/artifact/DSjdcNS3Emo2XoRgRVpgWV
- **2026-10-18, 0.1.17, fighting the rat.** Walking into the rat swings
  the lantern: the first hit says "The rat squeaks and holds its
  ground.", the second kills it with "The rat squeaks and falls still."
  and it flashes and is gone. A hit passes a turn and burns oil. It
  doesn't fight back yet (D-109 to D-113, Q-030 narrowed). Playtest:
  https://claude.ai/artifact/NBwf6Tqa3gJRmuuKRtLErp
- **2026-10-18, 0.1.18, the rat fights back.** After each passed turn a
  rat next to the hero bites for 1, lit or dark, and stays put. The hero
  has 5 health as pixel hearts top left; a bite flashes them red, shakes
  the room and says "The rat bites you." (it beats other lines). At 0
  they fall and wake at the start: room as it began, full health, 75%
  oil, map kept (D-114 to D-120, Q-030 closed). Playtest:
  https://claude.ai/artifact/5iy2XRbjCkvWkQWRjmWEDU
