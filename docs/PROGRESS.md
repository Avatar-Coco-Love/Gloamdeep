# Progress

**Start every conversation here.** Keep this file under 4 KB: "Next up"
holds one item, and the log keeps only the last 3 entries. Older entries
go to the top of `archive/PROGRESS-LOG.md`.

**Version:** 0.1.5 · **Stage:** foundation (the first code)

## Next up
**Step 13: Fog of war.** Propose how remembered tiles look and when a
tile counts as seen (the study's cold blue, D-054 ends here), and its
dev hook. Offer options as multiple choice.
Read: `ART-DIRECTION.md` ("Light"), `src/render/light.js`.

## Waiting on the owner
- Merge PR #15 (step 12, 0.1.5). Playtest (dev mode starts on): https://claude.ai/artifact/TxtsHTdhF3fDqaLra2faNG

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
- [ ] 13 Fog of war (seen tiles stay dimly visible)
- [ ] 14 Oil drains per step, oil flask pickup

## Log (last 3)
- **2026-10-18, PR #13 (0.1.3), dev mode.** `?dev` turns it on and
  the browser remembers it (`?dev=off` forgets). A wrench button opens
  switches, off at first, for a faint tile grid and a coordinates readout
  with a bright outline on the pointed tile; ` toggles them on a PC. The
  playtest dropped "Leave dev mode" (D-045 to D-047).
- **2026-10-18, PR #14 (0.1.4), the registry and spawning.** One content
  registry gathers each kind's own file (tiles for now, keyed by id). The
  wrench panel's Spawn list (None, Wall, Floor) comes from it: pick one,
  then each tap or click places it, with no turn passed and never a wall
  on the hero. "Reset room" brings the room back; nothing is kept after a
  reload (D-048 to D-050). "Copy room" puts the room on the clipboard
  as one line of code to hand to Claude, with a box to copy from if the
  browser blocks it (D-051, D-052).
- **2026-10-18, PR #15 (0.1.5), the lantern lights the room.** The
  hero holds the study's lantern, and its warm light reaches about 5
  tiles in dithered bands, with a gentle flicker. Walls cast shadows,
  whose edges now fade over 4 pixels instead of stepping (picked from a
  side-by-side picture). Outside the light is almost black until fog of
  war. Dev panel: "Lighting off". The playtest showed teeth on the
  left wall, so walls are now lit as whole tiles (D-053 to D-058).
