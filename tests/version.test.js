// § version: VERSION in the code matches the top CHANGELOG.md entry
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VERSION } from '../src/core/version.js';

test('VERSION matches the top CHANGELOG entry', () => {
  const log = readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8');
  const noExamples = log.replace(/```[\s\S]*?```/g, ''); // skip the format example in the header
  const top = noExamples.split('\n').find((l) => /^## \d+\.\d+\.\d+ /.test(l));
  assert.equal(top.split(' ')[1], VERSION);
});
