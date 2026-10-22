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
