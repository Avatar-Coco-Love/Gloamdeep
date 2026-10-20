// § room: a room written as a text map, one string per row, one letter per
// tile (D-040). Letters are looked up in the registry. Plain data, no drawing.
import { OUTSIDE } from './tiles.js';
import { byLetter } from './registry.js';
import { generateRoom } from './cave.js';
import { seedFor } from './rng.js';
import { scatter } from './scatter.js';
import { cellOf } from './region.js';

// § first room: the shape of style study 1's room (study lines 96–110), with
// its water as floor, and the study's stairs down at 1,1 (D-130). The gap in
// its bottom wall is a doorway into the south room (D-197).
export const FIRST_ROOM = [
  '###########',
  '#>..#.....#',
  '#...#.....#',
  '#.........#',
  '##.###....#',
  '#.........#',
  '#..#...#..#',
  '#.........#',
  '#.........#',
  '#..#...#..#',
  '#.........#',
  '#.........#',
  '#####.#####',
];

// § first lights: the study's three wall torches (study line 273), the
// top-right one a tile left, clear of the oil bar (D-101), and an unlit one
// on the block's face near the start (D-123).
export const FIRST_LIGHTS = [{ id: 'torch', x: 2, y: 0 }, { id: 'torch', x: 7, y: 0 }, { id: 'torch', x: 4, y: 4 }, { id: 'unlitTorch', x: 7, y: 9 }];

// § first items: a flask in the top-right cave, off the way to the stairs (D-141)
export const FIRST_ITEMS = [{ id: 'flask', x: 9, y: 2 }];

// § first enemies: the study's rat, where it sat (study line 286, D-106)
export const FIRST_ENEMIES = [{ id: 'rat', x: 2, y: 10 }];

// § second room: two caves joined by a gap, the stairs up at 1,1 where the
// hero arrives (D-131), and stairs down at 1,11, the lower cave's far left (D-145).
export const SECOND_ROOM = [
  '###########',
  '#<....#####',
  '#.....#####',
  '#.....#####',
  '#.........#',
  '###.......#',
  '###.......#',
  '#####.#####',
  '#####.#####',
  '#.........#',
  '#.........#',
  '#>........#',
  '###########',
];

// § second contents: a flask in the far corner of the lower cave, a rat
// guarding it (D-138 to D-140), and a torch by the stairs up (D-141)
export const SECOND_LIGHTS = [{ id: 'torch', x: 3, y: 0 }];
export const SECOND_ITEMS = [{ id: 'flask', x: 9, y: 11 }];
export const SECOND_ENEMIES = [{ id: 'rat', x: 7, y: 10 }];

// § south room: a crypt hall beside the first room, through the first room's
// bottom doorway, which lines up with its own at 5,0 (D-197). Pillars above,
// a lower hall below with a lit torch over its door and an unlit one by the
// far wall. The seed places its flask and rat (D-192).
export const SOUTH_ROOM = [
  '#####.#####',
  '###.....###',
  '#.........#',
  '#.#..#..#.#',
  '#.........#',
  '#.#..#..#.#',
  '#.........#',
  '####.#.####',
  '#.........#',
  '#.........#',
  '#..##.##..#',
  '#.........#',
  '###########',
];
export const SOUTH_LIGHTS = [{ id: 'torch', x: 5, y: 7 }, { id: 'unlitTorch', x: 7, y: 10 }];
export const SOUTH_ITEMS = [{ id: 'flask', x: 9, y: 11 }];
export const SOUTH_ENEMIES = [{ id: 'rat', x: 1, y: 9 }];

// § places: every room, with where the hero starts in it, what is in it at
// first, and how deep it is (D-130, D-144). Stairs down lead one depth
// deeper and arrive on the stairs up there, and back. `sides` names the room
// beyond each edge with an opening (D-197). The first place at a depth is
// the one its stairs lead to; a room beside it takes a `slot`, so the seed
// places its things apart from its neighbour's.
export const PLACES = {
  first: { map: FIRST_ROOM, start: { x: 5, y: 11 }, lights: FIRST_LIGHTS, enemies: FIRST_ENEMIES, items: FIRST_ITEMS, depth: 1, sides: { down: 'south' } },
  second: { map: SECOND_ROOM, start: { x: 1, y: 1 }, lights: SECOND_LIGHTS, enemies: SECOND_ENEMIES, items: SECOND_ITEMS, depth: 2, guard: true },
  south: { map: SOUTH_ROOM, start: { x: 5, y: 0 }, lights: SOUTH_LIGHTS, enemies: SOUTH_ENEMIES, items: SOUTH_ITEMS, depth: 1, slot: 1, sides: { up: 'first' } },
};

