// § lines: what the text line says, and when (D-094 to D-097). Plain data,
// no drawing. A line is said on a turn and shows for LINE_TURNS turns.
// The words are style study 1's (study lines 462, 482–483, Q-028).

export const LINES = {
  oilLow: { text: 'The flame is getting low.', warn: false },
  oilEmpty: { text: 'The lantern gutters to an ember.', warn: true }, // a warning, in amber (D-097)
  ratHurt: { text: 'The rat squeaks and holds its ground.', warn: false }, // the study's line, cut to fit (D-107)
  ratDie: { text: 'The rat squeaks and falls still.', warn: false }, // (D-112)
  ratBite: { text: 'The rat bites you.', warn: false }, // (D-117)
  fall: { text: 'You fall, and wake again.', warn: false }, // (D-119)
  torchLit: { text: 'You light the torch.', warn: false }, // (D-124)
  lanternDark: { text: 'Your lantern is dark.', warn: false }, // (D-124)
};
export const LINE_TURNS = 5; // turns a line stays before it fades (D-095)
const OIL_LOW = 0.2; // "under 20%", as in the study

// § say: (state, id) → new state, the line said on this turn
export const say = (state, id) => ({ ...state, line: { id, turn: state.turn } });

// § shown: the line on screen now, or null once its turns are used up
export const shownLine = (state) =>
  state.line && state.turn - state.line.turn < LINE_TURNS ? LINES[state.line.id] : null;

// § oil: a line only as the oil crosses a mark on the way down, so each is
// said once, and again only after the oil has gone back above it (D-096).
export function oilLine(before, after) {
  if (before > 0 && after === 0) return 'oilEmpty';
  if (before >= OIL_LOW && after < OIL_LOW) return 'oilLow';
  return null;
}
