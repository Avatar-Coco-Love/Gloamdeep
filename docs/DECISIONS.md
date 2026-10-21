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
(D-213).

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

**D-209 · 2026-10-20 · The first woods room** (step 48, owner's picks
from a mock-up of three tree looks, https://claude.ai/artifact/7Hh8yfLvKzbSKYpbFziWya;
part of Q-034 and Q-038) Until the cave mouth (step 49), only a dev
drawer button, Go outside, leads to it; a new journey still starts in
the crypt. It is plain daylight: the whole room is lit and remembered,
no fog and no lantern needed; a lit lantern still burns oil as before.
One round tree a tile, each with its own crown, trunk and shadow. The
room is 17 × 20, like the caves, made from the seed: trees all round the
edge, thick near it and thinner inside, every open tile joined. It is
depth 0; the strip and the map say SURFACE until places have names.

**D-210 · 2026-10-20 · A lantern that switches itself** (before step 49,
owner's picks; answers Q-049) Settings gains "Lantern: By hand" under
Seed, above Back; picking it, Left or Right flip it to "Lantern: By
itself", kept on this device. It is By hand until picked. By itself, the
lantern goes out as the hero comes into daylight and lights again as they
leave it, only at that moment, so the player's own switch between holds.
For now it reacts to daylight only; night (step 50) will join it. No line
is said. Later, a choice of oil levels at which it goes out (an idea).

**D-211 · 2026-10-20 · The cave mouth** (step 49, owner's picks from a
mock-up of three looks, https://claude.ai/artifact/KsSQEcYgn71XLjaYAzVn8G;
builds on D-184) For now the mouth sits on an edge of the one woods room,
standing in for D-184's side cell until the region's 3 × 3 grid is
built: the seed picks the edge (north, east, south or west) and a spot
along it, kept from the corners. It is mock-up C: trees along the edge,
a mound of grey rock either side of a dark mouth, an arch on the north
edge, and the tile in front worn to earth. Walking through it, the hero
arrives on the crypt's facing side, at a gap in its wall (the owner's
rule: go in up, arrive at the bottom): going up, the south room's bottom,
then on up into the first room; going down, left or right, the first
room. Walking back out arrives on the mouth. A new journey still starts
in the crypt, and dev Go outside stays. Daylight through the mouth waits
for step 51.

**D-212 · 2026-10-20 · A doorway keeps the depth; stairs change it**
(the owner's idea; for step 49b) A way in through a doorway or mouth
stays on the same level, and only stairs go down. So the two crypt rooms
become depth 0, like the woods, and every depth below moves up one: the
second room is depth 1, the generated floors 2, 3 and 4, still 5 levels
in all (D-185), and the deeper kinds move up one with them. The strip
says SURFACE in the crypt, until places have names. Built in its own
step, 49b, after the mouth.

**D-213 · 2026-10-21 · How the depths move up** (step 49b, owner's
picks) A seed keeps its rooms: each place below the surface keeps the
seed numbers of its old depth, so only the labels change. The map shows
the part of the surface the hero is in, the woods or the two crypt
rooms, both headed SURFACE; the second room's stairs up lead to the
crypt. Dev Go to depth goes from 0, the crypt, and Go outside still goes
to the woods. D-201 to D-208 moved unchanged to
`archive/DECISIONS-REGION.md`; they stay in force.

**D-214 · 2026-10-21 · A Seed Explorer** (the owner's idea, owner's
picks) A dev entry on the title menu that opens the map screen instead
of the game, with everything revealed and the seed it shows written on
it. Easy-to-reach buttons: Reseed (a random seed each tap), type a seed
(the seed pad), and back to the last seed; floors turn as on the map.
On the surface it shows the woods and the crypt together, in the
Explorer only; the game's map keeps D-213. Built next, before step 50:
first the Explorer, then the whole surface on it. Later, as their own
steps: a button that fits places far apart on one depth, painting
rooms, and saving them to a file for Claude to build into the game.

**D-215 · 2026-10-21 · How the Seed Explorer looks** (step E1, owner's
picks) "Seed Explorer" is the title menu's last line, like the others.
A bar along the map box's bottom shows "SEED 48213" with Back on its
left and Type and Reseed on its right; the cross where the map button
sits, Esc or a tap outside the box return to the title. It opens on the
seed typed in Settings, else a random one, on the surface, and never
changes Settings. Back steps through every seed shown this visit, newest
first, and is greyed out when none is left. Proposed with the build:
Reseed, Back and a typed seed keep the floor shown; the seed pad starts
empty there, OK with nothing typed keeps the seed, Random shows a random
one; R, T and B are the keys.

**D-216 · 2026-10-21 · The whole surface in the Explorer** (step E2,
owner's picks from a mock-up of three layouts,
https://claude.ai/artifact/Qtjc4ZR6V9EDrekCgEBQQU) On the Explorer's
surface map the crypt sits where walking through the cave mouth takes
you: the mouth's tile right beside the gap in the crypt's wall, so it
moves with the mouth's edge. The mouth stays plain floor on the map, with
no mark of its own. The game's map keeps D-213.

**D-217 · 2026-10-21 · Day and night outside** (step 50, owner's picks;
builds on D-025, D-209, D-210; part of Q-027) A day is 300 turns from
morning: 170 of full day, a 30-turn dusk, 70 of night, a 30-turn dawn
(day 200, night 100). A journey starts in the morning and the clock runs
below ground too; only rooms under the sky show it. Dusk and dawn fade
the light. At night the woods are like a cave: only lights show tiles,
never-seen ones are black, remembered ones a dim moonlit blue, the
study's cold blue (D-060). Daylight lights and remembers the whole room
until halfway through dusk and from halfway through dawn; the lantern set
to By itself lights and goes out at those moments. No clock on screen,
only the light. Dev: TIME, +10 and +50 in the Room tab move the clock
only, and the status line shows the turn of the day.

**D-218 · 2026-10-21 · Daylight through the cave mouth** (step 51,
owner's picks; builds on D-173, D-211, D-217; part of Q-040) The gap the
mouth leads to in the crypt is a light, like a torch: by day it reaches
3 tiles in a pale daylight, through dusk it shrinks with the daylight and
warms toward the torches' orange, at night it is gone, and dawn brings it
back the same way. It is real light: tiles it reaches are remembered,
lantern or not, and a creature standing in it sees the hero. Weather
waits for Q-035.

**D-219 · 2026-10-21 · Hold to walk around walls** (the owner's idea;
answers Q-026; step 51b, next) Holding a finger or the mouse button walks
the hero toward the tile under it now, finding a way around walls, at the
held pace (D-044). Sliding moves the target; lifting stops at once. The
way uses only tiles the hero remembers. Each step is still one turn, oil
burns as usual, and the walk stops by itself when a creature or an item
comes into view. Taps, swipes and keys stay as they are. How it looks is
shown in a mock-up first.
