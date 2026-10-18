// § sprites: 16 × 16 pixel maps written as strings, one letter per palette
// colour; symmetric ones store the left half and mirror it (style study 1,
// lines 121–176, ART-DIRECTION.md "Sprites").
const PAL = {
  k: '#0e0c16', w: '#efe6cc', C: '#a6e0e4', c: '#58a8b4', B: '#2f6a7c', b: '#1c3e4e',
  y: '#ffd66b', Y: '#f39a3b', O: '#a8642c', a: '#e8d5a0',
};

// § hero: the study's hero, with the lantern held out to its right (D-042, D-056).
// `extra` pixels are drawn over the mirrored rows: [x, y, colour letter].
const HERO = { mirror: true, rows: [
  '........', '......kk', '.....kCc', '....kCcc', '...kCckk', '...kckkk', '...kckwk', '...kcBkk',
  '...kccBB', '..kcccBB', '..kccBBB', '..kcBBBb', '..kcBBbB', '..kBBbbB', '...kkbkk', '....kk..'],
  extra: [[13, 7, 'k'], [12, 8, 'k'], [13, 8, 'a'], [14, 8, 'k'], [11, 9, 'k'], [12, 9, 'y'], [13, 9, 'w'], [14, 9, 'y'], [15, 9, 'k'],
    [11, 10, 'k'], [12, 10, 'Y'], [13, 10, 'y'], [14, 10, 'Y'], [15, 10, 'k'], [12, 11, 'k'], [13, 11, 'O'], [14, 11, 'k']] };
// Where the lantern's flame sits in the sprite: the light's centre and its bright core.
export const LANTERN_AT = { x: 13, y: 9 };

function build(rows, mirror) {
  return Array.from({ length: 16 }, (_, i) => {
    let r = rows[i] || '';
    if (mirror) { r = (r + '........').slice(0, 8); r += [...r].reverse().join(''); }
    return (r + '................').slice(0, 16);
  });
}

function spriteCanvas(def) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 16;
  const c = cv.getContext('2d');
  build(def.rows, def.mirror).forEach((r, y) => [...r].forEach((ch, x) => {
    if (!PAL[ch]) return;
    c.fillStyle = PAL[ch]; c.fillRect(x, y, 1, 1);
  }));
  for (const [x, y, ch] of def.extra || []) { c.fillStyle = PAL[ch]; c.fillRect(x, y, 1, 1); }
  return cv;
}

export const SPRITES = { hero: spriteCanvas(HERO) };

// § shadow: a small dark oval under a sprite (study line 345)
export function drawShadow(c, x, y, w) {
  c.fillStyle = 'rgba(0,0,0,.35)';
  c.fillRect(x + 8 - w / 2, y + 14, w, 2);
  c.fillRect(x + 9 - w / 2, y + 16, w - 2, 1);
}

// § hero: drawn 2 pixels up from its tile, on its shadow (ART-DIRECTION.md)
export function drawHero(c, x, y) {
  drawShadow(c, x, y, 8);
  c.drawImage(SPRITES.hero, x, y - 2);
}
