// § stairs: the stairs down, the second room and back up (D-130 to D-136)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tileAt, SECOND_ENEMIES, SECOND_ITEMS } from '../src/core/room.js';
import { makeWorld, step, wait, switchLantern, FIRST_START, HERO_HEALTH } from '../src/core/turn.js';
import { OIL, burnOil } from '../src/core/oil.js';
import { shownLine } from '../src/core/lines.js';
import { litAt } from '../src/core/sight.js';
import { spawn } from '../src/core/spawn.js';
import { enemyAt } from '../src/core/enemies.js';
import { roomCode, readRoomCode } from '../src/core/roomcode.js';

// The stairs down are at 1,1 in the first room; 2,1 is the tile beside them.
const at = (x, y, s = makeWorld()) => ({ ...s, hero: { x, y } });
const down = () => step(at(2, 1), 'left');

test('the first room has stairs down at 1,1, the second stairs up at 1,1', () => {
  const s = makeWorld();
  assert.equal(tileAt(s.room, 1, 1).id, 'stairsDown');
  assert.equal(tileAt(s.elsewhere.second.room, 1, 1).id, 'stairsUp');
  assert.equal(s.place, 'first');
  assert.deepEqual(s.hero, FIRST_START);
});

test('stepping onto the stairs down: the second room, on its stairs up, one turn', () => {
  const n = down();
  assert.equal(n.place, 'second');
  assert.deepEqual(n.hero, { x: 1, y: 1 });
  assert.equal(tileAt(n.room, 1, 1).id, 'stairsUp');
  assert.equal(n.turn, 1);
  assert.equal(n.oil, burnOil(OIL.start));
  assert.equal(shownLine(n).text, 'You go down the stairs.');
  assert.deepEqual(n.enemies, SECOND_ENEMIES);
  assert.deepEqual(n.lights, []);
});

test('standing or waiting on the stairs you arrived on does not take them', () => {
  const n = wait(down());
  assert.equal(n.place, 'second');
  assert.deepEqual(n.hero, { x: 1, y: 1 });
});

test('stepping off and back on goes up, onto the stairs down, and the first room is as left', () => {
  const s = at(2, 1, { ...makeWorld(), enemies: [] }); // the rat is gone, as if killed
  const there = step(step(s, 'left'), 'right');
  assert.equal(there.place, 'second');
  const back = step(there, 'left');
  assert.equal(back.place, 'first');
  assert.deepEqual(back.hero, { x: 1, y: 1 });
  assert.equal(shownLine(back).text, 'You go up the stairs.');
  assert.deepEqual(back.enemies, []);
  assert.equal(back.turn, 3);
});

test('each room keeps its own memory', () => {
  const s = makeWorld();
  const marked = { ...at(2, 1), seen: s.seen.map((_, i) => (i === 0 ? 1 : 0)) };
  const n = step(marked, 'left');
  assert.equal(n.seen[0], 0);
  assert.equal(step(step(n, 'right'), 'left').seen[0], 1);
});

test('a rat next to the hero does not bite as they take the stairs', () => {
  const s = at(2, 1, { ...makeWorld(), enemies: [{ id: 'rat', x: 2, y: 2, chasing: true }] });
  const n = step(s, 'left');
  assert.equal(n.health, HERO_HEALTH);
  assert.deepEqual(n.elsewhere.first.enemies, [{ id: 'rat', x: 2, y: 2, chasing: true }]); // it stays, still chasing
});

test('rats in the room the hero arrives in take their turn', () => {
  let s = makeWorld();
  s = { ...s, elsewhere: { ...s.elsewhere, second: { ...s.elsewhere.second, enemies: [{ id: 'rat', x: 2, y: 1 }] } } };
  const n = step(at(2, 1, s), 'left');
  assert.equal(n.health, HERO_HEALTH - 1);
  assert.equal(shownLine(n).text, 'The rat bites you.');
});

test('falling in the second room wakes the hero at the first room\'s start, every room as it began', () => {
  let s = down();
  s = spawn(s, 'wall', 3, 3);
  s = { ...s, seen: s.seen.map(() => 1), health: 1, enemies: [{ id: 'rat', x: 1, y: 2 }] };
  const n = wait(s);
  assert.equal(shownLine(n).text, 'You fall, and wake again.');
  assert.equal(n.place, 'first');
  assert.deepEqual(n.hero, FIRST_START);
  assert.equal(n.health, HERO_HEALTH);
  assert.ok(enemyAt(n, 2, 10));
  const second = n.elsewhere.second;
  assert.equal(tileAt(second.room, 3, 3).id, 'floor');
  assert.deepEqual(second.enemies, SECOND_ENEMIES);
  assert.deepEqual(second.items, SECOND_ITEMS);
  assert.ok(second.seen.every((v) => v === 1)); // the map stays remembered
});

test('the stairs glow: a rat on the stairs tile is in light with the lantern off', () => {
  const s = switchLantern(at(5, 11));
  assert.ok(litAt(s, 1, 1));
  assert.ok(!litAt(s, 3, 3));
});

test('a room code carries the stairs', () => {
  const s = down();
  assert.deepEqual(readRoomCode(roomCode(s)).map, s.room.map);
});
