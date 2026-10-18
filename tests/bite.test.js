// § bite: the rat bites when next to the hero, and the hero can fall (D-114 to D-119)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, HERO_HEALTH, FIRST_START } from '../src/core/turn.js';
import { OIL } from '../src/core/oil.js';
import { enemyAt } from '../src/core/enemies.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
// The rat sits at 2,10; 3,10 is next to it, 4,10 is one tile away from that.
const at = (x, y, s = start()) => ({ ...s, hero: { x, y } });

test('the hero starts with 5 health', () => {
  assert.equal(start().health, 5);
  assert.equal(HERO_HEALTH, 5);
});

test('stepping next to the rat: it bites for 1 and stays put', () => {
  const n = step(at(4, 10), 'left');
  assert.deepEqual(n.hero, { x: 3, y: 10 });
  assert.equal(n.health, 4);
  assert.equal(shownLine(n).text, 'The rat bites you.');
  assert.equal(enemyAt(n, 2, 10).id, 'rat');
});

test('waiting next to the rat, it bites again', () => {
  assert.equal(wait(wait(at(3, 10))).health, 3);
});

test('a hit it survives is answered with a bite, which replaces the hit line', () => {
  const n = step(at(3, 10), 'left');
  assert.equal(n.health, 4);
  assert.equal(n.line.id, 'ratBite');
});

test('a killed rat does not bite', () => {
  const s = { ...at(3, 10), enemies: [{ id: 'rat', x: 2, y: 10, health: 1 }] };
  const n = step(s, 'left');
  assert.equal(n.health, 5);
  assert.equal(shownLine(n).text, 'The rat squeaks and falls still.');
});

test('a rat a tile away, or only diagonal, does not bite', () => {
  assert.equal(wait(at(4, 10)).health, 5);
  assert.equal(wait(at(3, 11)).health, 5);
});

test('it bites with the lantern off too', () => {
  assert.equal(wait(switchLantern(at(3, 10))).health, 4);
});

test('the bite line replaces an oil line said on the same turn', () => {
  assert.equal(shownLine(wait({ ...at(3, 10), oil: 0.2 })).text, 'The rat bites you.');
});

test('bumping a wall passes no turn, so nothing bites', () => {
  const s = at(1, 10); // the rat is to the right, a wall to the left
  assert.equal(step(s, 'left'), s);
});

test('two rats next to the hero both bite', () => {
  assert.equal(wait(spawn(at(3, 10), 'rat', 4, 10)).health, 3);
});

test('at 0 health the hero falls and wakes at the start, with the room as it began', () => {
  let s = spawn(at(3, 10), 'flask', 6, 6);
  s = { ...s, health: 1, oil: 0.1, enemies: [{ id: 'rat', x: 2, y: 10 }, { id: 'rat', x: 6, y: 8 }] };
  s = { ...s, seen: s.seen.map(() => 1) };
  const n = wait(s);
  assert.deepEqual(n.hero, FIRST_START);
  assert.equal(n.health, 5);
  assert.equal(n.oil, OIL.start);
  assert.deepEqual(n.enemies, FIRST_ENEMIES, 'the starting rat is back, spawned ones are gone');
  assert.deepEqual(n.items, []);
  assert.equal(n.seen, s.seen, 'the map stays remembered');
  assert.equal(n.turn, s.turn + 1);
  assert.equal(shownLine(n).text, 'You fall, and wake again.');
});
