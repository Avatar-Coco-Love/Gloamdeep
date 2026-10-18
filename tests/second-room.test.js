// § second room: a flask in the lower cave's far corner and a rat guarding it (D-138 to D-140)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, step, itemAt } from '../src/core/turn.js';
import { enemyAt } from '../src/core/enemies.js';
import { burnOil } from '../src/core/oil.js';
import { resetRoom } from '../src/core/spawn.js';

const down = () => step({ ...makeWorld(), hero: { x: 2, y: 1 } }, 'left');

test('the second room has a flask at 9,11, a rat at 7,10 and a torch at 3,0; the first a flask at 9,2', () => {
  const w = makeWorld();
  assert.ok(itemAt(w, 9, 2));
  assert.equal(w.elsewhere.second.lights[0].id, 'torch');
  assert.equal(w.elsewhere.second.items[0].id, 'flask');
  const n = down();
  assert.ok(itemAt(n, 9, 11));
  assert.equal(enemyAt(n, 7, 10).id, 'rat');
});

test('the flask pours in when walked onto, and stays gone after going up and back down', () => {
  let s = { ...down(), hero: { x: 9, y: 10 }, enemies: [], oil: 0.5 };
  s = step(s, 'down');
  assert.equal(itemAt(s, 9, 11), undefined);
  assert.equal(s.oil, Math.min(1, burnOil(0.5) + 0.45));
  s = step({ ...s, hero: { x: 2, y: 1 } }, 'left'); // up
  assert.equal(s.place, 'first');
  s = step({ ...s, hero: { x: 2, y: 1 } }, 'left'); // down again
  assert.equal(s.place, 'second');
  assert.equal(itemAt(s, 9, 11), undefined);
});

test('"Reset room" in the second room puts its flask back', () => {
  const s = { ...down(), items: [] };
  const p = s.home.places.second;
  const r = resetRoom(s, p.room, p.start, p.lights, p.enemies, p.items);
  assert.ok(itemAt(r, 9, 11));
  assert.ok(enemyAt(r, 7, 10));
});
