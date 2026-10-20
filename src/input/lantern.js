// § lantern button: the on-screen lantern switch, next to the oil bar just
// outside the game picture: above it on a tall screen, beside it on a wide
// one, and just under it inside the picture when neither fits (D-080). Thin layer: a tap or
// click only calls onSwitch(); show(lit) redraws its icon and tells screen
// readers whether it is on; hide(on) takes it away on the title screen.
import { drawLanternIcon } from '../render/hud.js';

const SIZE = 44, GAP = 8; // a 44 px tap target (TECH.md), 8 px from the picture
const BAR_BOTTOM = 12; // game pixels from the picture's top to below the oil bar (hud.js)

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

  // § place: again whenever the page or the picture changes size
  const place = () => {
    const r = canvas.getBoundingClientRect(), s = button.style;
    if (r.top >= SIZE + 2 * GAP) { s.top = r.top - SIZE - GAP + 'px'; s.left = r.right - SIZE + 'px'; }
    else if (innerWidth - r.right >= SIZE + 2 * GAP) { s.top = r.top + 'px'; s.left = r.right + GAP + 'px'; }
    else { s.top = r.top + BAR_BOTTOM * r.height / canvas.height + 'px'; s.left = r.right - SIZE - 2 + 'px'; }
  };
  const watch = new ResizeObserver(place);
  watch.observe(document.documentElement); watch.observe(canvas);

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
