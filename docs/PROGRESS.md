# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.0.5 · **Stage:** pre-production (no game code yet)

## Next up
**Step 6: The one-page design brief.** Draft `docs/DESIGN.md` from D-008
to D-023, check it against the pillars (D-013), and get it approved. The
open questions (Q-012 to Q-019) can be asked alongside as multiple choice.
Read: `DECISIONS.md`, `VISION.md`, `OPEN-QUESTIONS.md`.

## Waiting on the owner
- Nothing right now.

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
- **2026-10-17, PR #3 (0.0.3), Q-003 answered.** The owner approved the
  four design pillars as drafted (D-013): the lantern is your world, always
  one floor deeper, curiosity pays off, and stronger, slowly. They are in
  `VISION.md`, and every later idea is checked against them.
- **2026-10-17, PR #4 (0.0.4), Q-004 to Q-007 answered.** Oil is light
  only (D-014). Running dry leaves an ember and bolder enemies, not the end
  of the run; the lantern switches on and off, and other light sources
  exist (D-015). Turns pass only when you act (D-016). Bump to attack, plus
  ranged abilities, weapons and area attacks (D-017). The owner asked for
  a faster pace and multiple-choice questions (D-018).
- **2026-10-17, PR #5 (0.0.5), Q-008 to Q-010 answered.** One persistent
  journey: a world generated once per save, plus portals into deep areas
  that change each visit (D-019). Death sends you home without wiping
  progress (D-020, D-021). Surface first, then down, with caves opening
  into valleys (D-022). Solo, with one companion later (D-023).
