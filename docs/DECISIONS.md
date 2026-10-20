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
(D-196).

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

**D-194 · 2026-10-20 · How dim the stairs are** (step 43, owner's
picks, answers Q-041) The stairs' glow shows only once the stairs tile
itself is remembered, then stays for good. It is half as bright as
before and reaches 1 tile, the stairs and a touch beside them. All
stairs, the crypt's too. A glow not yet found is no light, so it wakes
no rat; once found it counts as light as before (D-134). Dev Reveal
shows every glow (D-174).

**D-195 · 2026-10-20 · The camera, and bigger caves** (step 44, owner's
picks) In a room bigger than the screen the camera keeps the hero on the
middle tile and glides with each step; at the room's edges it stops, so
nothing beyond the room shows. One-screen rooms never move. The
generated caves (depth 3 down) grow to about 1.5 screens, 17 × 20 tiles;
the crypt rooms stay 11 × 13. Their chamber counts and open tiles grow
with the area (chambers 5 to 10, at least 107 open; burrows 119 to 138),
and no torch sits on the top row, where the hearts, depth and oil boxes
could hide it.

**D-196 · 2026-10-20 · The decision log makes room again** (step 45,
as D-188) D-177 to D-193 (the main menu, steps 52 to 58) moved unchanged
to `archive/DECISIONS-MENU.md`. They stay in force.

**D-197 · 2026-10-20 · The first side opening: a crypt room south**
(step 45, owner's picks) The gap in the first room's bottom wall is a
doorway into a new hand-made crypt room south of it, also at depth 1,
one screen (11 × 13), with its doorway at the top lining up. The seed
places its flask and rat (D-192). From a doorway tile, one more step out
puts the hero on the matching tile of the next room's facing edge. It
costs a turn like a step, says no line, and fades like the stairs (D-135).
Rats stay in their own room (D-132). The first cave now has 3 crypt rooms
(extends D-185).

**D-198 · 2026-10-20 · The top boxes move above the room** (step 45,
the owner's idea and picks; partly supersedes D-080) Nothing covers the
room any more. The hearts, depth and oil sit in a strip 15 game pixels
tall drawn on the game picture just above the room, dimmed with it under
a menu and empty on the title. Above that strip, one row holds the dev
wrench at the left and pause and the lantern at the right. On a wide
screen, when that gives a bigger picture, the row stands beside it: the
wrench at the top left, the lantern at the top right with pause under it.
(Changed in this PR: first the boxes turned faint over the hero, then
the owner moved them out of the room instead.)
*Partly superseded by D-199 (2026-10-20): the wide-screen layout.*

**D-199 · 2026-10-20 · Sideways, the room uses the sides** (UI step,
the owner's picks; changes the wide-screen part of D-198) When the
picture is bigger that way (a phone held sideways, a wide PC window),
the hearts, depth and oil stack in a column at the room's left, hearts
on top, then depth, then oil. The dev wrench stands left of the
picture's top, pause right of it, and the lantern at the bottom right,
under the thumb. The dev panel and the stats line keep to the space left
of the picture and never cover the room; the panel ends above the stats
line and scrolls. Upright nothing changes. Whether the room should fill
the whole screen sideways waits for a playtest (Q-048).
*Partly superseded by D-200 (2026-10-20): the dev panel's place.*

**D-200 · 2026-10-20 · The dev side drawer** (UI step 2, the owner's
picks; supersedes D-045's plain page text, D-087's grid of section
buttons, and D-199's panel placement) The wrench slides out a drawer
along the screen's left edge, from under the wrench down to the stats
line. Upright it covers the room's left part until closed. The sections
stand as a column of words at its left, the open one lit violet, and its
tools in one column beside them; tapping the open one folds it and the
drawer narrows to its tabs. Rows stay 44 px tall. Every dev word, the
stats line too, is in the game's pixel font at double size; the stats
line stays at the bottom left. When the drawer is short (sideways) the
tabs and tools scroll. D-093's colours stay.

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
