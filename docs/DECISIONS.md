# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.
Older decisions are archived but still in force; grep there for an ID or
topic. **D-001 to D-038** (pre-production) are in
`archive/DECISIONS-PREPRODUCTION.md` (D-041). **D-039 to D-052**
(steps 7 to 11) and **D-070 to D-076** (the docs audit) are in
`archive/DECISIONS-FOUNDATION-1.md` (D-083). **D-053 to D-069** (steps 12
to 14) are in `archive/DECISIONS-FOUNDATION-2.md` (D-103).

Format: `D-xxx · date · title`, then the decision and, where useful, why.

---

**D-077 · 2026-10-18 · The oil flask, the first item** (step 15, D-067)
Items get their own registry file (`items.js`). The flask is the
study's sprite on a shadow, bobbing 1 pixel every 0.7 s.

**D-078 · 2026-10-18 · A flask gives 45% of a tank** (step 15)
The study's amount. Walking onto a flask burns the step, then pours it
in and it is gone, even with a full lantern (the extra is lost).

**D-079 · 2026-10-18 · Flasks come from the dev spawn list** (step 15,
builds on D-049)
"Oil flask" joins the list: on floor only, never on the hero or another
item, and no wall over it. The room starts with none; "Reset room"
clears them. The coordinates readout names an item on the pointed tile.

**D-080 · 2026-10-18 · The lantern switch: a button and L** (step 16,
builds on D-015)
A 44 px button with the hero's lantern pixels sits next to the oil bar,
just outside the game picture (above it on a tall screen, beside it on a
wide one, just under it when neither fits). A tap or click switches the
lantern, and so does the L key. Its flame is lit when on and dark when off.

**D-081 · 2026-10-18 · Switching is free** (step 16)
Switching on or off passes no turn and burns no oil. To look at again
when enemies arrive. Steps with the lantern off still pass turns, but
burn no oil (D-026, D-037); a flask still pours in.

