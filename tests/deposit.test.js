// § deposit: three veined rocks in each Cave room, depths 2 to 4, solid but
// letting light over them, never cutting a room in two (D-310)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, makeRoom, tileAt, FIRST_ROOM, withTile } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { get } from '../src/core/registry.js';
import { makeState, step } from '../src/core/turn.js';
import { clearLine } from '../src/core/sight.js';
import { markAt } from '../src/core/map.js';

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);
const deposits = (map) => map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === 'O' ? [{ x, y }] : [])));

// Every tile the hero could stand on, joined or not
function joined(room) {
  const open = [];
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) if (!tileAt(room, x, y).solid) open.push({ x, y });
  const seen = new Set([`${open[0].x},${open[0].y}`]), queue = [open[0]];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy }, k = `${n.x},${n.y}`;
      if (n.x < 0 || n.y < 0 || n.x >= room.cols || n.y >= room.rows || tileAt(room, n.x, n.y).solid || seen.has(k)) continue;
      seen.add(k); queue.push(n);
    }
  }
  return seen.size === open.length;
}

test('every Cave room holds 3 deposits, off the edge and clear of what lies, stands or starts there', () => {
  for (const seed of SEEDS) for (const depth of [2, 3, 4]) for (const { id } of layoutAt(seed, depth).cells) {
    const p = placeFor(id, seed), found = deposits(p.map), room = makeRoom(p.map);
    assert.equal(found.length, 3, `seed ${seed}, ${id}`);
    for (const d of found) {
      assert.ok(d.x > 0 && d.y > 0 && d.x < room.cols - 1 && d.y < room.rows - 1);
      assert.ok(![p.start, ...p.items, ...p.enemies].some((o) => o.x === d.x && o.y === d.y));
    }
    assert.ok(joined(room), `seed ${seed}, ${id} is cut in two`);
  }
});

test('warrens, the dungeon and the hand-made rooms hold none', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const depth of [5, 8]) {
    assert.equal(deposits(placeFor(`depth${depth}`, seed).map).length, 0);
  }
  for (const id of ['first', 'second', 'south']) assert.equal(deposits(placeFor(id, 1).map).length, 0);
});

test('the same seed gives the same deposits', () => {
  assert.deepEqual(placeFor('depth3', 4127).map, placeFor('depth3', 4127).map);
});

test('a deposit is a solid tile the hero bumps against, free, and light passes over it', () => {
  const entry = get('deposit');
  assert.equal(entry.kind, 'tile');
  assert.equal(entry.solid, true);
  assert.equal(entry.blocksLight, false);
  // The hero starts at 5,11 in the first room; a deposit on 5,10 is just above.
  const room = withTile(makeRoom(FIRST_ROOM), 5, 10, entry), s = { ...makeState(room), hero: { x: 5, y: 11 } };
  const n = step(s, 'up');
  assert.deepEqual(n.hero, { x: 5, y: 11 });
  assert.equal(n.turn, s.turn);
  assert.ok(clearLine(room, { x: 5, y: 11 }, { x: 5, y: 9 }));
});

test('the map outlines a deposit, as it does a wall', () => {
  const room = withTile(makeRoom(FIRST_ROOM), 5, 10, get('deposit'));
  assert.equal(markAt(room, null, 5, 10), 'wall');
});
