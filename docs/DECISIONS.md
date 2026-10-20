# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force; grep there for an ID or
topic. **D-001 to D-038** (pre-production) are in
`archive/DECISIONS-PREPRODUCTION.md` (D-041). **D-039 to D-052**
(steps 7 to 11) and **D-070 to D-076** (the docs audit) are in
`archive/DECISIONS-FOUNDATION-1.md` (D-083). **D-053 to D-069** (steps 12
to 14) are in `archive/DECISIONS-FOUNDATION-2.md` (D-103). **D-077 to
D-093** (steps 15 to 17 and the 0.1.13 dev tools) are in
`archive/DECISIONS-FOUNDATION-3.md` (D-120). **D-094 to D-113** (steps 18
to 21) are in `archive/DECISIONS-FOUNDATION-4.md` (D-137). **D-114 to
D-129** (steps 22 to 24) are in `archive/DECISIONS-FOUNDATION-5.md` (D-151).
**D-130 to D-158** (steps 25 to 30) are in
`archive/DECISIONS-FOUNDATION-6.md` (D-161). **D-159 to D-167** (steps
31 to 33) are in `archive/DECISIONS-STAGE-0.2-1.md` (D-188). **D-177 to
D-193** (the main menu, steps 52 to 58) are in `archive/DECISIONS-MENU.md`
(D-196). **D-194 to D-200** (steps 43 to 45, UI steps U1 and U2) are in
`archive/DECISIONS-GETTING-AROUND.md` (D-208).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---


**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. Steps of stage 0.3 are versioned 0.3.x. The step list
is in `PROGRESS.md` and may change as we go.

