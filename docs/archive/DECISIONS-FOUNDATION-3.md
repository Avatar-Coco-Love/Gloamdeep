# Foundation decisions, part 3 (D-077 to D-093)

Moved unchanged from `docs/DECISIONS.md` at step 22 (D-120), when it neared
12 KB: steps 15 to 17 (the flask, the lantern switch, waiting) and the
0.1.13 dev tools. These are still in force unless marked superseded. Grep
for an ID or topic; never read this whole.

---

## Steps 15 to 17, and the 0.1.13 dev tools

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
*Partly superseded by D-198 (2026-10-20): the button sits in the
buttons' row above the picture, with pause and the dev wrench.*
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
