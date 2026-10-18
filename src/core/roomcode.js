// § room code: the room as one line of text, to hand to Claude (D-051,
// D-052). No spaces or line breaks, so chat apps can't break it up:
//   GD:0.1.4:11x13:hero5,11:11#/#3.#5.#/...
// Rows are split by '/'. A number before a letter repeats it (3. is ...).
import { VERSION } from './version.js';

export function roomCode(state) {
  const { room, hero } = state;
  const rows = room.map.map((line) => line.replace(/(.)\1+/g, (run) => run.length + run[0]));
  return `GD:${VERSION}:${room.cols}x${room.rows}:hero${hero.x},${hero.y}:${rows.join('/')}`;
}

// § read: the code back into its map rows and the hero's tile (for Claude and tests)
export function readRoomCode(code) {
  const [tag, version, size, hero, rows] = code.trim().split(':');
  if (tag !== 'GD' || !rows) throw new Error('not a Gloamdeep room code');
  const [cols, rowCount] = size.split('x').map(Number);
  const [x, y] = hero.slice(4).split(',').map(Number);
  const map = rows.split('/').map((r) => r.replace(/(\d+)(\D)/g, (_, n, ch) => ch.repeat(Number(n))));
  if (map.length !== rowCount || map.some((r) => r.length !== cols)) throw new Error('room code size does not match');
  return { version, map, hero: { x, y } };
}
