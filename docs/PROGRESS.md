# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.25 · **Stage:** foundation (the first code)

## Next up
**Step 30: the owner picks** (multiple choice): more room tuning
(D-147, D-152), the rat fleeing, a floor torch, or sounds.
Read: `DESIGN.md`.

## Waiting on the owner
- After playing 0.1.20: Q-031 (does a bite or hit in the dark make the
  rat notice?) and Q-032 (which way a walking rat faces).
- After playing 0.1.25: are the rougher caves right (D-152's first
  guesses), and does the rat look right in the remembered dark (D-153)?

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
- [x] 23 Lighting an unlit torch, 0.1.19
- [x] 24 The rat moves: it notices in light and chases, 0.1.20
- [x] 25 Stairs and a second room, 0.1.21
- [x] 26 A flask and a rat in the second room, 0.1.22
- [x] 27 A depth counter and an endless way down, 0.1.23
- [x] 28 The first generated room, 0.1.24
- [x] 29 Rougher caves, and the rat seen in remembered dark, 0.1.25
- Ideas for later: a standing torch on the floor, the rat fleeing, sounds; other places (smaller caves, bigger rooms, more natural caves, dungeons, crypts, D-152)

## Log (last 3)
- **2026-10-18, 0.1.23, a depth counter and an endless way down.**
  "DEPTH 1" in a box at the top middle. The second room's stairs down
  at 1,11 lead to a fresh copy of it at depth 3, and so on forever; each
  depth stays as left, a fall resets them all, maps kept (D-144 to
  D-146). Playtest:
  https://claude.ai/artifact/TNgfvgptV1a4Mv3YreMPFb
- **2026-10-18, 0.1.24, the first generated rooms.** Below the second
  room every depth is made from the game's seed: 2 to 4 rough caves
  joined by gaps, a torch by the stairs up, a flask and a rat guarding
  it in the dark. A depth stays as left; a fall rolls a new seed and new
  depths, their maps forgotten. Seed in the dev stats (D-147 to D-151).
  Playtest: https://claude.ai/artifact/LNhmWcYaTRaey4TR9TDwkq
- **2026-10-18, 0.1.25, rougher caves, the rat in remembered dark.**
  Generated caves' edges are bitten back more, with nooks a tile deep;
  cut-off tiles go back to wall. A rat on an explored tile now shows
  dimly in the dark like the flask; it still notices only in light
  (D-152, D-153). Playtest:
  https://claude.ai/artifact/C5VP47d6BEjdnESxHwtYo9
