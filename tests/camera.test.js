// § camera: the hero in the middle, stopping at the room's edges (src/core/camera.js, D-195)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cameraAt } from '../src/core/camera.js';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';

const W = 176, H = 208; // the screen, 11 × 13 tiles
const big = { cols: 17, rows: 20 };
const at = (room, tx, ty) => cameraAt(tx * 16, ty * 16, room, W, H);

test('a one-screen room never moves', () => {
  const room = makeRoom(FIRST_ROOM);
  for (const [x, y] of [[1, 1], [5, 6], [9, 11]]) assert.deepEqual(at(room, x, y), { x: 0, y: 0 });
});

test('in a big room the hero stands on the middle tile of the screen', () => {
  const cam = at(big, 8, 10);
  assert.deepEqual(cam, { x: 8 * 16 - 5 * 16, y: 10 * 16 - 6 * 16 });
});

test('the camera stops at the room edges', () => {
  assert.deepEqual(at(big, 1, 1), { x: 0, y: 0 });
  assert.deepEqual(at(big, 15, 18), { x: (17 - 11) * 16, y: (20 - 13) * 16 });
});

test('the camera glides with the hero between tiles', () => {
  assert.deepEqual(cameraAt(8 * 16 + 5, 10 * 16 + 3, big, W, H), { x: 3 * 16 + 5, y: 4 * 16 + 3 });
});
