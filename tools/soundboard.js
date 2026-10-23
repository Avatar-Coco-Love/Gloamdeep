// § soundboard: one page with a button for each of the game's sounds, so the
// owner can hear a new sound straight from the chat (D-256). It packs the game's
// own src/render/sound.js, so what plays is what the game plays. Not part of the
// game. No dependencies.
//
//   node tools/soundboard.js out.html
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(ROOT, f), 'utf8');
// The modules as plain scripts: their imports dropped, `export` taken off
const plain = (text) => text.replace(/^import .*$/gm, '').replace(/^export /gm, '');
const VERSION = read('src/core/version.js').match(/'([^']+)'/)[1];

// § sounds: each button's label, and what it plays (the sound maker starts on the
// press, so it waits a moment before the first sound); a walk is the held pace (D-044)
const SOUNDS = [
  { label: 'One footstep', play: 'later(0, () => sound.footstep())' },
  { label: 'A walk, 8 steps', play: 'for (let i = 0; i < 8; i++) later(i * 250, () => sound.footstep())' },
  { label: 'Lantern on', play: 'later(0, () => sound.lantern(true))' },
  { label: 'Lantern off', play: 'later(0, () => sound.lantern(false))' },
  { label: 'Lantern hit', play: 'later(0, () => sound.hit(false))' },
  { label: 'Knife hit', play: 'later(0, () => sound.hit(true))' },
  { label: 'A fight, 3 knife hits', play: 'for (let i = 0; i < 3; i++) later(i * 350, () => sound.hit(true))' },
  { label: 'A rat bites', play: 'later(0, () => sound.teeth(false))' },
  { label: 'Knife hit, then a rat bites', play: 'later(0, () => { sound.hit(true); sound.teeth(true); })' },
];

const out = process.argv[2];
if (!out) throw new Error('usage: node tools/soundboard.js out.html');
writeFileSync(out, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Gloamdeep sounds</title>
<style>
  :root { --bg: #0e0c16; --text: #9790a4; --gold: #ffd66b; --edge: #3a3446; }
  body { margin: 0; padding: 24px 16px; background: var(--bg); color: var(--text); font: 16px/1.4 ui-monospace, "Courier New", monospace; }
  h1 { color: var(--gold); font-size: 20px; margin: 0 0 4px; }
  p { margin: 0 0 20px; }
  button { display: block; width: 100%; max-width: 360px; min-height: 52px; margin: 0 0 12px; font: inherit; color: var(--gold);
    background: #171421; border: 1px solid var(--edge); border-radius: 6px; cursor: pointer; }
  button:active { background: #241f33; }
  button:focus-visible { outline: 2px solid #ffc65c; outline-offset: 2px; }
</style>
</head>
<body>
<h1>Gloamdeep sounds</h1>
<p>Version ${VERSION}. Turn your sound on, then tap a sound to hear it.</p>
<div id="sounds"></div>
<script>
${plain(read('src/core/rng.js'))}
${plain(read('src/render/sound.js'))}
const sound = createSound(() => true);
const START_MS = 120; // the sound maker's first start takes a moment
const later = (ms, f) => setTimeout(f, START_MS + ms);
const SOUNDS = [${SOUNDS.map((s) => `[${JSON.stringify(s.label)}, () => { ${s.play}; }]`).join(', ')}];
for (const [label, play] of SOUNDS) {
  const b = document.createElement('button');
  b.textContent = label;
  b.addEventListener('click', play);
  document.getElementById('sounds').append(b);
}
</script>
</body>
</html>
`);
console.log(`soundboard: ${SOUNDS.length} sounds → ${out}`);
