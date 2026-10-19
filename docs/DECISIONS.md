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
