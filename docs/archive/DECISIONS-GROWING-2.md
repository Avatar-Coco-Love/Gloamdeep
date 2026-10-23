# Built to grow, part 2 (D-270 to D-278)

Moved unchanged from `docs/DECISIONS.md` at 0.2.71 (D-279), when it
reached 12 KB: the Journal and its Records, the slot screen, the name
pad, rename, and a profile's look: the cloak, the eyes, the lantern's
trim and the clothes (steps J1 and P1 to P6). These are still in force
unless marked superseded. Grep for an ID or topic; never read this whole.

**D-270 · 2026-10-23 · The Journal and its Records** (J1, owner's picks;
builds D-262) Journal is a line on the title, under New journey, and on
the pause menu, under Resume. Its page shows a tab row with its one tab,
Records, open; later tabs join the row. Records shows the deepest depth,
creatures beaten, falls and rooms found, counted from each turn's events
(D-267) on all the profile's journeys, from 0 for the counts. As for the
deepest depth, a journey with a dev jump doesn't count (D-232; Claude's
call, may change). Only Back can be picked for now.

**D-271 · 2026-10-23 · The slot screen** (P1, owner's picks; answers
Q-051) The game opens on the slot screen, Profiles: a framed box for each
of the 3 slots with the profile's name and "Deepest" and its depth, or
Empty (mock-up B). An unnamed profile shows as Profile 1, 2 or 3. Picking
a box plays as that profile and opens the title; an empty slot gets a
new, unnamed profile. Delete, then a box, asks "Delete …? Lost for
good." with Yes and No, No picked, and takes its journey too. A Profiles
line on the title, after Settings, opens the slot screen again, with
Back. The hero's look and play time in the box come later (the owner's
wish). Claude's words, may change: "Delete which?" while deleting, and
Cancel in place of Delete.

**D-272 · 2026-10-23 · The name pad, and changing a profile later** (P2,
owner's picks; answers Q-053; builds D-268) Picking an Empty box opens a
name pad, dark like the slot screen, drawn as the seed pad is (D-191):
the heading "Name your profile", the letters typed with a cursor, then
A to Z seven to a row, Del and OK. Keys are tapped, clicked, walked with
the arrows, or typed on a keyboard (letters and Backspace; the flame then
moves to OK). A name holds only the letters A to Z, up to 12, kept in
capitals; a space and digits wait (Q-054). OK makes the profile and opens
the title. Claude's calls, may change: OK with nothing typed makes it
unnamed (Profile 2), and Esc goes back to the slot screen with nothing
made. A profile's name and look may change later, from the slot screen
(a Rename line next to Delete; the look the same way once it exists).

**D-273 · 2026-10-23 · Rename** (P2b, owner's picks; builds D-272) The
slot screen has Rename above Delete, each on its own line, then Back.
Rename, then a profile's box, opens the name pad with the heading
"Rename profile" and its name already typed. OK keeps the new name and
goes back to the slot screen; OK with nothing typed makes it unnamed
again (Profile 1); Esc keeps the old name. An Empty box can't be renamed.
While picking, the heading asks "Rename which?" and Rename reads Cancel,
as Delete does. Claude's call, may change: a tap between two lines picks
the nearer one.

**D-274 · 2026-10-23 · Built to grow's first decisions are archived**
(owner's pick, as D-265) D-261 to D-269 moved unchanged to
`archive/DECISIONS-GROWING-1.md`. They stay in force.

**D-275 · 2026-10-23 · The cloak** (P3, owner's picks from a mock-up;
builds D-268) A profile's cloak comes in six colours, teal (the study's,
first), moss, heather, rust, indigo and sand, each four shades in
`src/core/looks.js`; ash, crimson, gold and violet are kept out, as they
fade into the crypt or look like enemies, the lantern or stairs. A new
profile picks its cloak after its name, on Choose a cloak: the six
heroes 2× on lit crypt floor, three to a row, the picked one framed in
gold, then OK and Back. OK makes the profile and opens the title; Back
returns to the name pad with the name kept. Look, between Rename and
Delete on the slot screen, then a box, opens the same screen on its
cloak; OK keeps the new one, Back or Esc the old. Profiles made before
wear teal; their look was already kept, so the save's shape needs no
upgrade. Claude's calls, may change: the heading words, "Change whose
look?" while picking, a new profile starting on teal, and Enter on a
hero moving the flame to OK.

**D-276 · 2026-10-23 · The eyes** (P4, owner's picks from a mock-up;
builds D-268) A profile's eyes come in six colours, bone (the study's,
first), ice, moss, sky, silver and brown, in `src/core/looks.js`;
pink-red, gold, violet and black are kept out, as they look like enemies,
the lantern or stairs, or vanish in the hood. A new profile picks its eyes
after its cloak, on Choose your eyes: the cloak screen's shape, each box
the hero's head at 4× in the cloak just picked. OK makes the profile; Back
returns to the cloak with both choices kept. Look opens the cloak, then
the eyes; OK on the eyes keeps both, and Esc there keeps the old look.
Profiles made before keep bone eyes. Claude's calls, may change: the
heading words, the cloak screen's heroes wearing the eyes picked, Back on
the eyes putting the flame on the cloak screen's OK, and Esc on a new
profile's eyes going back to the cloak.

**D-277 · 2026-10-23 · The lantern's trim** (P5, owner's picks from a
mock-up; builds D-268) The trim is the lantern's cap and base, the two
pixels that were brass; the black outline, the flame and its light stay
the same for everyone. Six trims, each a light cap and a dark base shade
in `src/core/looks.js`: brass (the study's, first), iron, copper, silver,
verdigris and blackened; gold, red and violet are kept out, as they look
like the flame, enemies or stairs, and bronze was left out. A new profile
picks its trim after its eyes, on Choose a trim: the cloak screen's shape,
each box the lantern hand close up in the cloak and eyes just picked. OK
makes the profile; Back returns to the eyes with the choices kept. Look
opens the cloak, the eyes, then the trim; OK on the trim keeps all three,
and Esc there keeps the old look. Profiles made before keep brass.
Claude's calls, may change: the shades, the heading words, the close-up
at 5×, the cloak screen's heroes carrying the trim picked, and Esc on a
new profile's trim going back to the eyes.

**D-278 · 2026-10-23 · The clothes** (P6, owner's picks from a mock-up;
builds D-268) The clothing type is the shape of what the hero wears; its
colours stay the cloak's. Four, in `src/core/looks.js`: Cloak (the study's,
hem to the floor, first), Belted (a belt at the waist, the trim's base
with its cap as the buckle), Short (to the knee, dark legs and boots
below) and Tattered (the hem torn into rags); Mantle and Strap were left
out. A new profile picks its clothes after its trim, on Choose your
clothes: the cloak screen's shape with its four heroes two to a row, in
the cloak, eyes and trim just picked. OK makes the profile; Back returns
to the trim. Look opens the cloak, eyes, trim, then clothes; OK on the
clothes keeps all four. Profiles made before wear the Cloak. Claude's
calls, may change: the pixels, the names, the heading words, the other
screens' heroes wearing the clothes picked, and a bite's flash keeping
their shape.
