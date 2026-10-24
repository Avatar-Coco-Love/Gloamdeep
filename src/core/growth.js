// § growth: what levels give (D-293, answers Q-050). Each level past the first
// gives an ember, spent in the Journal's Growth tab. Plain data, no drawing.
// `state.hearts` counts the hearts bought; a journey without it has bought none.
import { levelOf } from './xp.js';
import { maxHealth } from './turn.js';

export const HEART_COST = 1; // embers for one more heart
export const HEARTS_MORE = 5; // at most 5 more, 10 in all

export const heartsBought = (state) => state.hearts ?? 0;
// The embers left: one for each level reached past the first, less those spent
export const embers = (state) => levelOf(state.xp) - 1 - heartsBought(state) * HEART_COST;
export const canAddHeart = (state) => embers(state) >= HEART_COST && heartsBought(state) < HEARTS_MORE;

// § add a heart: one more heart for good, arriving full (D-293). It can't be
// taken back. No turn passes.
export function addHeart(state) {
  if (!canAddHeart(state)) return state;
  return { ...state, hearts: heartsBought(state) + 1, health: state.health + 1 };
}
