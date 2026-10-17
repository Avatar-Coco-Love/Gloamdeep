# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.0.8 · **Stage:** pre-production (no game code yet)

## Next up
**Step 6: Approve the design brief.** The owner reads `docs/DESIGN.md`
(draft in PR #8). Record approval or changes as a decision, then ask
Q-022 to Q-024 as multiple choice.
Read: `DESIGN.md`, `OPEN-QUESTIONS.md`.

## Waiting on the owner
- Approve or change the design brief draft (PR #8).

## Build plan (proposed; re-plan as decisions land)
Each line is a step. Small decision steps may share a PR (D-018). Tick it when merged and add the PR number.

Pre-production (0.0.x): decisions only
- [x] 1 Inspirations and must-keeps (Q-001, Q-002), PRs #1 and #2
- [x] 2 Design pillars approved (Q-003), PR #3
- [x] 3 The lantern and oil rule (Q-004, Q-005), PR #4
- [x] 4 Turns, movement and bumping (Q-006, Q-007), PR #4
- [x] 5 Shape of a run (Q-008, Q-009, Q-010), PR #5
- [ ] 6 One-page design brief (`docs/DESIGN.md`) from steps 1 to 5, approved

Foundation (0.1.x): one small visible thing per step
- [ ] 7 Page (replaces the `index.html` that opens the study, D-012), canvas and pixel-perfect scaling, one floor tile on screen
- [ ] 8 A room built from data: floor and walls with brick faces
- [ ] 9 The hero drawn, moving one tile per tap or key
- [ ] 10 Dev mode switch, plus a first tool (grid and coordinates overlay)
- [ ] 11 Content registry, plus a dev spawn tool for what exists so far
- [ ] 12 Lantern light with shadows
- [ ] 13 Fog of war (seen tiles stay dimly visible)
- [ ] 14 Oil drains per step, oil flask pickup

## Log (last 3)
- **2026-10-17, PR #6 (0.0.6), Q-012 to Q-019 answered.** Other light
  sources, a day and night cycle by turns, and reasons to switch the
  lantern off (D-024 to D-026). Weapons and abilities (D-027). Four biomes
  (D-028), an animal companion (D-029), dev mode via `?dev` (D-030) and a
  pixel font (D-031).
- **2026-10-17, PR #7 (0.0.7), Q-020 and Q-021 answered.** Every biome
  has portals into a twisted version of itself (D-032). The companion is a
  dog you rescue in the first cave (D-033). No questions are open.
- **2026-10-17, PR #8 (0.0.8), design brief drafted.** `docs/DESIGN.md`
  gathers D-002 to D-033 on one page, waiting for approval. It found three
  gaps, now Q-022 to Q-024. D-004's pace is marked superseded by D-018.
  The owner swapped the dog for a talking faery guide (D-034).
