// § mount: how a torch sits on tile x, y, picked from the tiles around it (D-099).
// 'face' on a wall with its brick face showing (floor below), else 'left' or
// 'right' on a wall with open ground on that side. Null where it can't sit:
// on floor, or inside solid wall (D-100).
import { isWall } from './room.js';

export function mountAt(room, x, y) {
  if (!isWall(room, x, y)) return null;
  if (!isWall(room, x, y + 1)) return 'face';
  if (!isWall(room, x - 1, y)) return 'left';
  if (!isWall(room, x + 1, y)) return 'right';
  return null;
}
