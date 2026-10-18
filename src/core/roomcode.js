// § room code: the room as a text map, ready to paste into src/core/room.js
// (D-051). The first line names the version, the size and the hero's tile.
import { VERSION } from './version.js';

export function roomCode(state) {
  const { room, hero } = state;
  const rows = room.map.map((line) => `  '${line}',`).join('\n');
  return `// Gloamdeep room, ${VERSION}, ${room.cols} × ${room.rows}, hero ${hero.x},${hero.y}\n[\n${rows}\n]\n`;
}
