// § regrow: things picked grow back, each on its own clock, out of sight (D-306, D-307)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeWorld, step, wait, itemAt, HERO_HEALTH } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { noteTaken, regrow } from '../src/core/regrow.js';
import { arrive } from '../src/core/stairs.js';
import { UPGRADES } from '../src/core/save.js';
import { DAY_TURNS } from '../src/core/daytime.js';

const room = makeRoom(FIRST_ROOM);
// The hero starts at 5,11, so a thing on 5,10 is one step up; then they step back down.
const takeAndStepBack = (id, more = {}) => {
  const s = spawn({ ...makeState(room), health: 2, ...more }, id, 5, 10);
  return step(step(s, 'up'), 'down');
};
// Waits until `turns` turns have passed since the taking, in the dark
const waitTill = (s, turns) => wait({ ...s, lit: false, turn: s.taken[0].at + turns - 1 });

test('a thing taken goes on the room\'s taken list with its turn', () => {
  const n = step(spawn(makeState(room), 'oilcap', 5, 10), 'up');
  assert.deepEqual(n.taken, [{ id: 'oilcap', x: 5, y: 10, at: 1 }]);
  assert.deepEqual(n.items, []);
});

test('mushrooms and herbs grow back after a day, not a turn sooner', () => {
  for (const id of ['oilcap', 'heartcap', 'herb']) {
    const s = takeAndStepBack(id);
    assert.equal(itemAt(waitTill(s, DAY_TURNS - 1), 5, 10), undefined, `${id} not yet`);
    const n = waitTill(s, DAY_TURNS);
    assert.equal(itemAt(n, 5, 10).id, id, `${id} is back`);
    assert.deepEqual(n.taken, []);
  }
});

test('a flask grows back after three days', () => {
  const s = takeAndStepBack('flask');
  assert.equal(itemAt(waitTill(s, 3 * DAY_TURNS - 1), 5, 10), undefined);
  assert.equal(itemAt(waitTill(s, 3 * DAY_TURNS), 5, 10).id, 'flask');
});

test('the knife is never on the taken list', () => {
  const n = step(spawn(makeState(room), 'knife', 5, 10), 'up');
  assert.equal(n.held, 'knife');
  assert.deepEqual(n.taken, []);
});

test('a herb left at full health is not taken', () => {
  const n = step(spawn({ ...makeState(room), health: HERO_HEALTH }, 'herb', 5, 10), 'up');
  assert.deepEqual(n.taken, []);
});

test('it comes back with the tone it had', () => {
  const tone = { hue: 5, light: -3 };
  const s = { ...makeState(room), items: [{ id: 'heartcap', x: 5, y: 10, tone }] };
  const n = waitTill(step(step(s, 'up'), 'down'), DAY_TURNS);
  assert.deepEqual(itemAt(n, 5, 10), { id: 'heartcap', x: 5, y: 10, tone });
});

test('it waits while its tile is in sight, and comes back once it is dark', () => {
  const s = takeAndStepBack('oilcap');
  const lit = wait({ ...s, lit: true, turn: s.taken[0].at + DAY_TURNS - 1 });
  assert.equal(itemAt(lit, 5, 10), undefined, 'the lantern shows the tile');
  assert.equal(lit.taken.length, 1);
  assert.equal(itemAt(wait({ ...lit, lit: false }), 5, 10).id, 'oilcap');
});

test('it waits while something stands or lies on its tile', () => {
  const s = takeAndStepBack('oilcap');
  const on = { ...s, lit: false, turn: s.taken[0].at + DAY_TURNS };
  assert.equal(regrow({ ...on, hero: { x: 5, y: 10 } }).taken.length, 1, 'the hero');
  assert.equal(regrow({ ...on, enemies: [{ id: 'rat', x: 5, y: 10 }] }).taken.length, 1, 'a rat');
  assert.equal(regrow({ ...on, items: [{ id: 'flask', x: 5, y: 10 }] }).taken.length, 1, 'an item');
  assert.equal(regrow(on).taken.length, 0);
});

test('each thing keeps its own clock', () => {
  let s = { ...makeState(room), lit: false };
  s = noteTaken({ ...s, turn: 10 }, { id: 'oilcap', x: 5, y: 10 });
  s = noteTaken({ ...s, turn: 50 }, { id: 'oilcap', x: 6, y: 10 });
  const n = regrow({ ...s, turn: 10 + DAY_TURNS });
  assert.deepEqual(n.items.map((it) => it.x), [5]);
  assert.deepEqual(n.taken.map((t) => t.x), [6]);
});

test('coming into a room, what grew while the hero was away is there, even in sight', () => {
  const w = makeWorld('first', 4127);
  const there = { ...w.elsewhere.second, taken: [{ id: 'oilcap', x: 3, y: 3, at: 0 }] };
  const n = regrow(arrive({ ...w, turn: DAY_TURNS }, 'second', there, { x: 1, y: 1 }), true);
  assert.ok(n.items.some((it) => it.id === 'oilcap' && it.x === 3 && it.y === 3));
  assert.deepEqual(n.taken, []);
  assert.deepEqual(n.elsewhere.first.taken, [], 'the room left keeps its own list');
});

test('an old save gets empty taken lists: things taken before stay gone', () => {
  const w = makeWorld('first', 4127);
  const { taken, ...old } = w;
  const elsewhere = Object.fromEntries(Object.entries(w.elsewhere).map(([id, { taken: t, ...p }]) => [id, p]));
  const n = UPGRADES[4]({ ...old, elsewhere });
  assert.deepEqual(n.taken, []);
  for (const p of Object.values(n.elsewhere)) assert.deepEqual(p.taken, []);
});

test('taking the stairs into a room, what is due there is already back', () => {
  const w = makeWorld('first', 4127);
  const second = { ...w.elsewhere.second, items: [], taken: [{ id: 'flask', x: 3, y: 3, at: 0 }] };
  const s = { ...w, hero: { x: 1, y: 2 }, turn: 3 * DAY_TURNS, elsewhere: { ...w.elsewhere, second } };
  const n = step(s, 'up');
  assert.equal(n.place, 'second');
  assert.equal(itemAt(n, 3, 3)?.id, 'flask');
  assert.deepEqual(n.taken, []);
});
