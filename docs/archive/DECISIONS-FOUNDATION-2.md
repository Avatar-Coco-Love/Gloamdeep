# Foundation decisions, part 2 (D-053 to D-069)

Moved unchanged from `docs/DECISIONS.md` at step 19 (D-103), when it neared
12 KB: steps 12 to 14 (light, fog of war, oil). These are still in force
unless marked superseded. Grep for an ID or topic; never read this whole.

---

## Steps 12 to 14

**D-053 · 2026-10-18 · Blended shadow edges** (step 12, the D-009 fix)
Option C from the side-by-side picture: light is still checked in 4 × 4
pixel cells, but each pixel mixes the four nearest cells, so a shadow
edge fades into the dithered bands over one cell. The bands stay as in
the study.

**D-054 · 2026-10-18 · Outside the light is almost black** (step 12)
Until fog of war (step 13), tiles the lantern doesn't reach get the
study's "never seen" darkness.

**D-056 · 2026-10-18 · The lantern in hand, with flicker** (step 12, ends
D-042's "lantern later")
The study's lantern pixels go back on the hero, and its flame is the
light's centre, with a bright core drawn over the darkness. The light
flickers by about ±3.5%, not at all with reduced motion.

**D-057 · 2026-10-18 · Dev switch: lighting off** (step 12, builds on D-047)
The wrench panel has a "Lighting off" switch, off at first, that shows
the whole room unlit. It is a dev tool, not the lantern switch (D-026).

**D-058 · 2026-10-18 · Walls are lit as whole tiles** (step 12, playtest)
The study's rule lit wall blocks one by one, so long walls seen at a
slant showed dark teeth. Now each wall block aims its ray at the wall
tile's point nearest the lantern, so a seen wall is lit as a whole tile,
still fading with distance. Floor shadows don't change.

**D-059 · 2026-10-18 · When a tile counts as seen** (step 13, ends D-054)
The study's rule, picked from a side-by-side picture: a tile is
remembered once the lantern's light reaches its centre, inside 95% of
the light's reach. It is checked when the hero stands still on a tile.
The memory is part of the game state, one mark per tile.

**D-060 · 2026-10-18 · Remembered tiles fade at the edge** (step 13)
*Partly superseded by D-063 (2026-10-18): the colours. The fading edge stays.*
Remembered tiles get the study's cold blue (0.15, 0.16, 0.26), and never
seen ones stay almost black. Where they meet, the blue fades into black
over 4 pixels in the dither pattern, like the shadow edges (D-053).

**D-061 · 2026-10-18 · Dev: Reveal room and Forget** (step 13, builds on
D-047)
The wrench panel gets a "Reveal room" switch, off at first, that shows
every tile as remembered while it is on, and keeps the real memory. A
"Forget" button wipes the memory.

**D-062 · 2026-10-18 · Reset room forgets too** (step 13, builds on D-050)
The dev "Reset room" button also gives a blank memory, as if you had
just arrived.

**D-063 · 2026-10-18 · Each place sets its darkness** (step 13, playtest;
supersedes the colours in D-060)
The owner found the fog too bright and its blue too much like
moonlight. Each place now sets how dark never-seen tiles are and how
remembered tiles look. The first room is a cave with no lights:
never-seen is pitch black, and remembered tiles get a neutral grey at
half the study's strength (0.095), picked from a picture. Other places
get their values when they arrive (Q-027).

**D-064 · 2026-10-18 · Oil amounts: the study's** (step 14, supersedes
D-055, sets D-037's amounts)
*Partly superseded by D-068 (2026-10-18): the burn per turn.*
*Partly superseded by D-142 (2026-10-18): the tank starts full.*
The tank starts three quarters full, and each passed turn burns 2.5% of
a full tank (40 turns from full to empty). The light reaches 1.6 tiles
plus 3.6 per full tank (5.2 when full), and an empty lantern is an
ember reaching 0.9 tiles. Bumping a wall passes no turn, so burns none.

**D-065 · 2026-10-18 · The oil bar** (step 14)
The study's 10 amber segments, drawn in pixels in the top right corner
of the game screen, always bright. A segment is lit while the oil is
above its share. Short oil messages come later (Q-028).

**D-066 · 2026-10-18 · Dev: Refill oil and Empty oil** (step 14, builds
on D-047)
Two wrench panel buttons give a full or an empty tank, with no turn
passed. "Reset room" leaves the oil as it is.

**D-067 · 2026-10-18 · The flask is its own step** (step 14, D-018)
Draining oil is a new rule and the flask is the first item, a new kind
in the registry, so they come in two steps: oil now, the flask next.

**D-069 · 2026-10-18 · A full tank lasts 60 turns** (step 14, playtest;
supersedes D-068)
80 turns felt too long, so the owner picked the middle: each passed
turn burns 1/60 of a full tank. The starting three quarters last 45.
