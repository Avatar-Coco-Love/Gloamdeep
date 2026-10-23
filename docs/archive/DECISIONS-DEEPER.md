# Deeper floors and the held walk (D-219 to D-233)

Moved unchanged from `docs/DECISIONS.md` at step 36 (D-236), when it
neared 12 KB: the held walk (step 51b), the map joining the surface and
the doorway line, deeper floors as grids (steps 59 to 59c), more rats
deeper, the deepest depth kept and the map naming the area (steps 34, 35
and M1). These are still in force unless marked superseded. Grep for an
ID or topic; never read this whole.

---

**D-219 · 2026-10-21 · Hold to walk around walls** (the owner's idea;
answers Q-026; step 51b, next) Holding a finger or the mouse button walks
the hero toward the tile under it now, finding a way around walls, at the
held pace (D-044). Sliding moves the target; lifting stops at once. The
way uses only tiles the hero remembers. Each step is still one turn, oil
burns as usual, and the walk stops by itself when a creature or an item
comes into view. Taps, swipes and keys stay as they are. How it looks is
shown in a mock-up first.

**D-220 · 2026-10-21 · How the held walk looks and stops** (step 51b,
owner's picks from a mock-up) While a finger or the mouse is held, a
small pulsing amber corner frame marks the tile it will walk to; the
target stays on that tile of the room as the camera follows the hero,
and moves only when the finger slides. When a creature or an item comes
into view, the hero stops and an amber "!" shows over them for about a
second; the walk stays stopped until the finger lifts and holds again.
Taking stairs stops it too. Held on a dark tile, or one no remembered
way leads to, the hero steps straight toward it as a held finger did
before (D-044).

**D-221 · 2026-10-21 · The surface decisions are archived** D-209 to
D-218 moved unchanged to `archive/DECISIONS-SURFACE.md` as this file
neared 12 KB. They stay in force.

**D-222 · 2026-10-21 · The game's map joins the surface** (after the
0.2.31 playtest, owner's pick; supersedes the map part of D-213) Once the
hero has been in both the woods and the crypt, the map shows them joined
as the Seed Explorer does (D-216), the crypt beside the cave mouth, with
only the rooms the hero knows and the hero on it. Before that it shows
the part the hero knows. Dev Reveal map shows the whole surface.

**D-223 · 2026-10-21 · Deeper floors as grids, with variety** (after the
0.2.31 playtest, owner's picks; part of Q-038) From depth 5 down the
floors are one room, the stairs about 15 steps apart and one rat each
(the owner's girlfriend's report). They become grids like depths 2 to 4,
with the stairs down in another room, and with some variety: each kind
of place (crypt, cave, dungeon, any underground place) has its own set
of rules for how it is made. The rules are settled with a mock-up at the
next step. More rats come from the grids now (one a room) and from step
34 (more rats deeper) later.

**D-224 · 2026-10-21 · Rooms apart on the map, doorways bridged** (owner's
pick from a mock-up of three ways; step 51c) On the map screens, in the
game and the Seed Explorer, rooms side by side are drawn one tile apart,
a dark seam between them, so a floor no longer reads as one big room. A
pale blue line (the cloak's `#a6e0e4`) fills the seam tile of each
doorway once the hero remembers the floor on either side of it, or all of
them with Reveal map. The cave mouth gets one too, between the woods and
the crypt.

**D-225 · 2026-10-21 · The doorway line in the game, then step 59**
(owner's pick, option A of a mock-up of three marks) As its own step
(51d), a thin pale blue line in the same colour marks each doorway in the
game, across the doorway tile's outer edge where you step through. It
pulses gently, and holds still with reduced motion. Step 59 (D-223)
comes after it.

**D-226 · 2026-10-21 · A rat needs a clear line to notice** (owner's
pick, after the owner saw a torchlit rat come from behind a wall;
supersedes part of D-126) A rat on a lit tile notices the hero only when
the straight line between their tiles' centres crosses nothing that
blocks light. Distance doesn't matter. A bite or a hit still makes it
notice (D-157), and one that has noticed keeps coming (D-127).

**D-227 · 2026-10-21 · Burrow floors are warrens** (step 59, owner's
pick from a mock-up of three plans; builds D-223, supersedes part of
D-203) From depth 5 down, where the earth burrows are, each floor is a
3 × 3 grid with 5 rooms, grown one at a time from the room under the
stairs down above. Each room joins only the room it grew from, so there
are dead ends and one way through. The stairs down are in the room
farthest from the stairs up. Each room keeps the burrow's own digger, a
flask, a rat and a herb. The dungeon, a new kind of built stone halls,
gets its own step later; its plan, look and depths are settled there.

**D-228 · 2026-10-21 · The dungeon** (step 59b, owner's picks from a
mock-up of three ways each; part of Q-038) From depth 8 down every floor
is a dungeon; the earth warrens are depths 5 to 7. A dungeon floor is 6
rooms in a 3 × 3 grid, grown one at a time like the warren, plus one more
opening between two rooms side by side, so one way round makes a loop.
The stairs down are in the room farthest from the stairs up. Each room is
3 or 4 straight-walled halls (4 to 7 tiles wide, 4 to 6 tall) joined by
one-tile corridors that turn once, with the usual torch, flask, rat and
herb. It uses the crypt's bricks for now; darker, colder bricks are the
owner's wish if they are not hard to do.

**D-229 · 2026-10-21 · Darker, colder dungeon bricks** (step 59c, the
owner's wish in D-228, option B of the step 59b mock-up) The dungeon is
drawn with the crypt's brick and slab art, every colour's red, green and
blue multiplied by 0.72, 0.78 and 0.95: deeper and bluer. The stairs keep
the crypt's colours. The crypt rooms at the top don't change.

**D-230 · 2026-10-21 · The inventory gets its own step** (owner's pick)
A small bag screen is built as its own step just before step 41 (first
gear), so gear has somewhere to go. Its look and size are settled at
that step. The owner's wish list and research on similar games are kept
in `RESEARCH.md`.

**D-231 · 2026-10-21 · More rats deeper** (step 34, owner's picks; builds
D-223) Every generated room at depths 2 to 4 holds one rat, and from
depth 5 down two, so a warren floor has 10 and a dungeon floor 12. It
stays at two until the hero can grow stronger. The first rat guards the
flask as before; the second sits anywhere open by the same rules (at
least 5 steps in, 3 tiles from the stairs, out of the torch's light), and
the rest of a seed's room doesn't change.

**D-232 · 2026-10-21 · Deepest depth kept** *Superseded in part by D-260 (2026-10-23): the line is off the title screen; the record is still kept.* (step 35, owner's picks;
builds D-021) The deepest depth the hero has walked to is kept on this
device for good, across journeys. It shows first on the title screen, a
grey line under the menu ("Deepest: depth 7"), hidden until the hero has
gone below the surface. Dev jumps don't count: after Go to depth, the
journey stops counting until a New journey.

**D-233 · 2026-10-21 · The map names the area** (the owner's idea and
picks) The map and the Seed Explorer show a floor's area after its depth,
"DEPTH 9 · DUNGEON": Crypt at depth 1, Cave at 2 to 4, Warren at 5 to 7,
Dungeon from 8. The surface stays SURFACE, since it holds both the woods
and the crypt. Each room's walls on the map take its area's colour (crypt
brick, cave grey, warren brown, dungeon blue, woods green), and the area's
name in the heading takes its floor's colour.
