// § lantern button: the on-screen lantern switch, next to the oil bar just
// outside the game picture: above it on a tall screen, beside it on a wide
// one, and just under it inside the picture when neither fits (D-080). Thin layer: a tap or
// click only calls onSwitch(); show(lit) redraws its icon and tells screen
// readers whether it is on; hide(on) takes it away on the title screen.
import { drawLanternIcon } from '../render/hud.js';

const SIZE = 44, GAP = 8; // a 44 px tap target (TECH.md), 8 px from the picture
const BAR_BOTTOM = 12; // game pixels from the picture's top to below the oil bar (hud.js)

// § place: the button's spot in the row by the oil bar (0 the lantern, 1 the
// pause button to its left, or under it when the row stands beside the picture),
// again whenever the page or the picture changes size
export function keepPlaced(canvas, button, i) {
  const place = () => {
    const r = canvas.getBoundingClientRect(), s = button.style, step = i * (SIZE + GAP);
    if (r.top >= SIZE + 2 * GAP) { s.top = r.top - SIZE - GAP + 'px'; s.left = r.right - SIZE - step + 'px'; }
    else if (innerWidth - r.right >= SIZE + 2 * GAP) { s.top = r.top + step + 'px'; s.left = r.right + GAP + 'px'; }
    else { s.top = r.top + BAR_BOTTOM * r.height / canvas.height + 'px'; s.left = r.right - SIZE - 2 - step + 'px'; }
  };
  const watch = new ResizeObserver(place);
  watch.observe(document.documentElement); watch.observe(canvas);
}

export function createLanternButton(canvas, { onSwitch }) {
  const button = document.createElement('button');
  button.id = 'lantern-button';
  button.type = 'button';
  button.title = 'Lantern (L)';
  button.setAttribute('aria-label', 'Lantern');
  const icon = document.createElement('canvas');
  icon.width = icon.height = 5;
  button.append(icon);
  button.addEventListener('click', (ev) => { onSwitch(); if (ev.detail) button.blur(); }); // a tap or click lets go of the focus; Enter or Space keeps it
  document.body.append(button);

  keepPlaced(canvas, button, 0);

  let shown = null;
  return {
    hide(on) { button.style.display = on ? 'none' : ''; },
    show(lit) {
      if (lit === shown) return;
      shown = lit;
      drawLanternIcon(icon.getContext('2d'), lit);
      button.setAttribute('aria-pressed', String(lit));
    },
  };
}