**D-169 · 2026-10-19 · Regions are grids of rooms** (the owner's idea)
The world, surface and below, is split into regions joined to each
other. Each region is a grid of cells (a 3 × 3 marsh has 9), and not
every cell must be used. Each region has its own rule sheet for how it
generates, including promises that hold for every seed: a special room
with its own rules, a single secret entrance to it from a side that
changes with the seed, or a special item that must appear in a named
room or building. Each cave follows its own rules too. Generated once
per save, as D-019.

**D-170 · 2026-10-19 · Where the world is written down** (owner's pick)
`docs/WORLD.md` holds how the world works, under 8 KB. Each region gets
its own rule sheet in `docs/regions/`, one file per region, made when the
region is designed. Undecided details are open questions.

**D-171 · 2026-10-19 · Ways between rooms** (the owner's idea) Rooms
join by stairs up and down, by openings at their sides into the room
beside them, by water for a hero who can swim (Q-039), and by secret
entrances. Both sides of a way line up exactly, and each room is made to
fit the ways into it.

**D-172 · 2026-10-19 · Rooms of every shape and size** (the owner's idea
and pick) Rooms differ in shape and size by their kind: tunnels are
narrow, deserts are vast. A room bigger than the screen scrolls, with the
camera following the hero. The kinds and sizes are Q-038.

**D-173 · 2026-10-19 · Light comes through openings** (the owner's idea)
A doorway, cave mouth or stairs lets in the light of the place beyond.
Daylight shines in behind you by day, less in rain or snow, not at
night, following the time of day (D-025) and the weather (Q-035). An
open way into a lit room not yet found glows, so you can tell a lit
space lies ahead. Details are Q-040.

**D-174 · 2026-10-19 · Stairs must be found** (the owner's idea,
supersedes part of D-134) The stairs' glow is dimmer and shows only where
the fog of war has lifted, so stairs and doors must be found, unless
other light reveals them. Some underground places are brightly lit.
How dim is Q-041.

**D-175 · 2026-10-19 · Today's game becomes the first cave** (owner's
pick) The two crypt rooms and the generated depths below them become the
first cave under the starting region, reached from a cave entrance on
the surface. Q-043 asks whether it gets a bottom.

**D-176 · 2026-10-19 · A world map to uncover** (the owner's idea,
builds on D-021) Players uncover the map as they explore. Dev tools get
a switch that reveals the whole map, and a map mode, which may be the
same map players see. Details are Q-042.

**D-201 · 2026-10-20 · Depth 3 is a grid of rooms** (step 46, owner's
picks, part of Q-037) Depth 3 is the first region laid out from the
seed: a 2 × 2 grid with one cell left empty, so three cave rooms in an
L, each 17 × 20. Rooms side by side join by a one-tile opening at a spot
on their shared edge the seed picks. The seed picks the room with the
stairs up and down and the torch; the other two hold a flask, a rat and
a herb each, for now. Depths 4 and 5 stay one room until step 46b.

**D-202 · 2026-10-20 · Stairs line up between floors** (step 46, the
owner's idea, built at step 46b) Each floor knows what lies directly
above and below it: stairs down in a cell at a tile lead to stairs up in
the same cell at the same tile one floor down, and generation makes each
floor fit. The crypt's stairs down line up with depth 3's stairs up by
the same tile numbers, which fit inside the bigger cave room.

**D-203 · 2026-10-20 · Lined-up floors, depths 3 to 5 as grids** (step
46b, the owner's picks, builds D-202) Depths 4 and 5 are laid out like
depth 3: a 2 × 2 grid with one cell empty, three rooms in an L. On these
floors the stairs down are in another room than the stairs up. Under the
crypt the seed picks depth 3's stairs-up room, at the crypt's tile
numbers; below that, the cell under the stairs down is never the empty
one. Everything sits on the same grid: depth 6 and deeper, still one
room each, line up too, at the same tile.

**D-204 · 2026-10-20 · Stairs line up by their place on the floor**
(the owner's point, step 46b; written down now, built later) Lining up
does not need rooms of one size or a perfect grid. Each room has a spot
on its floor, and stairs line up by where they are on the floor, so
rooms of different sizes and shapes still match stairs above and below.
It is built when rooms first come in different sizes (Q-038); today
every generated room is 17 × 20, and the crypt matches by its tile
numbers.

**D-205 · 2026-10-20 · The map screen** (step 47, owner's picks,
answers Q-042) A map button left of the pause button (under it
sideways) and the M key open the map, and no turn passes. It shows the
floor the hero is on, laid out on its grid, each room drawn small, tile
by tile, from the tiles the hero remembers; rooms never seen stay dark.
Marks: the hero as a blinking dot (still with reduced motion), stairs
once found, and "DEPTH 3". A dev Reveal map switch shows every room of
the floor in full on the same screen, and the memory is kept as it is.
Changed after the playtest: the map sits in a box like the hearts', the
depth inside at the top, over the room under the menus' veil. It opens
on the whole floor; drag or the arrows scroll it, pinch or the wheel
zoom it. The map button turns into a cross that closes it; M, Esc or a
tap outside the box close it too (a full-screen map closed by any tap
before).

**D-206 · 2026-10-20 · The map turns between floors** (the owner's
idea at the 0.2.21 playtest; written down now, built at step 47b) Only
the map turns; the hero stays put. An up arrow left of "DEPTH 3" and a
down arrow right of it, with big tap areas, turn the map a floor up or
down; on a PC, < and > or Page Up and Page Down do the same. Tapping
stairs found on the map turns it to the floor they lead to, centred on
the matching stairs. Players can turn to any floor they have seen some
of, and an arrow is greyed out when nothing more lies that way; with
dev Reveal map, every floor from 1 to 99 shows in full. The hero's dot
shows only on their own floor.

**D-207 · 2026-10-20 · How the map turns** (step 47b, owner's picks;
keeping the zoom on stairs was proposed with the build) An arrow skips floors never seen: from depth 3 the down arrow goes
straight to depth 9 if that is the next floor seen. A floor is seen when
the hero is on it or remembers a tile of it. Turned with an arrow, a
floor opens fitted whole, as the map opens; turned by its stairs, it
keeps the zoom. A tap within 8 game pixels of found stairs' centre picks
them, the nearest first; a press that moves the map is not a tap. The
arrows are ember while a floor lies that way, else a dim grey; a tap on
the heading's left half turns up, its right half down.

**D-208 · 2026-10-20 · The decision log makes room again** (step 47b,
as D-196) D-194 to D-200 (steps 43 to 45, UI steps U1 and U2) moved
unchanged to `archive/DECISIONS-GETTING-AROUND.md`. They stay in force.
