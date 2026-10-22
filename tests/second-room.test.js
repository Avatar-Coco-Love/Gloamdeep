// § second room: a flask and a rat guarding it (D-138 to D-140), placed by the seed (D-192)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, step, itemAt } from '../src/core/turn.js';
import { enemyAt } from '../src/core/enemies.js';
import { burnOil } from '../src/core/oil.js';
import { resetRoom } from '../src/core/spawn.js';
import { placeFor } from '../src/core/room.js';

const down = () => step({ ...makeWorld(), hero: { x: 2, y: 1 } }, 'left');
const flask = placeFor('second').items[0], rat = placeFor('second').enemies[0];

test('the second room has a flask, a rat and a torch at 3,0; the first a flask', () => {
  const w = makeWorld();
  const first = placeFor('first').items[0];
  assert.ok(itemAt(w, first.x, first.y));
  assert.equal(w.elsewhere.second.lights[0].id, 'torch');
  assert.equal(w.elsewhere.second.items[0].id, 'flask');
  const n = down();
  assert.ok(itemAt(n, flask.x, flask.y));
  assert.equal(enemyAt(n, rat.x, rat.y).id, 'rat');
});

test('the flask goes in the bag when walked onto, and stays gone after going up and back down', () => {
  let s = { ...down(), hero: { x: flask.x, y: flask.y - 1 }, enemies: [], oil: 0.5 };
  s = step(s, 'down');
  assert.equal(itemAt(s, flask.x, flask.y), undefined);
  assert.equal(s.oil, burnOil(0.5));
  assert.deepEqual(s.bag, [{ id: 'flask', n: 1 }]);
  s = step({ ...s, hero: { x: 2, y: 1 } }, 'left'); // up
  assert.equal(s.place, 'first');
  s = step({ ...s, hero: { x: 2, y: 1 } }, 'left'); // down again
  assert.equal(s.place, 'second');
  assert.equal(itemAt(s, flask.x, flask.y), undefined);
});

test('"Reset room" in the second room puts its flask back', () => {
  const s = { ...down(), items: [] };
  const p = s.home.places.second;
  const r = resetRoom(s, p.room, p.start, p.lights, p.enemies, p.items);
  assert.ok(itemAt(r, flask.x, flask.y));
  assert.ok(enemyAt(r, rat.x, rat.y));
});
