// § rat: the first enemy sits in the first room and holds its ground (D-104 to D-108)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, step, FIRST_START } from '../src/core/turn.js';
import { enemyAt } from '../src/core/enemies.js';
import { spawn, resetRoom } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { byKind } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
// The rat sits at 2,10, so a hero at 3,10 walks left into it.
const nextToRat = () => ({ ...start(), hero: { x: 3, y: 10 } });

test('the registry has the rat as an enemy', () => {
  assert.deepEqual(byKind('enemy').map((e) => e.id), ['rat']);
});

test('the first room has the rat where the study put it', () => {
  assert.equal(enemyAt(start(), 2, 10).id, 'rat');
});

test('walking into the rat says its line, passes no turn and burns no oil', () => {
  const s = nextToRat();
  const n = step(s, 'left');
  assert.deepEqual(n.hero, { x: 3, y: 10 });
  assert.equal(n.turn, 0);
  assert.equal(n.oil, s.oil);
  assert.equal(shownLine(n).text, 'The rat squeaks and holds its ground.');
  assert.equal(n.enemies, s.enemies, 'the rat is unchanged');
});

test('a rat can be spawned on floor, not on walls, the hero, items or another enemy', () => {
  const s = start();
  assert.equal(enemyAt(spawn(s, 'rat', 6, 8), 6, 8).id, 'rat');
  assert.equal(spawn(s, 'rat', 0, 0), s, 'wall');
  assert.equal(spawn(s, 'rat', 5, 11), s, 'hero');
  assert.equal(spawn(s, 'rat', 2, 10), s, 'another rat');
  const f = spawn(s, 'flask', 6, 8);
  assert.equal(spawn(f, 'rat', 6, 8), f, 'item');
});

test('no wall or item goes on a rat', () => {
  const s = start();
  assert.equal(spawn(s, 'wall', 2, 10), s);
  assert.equal(spawn(s, 'flask', 2, 10), s);
});

test('Reset room brings the starting rat back and removes spawned ones', () => {
  const s = spawn(start(), 'rat', 6, 8);
  const r = resetRoom(s, room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
  assert.deepEqual(r.enemies, FIRST_ENEMIES);
});
