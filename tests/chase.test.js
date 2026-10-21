// § chase: a rat on a lit tile notices the hero and comes one tile a turn (D-126 to D-129)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { litAt, clearLine } from '../src/core/sight.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
const with_ = (hero, enemies, more = {}) => ({ ...start(), hero, enemies, ...more });
const rats = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('the lantern lights the rat from the start, and the torch at 4,4 lights the tile below it', () => {
  assert.equal(litAt(start(), 2, 10), true);
  assert.equal(litAt(switchLantern(start()), 2, 10), false, 'off, and no torch near it');
  assert.equal(litAt(switchLantern(start()), 4, 5), true);
});

test('a rat in the lantern light notices the hero and steps toward them, the farther side first', () => {
  const n = wait(start()); // hero 5,11, rat 2,10: three across, one down
  assert.deepEqual(rats(n), [[3, 10]]);
  assert.equal(n.enemies[0].chasing, true);
});

test('a rat in the dark does not notice a hero with the lantern off', () => {
  assert.deepEqual(rats(wait(switchLantern(start()))), [[2, 10]]);
});

test('a rat in torchlight notices them with the lantern off too', () => {
  const s = switchLantern(with_({ x: 4, y: 11 }, [{ id: 'rat', x: 4, y: 5 }]));
  assert.deepEqual(rats(wait(s)), [[4, 6]]); // straight down, nothing between
});

test('a rat in torchlight with a wall between does not notice them (D-226)', () => {
  const s = switchLantern(with_({ x: 9, y: 11 }, [{ id: 'rat', x: 4, y: 5 }])); // the wall at 7,9 is on the line
  const n = wait(s);
  assert.deepEqual(rats(n), [[4, 5]]);
  assert.equal(n.enemies[0].chasing, undefined);
});

test('a clear line: open floor yes, a wall between no', () => {
  assert.equal(clearLine(room, { x: 4, y: 5 }, { x: 4, y: 11 }), true);
  assert.equal(clearLine(room, { x: 4, y: 5 }, { x: 9, y: 11 }), false);
  assert.equal(clearLine(room, { x: 1, y: 5 }, { x: 1, y: 3 }), false, 'the wall at 1,4');
});

test('once it has noticed, it keeps coming in the dark', () => {
  const n = wait(switchLantern(wait(start())));
  assert.deepEqual(rats(n), [[4, 10]]);
});

test('a rat that steps next to the hero bites only on the next turn', () => {
  const s = with_({ x: 5, y: 10 }, [{ id: 'rat', x: 3, y: 10, chasing: true }]);
  const n = wait(s);
  assert.deepEqual(rats(n), [[4, 10]]);
  assert.equal(n.health, 5);
  const m = wait(n);
  assert.equal(m.health, 4);
  assert.deepEqual(rats(m), [[4, 10]], 'it stays put while it bites');
});

test('a wall the farther way: it goes the other way', () => {
  const s = with_({ x: 1, y: 5 }, [{ id: 'rat', x: 4, y: 6, chasing: true }]); // 3,6 is wall
  assert.deepEqual(rats(wait(s)), [[4, 5]]);
});

test('both ways blocked: it stays put', () => {
  const s = with_({ x: 1, y: 5 }, [{ id: 'rat', x: 4, y: 6, chasing: true }], { items: [{ id: 'flask', x: 4, y: 5 }] });
  assert.deepEqual(rats(wait(s)), [[4, 6]]);
});

test('straight ahead blocked, with no other way toward the hero: it stays put', () => {
  const s = with_({ x: 3, y: 3 }, [{ id: 'rat', x: 3, y: 5, chasing: true }]); // 3,4 is wall
  assert.deepEqual(rats(wait(s)), [[3, 5]]);
});

test('a rat waits behind another one', () => {
  const s = with_({ x: 5, y: 10 }, [{ id: 'rat', x: 3, y: 10, chasing: true }, { id: 'rat', x: 2, y: 10, chasing: true }]);
  assert.deepEqual(rats(wait(s)), [[4, 10], [3, 10]]);
  const t = with_({ x: 5, y: 10 }, [{ id: 'rat', x: 2, y: 10, chasing: true }, { id: 'rat', x: 3, y: 10, chasing: true }]);
  assert.deepEqual(rats(wait(t)), [[2, 10], [4, 10]], 'list order: the back one goes first and is blocked');
});

test('a hit rat keeps chasing, and a fall puts it back as it began', () => {
  const s = with_({ x: 3, y: 10 }, [{ id: 'rat', x: 2, y: 10, chasing: true }]);
  assert.equal(step(s, 'left').enemies[0].chasing, true);
  const f = wait({ ...s, health: 1 });
  assert.equal(f.line.id, 'fall');
  assert.deepEqual(f.enemies, FIRST_ENEMIES);
});

test('bumping a wall passes no turn, so no rat moves', () => {
  const s = with_({ x: 1, y: 11 }, [{ id: 'rat', x: 4, y: 10, chasing: true }]);
  assert.equal(step(s, 'left'), s);
});

// § noticing in the dark: a bite or a hit makes a rat notice (D-157, answers Q-031)
test('a rat that bites in the dark has noticed: step away and it follows', () => {
  const s = switchLantern(with_({ x: 3, y: 10 }, [{ id: 'rat', x: 2, y: 10 }]));
  const bitten = wait(s);
  assert.equal(bitten.enemies[0].chasing, true);
  assert.deepEqual(rats(step(bitten, 'right')), [[3, 10]]);
});

test('a rat hit in the dark and still alive has noticed', () => {
  const s = switchLantern(with_({ x: 3, y: 10 }, [{ id: 'rat', x: 2, y: 10 }]));
  const n = step(s, 'left');
  assert.equal(n.enemies[0].health, 1);
  assert.equal(n.enemies[0].chasing, true);
});

// § facing: a walking rat faces the way it walks (D-158, answers Q-032)
test('a rat walking left faces left, and keeps that facing walking up or down', () => {
  const s = with_({ x: 2, y: 8 }, [{ id: 'rat', x: 5, y: 10, chasing: true }]);
  const left = wait(s); // three across, two up: across first
  assert.deepEqual(rats(left), [[4, 10]]);
  assert.equal(left.enemies[0].facing, 'left');
  const s2 = with_({ x: 4, y: 7 }, left.enemies);
  const up = wait(s2);
  assert.deepEqual(rats(up), [[4, 9]]);
  assert.equal(up.enemies[0].facing, 'left');
});

test('a rat walking right faces right; one that has not walked has no facing', () => {
  assert.equal(start().enemies[0].facing, undefined);
  assert.equal(wait(start()).enemies[0].facing, 'right'); // from 2,10 toward the hero at 5,11
});
