# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.0.3 · **Stage:** pre-production (no game code yet)

## Next up
**Step 3: The lantern and oil rule.** A conversation, with no code. Start
with Q-004 (what oil does), offer the options with a recommendation, and
check each one against the pillars (D-013). Then Q-005 (oil running out).
Read: `OPEN-QUESTIONS.md` (Q-004, Q-005), `VISION.md` (pillars).

## Waiting on the owner
- Nothing right now.

## Build plan (proposed; re-plan as decisions land)
Each line is one PR-sized step. Tick it when merged and add the PR number.

Pre-production (0.0.x): decisions only
- [x] 1 Inspirations and must-keeps (Q-001, Q-002), PRs #1 and #2
- [x] 2 Design pillars approved (Q-003), PR #3
- [ ] 3 The lantern and oil rule (Q-004, Q-005)
- [ ] 4 Turns, movement and bumping (Q-006, Q-007)
- [ ] 5 Shape of a run (Q-008, Q-009, Q-010)
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
- **2026-10-17, PR #1 (0.0.1), Q-001 answered.** The owner said what they
  loved about Dungeon Siege: going deeper, exploring, loot, new monsters,
  mysteries and lore, getting stronger, and the curiosity to keep playing
  (D-008). Recorded in `VISION.md`.
- **2026-10-17, PR #2 (0.0.2), Q-002 and Q-011 answered.** Everything in
  style study 1 stays, with the rat and shadow edges to improve (D-009).
  The repo became lowercase `gloamdeep` and GitHub Pages went live (D-010).
  The owner dislikes the blue flash on tap, so the game will turn it off
  (D-011). The front page now opens the style study (D-012).
- **2026-10-17, PR #3 (0.0.3), Q-003 answered.** The owner approved the
  four design pillars as drafted (D-013): the lantern is your world, always
  one floor deeper, curiosity pays off, and stronger, slowly. They are in
  `VISION.md`, and every later idea is checked against them.
