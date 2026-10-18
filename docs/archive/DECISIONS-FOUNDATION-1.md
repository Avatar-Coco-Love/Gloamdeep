# Foundation decisions, part 1 (D-039 to D-052, D-070 to D-076)

Moved unchanged from `docs/DECISIONS.md` at step 16 (D-083), when it neared
12 KB: steps 7 to 11 (page, room, hero, dev mode, registry) and the docs
audit's working rules, which `CLAUDE.md` repeats. These are still in force
unless marked superseded. Grep for an ID or topic; never read this whole.

---

## Steps 7 to 11

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
*Partly superseded by D-047 (2026-10-18): no "Leave dev mode", a wrench icon.*
Opening the game with `?dev` turns dev mode on, and that browser remembers
it (saved in localStorage) until "Leave dev mode" in the dev panel. In dev
mode a DEV button (top-left, 44 px) opens a small panel of switches. On a
PC the ` (backtick) key shows or hides the overlay. Dev text (panel,
readout) is plain page text; the pixel font (D-031) is for game text.

**D-046 · 2026-10-18 · The grid and coordinates overlay** (step 10)
*Partly superseded by D-047 (2026-10-18): switches start off.*
Grid: a faint 1-pixel line on every tile edge. Coordinates: a readout at
the bottom left gives the hero's tile and the tile under the mouse or
finger, with that tile's kind ("hero 5,11 · tile 3,4 wall"), and the
pointed tile gets a bright outline. Tiles count from 0,0 at the top left.
Both switches start on.

**D-047 · 2026-10-18 · Dev mode after the first playtest** (step 10,
supersedes parts of D-045 and D-046)
"Leave dev mode" is gone (in the playtest it only turned everything back
on). Opening the game with `?dev=off` forgets dev mode on that browser.
Every dev switch starts off. The DEV button shows a small pixel wrench,
drawn in code, instead of the word.

**D-048 · 2026-10-18 · The content registry's layout** (step 11)
Each kind of content keeps its own small file in `src/core`, keyed by id
(`tiles.js` now; items, enemies and NPCs later). `src/core/registry.js`
gathers them into one list. Tiles also carry the letter a room map
writes them with.

**D-049 · 2026-10-18 · The dev spawn tool** (step 11, builds on D-006)
The wrench panel has a Spawn list read from the registry, starting at
None. Pick an entry, then each tap or click puts it on that tile instead
of walking, until None is picked again. Only registry entries spawn (for
now the tiles); the hero is not on the list. A wall can't go on the
hero's tile. Spawning passes no turn.

**D-050 · 2026-10-18 · Spawned changes don't last** (step 11)
Spawned tiles are gone after a reload. A "Reset room" button in the
panel brings back the starting room.

**D-051 · 2026-10-18 · Copy the room as code** (step 11, owner's request)
*Partly superseded by D-052 (2026-10-18): the code is one line.*
A "Copy room" button in the dev panel puts the room on the clipboard as
its text map, ready to paste into the code, with a first line giving the
version, the size and the hero's tile. The button says "Copied!". If the
browser blocks copying, a box shows the code, selected, to copy by hand.
What the copied rooms are used for is decided later.

**D-052 · 2026-10-18 · The room code is one line** (step 11, supersedes
part of D-051)
Pasted text maps came out broken in most apps, so the copied code is one
line with no spaces: `GD:` version, size, hero's tile, then the rows
split by `/`, with a number before a tile for a run of it (`#3.#5.#`).
`src/core/roomcode.js` also reads a code back into its room.

## The docs audit (0.1.9)

**D-070 · 2026-10-18 · Pull main first** (docs audit)
Every conversation starts by pulling the latest `main`, before reading
anything, because the starting copy can be old.

**D-071 · 2026-10-18 · Docs name a PR by its version** (docs audit)
The log and the build plan say "0.1.9", not "PR #19", so no second commit
is needed once the PR exists. Older entries keep their PR numbers.

**D-072 · 2026-10-18 · Open-PR decisions change in place** (docs audit)
A decision isn't final until its PR is merged. Playtest tweaks in the
same PR edit it directly, with a note ("40 → 80 → 60 turns").
Superseding is only for merged decisions.

**D-073 · 2026-10-18 · The playtest bundler lives in the repo** (docs audit)
`tools/playtest.js` packs the game into one page for the playtest
Artifact; `--dev` starts dev mode on. A plain Node script with no
dependencies. The game itself still has no build step.

**D-074 · 2026-10-18 · Merges aren't "waiting on the owner"** (docs audit)
That list holds only questions and choices for the owner. Merging the
open PR is always implied. The playtest link goes in the log entry.

**D-075 · 2026-10-18 · Docs-only PRs bump the version** (docs audit)
One rule for every PR, so each one has a version to be named by.

**D-076 · 2026-10-18 · The PR body is updated on every push** (docs audit)
After each push, "What changed" and "Decisions" are rewritten to match.
