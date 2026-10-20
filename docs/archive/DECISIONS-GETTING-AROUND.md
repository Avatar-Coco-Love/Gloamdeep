# The getting-around decisions (D-194 to D-200)

Moved unchanged from `docs/DECISIONS.md` at step 47b (D-208), when it
neared 12 KB: steps 43 to 45 (stairs to find, the camera, side
openings), UI steps U1 and U2 (sideways, the dev drawer), and the
decision log's last move (D-196). These are still in force unless marked
superseded. Grep for an ID or topic; never read this whole.

---

**D-194 · 2026-10-20 · How dim the stairs are** (step 43, owner's
picks, answers Q-041) The stairs' glow shows only once the stairs tile
itself is remembered, then stays for good. It is half as bright as
before and reaches 1 tile, the stairs and a touch beside them. All
stairs, the crypt's too. A glow not yet found is no light, so it wakes
no rat; once found it counts as light as before (D-134). Dev Reveal
shows every glow (D-174).

**D-195 · 2026-10-20 · The camera, and bigger caves** (step 44, owner's
picks) In a room bigger than the screen the camera keeps the hero on the
middle tile and glides with each step; at the room's edges it stops, so
nothing beyond the room shows. One-screen rooms never move. The
generated caves (depth 3 down) grow to about 1.5 screens, 17 × 20 tiles;
the crypt rooms stay 11 × 13. Their chamber counts and open tiles grow
with the area (chambers 5 to 10, at least 107 open; burrows 119 to 138),
and no torch sits on the top row, where the hearts, depth and oil boxes
could hide it.

**D-196 · 2026-10-20 · The decision log makes room again** (step 45,
as D-188) D-177 to D-193 (the main menu, steps 52 to 58) moved unchanged
to `archive/DECISIONS-MENU.md`. They stay in force.

**D-197 · 2026-10-20 · The first side opening: a crypt room south**
(step 45, owner's picks) The gap in the first room's bottom wall is a
doorway into a new hand-made crypt room south of it, also at depth 1,
one screen (11 × 13), with its doorway at the top lining up. The seed
places its flask and rat (D-192). From a doorway tile, one more step out
puts the hero on the matching tile of the next room's facing edge. It
costs a turn like a step, says no line, and fades like the stairs (D-135).
Rats stay in their own room (D-132). The first cave now has 3 crypt rooms
(extends D-185).

**D-198 · 2026-10-20 · The top boxes move above the room** (step 45,
the owner's idea and picks; partly supersedes D-080) Nothing covers the
room any more. The hearts, depth and oil sit in a strip 15 game pixels
tall drawn on the game picture just above the room, dimmed with it under
a menu and empty on the title. Above that strip, one row holds the dev
wrench at the left and pause and the lantern at the right. On a wide
screen, when that gives a bigger picture, the row stands beside it: the
wrench at the top left, the lantern at the top right with pause under it.
(Changed in this PR: first the boxes turned faint over the hero, then
the owner moved them out of the room instead.)
*Partly superseded by D-199 (2026-10-20): the wide-screen layout.*

**D-199 · 2026-10-20 · Sideways, the room uses the sides** (UI step,
the owner's picks; changes the wide-screen part of D-198) When the
picture is bigger that way (a phone held sideways, a wide PC window),
the hearts, depth and oil stack in a column at the room's left, hearts
on top, then depth, then oil. The dev wrench stands left of the
picture's top, pause right of it, and the lantern at the bottom right,
under the thumb. The dev panel and the stats line keep to the space left
of the picture and never cover the room; the panel ends above the stats
line and scrolls. Upright nothing changes. Whether the room should fill
the whole screen sideways waits for a playtest (Q-048).
*Partly superseded by D-200 (2026-10-20): the dev panel's place.*

**D-200 · 2026-10-20 · The dev side drawer** (UI step 2, the owner's
picks; supersedes D-045's plain page text, D-087's grid of section
buttons, and D-199's panel placement) The wrench slides out a drawer
along the screen's left edge, from under the wrench down to the stats
line. Upright it covers the room's left part until closed. The sections
stand as a column of words at its left, the open one lit violet, and its
tools in one column beside them; tapping the open one folds it and the
drawer narrows to its tabs. Rows stay 44 px tall. Every dev word, the
stats line too, is in the game's pixel font at double size; the stats
line stays at the bottom left. When the drawer is short (sideways) the
tabs and tools scroll. D-093's colours stay.
