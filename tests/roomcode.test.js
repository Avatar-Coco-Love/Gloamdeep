// § room code: the copied text map matches the room and the hero
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { roomCode } from '../src/core/roomcode.js';
import { VERSION } from '../src/core/version.js';

test('the code has a header line and one quoted row per map row', () => {
  const s = spawn(makeState(makeRoom(FIRST_ROOM)), 'wall', 2, 2);
  const lines = roomCode(s).trimEnd().split('\n');
  assert.equal(lines[0], `// Gloamdeep room, ${VERSION}, 11 × 13, hero 5,11`);
  assert.equal(lines.length, 2 + 13 + 1);
  assert.equal(lines[4], "  '#.#.#.....#',");
});

test('the rows read back into the same room', () => {
  const s = spawn(makeState(makeRoom(FIRST_ROOM)), 'floor', 4, 1);
  const rows = roomCode(s).split('\n').filter((l) => l.startsWith("  '")).map((l) => l.slice(3, -2));
  assert.deepEqual(makeRoom(rows).map, s.room.map);
});
