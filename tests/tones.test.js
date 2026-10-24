// § tones: every mushroom a slightly different tone, the same for the same seed (D-305)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateRoom } from '../src/core/cave.js';
import { toned } from '../src/core/tones.js';

const caps = (room) => room.items.filter((it) => it.id === 'oilcap' || it.id === 'heartcap');

test('each mushroom gets a tone within ±12° of hue and ±7 of lightness; other items none', () => {
  let seen = 0;
  for (let seed = 1; seed <= 40; seed++) {
    const room = generateRoom(seed);
    for (const it of room.items) {
      if (it.id !== 'oilcap' && it.id !== 'heartcap') { assert.equal(it.tone, undefined); continue; }
      assert.ok(Math.abs(it.tone.hue) <= 12 && Math.abs(it.tone.light) <= 7);
      assert.ok(Number.isInteger(it.tone.hue) && Number.isInteger(it.tone.light));
      seen++;
    }
  }
  assert.ok(seen >= 40);
});

test('the same seed gives the same tones; different seeds mostly differ', () => {
  assert.deepEqual(caps(generateRoom(77)), caps(generateRoom(77)));
  const tones = new Set();
  for (let seed = 1; seed <= 30; seed++) tones.add(JSON.stringify(caps(generateRoom(seed))[0].tone));
  assert.ok(tones.size >= 15);
});

test('tones leave the rest of a seed\'s room as it was', () => {
  const room = generateRoom(123), plain = room.items.map(({ tone, ...it }) => it);
  assert.deepEqual(toned(123, plain), room.items);
});
