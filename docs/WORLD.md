# The world

How the world is laid out, generated, lit between places and mapped.
Stage 0.3 builds it (D-168). Settled parts cite decisions; open parts
cite questions in `OPEN-QUESTIONS.md`. Where this page and a decision
disagree, the decision wins. Read this before any world, region, map or
room-joining step.

## Words we use
- **World:** everything, surface and below, generated once per save from
  its seed and then kept (D-019).
- **Region:** one area with its own character and rules, such as the
  owner's example, a marsh. It is a grid of cells. (D-169)
- **Cell:** one slot in a region's grid. A used cell holds one **room**.
  Not every cell has to be used. (D-169)
- **Room:** any one space you walk in, inside or outside: a cave
  chamber, a stretch of woods, a house, a desert. In the code it is a
  "place" (`src/core/room.js`).
- **Opening:** a way from one room to another (D-171).
- **Rule sheet:** a region's own list of generation rules (D-169).

## Regions are grids of rooms (D-169)
Each region is a grid, for example 3 × 3 = 9 cells. Its rule sheet says
how it generates: which cells are used, what kinds of room go where, and
fixed promises that hold for every seed. The owner's example: in a 3 × 3
marsh the centre room is special, with its own purpose and rules, and
has exactly one secret entrance, from a side that differs from seed to
seed. A rule sheet can also say that a special item must appear in a
named room or building. This works on the surface and below. How
regions join each other is Q-037.

## Ways between rooms (D-171)
- **Stairs** (and later maybe ladders or holes) up and down.
- **Side openings** at a room's edge, into the room beside it.
- **Water:** some rooms are reached only by following a river or an
  underground stream, once the hero can swim (Q-039).
- **Secret entrances**, like the marsh centre's.
Both sides of an opening always line up: walk out of one room's east
edge and you come in at the matching spot on the next room's west edge.

## How a region is generated (proposed, confirmed at its step, Q-037)
Two passes, both run from the save's seed:
1. **Layout:** pick the used cells, which sides join, which joins are
   secret, and where each promised thing goes (the centre's one entrance,
   the special item). Check that every promised room can be reached.
2. **Rooms:** each room is made to fit the openings it was given, using
   its kind's own rules (cave chambers, burrows, woods…). Each room gets
   its own seed from the save's seed, so it can be built the first time
   the hero walks in and still be the same every time.

## Shapes and sizes (D-172)
Rooms differ in shape and size by kind: tunnels are narrow, deserts are
vast. A room bigger than the screen scrolls: the camera follows the hero.
Today every room is 11 × 13 tiles, one screen. Which kinds, how big, and
whether shapes come from hand-made templates or are generated: Q-038.

## Light between rooms (D-173)
An opening lets in the light of the room on its other side.
- From outside: a cave mouth or the stairs behind you shine with
  daylight on a bright day, less in rain or snow, and not at night. It
  follows the time of day (D-025) and the weather (Q-035).
- Underground: an open entrance to a lit room you haven't found yet
  glows faintly, so you can tell a lit space lies ahead.
How far, how bright and what colour: Q-040.

## Finding stairs (D-174)
Stairs glow more dimly than now (D-134), and their glow shows only once
the fog of war has lifted from them, so stairs and doors must be found.
Light that reaches them, a lantern, a torch or a lit room, reveals them
as usual. Some underground places are brightly lit. Numbers: Q-041.

## The map (D-176)
The world map is uncovered as you explore and kept forever (D-021). Dev
tools get a switch to reveal the whole map, and a map mode, which may be
the same map players see. What it shows and how it opens: Q-042.

## Where today's game goes (D-175)
The two crypt rooms and the generated depths below them become the first
cave under the starting region, reached by a cave entrance on the
surface. Whether that cave has a bottom and the endless depths move
behind a portal (D-019, D-032): Q-043.

## The starting region
Not designed yet (Q-036). It is woods and mountains (D-028) and holds
landmarks, cave entrances and NPC houses. Each cave in it has its own
rule sheet too. We design it together, one rule at a time, in its own
file, `docs/regions/` (one file per region, under 8 KB each), made when
the first region is designed.

## Rule sheet template
For each region file:
- Name, place in the world, surface or below, biome (D-028).
- Grid size, and which cells may be used.
- Kinds of room it uses, and where.
- Fixed promises: special rooms, secret entrances, items that must
  appear and where.
- Openings to other regions.
- Light: darkness (D-063), daylight, lit rooms.
- Creatures and finds.
