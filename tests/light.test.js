// § light: what the lantern can see (src/core/light.js)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { CELL, LANTERN, seenCells } from '../src/core/light.js';

const room = makeRoom(FIRST_ROOM);
const CW = room.cols * 16 / CELL;
const cells = () => new Uint8Array(CW * room.rows * 16 / CELL);
const cellAt = (v, px, py) => v[Math.floor(py / CELL) * CW + Math.floor(px / CELL)];

test('the lantern lights open floor near it', () => {
  const v = seenCells(room, 5 * 16 + 8, 7 * 16 + 8, LANTERN.r, cells());
  assert.equal(cellAt(v, 6 * 16 + 8, 7 * 16 + 8), 1);
});

test('a wall casts a shadow behind it', () => {
  // the pillar at 3,6 hides 2,5 from a light at 4,7
  const v = seenCells(room, 4 * 16 + 8, 7 * 16 + 8, LANTERN.r, cells());
  assert.equal(cellAt(v, 3 * 16 + 8, 6 * 16 + 8), 1, 'the wall itself is lit');
  assert.equal(cellAt(v, 2 * 16 + 2, 5 * 16 + 2), 0, 'the floor behind it is dark');
});

test('nothing is lit beyond the radius', () => {
  const v = seenCells(room, 1 * 16 + 8, 11 * 16 + 8, 20, cells());
  assert.equal(cellAt(v, 9 * 16 + 8, 1 * 16 + 8), 0);
});
