// § camera: which part of the room the screen shows (D-172, D-195). Plain
// data, no drawing. The hero's tile sits in the middle of the screen, and
// the camera stops at the room's edges, so nothing beyond the room shows.
// A room no bigger than the screen never moves.
const TILE_SIZE = 16;

// (hero's top-left in room pixels, room, screen width and height in pixels)
// → { x, y }, the room pixel at the screen's top-left corner
export function cameraAt(hx, hy, room, w, h) {
  const along = (p, size, view) => Math.max(0, Math.min(size - view, p + TILE_SIZE / 2 - view / 2));
  return { x: along(hx, room.cols * TILE_SIZE, w), y: along(hy, room.rows * TILE_SIZE, h) };
}
