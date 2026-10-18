// § room: a room written as a text map, one string per row, one letter per
// tile (D-040). Letters are looked up in the registry. Plain data, no drawing.
import { OUTSIDE } from './tiles.js';
import { byLetter } from './registry.js';
import { generateRoom } from './cave.js';
import { seedFor } from './rng.js';

// § first room: the shape of style study 1's room (study lines 96–110), with
// its water as floor, and the study's stairs down at 1,1 (D-130). The doorway
// comes in a later step.
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

// § places: every room, with where the hero starts in it, what is in it at
// first, and how deep it is (D-130, D-144). Stairs down lead one depth
// deeper and arrive on the stairs up there, and back.
export const PLACES = {
  first: { map: FIRST_ROOM, start: { x: 5, y: 11 }, lights: FIRST_LIGHTS, enemies: FIRST_ENEMIES, items: FIRST_ITEMS, depth: 1 },
  second: { map: SECOND_ROOM, start: { x: 1, y: 1 }, lights: SECOND_LIGHTS, enemies: SECOND_ENEMIES, items: SECOND_ITEMS, depth: 2 },
};

// § depth: the place at each depth, and back. Below the second room every
// depth is generated, with ids depth3, depth4…, from the game's seed (D-147,
// D-148); the second room is the fallback if a seed ever gives no room.
const DEEPER = 'second';
export const placeAt = (depth) => Object.keys(PLACES).find((id) => PLACES[id].depth === depth) || `depth${depth}`;
export const depthOf = (id) => PLACES[id]?.depth ?? Number(id.slice('depth'.length));
export const isGenerated = (id) => !PLACES[id];
export function placeFor(id, seed = 1) {
  if (PLACES[id]) return PLACES[id];
  const depth = depthOf(id);
  return { ...(generateRoom(seedFor(seed, depth)) || PLACES[DEEPER]), depth };
}

// The place one depth up or down from `id` (a stair's `leads`), or null above the first
export function placeBeside(id, way) {
  const depth = depthOf(id) + (way === 'down' ? 1 : -1);
  return depth >= 1 ? placeAt(depth) : null;
}

// § begin: any place as it begins, from its plan and the game's seed
export function beginPlace(id, seed) {
  const p = placeFor(id, seed);
  return { room: makeRoom(p.map), start: p.start, lights: p.lights, enemies: p.enemies, items: p.items || [] };
}

// § darkness: each place sets how dark never-seen tiles are and how
// remembered ones look, as light multipliers (D-063). The first room is a
// cave: pitch black outside the light, with memory a faint grey.
export const CAVE = { unseen: [0, 0, 0], remembered: [0.095, 0.095, 0.095] };

export function makeRoom(map, dark = CAVE) {
  const rows = map.length, cols = map[0].length;
  map.forEach((line, y) => {
    if (line.length !== cols) throw new Error(`room row ${y} is ${line.length} wide, not ${cols}`);
    for (const ch of line) if (!byLetter(ch)) throw new Error(`room row ${y} has unknown tile '${ch}'`);
  });
  return { cols, rows, map, dark };
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
