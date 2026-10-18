// § room: a room written as a text map, one string per row, one letter per
// tile (D-040). Letters are looked up in the registry. Plain data, no drawing.
import { OUTSIDE } from './tiles.js';
import { byLetter } from './registry.js';

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

// § first enemies: the study's rat, where it sat (study line 286, D-106)
export const FIRST_ENEMIES = [{ id: 'rat', x: 2, y: 10 }];

// § second room: two caves joined by a gap, the stairs up at 1,1 where the
// hero arrives (D-131). Nothing in it yet.
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
  '#.........#',
  '###########',
];

// § places: every room, with where the hero starts in it, what is in it at
// first, and which place its stairs lead to (D-130 to D-132). A stair down
// arrives on the next place's stair up, and back.
export const PLACES = {
  first: { map: FIRST_ROOM, start: { x: 5, y: 11 }, lights: FIRST_LIGHTS, enemies: FIRST_ENEMIES, down: 'second' },
  second: { map: SECOND_ROOM, start: { x: 1, y: 1 }, lights: [], enemies: [], up: 'first' },
};

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
