// § lines: the text line's rules (src/core/lines.js, D-094 to D-097)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, wait, pour, switchLantern } from '../src/core/turn.js';
import { setOil, OIL } from '../src/core/oil.js';
import { LINES, LINE_TURNS, shownLine, oilLine } from '../src/core/lines.js';
import { hasGlyph, textWidth } from '../src/render/font.js'; // plain data, no DOM
import { W } from '../src/render/screen.js';

const room = makeRoom(FIRST_ROOM);
const at = (oil) => setOil(makeState(room), oil);

test('the game starts with nothing said', () => {
  assert.equal(shownLine(makeState(room)), null);
});

test('dropping under 20% says the flame is getting low', () => {
  assert.equal(shownLine(wait(at(0.2))), LINES.oilLow);
});

test('running dry says the lantern gutters', () => {
  assert.equal(shownLine(wait(at(OIL.burn))), LINES.oilEmpty);
});

test('a line is said once, not on every step under the mark', () => {
  const s = wait(at(0.2)), n = wait(s);
  assert.equal(n.line, s.line);
});

test('a line stays for its turns, then is gone', () => {
  let s = switchLantern(wait(at(0.2))); // off, so no new line comes
  for (let i = 1; i < LINE_TURNS; i++) s = wait(s);
  assert.equal(shownLine(s), LINES.oilLow);
  assert.equal(shownLine(wait(s)), null);
});

test('it is said again only after the oil goes back above the mark', () => {
  assert.equal(oilLine(0.19, 0.18), null);
  assert.equal(oilLine(0.2, 0.19), 'oilLow');
  assert.equal(oilLine(0, 0), null);
});

test('a flask poured on the turn the oil would cross the mark says nothing', () => {
  const s = { ...at(0.2), bag: [{ id: 'flask', n: 1 }] };
  assert.equal(pour(s, 0).line, null);
});

test('a bump passes no turn and says nothing', () => {
  const s = wait(at(0.2));
  assert.equal(step({ ...s, hero: { x: 1, y: 1 } }, 'up').line, s.line);
});

test('every line can be drawn and fits the strip', () => {
  for (const line of Object.values(LINES)) for (const said of line.texts || [line.text]) { // each of a list's lines (D-297)
    const text = said.replace('{n}', 99); // a number filled in, as the level (D-246)
    assert.ok([...text].every(hasGlyph), text);
    assert.ok(textWidth(text) <= W - 4, text);
  }
});
