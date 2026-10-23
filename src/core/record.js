// § record: the deepest depth the hero has walked to, kept for good in the
// profile (D-021, D-232, D-268). Dev jumps don't count: once Go to depth is used, the
// journey stops counting until a New journey. Plain data, no drawing.

// The record after a turn: the depth now, if it is deeper and was walked to
export const deeper = (record, depth, jumped = false) => (!jumped && depth > record ? depth : record);
// The record's line, or null while the hero has not gone below the surface; off the title
// screen since D-260, kept for a stats page later
export const recordText = (record) => (record > 0 ? `Deepest: depth ${record}` : null);
