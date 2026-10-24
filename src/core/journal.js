// § journal: one book with tabs (D-262, D-270). Records is the first tab, Growth
// the second (D-293); later tabs join the row. Plain data, no drawing.
import { playedText } from './profile.js';
import { embers, canAddHeart, HEART_COST, HEARTS_MORE } from './growth.js';
import { maxHealth, HERO_HEALTH } from './turn.js';

export const TABS = [{ id: 'records', text: 'Records' }, { id: 'growth', text: 'Growth' }];

// § records: the Records tab's rows, a name and its value, from a profile's records and its
// play time in seconds, written as in its Profiles box (D-290, D-291)
export const recordRows = (r, played = 0) => [
  { text: 'Deepest', value: `depth ${r.deepest}` },
  { text: 'Beaten', value: String(r.beaten) },
  { text: 'Falls', value: String(r.falls) },
  { text: 'Rooms found', value: String(r.found) },
  { text: 'Steps', value: String(r.steps) },
  { text: 'Flasks poured', value: String(r.poured) },
  { text: 'Torches lit', value: String(r.torches) },
  { text: 'Time played', value: playedText(played) },
];
// The words for the screen reader
export const journalWords = (r, played = 0) => `Journal, Records tab. ${recordRows(r, played).map((row) => `${row.text}, ${row.value}`).join('. ')}. Back.`;

// § growth: the Growth tab's rows, from the journey (D-293): the embers left and
// the hearts in all; then Add a heart, picked to spend an ember on one more
export const growthRows = (state) => [
  { text: 'Embers', value: String(embers(state)) },
  { text: 'Hearts', value: `${maxHealth(state)} of ${HERO_HEALTH + HEARTS_MORE}` },
];
export const ADD_HEART = { text: 'Add a heart', cost: `${HEART_COST} ember` };
export const growthWords = (state) => `Journal, Growth tab. ${growthRows(state).map((row) => `${row.text}, ${row.value}`).join('. ')}. ${ADD_HEART.text}, ${ADD_HEART.cost}${canAddHeart(state) ? '' : ', not now'}. Back.`;
