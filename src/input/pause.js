// § pause button: opens the pause menu during play (D-187). It sits left of the
// lantern button in the buttons' row (D-198), in the same style. Thin layer: a tap or click only calls onPause();
// hide(on) takes it away on the title screen and while the menu is open.
import { drawPauseIcon } from '../render/hud.js';
import { keepPlaced } from './lantern.js';

export function createPauseButton(hud, { onPause }) {
  const button = document.createElement('button');
  button.id = 'pause-button';
  button.type = 'button';
  button.title = 'Pause (Esc or P)';
  button.setAttribute('aria-label', 'Pause');
  const icon = document.createElement('canvas');
  icon.width = icon.height = 5;
  drawPauseIcon(icon.getContext('2d'));
  button.append(icon);
  button.addEventListener('click', () => { button.blur(); onPause(); }); // Enter then picks a menu line, not the button again
  document.body.append(button);
  keepPlaced(hud, button, 1);
  return { hide(on) { button.style.display = on ? 'none' : ''; } };
}
