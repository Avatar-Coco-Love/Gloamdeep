// § room: a room written as a text map, one string per row, one letter per
// tile (D-040). Letters are looked up in the registry. Plain data, no drawing.
import { OUTSIDE } from './tiles.js';
import { byLetter } from './registry.js';

// § first room: the shape of style study 1's room (study lines 96–110), with
// its water as floor. Stairs and the doorway come in later steps.
export const FIRST_ROOM = [
  '###########',
  '#...#.....#',
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

export function makeRoom(map) {
  const rows = map.length, cols = map[0].length;
  map.forEach((line, y) => {
    if (line.length !== cols) throw new Error(`room row ${y} is ${line.length} wide, not ${cols}`);
    for (const ch of line) if (!byLetter(ch)) throw new Error(`room row ${y} has unknown tile '${ch}'`);
  });
  return { cols, rows, map };
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
