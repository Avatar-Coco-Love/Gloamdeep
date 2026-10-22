// § experience: beating a creature and finding a room each give 1 (D-245)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, makeWorld, step, wait, FIRST_START } from '../src/core/turn.js';
import { goToDepth } from '../src/core/stairs.js';
import { readJourney, journeyText } from '../src/core/save.js';

const room = makeRoom(FIRST_ROOM);
const nextToRat = (health) => ({ ...makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES), hero: { x: 3, y: 10 }, enemies: [{ id: 'rat', x: 2, y: 10, health }] });
// The first room's doorway is at 5,12, into the south room
const toSouth = (s = makeWorld()) => step({ ...s, hero: { x: 5, y: 12 } }, 'down');

test('a journey starts with no experience, its first room found', () => {
  const s = makeWorld('first', 3);
  assert.equal(s.xp, 0);
  assert.deepEqual(s.found, ['first']);
});

test('beating a creature gives 1; a hit it survives gives none', () => {
  assert.equal(step(nextToRat(1), 'left').xp, 1);
  assert.equal(step(nextToRat(2), 'left').xp, 0);
});

test('a room never stood in gives 1, once', () => {
  const n = toSouth();
  assert.equal(n.place, 'south');
  assert.equal(n.xp, 1);
  assert.deepEqual(n.found, ['first', 'south']);
  const back = step(n, 'up');
  assert.equal(back.place, 'first');
  assert.equal(back.xp, 1, 'the first room was already found');
  assert.equal(toSouth(back).xp, 1, 'nor does the south room pay twice');
});

test('a dev jump gives nothing', () => {
  assert.equal(goToDepth(makeWorld('first', 5), 3).xp, 0);
});

test('a fall keeps the experience and the hand-made rooms found, not the generated ones', () => {
  const s = { ...toSouth(), xp: 7, found: ['first', 'south', 'depth3'], health: 1, enemies: [{ id: 'rat', x: 5, y: 1 }] };
  const n = wait(s);
  assert.ok(n.fell);
  assert.equal(n.xp, 7);
  assert.deepEqual(n.found, ['first', 'south']);
});

test('experience is kept with the journey', () => {
  const s = toSouth();
  assert.deepEqual(readJourney(journeyText(s)).state, s);
});

test('an older save gets 1 for each room on its map but the first, and they don\'t pay again', () => {
  const { xp, found, ...old } = toSouth();
  const mapped = (p) => ({ ...p, seen: p.seen.map(() => 1) });
  const depth3 = goToDepth(makeWorld('first', 5), 3);
  const elsewhere = { ...old.elsewhere, first: mapped(old.elsewhere.first), depth3: mapped({ ...depth3, seen: depth3.seen }) };
  const back = readJourney(journeyText({ ...old, elsewhere })).state;
  assert.deepEqual([...back.found].sort(), ['depth3', 'first', 'south']);
  assert.equal(back.xp, 2, 'south and depth 3; the first room gives none');
  assert.equal(step(back, 'up').xp, 2);
});

test('an older save still in the first room, nothing else mapped, gets 0', () => {
  const { xp, found, ...old } = makeWorld('first', 9);
  assert.equal(readJourney(journeyText(old)).state.xp, 0);
});
