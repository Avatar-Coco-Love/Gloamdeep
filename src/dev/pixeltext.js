// § pixel text: the dev tools' words in the game's pixel font (D-200). Each
// piece is drawn once on a canvas and kept; the page shows it as a mask over
// the text colour, so the CSS colours (D-093) still work. Screen readers
// get the plain words.
import { drawText, textWidth, FONT_H } from '../render/font.js';

const ZOOM = 2; // each font pixel is 2 × 2 page pixels
const masks = new Map();

function mask(piece) {
  const k = Math.ceil(ZOOM * (devicePixelRatio || 1)), key = k + ' ' + piece;
  if (!masks.has(key)) {
    const c = document.createElement('canvas');
    c.width = Math.max(1, textWidth(piece) * k); c.height = FONT_H * k;
    const x = c.getContext('2d');
    x.scale(k, k);
    drawText(x, piece, 0, 0, '#fff');
    masks.set(key, `url(${c.toDataURL()})`);
  }
  return masks.get(key);
}

// Puts `text` into `node` in the pixel font. Lines break at \n; a line
// wraps only between pieces split by " · ", each keeping its dot.
export function setPixelText(node, text) {
  const shown = document.createElement('span');
  shown.className = 'px';
  shown.setAttribute('aria-hidden', 'true');
  for (const line of text.split('\n')) {
    const row = document.createElement('span'), pieces = line.split(' · ');
    row.className = 'px-line';
    pieces.forEach((p, i) => {
      const piece = i < pieces.length - 1 ? p + ' ·' : p, word = document.createElement('span');
      word.className = 'px-word';
      word.style.width = textWidth(piece) * ZOOM + 'px';
      word.style.webkitMaskImage = word.style.maskImage = mask(piece);
      row.append(word);
    });
    shown.append(row);
  }
  const said = document.createElement('span');
  said.className = 'px-said';
  said.textContent = text;
  node.replaceChildren(shown, said);
}
