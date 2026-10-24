// § oilcap: the first resource, an amber mushroom in every generated room (D-296);
// its lines take turns, on picking up and on choosing its slot (D-297)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, look, itemAt } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { generateRoom } from '../src/core/cave.js';
import { unpackJourney, packJourney } from '../src/core/save.js';

const room = makeRoom(FIRST_ROOM);
// The hero starts at 5,11, so an oilcap on 5,10 is one step up.
const withCap = (s = makeState(room)) => spawn({ ...s, hero: { x: 5, y: 11 } }, 'oilcap', 5, 10);
const TAKE = ['You grab the oilcap.', 'You pluck an oilcap from the floor.', 'The oilcap comes up with a soft pop.'];
const LOOK = ['Three make an oil flask.', 'It smells faintly of lamp oil.', 'Its amber cap is slick with oil.'];

test('walking onto an oilcap puts it in the bag, with a line and a take event', () => {
  const n = step(withCap(), 'up');
  assert.deepEqual(n.bag, [{ id: 'oilcap', n: 1 }]);
  assert.equal(itemAt(n, 5, 10), undefined);
  assert.equal(shownLine(n).text, TAKE[0]);
  assert.deepEqual(n.events.filter((e) => e.type === 'take'), [{ type: 'take', id: 'oilcap' }]);
});

test('the pick-up lines take turns, then start again', () => {
  let s = makeState(room);
  const said = [];
  for (let i = 0; i < 4; i++) {
    s = step(withCap({ ...s, bag: [] }), 'up');
    said.push(shownLine(s).text);
  }
  assert.deepEqual(said, [...TAKE, TAKE[0]]);
});

test('over a full stack the oilcap stays, with its full line', () => {
  const n = step(withCap({ ...makeState(room), bag: [{ id: 'oilcap', n: 3 }] }), 'up');
  assert.deepEqual(n.bag, [{ id: 'oilcap', n: 3 }]);
  assert.equal(itemAt(n, 5, 10).id, 'oilcap');
  assert.equal(shownLine(n).text, "You can't carry more oilcaps.");
});

test('choosing its bag slot says the next look line, and no turn passes', () => {
  let s = { ...makeState(room), bag: [{ id: 'flask', n: 1 }, { id: 'oilcap', n: 2 }] };
  assert.equal(look(s, 0), s, 'a flask has no look line');
  assert.equal(look(s, 5), s, 'nor an empty slot');
  const said = [];
  for (let i = 0; i < 4; i++) { s = look(s, 1); said.push(shownLine(s).text); }
  assert.deepEqual(said, [...LOOK, LOOK[0]]);
  assert.equal(s.turn, 0);
  assert.deepEqual(s.bag, [{ id: 'flask', n: 1 }, { id: 'oilcap', n: 2 }]);
});

test('every generated room has one oilcap, on open floor nothing else took', () => {
  for (const seed of [1, 2, 3, 7, 42, 4127]) for (const shape of ['chambers', 'burrows', 'halls']) {
    const g = generateRoom(seed, shape, { knife: true, rats: 3 });
    const caps = g.items.filter((it) => it.id === 'oilcap');
    assert.equal(caps.length, 1, `seed ${seed} ${shape}`);
    const [c] = caps, others = [...g.items.filter((it) => it !== c), ...g.enemies];
    assert.equal(g.map[c.y][c.x], '.');
    assert.ok(others.every((o) => o.x !== c.x || o.y !== c.y), `seed ${seed} ${shape}`);
  }
});

test('which line comes next is kept in the save; an older save starts each list from the first', () => {
  const s = look({ ...makeState(room), bag: [{ id: 'oilcap', n: 1 }] }, 0);
  assert.deepEqual(unpackJourney(packJourney(s)).state.told, { oilcapLook: 1 });
  const { told, ...old } = s;
  assert.deepEqual(unpackJourney({ format: 3, state: old }).state.told, {});
});
