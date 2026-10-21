# The surface decisions (D-209 to D-218)

Moved unchanged from `docs/DECISIONS.md` at step 51b (D-221), when it
neared 12 KB: the surface steps 48 to 51 (the woods, the lantern that
switches itself, the cave mouth, depths moving up, day and night,
daylight through the mouth) and the Seed Explorer, steps E1 and E2.
These are still in force unless marked superseded. Grep for an ID or
topic; never read this whole.

---

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
