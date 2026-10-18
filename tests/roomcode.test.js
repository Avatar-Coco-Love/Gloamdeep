// § room code: one line that reads back into the same room and hero
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { roomCode, readRoomCode } from '../src/core/roomcode.js';
import { VERSION } from '../src/core/version.js';

test('the code is one line with no spaces, and repeats are counted', () => {
  const code = roomCode(makeState(makeRoom(FIRST_ROOM)));
  assert.ok(!/\s/.test(code));
  assert.ok(code.startsWith(`GD:${VERSION}:11x13:hero5,11:11#/#>2.#5.#/`));
});

test('the code reads back into the same room and hero', () => {
  const s = spawn(spawn(makeState(makeRoom(FIRST_ROOM)), 'wall', 2, 2), 'floor', 4, 1);
  const back = readRoomCode(roomCode({ ...s, hero: { x: 3, y: 7 } }));
  assert.deepEqual(makeRoom(back.map).map, s.room.map);
  assert.deepEqual(back.hero, { x: 3, y: 7 });
  assert.equal(back.version, VERSION);
});

test('codes that are not room codes are rejected', () => {
  assert.throws(() => readRoomCode('hello'));
  assert.throws(() => readRoomCode('GD:0.1.4:11x13:hero5,11:11#'));
});
