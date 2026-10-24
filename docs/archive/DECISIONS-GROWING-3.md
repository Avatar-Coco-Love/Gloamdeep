# Built to grow, part 3 (D-279 to D-298)

Moved unchanged from `docs/DECISIONS.md` at 0.2.84 (D-300), when it would
have passed 12 KB: play to earn, the world as the dial, gathering later,
Records' lines, the hero and play time in a Profiles box, Change look, the
fleeing rat, embers and Growth, smooth play on slow devices, and the
oilcap (step C1). These are still in force unless marked superseded. Grep
for an ID or topic; never read this whole.

**D-279 · 2026-10-23 · Built to grow's second decisions are archived**
(owner's pick, as D-274) D-270 to D-278 moved unchanged to
`archive/DECISIONS-GROWING-2.md`. They stay in force.

**D-280 · 2026-10-23 · Play to earn, never pay** (the owner's idea and
pick) More looks and unique things will come, unlocked by playing, never
by paying: no pay to win, no pay to earn. They cost a separate currency
earned only in play, not experience, so looking good never costs
strength. Among them, fun and unique patterns on the cloak, such as
zebra stripes, cow spots or camo (added 2026-10-23). Its name, how it is
earned and what it buys are Q-055.

**D-281 · 2026-10-23 · The world is the dial** (owner's pick) Players
choose a calm or an intense game by where they go, with no mode setting:
calmer things near the surface and home, danger deeper. Some surface
places are hard too. Showing a region's name and a difficulty rating on
entering is an idea for later (Q-056).

**D-282 · 2026-10-23 · Gathering, later** (the owner's wish) Mining,
fishing, farming and harvesting are all wanted, built one at a time much
later. Mining works like Stardew Valley's: ore deposits to break, but a
room's outer walls can't be destroyed. Each gets its own decisions.

**D-283 · 2026-10-23 · Steps in Records** (the owner's pick; the first
stats page fact after D-260) The Journal's Records gain a fifth line,
Steps, at the foot: every tile the hero walks onto, on all the
profile's journeys, from 0. Dev jumps stop it counting, as the others.

**D-284 · 2026-10-23 · Achievements in tiers, later** (the owner's wish)
Achievements will come, built on Records: a record can have its own set,
reached at higher and higher numbers, such as many tiers of steps
walked. Not every record needs a set. Finishing one can give a reward.
The tiers, the rewards and where they show are Q-057.

**D-285 · 2026-10-23 · Flasks poured in Records** (the owner's picks) The
Journal's Records gain a sixth line, Flasks poured, at the foot under
Steps: every flask poured into the lantern, by hand or by itself (D-249),
on all the profile's journeys, from 0. Dev jumps stop it counting, as the
others.

**D-286 · 2026-10-23 · Torches lit in Records** (the owner's picks) The
Journal's Records gain a seventh line, Torches lit, at the foot under
Flasks poured: every torch the hero lights, on all the profile's
journeys, from 0. Each lighting counts, also a torch lit again after a
fall or "Reset room" puts it back unlit, as the hero can't yet put a
torch out to light it again. Dev jumps stop it counting, as the others.

**D-287 · 2026-10-23 · The hero in a Profiles box** (the owner's picks;
builds D-271) Each profile's box on the slot screen shows its hero 1×,
in the profile's look (D-275 to D-278), on a small square of lit crypt
floor with its shadow, at the box's left; the name, Deepest and the
slot's number stay, the name and Deepest moved right to make room. An
Empty box has no hero. Play time in the box is still to come.

**D-288 · 2026-10-23 · Back on the name pad** (the owner's find and
pick; builds D-272, D-273) The name pad gets a Back key on its own row
under Del and OK, as the look screens have. It does what Esc does: a new
profile goes back to the slot screen with nothing made, and a rename
keeps the old name.

**D-289 · 2026-10-23 · Change look** (the owner's wish and pick) The
slot screen's Look line reads "Change look", clearer to new players. It
still reads Cancel while picking a box, and the heading still asks
"Change whose look?".

**D-290 · 2026-10-23 · A slot's play time** (the owner's picks; builds
D-271, D-287) Each profile keeps its play time: only time on the play
screen in a journey counts, not the menus, the Journal or a hidden page.
It shows in its Profiles box at the right end of the Deepest line, as
hours and minutes ("1h 23m"), or only minutes under an hour ("23m").
Profiles made before it start from 0.

**D-291 · 2026-10-23 · Time played in Records** (the owner's picks; builds
D-290) The Journal's Records gain an eighth line, Time played, at the foot
under Torches lit: the profile's play time (D-290), written as in its
Profiles box ("1h 23m", or "23m" under an hour).

**D-292 · 2026-10-24 · The rat flees** Partly superseded by D-301
(2026-10-24): it flees only on a coin toss, and for 4 turns. (the owner's picks; partly
supersedes D-107 and D-127) A rat flees once it is hurt, at 1 health
after a lantern hit; a knife still kills it in one. Each turn it steps
one tile away from the hero, the mirror of its chase (D-128): the
farther side first, else the other side, else it stays put. It bites
only when it can't step away. It flees until it dies or the hero falls.
The hit line becomes "The rat squeaks and flees."

**D-293 · 2026-10-24 · Embers and the Growth tab** (the owner's picks;
answers Q-050, builds D-246) Each level past the first gives 1 ember,
including levels reached before this. Embers are spent in a new Journal
tab, Growth, after Records, at any time. The first thing an ember buys
is one more heart, up to 5 more (10 in all); it arrives full. Spent
embers can't be taken back. Past 5, hearts fill a second row of 5.

**D-294 · 2026-10-24 · Smooth on slow devices** (the owner's picks, after
a playtest with 30 to 50 knives placed felt slow) The hero and creatures
slide by time, not by frame: a tile in about 0.09 seconds on any device,
the speed they had at 60 frames a second. The dev stats line starts with
the frames drawn each second ("fps 60"). Cheaper lighting, the most work
in each frame, is an idea for later.

**D-295 · 2026-10-24 · Cheaper lighting keeps the look** (the owner's
pick, builds D-294) Lighting stays as it is for now. When it is made
cheaper, the picture must stay exactly the same, checked pixel by pixel.

**D-296 · 2026-10-24 · The oilcap, the first resource** (the owner's
picks) An amber mushroom, the Oilcap, lies in every generated room, one
on any open tile nothing else took, picked last so the rest of each
seed's room stays as it was. Walked onto, it goes into the bag as a flask
does, in stacks of 3. Other kinds of mushroom will craft other things.
The first craft comes next: 3 oilcaps make 1 oil flask, from the bag,
anywhere for now; workstations for some crafts may come later.

**D-297 · 2026-10-24 · Lines that take turns** (the owner's picks) An
oilcap says a line as it is picked up, and choosing its slot in the bag
says a hint, free. Each comes from a short list, said in turn, then from
the first again: "You grab the oilcap.", "You pluck an oilcap from the
floor.", "The oilcap comes up with a soft pop."; and "Three make an oil
flask.", "It smells faintly of lamp oil.", "Its amber cap is slick with
oil." The save keeps which comes next.

**D-298 · 2026-10-24 · The bag sits above the text line** (the owner's
pick) The bag panel, over the room's foot, moves up 13 pixels so the
text line under the room stays in view while it is open.