// § depth: the place at each depth, and back. Below the second room every
// depth is generated, with ids depth3, depth4…, from the game's seed (D-147,
// D-148); the second room is the fallback if a seed ever gives no room. A
// depth laid out as a grid (region.js, D-201) adds rooms depth3:x,y beside
// depth3, which holds its stairs.
const DEEPER = 'second';
export const placeAt = (depth) => Object.keys(PLACES).find((id) => PLACES[id].depth === depth) || `depth${depth}`;
export const depthOf = (id) => PLACES[id]?.depth ?? parseInt(id.slice('depth'.length), 10);
export const isGenerated = (id) => !PLACES[id];
// The hand-made rooms keep their shape; the seed places what is in them (D-192).
export function placeFor(id, seed = 1) {
  if (PLACES[id]) return { ...PLACES[id], ...scatter(PLACES[id], seedFor(seed, PLACES[id].depth) + (PLACES[id].slot || 0)) };
  const depth = depthOf(id), { shape, look } = kindAt(depth), cell = cellOf(seed, id, depth);
  if (!cell) return { ...(generateRoom(seedFor(seed, depth), shape) || PLACES[DEEPER]), depth, look };
  const made = generateRoom(cell.seed, shape, cell) || generateRoom(cell.seed, shape, { stairs: cell.stairs });
  return { ...(made || PLACES[DEEPER]), depth, look, sides: cell.sides };
}

// The room beyond each edge of a place with openings, by direction (D-197, D-201)
export const sidesOf = (id, seed) => PLACES[id]?.sides || (isGenerated(id) && cellOf(seed, id, depthOf(id))?.sides) || {};

// § kinds: the kind of place at each generated depth, from the depth it
// starts at (D-165): grey rock chambers, then earth burrows from depth 6.
// A later kind adds a line further down.
const KINDS = [
  { from: 3, shape: 'chambers', look: 'rock' },
  { from: 6, shape: 'burrows', look: 'earth' },
];
export const kindAt = (depth) => KINDS.findLast((k) => depth >= k.from);

// The place one depth up or down from `id` (a stair's `leads`), or null above the first
export function placeBeside(id, way) {
  const depth = depthOf(id) + (way === 'down' ? 1 : -1);
  return depth >= 1 ? placeAt(depth) : null;
}

// § begin: any place as it begins, from its plan and the game's seed
export function beginPlace(id, seed) {
  const p = placeFor(id, seed);
  return { room: makeRoom(p.map, CAVE, p.look), start: p.start, lights: p.lights, enemies: p.enemies, items: p.items || [] };
}

// § darkness: each place sets how dark never-seen tiles are and how
// remembered ones look, as light multipliers (D-063). The first room is a
// cave: pitch black outside the light, with memory a faint grey.
export const CAVE = { unseen: [0, 0, 0], remembered: [0.095, 0.095, 0.095] };

// § look: how a room's walls and floor are drawn. The first rooms are
// crypt bricks; generated depths are raw grey rock (D-164) or earth (D-165).
export function makeRoom(map, dark = CAVE, look = 'crypt') {
  const rows = map.length, cols = map[0].length;
  map.forEach((line, y) => {
    if (line.length !== cols) throw new Error(`room row ${y} is ${line.length} wide, not ${cols}`);
    for (const ch of line) if (!byLetter(ch)) throw new Error(`room row ${y} has unknown tile '${ch}'`);
  });
  return { cols, rows, map, dark, look };
}

// § lookups
export function letterAt(room, x, y) {
  return x < 0 || y < 0 || x >= room.cols || y >= room.rows ? OUTSIDE : room.map[y][x];
}
export const tileAt = (room, x, y) => byLetter(letterAt(room, x, y));
export const isWall = (room, x, y) => tileAt(room, x, y).id === 'wall';

// § change: a new room with one tile swapped; the old room is not changed
export function withTile(room, x, y, tile) {
  const map = room.map.map((line, row) => (row === y ? line.slice(0, x) + tile.letter + line.slice(x + 1) : line));
  return { ...room, map };
}
