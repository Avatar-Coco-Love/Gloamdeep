// § behaviours: creatures' ways as data (G4, D-269)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BEHAVIOURS, traits } from '../src/core/behaviours.js';
import { byKind, get } from '../src/core/registry.js';

test('every creature names its ways, and every way exists', () => {
  for (const e of byKind('enemy')) {
    assert.ok(e.ways?.length, e.id);
    for (const w of e.ways) assert.ok(BEHAVIOURS[w], `${e.id}: ${w}`);
  }
});

test('a rat chases: it notices in light and steps into it, and may flee once hurt (D-292, D-301)', () => {
  assert.deepEqual(traits(get('rat')), { notices: 'inLight', moves: 'toward', intoLight: true, bitesLit: true, whenLit: null, whenHurt: 'flee', fleeChance: 0.5, fleeTurns: 4 });
});

test('a gloamling chases and shuns light, the later way winning', () => {
  assert.deepEqual(traits(get('gloamling')), { notices: 'anyLine', moves: 'toward', intoLight: false, bitesLit: false, whenLit: 'backAway', whenHurt: null });
});

test('with no way a creature never notices or moves', () => {
  assert.deepEqual(traits({}), { notices: null, moves: null, intoLight: true, bitesLit: true, whenLit: null, whenHurt: null });
});
