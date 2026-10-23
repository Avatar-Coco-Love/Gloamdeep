// § sprites: 16 × 16 pixel maps written as strings, one letter per palette
// colour; symmetric ones store the left half and mirror it (style study 1,
// lines 121–176, ART-DIRECTION.md "Sprites").
import { CLOAKS, EYES, TRIMS } from '../core/registry.js';

const PAL = {
  k: '#0e0c16', w: '#efe6cc', C: '#a6e0e4', c: '#58a8b4', B: '#2f6a7c', b: '#1c3e4e',
  y: '#ffd66b', Y: '#f39a3b', O: '#a8642c', o: '#e9a94a', a: '#e8d5a0',
  S: '#9aa6b4', s: '#6b7686', d: '#4a5262', p: '#e8786a', e: '#efe6cc', // e: the hero's eyes
  T: '#e8d5a0', t: '#a8642c', // the lantern's trim, cap and base (P5)
  g: '#6fb04e', G: '#3c6e3a', // moss (ART-DIRECTION.md palette)
};

// § hero: the study's hero, with the lantern held out to its right (D-042, D-056).
// `extra` pixels are drawn over the mirrored rows: [x, y, colour letter].
const HERO = { mirror: true, rows: [
  '........', '......kk', '.....kCc', '....kCcc', '...kCckk', '...kckkk', '...kckek', '...kcBkk',
  '...kccBB', '..kcccBB', '..kccBBB', '..kcBBBb', '..kcBBbB', '..kBBbbB', '...kkbkk', '....kk..'],
  extra: [[13, 7, 'k'], [12, 8, 'k'], [13, 8, 'T'], [14, 8, 'k'], [11, 9, 'k'], [12, 9, 'y'], [13, 9, 'w'], [14, 9, 'y'], [15, 9, 'k'],
    [11, 10, 'k'], [12, 10, 'Y'], [13, 10, 'y'], [14, 10, 'Y'], [15, 10, 'k'], [12, 11, 'k'], [13, 11, 't'], [14, 11, 'k']] };
// § flask: the study's oil flask, a cork over a bottle of amber oil (study line 156, D-077)
const FLASK = { mirror: true, rows: [
  '', '', '......kk', '.....kaa', '......kk', '......ko', '.....koo', '....kooo', '...kwooo', '...kwooo',
  '...koooo', '...kOooo', '....kOOO', '.....kkk'] };

// § herb: a sprig of three leaves in the moss greens, light on top, dark
// underneath and down the stem (D-155)
const HERB = { mirror: false, rows: [
  '', '', '', '', '.......kk.......', '......kggk......', '......kgGk......', '..kkk..kGk.kkk..',
  '.kgggk.kGk.kgggk', '..kgGGkkGkkGGgk.', '...kkGGkGkGGkk..', '.....kkGGGkk....', '.......kGk......', '.......kkk......'] };

// § knife: a steel blade pointing up and right, a pale edge, a dark guard
// and a brown grip (D-252)
const KNIFE = { mirror: false, rows: [
  '', '', '.............kk.', '............kSk.', '...........kwSk.', '..........kwSk..', '.........kwSk...', '........kwSk....', '....kk.kwSk.....',
  '....kdkkSk......', '.....kddk.......', '.....kOkdk......', '....kOk.kk......', '...kOk..........', '..kOk...........', '..kk............'] };

// § rat: redrawn from the study's (D-009), side on and facing right: a pink
// hostile eye (ART-DIRECTION.md palette), ear, nose, feet and tail (D-104)
const RAT = { mirror: false, rows: [
  '', '', '', '', '', '', '', '..........kk....', '.........kpdk...', '.....kkkkkSSSk..',
  '...kkSSSSSSSSpSk', '..kSSSSSSSSSSSSk', 'p.ksSSSSSSSSSSkp', '.pksdsssssssdkw.', '..pkkddkkkkddk..', '....kpk...kpk...'] };

// § gloamling: a squat shadow on little legs, dark teal and grey, with the
// pink hostile eyes (ART-DIRECTION.md palette, D-240)
const GLOAMLING = { mirror: false, rows: [
  '', '', '', '', '', '', '', '.....kkkkkk.....', '....kbdddddbk...', '...kbdddddddbk..', '..kbddpkddpkdbk.',
  '..kbbddddddddbk.', '..kbbbbbbbbbbbk.', '...kkbkkbkkbkk..', '..kbk.kbkkb.kbk.', '..k....k..k...k.'] };

function build(rows, mirror) {
  return Array.from({ length: 16 }, (_, i) => {
    let r = rows[i] || '';
    if (mirror) { r = (r + '........').slice(0, 8); r += [...r].reverse().join(''); }
    return (r + '................').slice(0, 16);
  });
}

// flash: the silhouette for a hit flash, white (ART-DIRECTION.md, "Sprites"),
// or the hostile red when the hero is bitten (D-118); pal: the colours, as PAL
function spriteCanvas(def, flash = null, pal = PAL) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 16;
  const c = cv.getContext('2d');
  build(def.rows, def.mirror).forEach((r, y) => [...r].forEach((ch, x) => {
    if (!pal[ch]) return;
    c.fillStyle = flash || pal[ch]; c.fillRect(x, y, 1, 1);
  }));
  for (const [x, y, ch] of def.extra || []) { c.fillStyle = flash || pal[ch]; c.fillRect(x, y, 1, 1); }
  return cv;
}

