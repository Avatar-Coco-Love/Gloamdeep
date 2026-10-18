# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.10 · **Stage:** foundation (the first code)

## Next up
**Step 16: The lantern on/off switch** (D-015, D-026). Propose how it is
switched on a phone, with a mouse and with keys, and how "off" looks.
Offer options as multiple choice. `DECISIONS.md` is at 11.7 KB again:
offer ways to make room before adding decisions.
Read: `DESIGN.md` ("Light"), `TECH.md`; grep D-015 and D-026.

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
- [x] 15 Oil flask pickup, the first item, 0.1.10
- [ ] 16 Lantern on/off switch
- Ideas after 16, order open: wait a turn, a text line, stairs and a
  second room, torches, the first enemy (rat)

## Log (last 3)
- **2026-10-18, PR #18 (0.1.8), audit next.** Docs only: Next up is a
  docs audit with the problems seen so far; the build plan's order may
  change as we go.
- **2026-10-18, 0.1.9, docs audit.** Conversations pull `main` first;
  docs name a PR by its version; open-PR decisions change in place
  after a playtest; merges aren't listed as waiting; the PR body is
  updated each push; the playtest bundler is `tools/playtest.js`.
  Stale text fixed in the README and four docs, and the 0.0.x
  changelog moved to the archive (D-070 to D-076).
- **2026-10-18, 0.1.10, the oil flask.** The first item: the study's
  bottle, bobbing on its shadow. Walking onto one pours in 45% of a tank,
  even into a full lantern. Flasks only come from the dev spawn list for
  now; "Reset room" clears them (D-077 to D-079). Superseded decisions
  moved to the archive. Playtest:
  https://claude.ai/artifact/L4ezEfThPFULMmhFdG8zUM
