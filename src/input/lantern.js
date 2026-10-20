// § lantern button: the on-screen lantern switch, in the buttons' row just
// outside the game picture: above it, or beside it when the picture stands
// sideways, and just under the top strip inside the picture when neither
// fits (D-080, D-198, D-199). Thin layer: a tap or
// click only calls onSwitch(); show(lit) redraws its icon and tells screen
// readers whether it is on; hide(on) takes it away on the title screen.
import { drawLanternIcon } from '../render/hud.js';
import { BUTTON as SIZE, BUTTON_GAP as GAP } from '../render/screen.js';

// § place: the button's spot (D-198, D-199): slot 0 the lantern, 1 the
// pause button, -1 the dev wrench. Above the picture they make one row,
// the wrench at the left end, the lantern at the right end with pause to
// its left. Sideways (the strip is a column at the room's left), the wrench
// stands left of the picture's top, pause right of it, and the lantern at
// the bottom right, under the thumb. `hud` is the strip; the picture is it
// and the room's canvas beside it. Placed again whenever the page or the
// picture changes size; then(top, left, picture) hears where it went.
export function keepPlaced(hud, button, slot, then) {
  const room = hud.parentElement.querySelector('#game');
  const place = () => {
    const h = hud.getBoundingClientRect(), g = room.getBoundingClientRect(), s = button.style, left = slot < 0;
    const r = { top: h.top, left: h.left, right: g.right, bottom: g.bottom }, step = Math.max(slot, 0) * (SIZE + GAP);
    let top, x;
    if (h.bottom > g.top + 1) { top = slot === 0 ? r.bottom - SIZE : r.top; x = left ? r.left - SIZE - GAP : r.right + GAP; }
    else if (r.top >= SIZE + GAP) { top = r.top - SIZE - GAP; x = left ? r.left : r.right - SIZE - step; }
    else { top = h.bottom + 2; x = left ? r.left + 2 : r.right - SIZE - 2 - step; }
    s.top = top + 'px'; s.left = x + 'px';
    then?.(top, x, r);
  };
  const watch = new ResizeObserver(place);
  watch.observe(document.documentElement); watch.observe(hud); watch.observe(room);
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
