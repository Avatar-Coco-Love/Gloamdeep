// § knife: the first weapon, in depth 2's first room, held at once, hits for 2 (D-252)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES, placeFor, tileAt } from '../src/core/room.js';
import { makeState, makeWorld, step, wait, itemAt, FIRST_START, LANTERN_HIT, heroHit } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { goToDepth } from '../src/core/stairs.js';
import { layoutAt } from '../src/core/region.js';
import { withBag } from '../src/core/bag.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
// The hero starts at 5,11, so a knife on 5,10 is one step up. The rat sits at 2,10.
const withKnife = (s = start()) => spawn(s, 'knife', 5, 10);

test('the knife is an item held in hand that hits for 2', () => {
  const knife = get('knife');
  assert.equal(knife.kind, 'item');
  assert.equal(knife.name, 'Knife');
  assert.equal(knife.hit, 2);
  assert.equal(knife.hold, true);
});

test('a journey starts with an empty hand and the lantern hit', () => {
  assert.equal(makeWorld().held, null);
  assert.equal(heroHit(makeWorld()), LANTERN_HIT);
});

test('walking onto the knife puts it in hand, not the bag, with its line', () => {
  const n = step(withKnife(), 'up');
  assert.equal(n.held, 'knife');
  assert.deepEqual(n.bag, []);
  assert.equal(itemAt(n, 5, 10), undefined);
  assert.equal(shownLine(n).text, 'You take the knife.');
});

test('with a knife held, another stays on the floor', () => {
  const n = step({ ...withKnife(), held: 'knife' }, 'up');
  assert.equal(itemAt(n, 5, 10).id, 'knife');
  assert.deepEqual(n.bag, []);
});

test('the knife kills a rat in one hit; the lantern takes two', () => {
  const s = { ...start(), hero: { x: 3, y: 10 } };
  assert.equal(step({ ...s, held: 'knife' }, 'left').enemies.length, 0);
  const once = step(s, 'left');
  assert.equal(once.enemies.length, 1);
  assert.equal(once.enemies[0].health, 1);
});

test('the knife lies only in depth 2\'s room with the stairs up, on a free floor tile', () => {
  for (const seed of [1, 7, 4127, 99991]) for (const c of layoutAt(seed, 2).cells) {
    const p = placeFor(c.id, seed), knives = p.items.filter((it) => it.id === 'knife');
    assert.equal(knives.length, c.up ? 1 : 0);
    if (!c.up) continue;
    const [k] = knives, r = makeRoom(p.map);
    assert.equal(tileAt(r, k.x, k.y).id, 'floor');
    assert.equal(p.items.filter((it) => it.x === k.x && it.y === k.y).length, 1);
    assert.ok(!p.enemies.some((e) => e.x === k.x && e.y === k.y));
  }
  assert.ok(!placeFor('depth3', 1).items.some((it) => it.id === 'knife'));
});

test('holding the knife, none lies in depth 2', () => {
  assert.ok(goToDepth(makeWorld(), 2).items.some((it) => it.id === 'knife'));
  assert.ok(!goToDepth({ ...makeWorld(), held: 'knife' }, 2).items.some((it) => it.id === 'knife'));
});

test('a fall keeps the knife in hand', () => {
  const s = { ...start(), hero: { x: 3, y: 10 }, health: 1, held: 'knife', enemies: [{ id: 'rat', x: 2, y: 10 }] };
  assert.equal(wait(s).held, 'knife');
});

test('a save from before the held slot gets an empty hand', () => {
  const { held, ...old } = makeWorld();
  assert.equal(withBag(old).held, null);
  assert.equal(withBag({ ...old, held: 'knife' }).held, 'knife');
});
