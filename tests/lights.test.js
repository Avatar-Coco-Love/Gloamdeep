// § lights: torches, where they sit, and the spawn rules for them
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, FIRST_START } from '../src/core/turn.js';
import { spawn, resetRoom } from '../src/core/spawn.js';
import { mountAt } from '../src/core/mount.js';
import { lightAt } from '../src/core/lights.js';
import { byKind } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS);

test('the torch is in the registry as a light', () => {
  assert.deepEqual(byKind('light').map((e) => e.id), ['torch', 'unlitTorch']);
});

test('a torch picks its mount: face, then left, then right, else none', () => {
  assert.equal(mountAt(room, 2, 0), 'face');
  assert.equal(mountAt(room, 4, 1), 'left', 'open on both sides');
  assert.equal(mountAt(room, 10, 5), 'left');
  assert.equal(mountAt(room, 0, 5), 'right');
  assert.equal(mountAt(room, 0, 0), null, 'inside solid wall');
  assert.equal(mountAt(room, 2, 2), null, 'floor');
});

test('the first room starts with four torches that all fit', () => {
  const s = start();
  assert.equal(s.lights.length, 4);
  for (const l of s.lights) assert.notEqual(mountAt(s.room, l.x, l.y), null);
  assert.deepEqual(makeState(room).lights, []);
});

test('a torch spawns on a wall it can sit on, and no turn passes', () => {
  const n = spawn(start(), 'torch', 0, 5);
  assert.equal(lightAt(n, 0, 5).id, 'torch');
  assert.equal(n.turn, 0);
});

test('no torch on floor, inside solid wall, or on another light', () => {
  const s = start();
  assert.equal(spawn(s, 'torch', 2, 2), s);
  assert.equal(spawn(s, 'torch', 0, 0), s);
  assert.equal(spawn(s, 'torch', 2, 0), s);
});

test('a torch turns to fit a tile edit, and edits that leave it nowhere are refused', () => {
  const s = spawn(start(), 'torch', 4, 1); // the block's left side
  const walled = spawn(s, 'wall', 3, 1); // left closed: it turns to the right
  assert.notEqual(walled, s);
  assert.equal(mountAt(walled.room, 4, 1), 'right');
  assert.equal(spawn(walled, 'wall', 5, 1), walled, 'no side left');
  assert.equal(spawn(s, 'floor', 4, 1), s, 'not a floor on its own wall');
});

test('reset brings the starting torches back', () => {
  const s = spawn(start(), 'torch', 0, 5);
  assert.deepEqual(resetRoom(s, room, FIRST_START, FIRST_LIGHTS).lights, FIRST_LIGHTS);
});
