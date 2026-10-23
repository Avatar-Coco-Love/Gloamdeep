// § gloamling: the second creature, light-shy (step 38, D-240)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, gloamlingRooms, placeFor } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, FIRST_START } from '../src/core/turn.js';
import { generateRoom } from '../src/core/cave.js';
import { layoutAt } from '../src/core/region.js';
import { setOil } from '../src/core/oil.js';
import { litAt } from '../src/core/sight.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
// The first room with no torches, the hero at 5,11 and one gloamling
const at = (x, y, oil = 1) => setOil({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'gloamling', x, y }] }, oil);
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('a gloamling is as strong as a rat: 2 health, a bite of 1', () => {
  const g = get('gloamling');
  assert.equal(g.health, 2); assert.equal(g.bite, 1); assert.deepEqual(g.ways, ['chases', 'shunsLight']);
});

test('in the dark it sees the hero along a clear line and comes', () => {
  const n = wait(switchLantern(at(5, 7)));
  assert.deepEqual(where(n), [[5, 8]]);
  assert.equal(n.enemies[0].chasing, true);
});

test('caught in the lantern light it backs away, farther from the hero', () => {
  assert.equal(litAt(at(5, 8), 5, 8), true);
  assert.deepEqual(where(wait(at(5, 8))), [[5, 7]]);
});

test('at the edge of the light it backs into the dark', () => {
  const s = at(5, 9, 0.3), n = wait(s); // a short reach: 5,8 is dark
  assert.equal(litAt(s, 5, 9), true);
  assert.equal(litAt(n, 5, 8), false);
  assert.deepEqual(where(n), [[5, 8]]);
});

test('while the lantern has oil it never stands in light and never bites', () => {
  let s = at(9, 1);
  for (let i = 0; i < 20; i++) {
    s = wait(s);
    const [g] = s.enemies;
    assert.equal(litAt(s, g.x, g.y), false, `turn ${i}`);
  }
  assert.equal(s.health, 5);
});

test('deep in light it backs away, but never into torchlight (D-243)', () => {
  const torch = FIRST_LIGHTS.filter((l) => l.x === 4 && l.y === 4);
  const s = { ...makeState(room, FIRST_START, torch, []), hero: { x: 4, y: 9 }, enemies: [{ id: 'gloamling', x: 4, y: 7 }] };
  assert.equal(litAt({ ...s, lit: false }, 4, 6), true, 'the torch lights the tile behind it');
  assert.deepEqual(where(wait(s)), [[3, 7]]);
});

test('next to the hero in light it does not bite, and backs away', () => {
  const n = wait(at(5, 10));
  assert.equal(n.health, 5);
  assert.deepEqual(where(n), [[5, 9]]);
});

test('cornered in light it stays put and does not bite', () => {
  const s = { ...at(1, 11), hero: { x: 2, y: 11 }, items: [{ id: 'flask', x: 1, y: 10 }] }, n = wait(s);
  assert.deepEqual(where(n), [[1, 11]]);
  assert.equal(n.health, 5);
});

test('at an ember it comes next to the hero and bites', () => {
  const n = wait(at(5, 9, 0));
  assert.deepEqual(where(n), [[5, 10]]);
  const b = wait(n);
  assert.equal(b.health, 4);
  assert.equal(shownLine(b), LINES.gloamlingBite);
});

test('a hit says it hisses, a kill that it fades', () => {
  const s = { ...at(5, 10), hero: { x: 5, y: 11 } };
  const hit = step(s, 'up');
  assert.equal(shownLine(hit), LINES.gloamlingHurt);
  const g = hit.enemies[0], again = step({ ...hit, hero: { x: g.x, y: g.y + 1 } }, 'up');
  assert.equal(again.enemies.length, 0);
  assert.equal(shownLine(again), LINES.gloamlingDie);
});

test('three rooms on each floor from depth 5 down hold one, in place of their second rat (D-244)', () => {
  for (const seed of [1, 2, 3, 4, 5]) {
    for (const depth of [2, 3, 4]) assert.deepEqual(gloamlingRooms(seed, depth), []);
    for (const depth of [5, 6, 7, 8, 9, 12]) {
      const ids = gloamlingRooms(seed, depth);
      assert.equal(new Set(ids).size, 3);
      for (const c of layoutAt(seed, depth).cells) {
        const kinds = placeFor(c.id, seed).enemies.map((e) => e.id);
        assert.deepEqual(kinds, ['rat', ids.includes(c.id) ? 'gloamling' : 'rat'], `seed ${seed} ${c.id}`);
      }
    }
  }
});

test('it sits where the second rat would have, the rest of the room unchanged', () => {
  for (const seed of [1, 2, 3, 4, 5, 6, 7, 8]) {
    const rats = generateRoom(seed, 'burrows', { rats: 2 }), g = generateRoom(seed, 'burrows', { rats: 2, second: 'gloamling' });
    assert.deepEqual(g.map, rats.map);
    assert.deepEqual(g.enemies, [rats.enemies[0], { ...rats.enemies[1], id: 'gloamling' }]);
  }
});
