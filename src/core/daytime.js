// § daytime: the time of day under the sky, from the turns passed (D-025,
// D-217). Plain data, no drawing. A day is 300 turns from morning: 170 of
// full day, a 30-turn dusk, 70 of night, a 30-turn dawn. Time passes below
// ground too; only rooms under the sky show it.
export const DAY_TURNS = 300;
const DUSK = 170, NIGHT = 200, DAWN = 270, FADE = 30;
// Night's remembered tiles: the study's cold blue, as moonlight (D-060, Q-027)
export const MOONLIT = [0.15, 0.16, 0.26];

// § daylight: (turn) → how much daylight there is, 1 by day, 0 at night
export function daylight(turn) {
  const t = turn % DAY_TURNS;
  if (t < DUSK) return 1;
  if (t < NIGHT) return 1 - (t - DUSK) / FADE;
  if (t < DAWN) return 0;
  return (t - DAWN) / FADE;
}

// § day: true while daylight lights the whole room the hero is in: under the
// sky, until halfway through dusk and from halfway through dawn
export const inDaylight = (state) => !!state.room.dark.sky && daylight(state.turn) >= 0.5;

// § darkness now: the room's darkness (D-063); under the sky, it moves between
// plain daylight and a moonlit night, never-seen tiles black
export function darkNow(room, turn) {
  if (!room.dark.sky) return room.dark;
  const k = daylight(turn), mix = (a) => a + (1 - a) * k;
  return { unseen: [k, k, k], remembered: MOONLIT.map(mix) };
}

// § pass time: the dev +10 and +50 buttons move the clock only; no oil burns
// and nothing else moves (D-217)
export const passTime = (state, turns) => ({ ...state, turn: state.turn + turns });
