// § journal: one book with tabs (D-262, D-270). Records is the first tab, and for
// now the only one; later tabs join the row. Plain data, no drawing.
export const TABS = [{ id: 'records', text: 'Records' }];

// § records: the Records tab's rows, a name and its value, from a profile's records
export const recordRows = (r) => [
  { text: 'Deepest', value: `depth ${r.deepest}` },
  { text: 'Beaten', value: String(r.beaten) },
  { text: 'Falls', value: String(r.falls) },
  { text: 'Rooms found', value: String(r.found) },
  { text: 'Steps', value: String(r.steps) },
  { text: 'Flasks poured', value: String(r.poured) },
];
// The words for the screen reader
export const journalWords = (r) => `Journal, Records tab. ${recordRows(r).map((row) => `${row.text}, ${row.value}`).join('. ')}. Back.`;
