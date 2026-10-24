// § rat: the first enemy sits in the first room, and two hits kill it (D-104 to D-113).
// Its bite is in bite.test.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { enemyAt } from '../src/core/enemies.js';
import { spawn, resetRoom } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { byKind } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
// The rat sits at 2,10, so a hero at 3,10 walks left into it.
const nextToRat = () => ({ ...start(), hero: { x: 3, y: 10 }, seed: FLEES }); // the coin says flee (D-301)
const FLEES = 5, STANDS = 1; // seeds whose coin, for these hits, says flee or stand

test('the registry has the rat and the gloamling as enemies', () => {
  assert.deepEqual(byKind('enemy').map((e) => e.id), ['rat', 'gloamling']);
});

test('the first room has the rat where the study put it', () => {
  assert.equal(enemyAt(start(), 2, 10).id, 'rat');
});

test('the first hit passes a turn, burns oil and hurts the rat', () => {
  const s = nextToRat();
  const n = step(s, 'left');
  assert.deepEqual(n.hero, { x: 3, y: 10 }, 'the hero stays put');
  assert.equal(n.turn, 1);
  assert.ok(n.oil < s.oil);
  assert.equal(enemyAt(n, 1, 10).health, 1, 'hurt, it flees a tile (D-292)');
  assert.equal(shownLine(n).text, 'The rat squeaks and flees.');
});

test('with the other side of the coin, the hurt rat stands its ground and bites (D-301)', () => {
  const n = step({ ...nextToRat(), seed: STANDS }, 'left');
  assert.equal(enemyAt(n, 2, 10).health, 1, 'it stays');
  assert.equal(n.health, 4, 'and bites');
  assert.equal(shownLine(n).text, 'The rat stands its ground.', 'its line, not the bite line (D-301)');
  const again = step({ ...n, enemies: [{ id: 'rat', x: 2, y: 10, health: 2 }] }, 'left');
  assert.equal(shownLine(again).text, 'The rat squeaks and bares its teeth.', 'its lines take turns (D-297)');
  assert.equal(shownLine(wait(again)).text, 'The rat bites you.', 'a later bite says so');
});

test('the second hit kills the rat, and it is gone', () => {
  const s = { ...nextToRat(), enemies: [{ id: 'rat', x: 2, y: 10, health: 1, chasing: true }] };
  const n = step(s, 'left');
  assert.equal(n.turn, 1);
  assert.equal(enemyAt(n, 2, 10), undefined);
  assert.equal(n.enemies.length, 0);
  assert.equal(shownLine(n).text, 'The rat squeaks and falls still.');
  assert.deepEqual(step(n, 'left').hero, { x: 2, y: 10 }, 'its tile is free to walk on');
});

test('with the lantern off, a hit burns no oil', () => {
  const s = { ...nextToRat(), lit: false };
  assert.equal(step(s, 'left').oil, s.oil);
});

test('an oil line said on the same turn as the kill replaces the kill line', () => {
  const n = step({ ...nextToRat(), oil: 0.2, enemies: [{ id: 'rat', x: 2, y: 10, health: 1 }] }, 'left');
  assert.equal(shownLine(n).text, 'The flame is getting low.');
});

test('each rat keeps its own health', () => {
  const s = spawn(nextToRat(), 'rat', 4, 10); // one right of the hero
  const n = step(step(s, 'left'), 'right'); // each flees a tile when hit (D-292), with this seed (D-301)
  assert.equal(enemyAt(n, 1, 10).health, 1);
  assert.equal(enemyAt(n, 5, 10).health, 1);
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
