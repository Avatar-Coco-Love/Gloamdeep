# The region decisions (D-201 to D-208)

Moved unchanged from `docs/DECISIONS.md` at step 49b (D-213), when it
neared 12 KB: steps 46 to 47b (a region's layout, stairs lining up, the
map screen and turning it) and the decision log's last move (D-208).
These are still in force unless marked superseded. Depth numbers in them
are from before D-212: their depth 3 is depth 2 now. Grep for an ID or
topic; never read this whole.

---

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
