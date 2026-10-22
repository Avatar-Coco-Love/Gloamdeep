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
`archive/DECISIONS-GETTING-AROUND.md` (D-208). **D-201 to D-208** (a
region and its map, steps 46 to 47b) are in `archive/DECISIONS-REGION.md`
(D-213). **D-209 to D-218** (the surface, steps 48 to 51, and the Seed
Explorer) are in `archive/DECISIONS-SURFACE.md` (D-221). **D-219 to
D-233** (the held walk, deeper floors, steps 51b to 59c, 34, 35 and M1)
are in `archive/DECISIONS-DEEPER.md` (D-236).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---


**D-168 · 2026-10-19 · Stage 0.3: the world, next** (owner's pick) The
world, made of regions, comes next as stage 0.3, starting with the
starting region. Stage 0.2's steps not yet built (34 to 41) wait and are
slotted in later. ~~Steps of stage 0.3 are versioned 0.3.x.~~ *That part
superseded by D-237 (2026-10-22): versions stay 0.2.x.* The step list
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

**D-234 · 2026-10-22 · A proper fall** (step 36, owner's pick; builds
D-119 and D-136) When the hero falls, the fall is shown where it
happened: the hero flashes red and lies down on the floor, turned a
quarter over, and the light closes to the deepest dark over about a
second. It stays dark a moment, then opens on the first room's start,
where the hero wakes as D-119 and D-136 say, with the line "You fall, and
wake again." No taps or keys are taken until then. With reduced motion
the room goes dark at once for a moment, then shows the hero awake.

**D-235 · 2026-10-22 · `src/main.js` is split in three** (owner's pick,
before step 37) The screens (title, pause, Settings, How to play, the
map, the Seed Explorer and the seed pad) move to `src/input/screens.js`,
and drawing each frame to `src/render/frame.js`. `main.js` keeps setting
up, moving, the held walk and the dev tools' hooks. The game plays the
same.

**D-236 · 2026-10-22 · The deeper decisions are archived** (as D-221)
D-219 to D-233 moved unchanged to `archive/DECISIONS-DEEPER.md` as this
file neared 12 KB. They stay in force.

**D-237 · 2026-10-22 · Stage 0.2's last steps, in the 0.3 world**
(owner's pick; supersedes the version part of D-168) Steps 36 to 41 are
stage 0.2's last steps, built in the world stage 0.3 began. Versions stay
0.2.x. `PROGRESS.md` says so in its Stage label.

**D-238 · 2026-10-22 · Saving the journey** (step 37, owner's picks)
One journey is kept on this device, saved after every turn, and from the
moment New journey starts it. Continue is then the title's first line,
already picked, and goes back to it as it was (D-178). While a journey is
saved, New journey asks "Start over? The saved journey is lost." with
Yes and No; No is picked to begin with, and No, Esc or P go back to the
title. A save from an older shape of the game is dropped quietly.

**D-239 · 2026-10-22 · Back to title keeps the journey** (owner's pick;
supersedes the last part of D-187) Back to title no longer ends the
journey: it stays saved for Continue. Only Yes on "Start over?" ends it.

**D-240 · 2026-10-22 · The gloamling, the second creature** (step 38,
owner's picks) A small shadow on little legs, dark teal and grey with the
pink hostile eyes (mock-up A). It is as strong as a rat: 2 health, a bite
of 1. Its lines: "The gloamling hisses at you." when hit (the first pick,
"…hisses and holds its ground.", didn't fit the text line), "The
gloamling hisses and fades." when killed, "The gloamling bites you."

**D-241 · 2026-10-22 · The gloamling shuns light** (step 38, owner's
picks) It never steps onto a tile lit by any light: lantern, torch or
glow. It notices the hero along a clear line, no wall between (D-226), lit
or not, and then keeps coming as close as the light lets it. Caught in
light, it backs away on its turn: to the dark tile next to it farthest
from the hero, else (deep in the light) one tile farther from the hero,
else it stays, cornered. *Part superseded by D-243 (2026-10-22): the
tile farther from the hero must be lit only by the lantern.* While lit it never bites. So while the lantern
has oil it can't reach the hero; at an ember or with the lantern off it
can.

**D-242 · 2026-10-22 · Where gloamlings live** (step 38, owner's pick;
builds on D-231) *Superseded by D-244 (2026-10-22): three a floor, from
depth 5 all the way down.* On each warren floor (depths 5 to 7) two rooms the seed
picks hold a gloamling in place of their second rat, on the same tile;
the rest of the room doesn't change. Creatures don't show their next move
yet (Q-049 stays open).

**D-243 · 2026-10-22 · A gloamling never backs into torchlight** (owner's
pick, after a playtest; supersedes part of D-241) Deep in the hero's
light, with no dark tile next to it, a gloamling backs onto a tile
farther from the hero only if just the lantern lights it, never a torch,
glow or daylight; else it stays. The edge of a light stays as D-059
counts it: the owner likes gloamlings lurking at the edges of light.

**D-244 · 2026-10-22 · More gloamlings, all the way down** (owner's
picks; supersedes D-242) On every floor from depth 5 down, warrens and
dungeon alike, three rooms the seed picks hold a gloamling in place of
their second rat, on the same tile.

**D-245 · 2026-10-22 · Experience** (step 39, owner's picks; builds
D-038) Beating a creature gives 1 experience, and so does stepping into
a room the hero has never stood in (a dev jump gives none). It shows only
as an amber "+1" rising over the hero; the total isn't shown yet. A fall
keeps it all, and the hand-made rooms stay found; the generated depths,
remade and forgotten after a fall (D-148), pay again. A journey saved
before this gets 1 for each room already on its map, the first room
aside (the owner's pick; creatures beaten then were never recorded).

**D-246 · 2026-10-22 · Levels** (step 40, owner's picks; builds D-038,
D-245) Experience adds up to levels, each costing 10 more than the one
before: level 2 at 10, level 3 at 30, level 4 at 60, level 5 at 100. A
level gives nothing yet; what it gives is Q-050. The level shows as
"LV 2" in a box after the hearts, like the depth's (sideways, under the
oil bar). Reaching one, the text line says "You feel stronger. Level
2.", over any other line that turn. A fall keeps the level, and older
saves need nothing new: the level comes from the experience.
