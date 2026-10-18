# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.9 · **Stage:** foundation (the first code)

## Next up
**Step 15: The oil flask.** Propose how the flask looks and works as the
first item in the registry (study sprite and +45%?), with its place in
the dev spawn list. Offer options as multiple choice. `DECISIONS.md` is
near 12 KB: move the superseded entries to the archive in this PR.
Read: `DESIGN.md`, `TECH.md` ("One content registry"), `DEV-TOOLS.md`.

## Waiting on the owner
- Nothing.

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
- [ ] 15 Oil flask pickup, the first item
- Ideas after 15, order open: lantern on/off switch, wait a turn,
  a text line, stairs and a second room, torches, the first enemy (rat)

## Log (last 3)
- **2026-10-18, PR #17 (0.1.7), oil.** The lantern starts three
  quarters full and 60 steps empty a full tank (the study's 40 felt
  too short, 80 too long).
  The light shrinks with the oil, from 5.2 tiles to 1.6, then an ember.
  The study's 10-segment oil bar sits in the top right corner. Dev panel:
  "Refill oil" and "Empty oil". The flask became step 15 (D-064 to D-069,
  Q-028 and Q-029 opened).
- **2026-10-18, PR #18 (0.1.8), audit next.** Docs only: Next up is a
  docs audit with the problems seen so far; the build plan's order may
  change as we go.
- **2026-10-18, 0.1.9, docs audit.** Conversations pull `main` first;
  docs name a PR by its version; open-PR decisions change in place
  after a playtest; merges aren't listed as waiting; the PR body is
  updated each push; the playtest bundler is `tools/playtest.js`.
  Stale text fixed in the README and four docs, and the 0.0.x
  changelog moved to the archive (D-070 to D-076).
