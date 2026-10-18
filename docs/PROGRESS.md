# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.7 · **Stage:** foundation (the first code)

## Next up
**Step 15: The oil flask.** Propose how the flask looks and works as the
first item in the registry (study sprite and +45%?), with its place in
the dev spawn list. Offer options as multiple choice.
Read: `DESIGN.md`, `TECH.md` ("One content registry"), `DEV-TOOLS.md`.

## Waiting on the owner
- Merge the step 14 PR (0.1.7). Playtest (dev mode starts on): https://claude.ai/artifact/UJB5Bkpkbh1co5VRoFLTsk

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
- [x] 9 The hero drawn, moving one tile per tap or key, PR #12
- [x] 10 Dev mode switch, plus a first tool (grid and coordinates overlay), PR #13
- [x] 11 Content registry, plus a dev spawn tool for what exists so far, PR #14
- [x] 12 Lantern light with shadows, PR #15
- [x] 13 Fog of war (seen tiles stay dimly visible), PR #16
- [ ] 14 Oil drains per step, with the oil bar (D-067 split off the flask)
- [ ] 15 Oil flask pickup, the first item

## Log (last 3)
- **2026-10-18, PR #15 (0.1.5), the lantern lights the room.** The
  hero holds the study's lantern, and its warm light reaches about 5
  tiles in dithered bands, with a gentle flicker. Walls cast shadows,
  whose edges now fade over 4 pixels instead of stepping (picked from a
  side-by-side picture). Outside the light is almost black until fog of
  war. Dev panel: "Lighting off". The playtest showed teeth on the
  left wall, so walls are now lit as whole tiles (D-053 to D-058).
- **2026-10-18, PR #16 (0.1.6), fog of war.** Tiles the lantern has
  reached are remembered and stay faintly visible; a tile counts once
  the light reaches its middle, and the edge fades over 4 pixels in the
  dither. Dev panel: "Reveal room" and "Forget"; "Reset room" forgets
  too. After the playtest the study's blue felt too bright and like
  moonlight, so each place now sets its darkness: this cave is pitch
  black with a faint grey memory (D-059 to D-063, Q-027 opened).
- **2026-10-18, step 14 (0.1.7), oil.** The lantern starts three
  quarters full and each step burns 2.5% (40 steps empty a full tank).
  The light shrinks with the oil, from 5.2 tiles to 1.6, then an ember.
  The study's 10-segment oil bar sits in the top right corner. Dev panel:
  "Refill oil" and "Empty oil". The flask became step 15 (D-064 to D-067,
  Q-028 and Q-029 opened).
