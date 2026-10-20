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
`archive/DECISIONS-FOUNDATION-6.md` (D-161).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---


**D-159 · 2026-10-19 · Stage 0.2: the plan** (step 31, owner's pick)
The foundation list is done. Stage 0.2 covers three themes, in this
order: places with character first, then a dive worth repeating, then
stronger, slowly. Sounds wait for a later stage. Going deeper changes two
things in this stage: the kind of place, and the danger. Scarcer light
and better finds deeper wait for later too. The step list is in
`PROGRESS.md` and may change as we go. Steps from 32 on are versioned
0.2.x.

**D-160 · 2026-10-19 · Playtest of 0.1.25 and 0.1.26** (step 31,
owner's answers) The generated caves are still too boxy and too samey,
and going deeper feels like more of the same, so stage 0.2 starts with
natural caves and depths that change (D-159). D-152 stays until that
step replaces it. *It did: D-162 (2026-10-19).* The rat in remembered dark (D-153) and the healing
herb (D-155: 2 hearts, one a depth, its look) are right as they are.

**D-161 · 2026-10-19 · The foundation decisions are archived** (step
31, as D-041) The foundation stage ended, so D-130 to D-158 moved
unchanged to `archive/DECISIONS-FOUNDATION-6.md`. They stay in force.

**D-162 · 2026-10-19 · Natural caves: chambers and tunnels** (step 32,
owner's pick of three shown, supersedes D-152 and D-147's boxes and
straight gaps) A generated depth is 2 to 4 roundish chambers, each 1.3
to 3 tiles from its middle to its edge across and down, middles at least
4 tiles apart, with lumpy edges. One smoothing pass rounds them off, as
water wears stone: a tile becomes wall when 5 or more of it and its 8
neighbours are wall. Then each chamber joins the nearest one already
joined by a one-tile tunnel that heads there but steps aside at random
3 times in 10. The rest of D-147 stays: the 11 × 13 size, at least 45
open tiles, every tile reachable, stairs at least 8 steps apart. All are
first guesses to tune by playing.

**D-163 · 2026-10-19 · Burrows, for later** (step 32, owner's pick)
The other way shown, a digger wandering and carving twisty tunnels,
loops and dead ends, is kept as a candidate kind of place deeper down
for step 33 (depths that change kind). Not built yet.

**D-164 · 2026-10-19 · Grey rock for generated depths** (step 32,
owner's pick of three art styles shown, after the playtest of the first
0.2.0 build: "less like caves, more like different layouts") Depths 3
and down are drawn as raw grey rock; the first two rooms keep their
crypt bricks. Same view and light as the study, in its cool blue-greys:
a dark cap, a front face of piled rock chunks lit on their top edges,
a rough stone floor with gravel and puddles on about 1 floor tile in 8.
Rock edges don't keep to the tiles: corners round off and edges wander
up to a few pixels, but never over a floor tile's middle, and walking
stays by tile. The palette is in `ART-DIRECTION.md`. The other two
styles shown, brown earth and strata, and dark slate with drips and
stalactites, are kept as candidate looks for later kinds of place.

**D-165 · 2026-10-19 · Depths change kind: earth burrows from depth 6**
(step 33, owner's picks of options shown) Depths 3 to 5 stay grey rock
chambers (D-162, D-164); from depth 6 down every depth is an earth burrow.
The burrow is D-163's digger: it starts near the middle and wanders,
turning at random 35 times in 100, until 50 to 58 tiles are open. It is
drawn in D-164's brown earth look: packed earth with stones, and wall
faces of banded strata (palette in `ART-DIRECTION.md`). The rest of D-147
and the contents stay. A later kind of place takes a band further down.
Depth 6 and the digger's numbers are first guesses to tune by playing.

**D-166 · 2026-10-19 · Dev: Go to depth** (owner's request, ahead of God
mode, D-154) The dev panel's Room section gets Go to depth: pick 1 to 99
with − and +, then Go. The hero arrives on that depth's stairs up (the
first room's start, which has none), no turn passes, and the room left
waits as if the stairs were taken. The picker follows the hero's depth.

**D-167 · 2026-10-19 · Stairs that match the place** (owner's picks of
options shown, after the 0.2.1 playtest: the crypt stairs clash with the
burrows) In grey rock and earth, stairs keep D-133's five steps and
D-143's direction, but the steps are pale stone a shade above the
ground, still with violet lips. The black square goes: the opening around
the steps is the ground's own colour, darker toward the deep end, inside
a 1-pixel dark rim, so it reads as a ledge going down. The crypt rooms
keep their stairs. Rough-cut steps and a dug hole were shown and turned
down ("too distorted, you can't tell they are stairs"). Palette in
`ART-DIRECTION.md`.

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

**D-177 · 2026-10-20 · A title screen and a pause menu** (owner's pick,
part of Q-044) The game opens on a title screen with its name and the
menu on it. During play a small pause menu offers Resume, Settings, How
to play and Back to title.

**D-178 · 2026-10-20 · The menu shows only what works** (owner's pick,
part of Q-044) A button appears only once its feature exists: Continue
with saving (step 37), Sound with sound. Nothing is shown greyed out.

**D-179 · 2026-10-20 · What Settings holds first** (owner's picks,
answers Q-025, part of Q-044) A Controls switch: tap and swipe, tap
only, or swipe only. A Motion switch: full or reduced, on top of the
device's own setting. A seed: random, or one typed in. How to play is
its own page of the controls for touch, mouse and keyboard.

**D-180 · 2026-10-20 · The menu comes after step 42** (owner's pick,
part of Q-044) The menu steps follow the starting region's design
(step 42), before the world steps from 43 on.