export const SPRITES = { hero: spriteCanvas(HERO), flask: spriteCanvas(FLASK), herb: spriteCanvas(HERB), knife: spriteCanvas(KNIFE), rat: spriteCanvas(RAT), gloamling: spriteCanvas(GLOAMLING) }; // keyed by registry id
const FLASHES = { rat: spriteCanvas(RAT, '#ffffff'), gloamling: spriteCanvas(GLOAMLING, '#ffffff') };
// § facing left: an enemy's sprite mirrored, for one that walked left (D-158)
function mirrored(cv) {
  const out = document.createElement('canvas');
  out.width = out.height = 16;
  const c = out.getContext('2d');
  c.scale(-1, 1); c.drawImage(cv, -16, 0);
  return out;
}
const LEFT = {}, LEFT_FLASHES = {};
for (const id of Object.keys(FLASHES)) { LEFT[id] = mirrored(SPRITES[id]); LEFT_FLASHES[id] = mirrored(FLASHES[id]); }
const BITTEN = spriteCanvas(HERO, PAL.p);
// § looks: the hero in a cloak, eyes and trim (P3 to P5), its four cloak shades, its eye colour
// and the lantern's cap and base swapped; the outline and the flame stay. Each is made once, the first time it is worn or shown.
// The profile in play's is worn wherever the hero is drawn.
const HEROES = {};
export function heroIn(cloak, eyes, trim) {
  const key = `${cloak}/${eyes}/${trim}`;
  if (!HEROES[key]) {
    const [C, c, B, b] = (CLOAKS[cloak] ?? CLOAKS.teal).shades, e = (EYES[eyes] ?? EYES.bone).colour, [T, t] = (TRIMS[trim] ?? TRIMS.brass).shades;
    HEROES[key] = spriteCanvas(HERO, null, { ...PAL, C, c, B, b, e, T, t });
  }
  return HEROES[key];
}
let worn = SPRITES.hero;
export function wearLook(cloak, eyes, trim) { worn = heroIn(cloak, eyes, trim); }

// § shadow: a small dark oval under a sprite (study line 345)
export function drawShadow(c, x, y, w) {
  c.fillStyle = 'rgba(0,0,0,.35)';
  c.fillRect(x + 8 - w / 2, y + 14, w, 2);
  c.fillRect(x + 9 - w / 2, y + 16, w - 2, 1);
}

const LYING_DROP = 3; // pixels the fallen hero sits lower, on the floor
// § hero: drawn 2 pixels up from its tile, on its shadow (ART-DIRECTION.md).
// `bitten`: flashing red just after a bite (D-118). `lying`: fallen, turned
// a quarter over onto the floor, a whole turn so the pixels stay crisp (D-234).
export function drawHero(c, x, y, bitten = false, lying = false) {
  const sprite = bitten ? BITTEN : worn;
  drawShadow(c, x, y, lying ? 12 : 8);
  if (!lying) { c.drawImage(sprite, x, y - 2); return; }
  c.save();
  c.translate(x + 8, y + LYING_DROP + 8);
  c.rotate(Math.PI / 2);
  c.drawImage(sprite, -8, -8);
  c.restore();
}

// § items: each item 2 pixels up from its tile, on its shadow. An item bobs
// 1 pixel every 0.7 s, each row in its own beat; still with reduced motion (study line 379, D-077).
export function drawItems(c, items, t, still) {
  for (const it of items) {
    const x = it.x * 16, y = it.y * 16;
    const bob = still ? 0 : Math.floor(t / 700 + it.y) % 2;
    drawShadow(c, x, y, 8);
    c.drawImage(SPRITES[it.id], x, y - 2 - bob);
  }
}

// § enemies: like items, 2 pixels up on a shadow. The rat bobs 1 pixel every
// 0.52 s, each column in its own beat; still with reduced motion (study line 378).
// `hit`: the enemy flashing white just now, or null (D-105). A hit that
// killed it still flashes it once, then it is gone (D-113).
// `at`: (enemy) → the tile it is shown on, part way along while it slides (D-128).
// One that walked left is drawn mirrored (D-158).
export function drawEnemies(c, enemies, t, still, hit, at = (e) => e) {
  for (const e of enemies) drawEnemy(c, e, at(e), t, still, hit && e.x === hit.x && e.y === hit.y);
  if (hit && !enemies.some((e) => e.x === hit.x && e.y === hit.y)) drawEnemy(c, hit, hit, t, still, true);
}
function drawEnemy(c, e, p, t, still, flash) {
  const x = Math.round(p.x * 16), y = Math.round(p.y * 16);
  const bob = still ? 0 : Math.floor(t / 520 + e.x) % 2;
  drawShadow(c, x, y, 8);
  const left = e.facing === 'left';
  c.drawImage((flash ? (left ? LEFT_FLASHES : FLASHES) : (left ? LEFT : SPRITES))[e.id], x, y - 2 - bob);
}
