# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.

**D-001 to D-038** (pre-production) are in
`archive/DECISIONS-PREPRODUCTION.md`, still in force (D-041). Grep there
for an ID or topic.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-039 · 2026-10-18 · The first page and code layout** (step 7)
Code uses the TECH.md folders from day one (`src/core`, `src/render`,
`src/input`, `src/dev`, `tests`). The canvas is fixed at 176 × 208 (11 × 13
tiles) on every screen, with dark bars where it doesn't fill. `index.html`
is the game now (as D-012 planned); the study is reached by its address
only. A small version number sits in a corner.

**D-040 · 2026-10-18 · Rooms are text maps** (step 8)
A room is written as one string per row, one letter per tile (`#` wall,
`.` floor), like the style study. A small tile table in `src/core` says
what each letter is; step 11 grows it into the content registry. The first
room has the study room's shape, with its water as floor; stairs and the
doorway come later. Walls get brick faces, caps and edges, with shade on
the floor below them and moss beside them. No cobwebs.

**D-041 · 2026-10-18 · The decision log splits by stage**
When this file passed 12 KB, D-001 to D-038 (pre-production) moved
unchanged to `archive/DECISIONS-PREPRODUCTION.md`. They stay in force.
This file starts again from D-039.

**D-042 · 2026-10-18 · The hero and how to steer** (step 9)
The hero is the style study's sprite without the lantern; the lantern
arrives with its light at step 12. The hero starts where the study put
them. Steps go 4 ways only (no diagonals). Keys (arrows, WASD), a tap
(one step toward the tap, along the farther side), a swipe and a held
finger all work together. A switch to turn tapping or swiping off waits
for a settings menu (Q-025).

**D-043 · 2026-10-18 · Stepping and bumping walls** (step 9)
A step is a quick slide, about 0.1 s (instant with reduced motion). One
extra step can wait in line. Walking into a wall makes a 1-pixel nudge
and passes no turn.

**D-044 · 2026-10-18 · Held walking is calmer** (step 9 playtest)
Holding a finger raced the hero after it (about 10 steps a second). Now a
held finger walks about 4 steps a second and still steers toward the
finger. Taps, swipes and keys keep their quick pace.

**D-045 · 2026-10-18 · The dev mode switch** (step 10, builds on D-030)
Opening the game with `?dev` turns dev mode on, and that browser remembers
it (saved in localStorage) until "Leave dev mode" in the dev panel. In dev
mode a DEV button (top-left, 44 px) opens a small panel of switches. On a
PC the ` (backtick) key shows or hides the overlay. Dev text (panel,
readout) is plain page text; the pixel font (D-031) is for game text.

**D-046 · 2026-10-18 · The grid and coordinates overlay** (step 10)
Grid: a faint 1-pixel line on every tile edge. Coordinates: a readout at
the bottom left gives the hero's tile and the tile under the mouse or
finger, with that tile's kind ("hero 5,11 · tile 3,4 wall"), and the
pointed tile gets a bright outline. Tiles count from 0,0 at the top left.
Both switches start on.
