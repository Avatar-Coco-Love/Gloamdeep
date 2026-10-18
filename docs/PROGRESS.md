# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.2 · **Stage:** foundation (the first code)

## Next up
**Step 10: Dev mode switch, plus a first tool (grid and coordinates
overlay).** Propose how dev mode is turned on (on a phone and a PC) and
how the overlay looks. Offer options as multiple choice.
Read: `DEV-TOOLS.md`, `TECH.md`, grep D-030 in the archive.

## Waiting on the owner
- Merge the step 9 PR (0.1.2). Playtest: https://claude.ai/artifact/MPi9qMXBmDaBHKRhgZKdZE

## Build plan (proposed; re-plan as decisions land)
Each line is a step. Small decision steps may share a PR (D-018). Tick it when merged and add the PR number.

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
- [ ] 9 The hero drawn, moving one tile per tap or key
- [ ] 10 Dev mode switch, plus a first tool (grid and coordinates overlay)
- [ ] 11 Content registry, plus a dev spawn tool for what exists so far
- [ ] 12 Lantern light with shadows
- [ ] 13 Fog of war (seen tiles stay dimly visible)
- [ ] 14 Oil drains per step, oil flask pickup

## Log (last 3)
- **2026-10-18, PR #10 (0.1.0), the first code.** The front page is the
  game now: one crypt floor tile on a fixed 176 × 208 canvas, enlarged
  with crisp pixels, plus a small version number. Code folders and two
  tests set up (D-039).
- **2026-10-18, PR #11 (0.1.1), a room built from data.** The study
  room's shape, written as a text map, with brick wall faces, shade under
  walls and moss (D-040). A small tile table says what each letter means.
  The decision log split: D-001 to D-038 moved to the archive (D-041).
- **2026-10-18, PR #12 (0.1.2), the hero walks.** The study's hero
  (lantern later) steps one tile per key, tap, swipe or held finger, in
  4 directions with a quick slide. Walls stop the hero with a small nudge
  and no turn passes. Held walking slowed to 4 steps a second after the
  playtest (D-042 to D-044). Opened Q-025 (a tap/swipe switch)
  and Q-026 (walking around walls to a held finger).
