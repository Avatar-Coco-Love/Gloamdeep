// § lantern button: the on-screen lantern switch, in the buttons' row just
// outside the game picture: above it, or beside it when the picture is wider
// that way, and just under the top strip inside the picture when neither fits
// (D-080, D-198). Thin layer: a tap or
// click only calls onSwitch(); show(lit) redraws its icon and tells screen
// readers whether it is on; hide(on) takes it away on the title screen.
import { drawLanternIcon } from '../render/hud.js';
import { BUTTON as SIZE, BUTTON_GAP as GAP } from '../render/screen.js';

// § place: the button's spot in the row (D-198): slot 0 the lantern at the
// right end, 1 the pause button to its left, -1 the dev wrench at the left
// end. Above the picture the row runs along its top; beside it, the wrench
// stands at the left and the others at the right, pause under the lantern.
// `hud` is the strip at the picture's top. Placed again whenever the page or
// the picture changes size; then(top, left) hears where it went.
export function keepPlaced(hud, button, slot, then) {
  const place = () => {
    const r = hud.getBoundingClientRect(), s = button.style, left = slot < 0, step = Math.max(slot, 0) * (SIZE + GAP);
    let top, x;
    if (r.top >= SIZE + GAP) { top = r.top - SIZE - GAP; x = left ? r.left : r.right - SIZE - step; }
    else if (r.left >= SIZE + 2 * GAP) { top = r.top + step; x = left ? r.left - SIZE - GAP : r.right + GAP; }
    else { top = r.bottom + 2; x = left ? r.left + 2 : r.right - SIZE - 2 - step; }
    s.top = top + 'px'; s.left = x + 'px';
    then?.(top, x);
  };
  const watch = new ResizeObserver(place);
  watch.observe(document.documentElement); watch.observe(hud);
}

export function createLanternButton(hud, { onSwitch }) {
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

  keepPlaced(hud, button, 0);

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
