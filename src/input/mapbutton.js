// § map button: opens the map screen during play (D-205). It sits left of the
// pause button in the buttons' row, or under it sideways (D-198), in the same
// style; while the map is open it stays, as a cross that closes it. Thin
// layer: a tap or click only calls onMap(); hide(on) takes it away, closes(on)
// turns it into the cross.
import { drawMapIcon, drawCloseIcon } from '../render/hud.js';
import { keepPlaced } from './lantern.js';

export function createMapButton(hud, { onMap }) {
  const button = document.createElement('button');
  button.id = 'map-button';
  button.type = 'button';
  button.title = 'Map (M)';
  button.setAttribute('aria-label', 'Map');
  const icon = document.createElement('canvas');
  icon.width = icon.height = 5;
  drawMapIcon(icon.getContext('2d'));
  button.append(icon);
  button.addEventListener('click', () => { button.blur(); onMap(); });
  document.body.append(button);
  keepPlaced(hud, button, 2);
  return {
    hide(on) { button.style.display = on ? 'none' : ''; },
    closes(on) {
      (on ? drawCloseIcon : drawMapIcon)(icon.getContext('2d'));
      button.title = on ? 'Close map (M)' : 'Map (M)';
      button.setAttribute('aria-label', on ? 'Close map' : 'Map');
    },
  };
}
