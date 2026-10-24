// § heartcap: a bright red mushroom in about half the generated rooms, into
// the bag the oilcap's way, with lines that take turns (D-303)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, look, itemAt } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { generateRoom } from '../src/core/cave.js';

const room = makeRoom(FIRST_ROOM);
// The hero starts at 5,11, so a heartcap on 5,10 is one step up.
const withCap = (s = makeState(room)) => spawn({ ...s, hero: { x: 5, y: 11 } }, 'heartcap', 5, 10);
const TAKE = ['You pick a heartcap.', 'The heartcap comes up whole.', 'A heartcap, warm in your hand.'];
const LOOK = ['It might mend a wound.', 'Its red cap is spotted white.', 'It feels faintly warm.'];

test('walking onto a heartcap puts it in the bag, with its lines in turn', () => {
  let s = makeState(room);
  for (const text of TAKE) {
    s = step(withCap({ ...s, hero: { x: 5, y: 11 } }), 'up');
    assert.equal(shownLine(s).text, text);
    assert.equal(itemAt(s, 5, 10), undefined);
  }
  assert.deepEqual(s.bag, [{ id: 'heartcap', n: 3 }]);
  s = step(withCap({ ...s, hero: { x: 5, y: 11 }, bag: [] }), 'up');
  assert.equal(shownLine(s).text, TAKE[0]); // then the first again
});

test('over a full stack the heartcap stays, with its full line', () => {
  const n = step(withCap({ ...makeState(room), bag: [{ id: 'heartcap', n: 3 }] }), 'up');
  assert.deepEqual(n.bag, [{ id: 'heartcap', n: 3 }]);
  assert.equal(itemAt(n, 5, 10).id, 'heartcap');
  assert.equal(shownLine(n).text, "You can't carry more heartcaps.");
});

test('choosing its slot says its look lines in turn, free', () => {
  let s = { ...makeState(room), bag: [{ id: 'heartcap', n: 1 }] };
  for (const text of LOOK) {
    const turn = s.turn;
    s = look(s, 0);
    assert.equal(shownLine(s).text, text);
    assert.equal(s.turn, turn);
  }
});

test('about half the generated rooms have one heartcap, on open floor nothing else took', () => {
  let rooms = 0, with1 = 0;
  for (let seed = 1; seed <= 60; seed++) for (const shape of ['chambers', 'burrows', 'halls']) {
    const g = generateRoom(seed, shape, { knife: true, rats: 3 });
    const caps = g.items.filter((it) => it.id === 'heartcap');
    rooms++;
    assert.ok(caps.length <= 1, `seed ${seed} ${shape}`);
    if (!caps.length) continue;
    with1++;
    const [c] = caps, others = [...g.items.filter((it) => it !== c), ...g.enemies];
    assert.equal(g.map[c.y][c.x], '.');
    assert.ok(others.every((o) => o.x !== c.x || o.y !== c.y), `seed ${seed} ${shape}`);
  }
  assert.ok(with1 > rooms * 0.35 && with1 < rooms * 0.65, `${with1} of ${rooms}`);
});

test('the rest of a seed\'s room stays as it was before heartcaps', () => {
  const g = generateRoom(42, 'chambers'), without = g.items.filter((it) => it.id !== 'heartcap');
  assert.deepEqual(without.map((it) => it.id), ['flask', 'herb', 'oilcap']);
});
