# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.0 · **Stage:** foundation (the first code)

## Next up
**Step 8: A room built from data.** Propose how a room is written down
(a text map like the study's, or another form) and how floor and walls with
brick faces are drawn. Offer options as multiple choice and wait.
Read: `TECH.md`, `ART-DIRECTION.md` (walls, study lines 177–271).

## Waiting on the owner
- Merge PR for step 7 (0.1.0). Playtest: https://claude.ai/artifact/MPi9qMXBmDaBHKRhgZKdZE

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
- [ ] 8 A room built from data: floor and walls with brick faces
- [ ] 9 The hero drawn, moving one tile per tap or key
- [ ] 10 Dev mode switch, plus a first tool (grid and coordinates overlay)
- [ ] 11 Content registry, plus a dev spawn tool for what exists so far
- [ ] 12 Lantern light with shadows
- [ ] 13 Fog of war (seen tiles stay dimly visible)
- [ ] 14 Oil drains per step, oil flask pickup

## Log (last 3)
- **2026-10-17, PR #8 (0.0.8), design brief drafted.** `docs/DESIGN.md`
  gathers D-002 to D-033 on one page, waiting for approval. It found three
  gaps, now Q-022 to Q-024. D-004's pace is marked superseded by D-018.
  The owner swapped the dog for a talking faery guide (D-034).
- **2026-10-17, PR #9 (0.0.9), brief approved, Q-022 to Q-024 answered.**
  The brief is approved (D-035). The hero is a lamplighter, with reasons
  uncovered slowly (D-036). Oil burns per lit turn (D-037). Growth comes
  from levels, gear, home upgrades and discoveries (D-038). Pre-production
  is done.
- **2026-10-18, PR #10 (0.1.0), the first code.** The front page is the
  game now: one crypt floor tile on a fixed 176 × 208 canvas, enlarged
  with crisp pixels, plus a small version number. Code folders and two
  tests set up (D-039).