**D-082 · 2026-10-18 · Off is pitch dark, memory only** (step 16)
No light at all and no bright flame core. Remembered tiles keep their dim
grey, and the hero shows only as dimly as the tile under them, so on
never-seen tiles they can't be seen at all. Nothing new is remembered
until the lantern is back on. (Tried after the playtest and dropped: a
faint outline of the hero at 22%, then 8%. It didn't work.)

**D-083 · 2026-10-18 · The decision log makes room** (step 16, as D-041)
D-039 to D-052 (steps 7 to 11) and D-070 to D-076 (the docs audit, which
`CLAUDE.md` repeats) moved unchanged to
`archive/DECISIONS-FOUNDATION-1.md`. They stay in force.

**D-084 · 2026-10-18 · Waiting a turn** (step 17, answers Q-029)
The hero can stand still for one turn. A wait passes a turn like a step:
oil burns while the lantern is lit, and none while it is off (D-037,
D-081). Nothing new is drawn for it; only the oil bar shows it.

**D-085 · 2026-10-18 · How to wait** (step 17)
A tap or click on the hero's own tile waits one turn; a finger held on
the hero does nothing. On a keyboard, Space waits, and holding it keeps
waiting, the way held arrows keep walking; one wait can queue behind a
step (D-043). Space on a focused button still presses that button.

**D-086 · 2026-10-18 · Dev tools are on for everyone** (0.1.13,
supersedes D-030 and parts of D-045 and D-047)
The wrench and the stats line show on every build, for every player:
GitHub Pages, playtests and local. No `?dev`, and `?dev=off` does nothing.
The switches are still remembered per browser. Clutter on screen is fine
when it helps make the game better.

**D-087 · 2026-10-18 · The dev panel has sections** (0.1.13)
View, Spawn, Room, Oil and Share. Their buttons sit in a fixed 3 + 2
grid at the top, and the open section shows below, so nothing moves
under the finger. One is open at a time; tap it again to fold it. The
browser remembers it, and View is open at first. (Changed after the
playtest: folding headings, any number open → one open → fixed buttons.) Switches are buttons, lit when on, and buttons sit two to a row.
A new tool adds a section (`src/dev/panel.js`).

**D-088 · 2026-10-18 · A live stats line** (0.1.13, supersedes part of
D-046)
The bottom-left readout always shows the turn, the oil in %, lit or
dark, and the hero's tile. A second line shows the spawn pick and, with
Coords on, the pointed tile. It grows as enemies and floors arrive.

**D-089 · 2026-10-18 · Spawn chips by kind** (0.1.13, supersedes part
of D-049)
Each registry entry is a chip, grouped under its kind (tiles, items,
later enemies and NPCs). Tap a chip to pick it, tap it again to drop
the pick. There is no None entry.

**D-090 · 2026-10-18 · Dev keys on a PC** (0.1.13, supersedes part of
D-045)
` opens or shuts the panel; G, C and R switch Grid, Coords and Reveal.
The key shows on each switch.

**D-091 · 2026-10-18 · Set oil to any amount** (0.1.13, builds on D-066)
The Oil section has a slider from 0 to 100% beside Refill and Empty. It
follows the real oil and passes no turn.

**D-092 · 2026-10-18 · Main syncs itself at the start** (0.1.13, builds
on D-070)
A start-up hook (`.claude/settings.json`) fetches `main` and
fast-forwards it when a conversation starts, so the stale-copy notice
stops. It never discards work.

**D-093 · 2026-10-18 · The dev panel's colours** (0.1.13, owner's request)
Colours from the game's palette: violet section buttons (the colour for
unusual things), a stone-grey tray for the open section's tools, lantern
gold for a switch or chip that is on, and a soft red for buttons that
undo (Reset room, Forget, Empty). Keys show as small key caps; the stats
line sits on a dark strip.

**D-094 · 2026-10-18 · The text line** (step 18, answers Q-028)
Game text shows on one line in a strip under the room, so no tile is
ever covered; the picture grows to 176 × 221. The letters are the pixel
font (D-031), 7 pixels tall with 2 below for g, j, p, q, y, centred.

**D-095 · 2026-10-18 · How long a line stays** (step 18)
A line stays 5 turns (steps or waits), then fades in about half a
second; with reduced motion it just goes. A new line replaces it at
once.

**D-096 · 2026-10-18 · The oil lines** (step 18, answers Q-028)
"The flame is getting low." as the oil drops under 20%, and "The
lantern gutters to an ember." as it runs dry (style study 1's words).
Each is said once, as the oil crosses its mark on the way down, and
again only after the oil has gone back above it. A flask found on the
same step counts first.

**D-097 · 2026-10-18 · Text colours** (step 18)
Ordinary lines use the study's muted grey (`#9790a4`); warnings, like
the lantern guttering, use the oil bar's amber (`#ffc65c`).

**D-098 · 2026-10-18 · Torches, the first light kind** (step 19, D-024)
Light sources are their own kind in the registry, with their own list in
the game state, like items. A light sits on a tile; the registry gives
its colour, reach and flicker. The torch is the study's: orange (1.2,
0.78, 0.42), a reach of 3 tiles, flickering about ±9%. Other light
sources (braziers, glowing life…) join this list in later steps.

**D-099 · 2026-10-18 · A torch picks its look from where it sits** (step 19)
On a wall with its brick face showing, it hangs on the face as in the
study. Otherwise it goes on a wall side that has open ground next to it:
a short iron arm out from the wall's edge, the same flame on top (owner
approved the picture). The order is fixed: face, then left, then right.
Other mounts (on the floor, standing) come later.

**D-100 · 2026-10-18 · No torch where it can't sit** (step 19)
The dev spawn tool places no torch on floor, inside solid wall, or on a
tile that already has a light, as a wall can't go on the hero (D-049).

**D-101 · 2026-10-18 · The first room's torches, and what they show**
(step 19) The study's three: the top wall at 2,0 and the middle block at
4,4, and the top-right one moved from 8,0 to 7,0 so the oil bar doesn't
cover it. Their light shows wherever it falls, also with the lantern
off; only the lantern adds tiles to memory (D-059). The full study look:
bracket, a 3-frame swaying flame and rising embers, always bright;
"reduce motion" stops the sway, flicker and embers. The room keeps its
darkness values (D-063).

**D-102 · 2026-10-18 · Tile edits around a torch** (step 19)
When a dev spawn changes the tiles around a torch, it picks its look
again (D-099). A change that would leave it nowhere to sit, a floor on
its own wall included, is refused. "Reset room" brings the starting
torches back and removes spawned ones.

**D-103 · 2026-10-18 · The decision log makes room again** (step 19, as
D-083) D-053 to D-069 (steps 12 to 14) moved unchanged to
`archive/DECISIONS-FOUNDATION-2.md`. They stay in force.
