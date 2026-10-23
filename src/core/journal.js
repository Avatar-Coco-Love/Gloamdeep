// § journal: one book with tabs (D-262, D-270). Records is the first tab, and for
// now the only one; later tabs join the row. Plain data, no drawing.
import { playedText } from './profile.js';

export const TABS = [{ id: 'records', text: 'Records' }];

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
