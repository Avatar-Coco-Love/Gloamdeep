// § burrows: earth burrows from depth 6 (D-165) and the dev Go to depth (D-166)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRoom } from '../src/core/cave.js';
import { kindAt, placeFor, placeAt, makeRoom, tileAt } from '../src/core/room.js';
import { goToDepth } from '../src/core/stairs.js';
import { makeWorld } from '../src/core/turn.js';
import { layoutAt } from '../src/core/region.js';

const SEEDS = Array.from({ length: 500 }, (_, i) => i + 1);
const count = (map, ch) => map.join('').split(ch).length - 1;

test('depths 3 to 5 are grey rock chambers, 6 and down earth burrows', () => {
  assert.deepEqual([3, 4, 5].map((d) => kindAt(d).look), ['rock', 'rock', 'rock']);
  assert.deepEqual([6, 7, 40].map((d) => kindAt(d)), Array(3).fill({ from: 6, shape: 'burrows', look: 'earth' }));
  const p = placeFor('depth6', 4127);
  assert.equal(p.look, 'earth');
  const c = layoutAt(4127, 6).cells[0];
  assert.deepEqual(p.map, generateRoom(c.seed, 'burrows', c).map);
  assert.equal(placeFor('depth5', 4127).look, 'rock');
});

test('every seed gives a burrow, the same each time, with the usual contents', () => {
  for (const seed of SEEDS) {
    const b = generateRoom(seed, 'burrows');
    assert.ok(b, `seed ${seed}`);
    assert.deepEqual(b, generateRoom(seed, 'burrows'));
    assert.equal(count(b.map, '<'), 1);
    assert.equal(count(b.map, '>'), 1);
    assert.ok(count(b.map, '.') + 2 >= 107, `seed ${seed} is too small`);
    makeRoom(b.map); // every letter known, every row 17 wide
    assert.deepEqual(b.items.map((it) => it.id), ['flask', 'herb']);
    assert.equal(b.enemies.length, 1);
  }
});

test('burrows differ from chambers for the same seed', () => {
  const differ = SEEDS.slice(0, 50).filter((s) => generateRoom(s).map.join() !== generateRoom(s, 'burrows').map.join());
  assert.equal(differ.length, 50);
});

test('Go to depth: on the stairs up there, no turn passes, the room left waits', () => {
  const s = makeWorld('first', 4127), n = goToDepth(s, 7);
  assert.equal(n.place, 'depth7');
  assert.equal(tileAt(n.room, n.hero.x, n.hero.y).id, 'stairsUp');
  assert.equal(n.room.look, 'earth');
  assert.equal(n.turn, s.turn);
  assert.ok(n.elsewhere.first);
  const back = goToDepth(n, 1);
  assert.equal(back.place, 'first');
  assert.deepEqual(back.hero, placeFor('first').start); // no stairs up in the first room
  assert.ok(back.elsewhere.depth7);
  assert.equal(goToDepth(back, 1), back);
  assert.equal(placeAt(2), goToDepth(back, 2).place);
});
