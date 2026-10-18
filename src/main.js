// § boot: set up the screen and draw step 8's room
import { VERSION } from './core/version.js';
import { makeRoom, FIRST_ROOM } from './core/room.js';
import { createScreen } from './render/screen.js';
import { drawRoom } from './render/tiles.js';

const ctx = createScreen(document.getElementById('game'));
document.getElementById('version').textContent = VERSION;

// § draw: the first room, built from its text map
drawRoom(ctx, makeRoom(FIRST_ROOM));
