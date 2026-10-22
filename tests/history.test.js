// Version history (D-254): every version and every line, word for word, as the changelog has them
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { HISTORY, scrollToShow, clampScroll, versionWords } from '../src/core/history.js';
import { VERSION } from '../src/core/version.js';
import { textWidth, hasGlyph } from '../src/render/font.js';
import { wrap, historyRows, historyAt, headRow, lastRow, TITLE_W, BODY_W, ROW_H, LIST_Y, LIST_H, BACK_Y } from '../src/render/history.js';

// The changelog's versions, from CHANGELOG.md and its archive files: a bullet and
// the indented lines under it make one line; the format example in a fence is skipped
function changelog() {
  const files = ['CHANGELOG.md', ...readdirSync('docs/archive').filter((f) => f.startsWith('CHANGELOG')).map((f) => `docs/archive/${f}`)];
  const entries = [];
  for (const file of files) {
    let cur = null, fence = false;
    for (const line of readFileSync(file, 'utf8').split('\n')) {
      if (line.startsWith('```')) { fence = !fence; continue; }
      if (fence) continue;
      const head = line.match(/^## (\d+\.\d+\.\d+) \((\d{4}-\d\d-\d\d)\)$/);
      if (head) { cur = { v: head[1], date: head[2], lines: [] }; entries.push(cur); continue; }
      if (!cur) continue;
      if (line.startsWith('- ')) cur.lines.push(line.slice(2).trim());
      else if (line.startsWith('  ') && line.trim() && cur.lines.length) cur.lines[cur.lines.length - 1] += ` ${line.trim()}`;
      else if (line.trim()) cur = null;
    }
  }
  const parts = (v) => v.split('.').map(Number);
  return entries.sort((a, b) => { const x = parts(a.v), y = parts(b.v); return y[0] - x[0] || y[1] - x[1] || y[2] - x[2]; });
}

test('the history has every version the changelog has, newest first, with its date', () => {
  const log = changelog();
  assert.deepEqual(HISTORY.map((e) => `${e.v} ${e.date}`), log.map((e) => `${e.v} ${e.date}`));
  assert.equal(HISTORY[0].v, VERSION);
});

test('every version holds the changelog lines, word for word, without backticks', () => {
  const log = changelog();
  HISTORY.forEach((e, i) => assert.deepEqual(e.lines, log[i].lines.map((l) => l.replaceAll('`', '')), e.v));
});

test('the versions run with no gaps and no repeats, from 0.0.1', () => {
  const byMinor = {};
  for (const e of [...HISTORY].reverse()) { const [a, b, c] = e.v.split('.').map(Number); (byMinor[`${a}.${b}`] ??= []).push(c); }
  for (const [minor, patches] of Object.entries(byMinor)) {
    const first = minor === '0.0' ? 1 : 0;
    assert.deepEqual(patches, patches.map((_, i) => first + i), minor);
  }
});

test('every title fits its row, and every letter is in the pixel font', () => {
  for (const e of HISTORY) {
    assert.ok(e.title && textWidth(e.title) <= TITLE_W, e.v);
    for (const ch of [e.v, e.date, e.title, ...e.lines].join('')) assert.ok(hasGlyph(ch), `${e.v}: ${ch}`);
  }
});

test('wrapped lines fit the window and keep every word', () => {
  for (const e of HISTORY) for (const line of e.lines) {
    const rows = wrap(line, BODY_W);
    for (const r of rows) assert.ok(textWidth(r) <= BODY_W, r);
    assert.equal(rows.join(' ').replace(/\s+/g, ''), line.replace(/\s+/g, ''));
  }
});

test('closed, each version is one row; open, its date and lines follow it', () => {
  assert.equal(historyRows(new Set()).length, HISTORY.length);
  const e = HISTORY[1], rows = historyRows(new Set([e.v]));
  assert.equal(rows[headRow(rows, 1)].kind, 'head');
  assert.deepEqual(rows[2], { i: 1, kind: 'date', text: e.date });
  assert.equal(rows.filter((r) => r.kind === 'line').length, e.lines.length);
  assert.equal(rows[lastRow(rows, 1) + 1].i, 2);
});

test('the list scrolls just enough to show a row, and never past its ends', () => {
  const view = 4 * ROW_H;
  assert.equal(scrollToShow(0, 2, 2, ROW_H, view, 20), 0);
  assert.equal(scrollToShow(0, 6, 6, ROW_H, view, 20), 3 * ROW_H);
  assert.equal(scrollToShow(5 * ROW_H, 1, 1, ROW_H, view, 20), ROW_H);
  assert.equal(scrollToShow(0, 3, 12, ROW_H, view, 20), 3 * ROW_H); // too long: its first row on top
  assert.equal(clampScroll(-5, 20 * ROW_H, view), 0);
  assert.equal(clampScroll(999, 20 * ROW_H, view), 16 * ROW_H);
  assert.equal(clampScroll(30, 2 * ROW_H, view), 0); // shorter than the window
});

test('a tap picks a row in the window, or Back', () => {
  assert.deepEqual(historyAt(LIST_Y + 1, 0, 90), { row: 0 });
  assert.deepEqual(historyAt(LIST_Y + ROW_H + 1, 2 * ROW_H, 90), { row: 3 });
  assert.equal(historyAt(BACK_Y + 2, 0, 90), 'back');
  assert.equal(historyAt(LIST_Y + LIST_H - 1, 0, 3), null); // below the last row
});

test('a screen reader hears the number and title, and the lines while open', () => {
  const e = HISTORY[0];
  assert.equal(versionWords(e, false), `${e.v}, ${e.title}`);
  assert.ok(versionWords(e, true).endsWith(e.lines.at(-1)));
});
