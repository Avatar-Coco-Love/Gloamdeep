# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.21 · **Stage:** foundation (the first code)

## Next up
**Step 26: the owner picks it** from the ideas after step 25 in the
build plan below. Propose the picked step as multiple choice.
Read: `DESIGN.md`, and the open question the step touches, if any.

## Waiting on the owner
- After playing 0.1.20: Q-031 (does a bite or hit in the dark make the
  rat notice?) and Q-032 (which way a walking rat faces).
- Pick step 26: a standing torch on the floor, the rat fleeing, or
  something for the second room (it is empty).

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
- Ideas after 25, order open: a standing torch on the floor, the rat
  fleeing, something in the second room

## Log (last 3)
- **2026-10-18, 0.1.19, an unlit torch.** A fourth torch, unlit, hangs
  on the small block at 7,9, a charred stub near the start. Walking into
  its wall from below with the lantern lit lights it for good: "You light
  the torch.", one turn. With the lantern off the hero bumps and hears
  "Your lantern is dark." A fall or reset puts it back unlit; the spawn
  tool has unlit torches (D-121 to D-125). Playtest:
  https://claude.ai/artifact/SFtxL1voF3Fc6D9NfQ1oRX
- **2026-10-18, 0.1.20, the rat moves.** A rat on a lit tile (lantern
  or torch) notices the hero and keeps coming until it dies or they
  fall: one tile a turn, the farther way first, else the other way,
  else it waits; no going around walls. It slides like the hero, and
  one that steps next to the hero bites a turn later (D-126 to D-129,
  Q-031 and Q-032 opened). Playtest:
  https://claude.ai/artifact/Uq4RbG9JV7S1S5nhkShLMU
- **2026-10-18, 0.1.21, stairs and a second room.** Stairs down at 1,1
  (the study's) lead to a second room, two empty caves and a gap; you
  arrive on stairs up and can go back. Rooms stay as left; rats don't
  follow or bite as you go; a fall wakes you in room 1, both reset. A
  faint violet glow, a fade and a line (D-130 to D-137). Playtest:
  https://claude.ai/artifact/Xr6TssVDe39zh1AFjck47z
