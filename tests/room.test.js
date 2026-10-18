// § room: the text map is read correctly and fits the screen
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, tileAt, isWall } from '../src/core/room.js';

test('the first room is 11 × 13 and every letter is a known tile', () => {
  const room = makeRoom(FIRST_ROOM);
  assert.equal(room.cols, 11);
  assert.equal(room.rows, 13);
});

test('walls, floor, and outside the map counts as wall', () => {
  const room = makeRoom(FIRST_ROOM);
  assert.ok(isWall(room, 0, 0));
  assert.equal(tileAt(room, 2, 1).id, 'floor');
  assert.ok(isWall(room, -1, 5) && isWall(room, 11, 5) && isWall(room, 5, 13));
});

test('bad maps are rejected', () => {
  assert.throws(() => makeRoom(['###', '##']));
  assert.throws(() => makeRoom(['#?#']));
});
