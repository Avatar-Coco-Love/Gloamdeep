// § bag: six slots, a stack in each; kept through a fall and in the save (D-247)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BAG_SLOTS, STACK_MAX, bagAdd, bagTake, stackFull, withBag } from '../src/core/bag.js';
import { makeWorld } from '../src/core/turn.js';
import { packJourney, unpackJourney } from '../src/core/save.js';
import { byKind } from '../src/core/registry.js';

test('the bag has six slots', () => {
  assert.equal(BAG_SLOTS, 6);
});

test('an item joins its stack, else takes a new slot, else there is no room', () => {
  assert.deepEqual(bagAdd([], 'flask'), [{ id: 'flask', n: 1 }]);
  assert.deepEqual(bagAdd([{ id: 'flask', n: 1 }], 'flask'), [{ id: 'flask', n: 2 }]);
  assert.deepEqual(bagAdd([{ id: 'flask', n: 1 }], 'herb'), [{ id: 'flask', n: 1 }, { id: 'herb', n: 1 }]);
  const full = Array.from({ length: BAG_SLOTS }, (_, i) => ({ id: 'thing' + i, n: 1 }));
  assert.equal(bagAdd(full, 'flask'), null);
  assert.deepEqual(bagAdd(full, 'thing2')[2], { id: 'thing2', n: 2 });
});

test('a stack holds at most 3, and a full one never spills to a new slot', () => {
  assert.equal(STACK_MAX, 3);
  assert.deepEqual(bagAdd([{ id: 'flask', n: 2 }], 'flask'), [{ id: 'flask', n: 3 }]);
  assert.equal(bagAdd([{ id: 'flask', n: 3 }], 'flask'), null);
  assert.equal(stackFull([{ id: 'flask', n: 3 }], 'flask'), true);
  assert.equal(stackFull([{ id: 'flask', n: 2 }], 'flask'), false);
});

test('taking one lowers the count; the last empties the slot and the rest move up', () => {
  const bag = [{ id: 'flask', n: 2 }, { id: 'herb', n: 1 }];
  assert.deepEqual(bagTake(bag, 0), [{ id: 'flask', n: 1 }, { id: 'herb', n: 1 }]);
  assert.deepEqual(bagTake(bagTake(bag, 0), 0), [{ id: 'herb', n: 1 }]);
  assert.equal(bagTake(bag, 4), bag);
});

test('the flask and the mushrooms go in the bag', () => {
  assert.deepEqual(byKind('item').filter((e) => e.bag).map((e) => e.id), ['flask', 'oilcap', 'heartcap', 'potion']); // (D-296, D-303, D-309)
});

test('the bag is kept in the save, and an older save gets an empty one', () => {
  const s = { ...makeWorld('first', 3), bag: [{ id: 'flask', n: 2 }] };
  assert.deepEqual(unpackJourney(packJourney(s)).state.bag, [{ id: 'flask', n: 2 }]);
  const { bag, ...old } = s;
  assert.deepEqual(unpackJourney({ format: 1, state: old }).state.bag, []); // saves before the bag were format 1 (D-266)
  assert.deepEqual(withBag(old).bag, []);
});

test('the panel fits the picture, and a tap picks a slot, Pour, or closes it', async () => {
  const { PANEL, bagAt } = await import('../src/render/bag.js');
  const { W, SCREEN_H, H } = await import('../src/render/screen.js');
  assert.ok(PANEL.x >= 0 && PANEL.x + PANEL.w <= W && PANEL.y > H / 2 && PANEL.y + PANEL.h <= SCREEN_H);
  assert.equal(bagAt(W / 2, 10), 'out');
  const row = PANEL.y + 15 + 26 + 11; // under the held slot (D-252)
  const slots = Array.from({ length: 200 }, (_, x) => bagAt(x, row)).filter((a) => a && a.slot !== undefined).map((a) => a.slot);
  assert.deepEqual([...new Set(slots)], [0, 1, 2, 3, 4, 5]);
  assert.equal(bagAt(PANEL.x + PANEL.w - 10, PANEL.y + PANEL.h - 8), 'act');
});

test('the panel moves to the top when it would hide the hero', async () => {
  const { PANEL, bagAt, panelOnTop } = await import('../src/render/bag.js');
  assert.equal(panelOnTop(16 * 5), false);
  assert.equal(panelOnTop(16 * 10), true);
  assert.equal(bagAt(PANEL.x + 20, 56, true).slot, 0);
  assert.equal(bagAt(PANEL.x + 20, 56, false), 'out');
});
