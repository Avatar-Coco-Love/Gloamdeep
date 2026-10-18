// § boot: set up the screen and draw step 7's single floor tile
import { VERSION } from './core/version.js';
import { createScreen, W, H, COLS, ROWS } from './render/screen.js';
import { drawFloor } from './render/tiles.js';

const ctx = createScreen(document.getElementById('game'));
document.getElementById('version').textContent = VERSION;

// § draw: darkness everywhere, one floor tile in the middle
ctx.fillStyle = '#0e0c16';
ctx.fillRect(0, 0, W, H);
drawFloor(ctx, Math.floor(COLS / 2), Math.floor(ROWS / 2));
