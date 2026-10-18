// § registry: one list of everything, with unique ids and map letters
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ALL, get, byLetter, byKind } from '../src/core/registry.js';

test('every entry has a unique id, a kind and a name', () => {
  assert.equal(new Set(ALL.map((e) => e.id)).size, ALL.length);
  for (const e of ALL) assert.ok(e.kind && e.name, e.id);
});

test('tiles are found by id and by map letter', () => {
  const tiles = byKind('tile');
  assert.equal(new Set(tiles.map((t) => t.letter)).size, tiles.length);
  assert.equal(get('wall'), byLetter('#'));
  assert.equal(byLetter('.').id, 'floor');
  assert.equal(get('nothing'), undefined);
});

test('the oil flask is an item worth 45% of a tank', () => {
  const flask = get('flask');
  assert.equal(flask.kind, 'item');
  assert.equal(flask.name, 'Oil flask');
  assert.equal(flask.oil, 0.45);
  assert.deepEqual(byKind('item'), [flask]);
});
