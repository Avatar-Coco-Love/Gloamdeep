# Stage 0.2's last steps, part 1 (D-234 to D-246)

Moved unchanged from `docs/DECISIONS.md` at step 41a3 (D-251), when it
passed 12 KB: a proper fall (step 36), main.js split in three, saving
the journey (step 37), the gloamling (step 38), experience (step 39) and
levels (step 40). These are still in force unless marked superseded.
Grep for an ID or topic; never read this whole.

---

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
(Last sentence superseded by D-266, 2026-10-23: old saves are upgraded.)

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
