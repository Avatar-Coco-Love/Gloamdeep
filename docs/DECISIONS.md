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

**D-053 · 2026-10-18 · Blended shadow edges** (step 12, the D-009 fix)
Option C from the side-by-side picture: light is still checked in 4 × 4
pixel cells, but each pixel mixes the four nearest cells, so a shadow
edge fades into the dithered bands over one cell. The bands stay as in
the study.

**D-054 · 2026-10-18 · Outside the light is almost black** (step 12)
Until fog of war (step 13), tiles the lantern doesn't reach get the
study's "never seen" darkness.

**D-055 · 2026-10-18 · The lantern's reach for now** (step 12)
The light reaches as far as the study's lantern with a full tank (5.2
tiles). Oil takes over the reach at step 14 (D-014).

**D-056 · 2026-10-18 · The lantern in hand, with flicker** (step 12, ends
D-042's "lantern later")
The study's lantern pixels go back on the hero, and its flame is the
light's centre, with a bright core drawn over the darkness. The light
flickers by about ±3.5%, not at all with reduced motion.

**D-057 · 2026-10-18 · Dev switch: lighting off** (step 12, builds on D-047)
The wrench panel has a "Lighting off" switch, off at first, that shows
the whole room unlit. It is a dev tool, not the lantern switch (D-026).

**D-058 · 2026-10-18 · Walls are lit as whole tiles** (step 12, playtest)
The study's rule lit wall blocks one by one, so long walls seen at a
slant showed dark teeth. Now each wall block aims its ray at the wall
tile's point nearest the lantern, so a seen wall is lit as a whole tile,
still fading with distance. Floor shadows don't change.

**D-059 · 2026-10-18 · When a tile counts as seen** (step 13, ends D-054)
The study's rule, picked from a side-by-side picture: a tile is
remembered once the lantern's light reaches its centre, inside 95% of
the light's reach. It is checked when the hero stands still on a tile.
The memory is part of the game state, one mark per tile.

**D-060 · 2026-10-18 · Remembered tiles fade at the edge** (step 13)
Remembered tiles get the study's cold blue (0.15, 0.16, 0.26), and never
seen ones stay almost black. Where they meet, the blue fades into black
over 4 pixels in the dither pattern, like the shadow edges (D-053).

**D-061 · 2026-10-18 · Dev: Reveal room and Forget** (step 13, builds on
D-047)
The wrench panel gets a "Reveal room" switch, off at first, that shows
every tile as remembered while it is on, and keeps the real memory. A
"Forget" button wipes the memory.

**D-062 · 2026-10-18 · Reset room forgets too** (step 13, builds on D-050)
The dev "Reset room" button also gives a blank memory, as if you had
just arrived.
