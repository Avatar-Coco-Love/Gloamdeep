# Pre-production decisions (D-001 to D-038)

Moved unchanged from `docs/DECISIONS.md` at step 8 (D-041), when it passed
12 KB. These are still in force unless marked superseded. `docs/DESIGN.md`
sums them up on one page. Grep for an ID or topic; never read this whole.

---

**D-001 · 2026-10-17 · The name is Gloamdeep**
"Gloam" is an old word for dusk: the cold blue half-light that seen-but-dark
places fade into. "Deep" is the descent. The working title "Lantern Below"
was dropped because it sounds too close to *Below* (Capybara Games, 2018),
which also has a lantern-fuel mechanic in a dark underground. The owner says
the name reminds them of playing Dungeon Siege as a kid.

**D-002 · 2026-10-17 · Genre**
In the owner's words: a "grid based, survival, action, turn-based, strategy"
tiny RPG.

**D-003 · 2026-10-17 · Platform and technology**
Designed primarily for phones, and also plays on PC in any browser. HTML,
CSS and JavaScript, with files on GitHub. No external assets: everything
exists in code.

**D-004 · 2026-10-17 · How we work**
Slower and in smaller chunks than the owner's other projects, with the owner
involved in every decision. Claude proposes and the owner decides. The rules
are in `CLAUDE.md`. *The pace part is superseded by D-018 (2026-10-17).*

**D-005 · 2026-10-17 · Art baseline: style study 1**
`reference/style-study-1.html` sets the look. The owner said: "That actually
looks really pretty and I love that so much! I really don't want to lose
that!" The rules taken from it are in `docs/ART-DIRECTION.md`. Which
features are must-keeps is still open (Q-002).

**D-006 · 2026-10-17 · Built-in dev tools from the start**
The game will have built-in "Dev Tools", including the ability to spawn any
item, enemy, NPC and so on. More options will be chosen together later. The
plan is in `docs/DEV-TOOLS.md`.

**D-007 · 2026-10-17 · ChatGPT's art pack is not a source**
An earlier ChatGPT art pack ("Lantern Below", 6 biomes, outside and inside)
is not part of this project. The only idea carried over is that there will
be biomes, each with outside and inside areas. That idea is still open
(Q-009).

**D-008 · 2026-10-17 · What we take from Dungeon Siege** (answers Q-001)
In the owner's words: "The going deeper and the feeling of exploring,
collecting loot, fighting new monsters, uncovering mysteries and lore. It
felt good to get stronger and slowly progress through the game, and see how
far I could get. There was a desire and curiosity to keep playing." These
threads feed the pillars (Q-003).

**D-009 · 2026-10-17 · Everything in style study 1 stays** (answers Q-002)
The owner chose to keep all of it: the lantern as real light with shadows,
the stepped and dithered light, fog of war, walls with brick faces, crisp
16-pixel tiles, the palette, and the small signs of life. Only the two weak
spots change: the rat sprite gets redrawn, and shadow edges get a little
smoother. Details are in `docs/ART-DIRECTION.md`.

**D-010 · 2026-10-17 · The game is hosted on GitHub Pages** (answers Q-011)
The owner renamed the repo to lowercase `gloamdeep` and turned GitHub Pages
on. The site is https://avatar-coco-love.github.io/gloamdeep/, served from
`main`, so whatever is merged is what is live. The game appears there once
an `index.html` exists (build plan step 7).

**D-011 · 2026-10-17 · No blue flash when tapping**
The owner noticed a blue flash on the screen every time they tap, and
doesn't like it. (It is the phone browser's tap highlight.) The game must
turn it off. The rule is in `docs/TECH.md`.

**D-012 · 2026-10-17 · The front page opens the style study for now**
The owner wanted the Pages link to lead somewhere playable while the game
is still early. Until build plan step 7, the site's `index.html` sends
visitors straight to `reference/style-study-1.html`. At step 7 the real
game takes over `index.html`.

**D-013 · 2026-10-17 · The four design pillars** (answers Q-003)
The owner approved four pillars, the drafted set as written: "The lantern
is your world", "Always one floor deeper", "Curiosity pays off" and
"Stronger, slowly". Every later idea is checked against them, and an idea
that serves none of them is cut. The full wording is in `docs/VISION.md`.

**D-014 · 2026-10-17 · Oil is light, and nothing else** (answers Q-004)
Oil only sets how far the lantern's light reaches. It is not a resource
for actions and not the run's health or clock. Oil-powered actions could
still come later as their own decision. The numbers in style study 1 are
still art-test values.

**D-015 · 2026-10-17 · Running out of oil, and the lantern's place** (answers Q-005)
When the oil runs out, the light shrinks to a small ember and enemies grow
bolder. It does not end the run: there is always a chance to find more
oil. The owner added:
- There are other light sources in the game besides the lantern.
- Outside during the day, the lantern isn't needed.
- The player can switch the lantern on and off at will.
- Some places are darker than others, and some are brighter.
Open details: Q-014 (other light sources), Q-015 (day outside), Q-016
(the lantern switched off).

**D-016 · 2026-10-17 · Turns happen only when you act** (answers Q-006)
Classic roguelike turns: nothing moves until the player steps or acts, so
there is always time to think.

**D-017 · 2026-10-17 · How fighting works** (answers Q-007)
Walking into an enemy attacks it. On top of that the owner wants abilities
that work at range, different kinds of weapons, and different area attack
shapes (attacks that hit a group of tiles, such as a line or a ring).
Which ones, and when, is Q-017.

**D-018 · 2026-10-17 · A faster working pace** (supersedes the pace in D-004)
The owner wants to move a little faster. One PR may now settle several
small decisions. Questions are asked as multiple choice, with a
recommendation, more than one pick allowed where options combine, and
always room for the owner's own answer. Visible changes still come one
small step at a time. The rules are in `CLAUDE.md`.

**D-019 · 2026-10-17 · A persistent journey, with portals into the deep** (answers Q-008)
The game is one persistent journey, like Dungeon Siege, not a series of
fresh runs. The main world is generated once per save from a seed (a
number that sets the randomness) and then stays the same, with hand-made
landmarks such as the home base and story places placed in it. Portals
lead into very deep areas that are generated anew on each visit; these
dives play like a roguelite run.

**D-020 · 2026-10-17 · What happens when you die**
In the main world: you wake at your home base or last camp, keeping
levels, unlocks and lore. What you were carrying stays where you fell, and
you can go back for it. In a portal depth: you are thrown back out, and
lose what you found on that dive, but keep levels, unlocks and lore.

**D-021 · 2026-10-17 · What you keep as you go**
Lore and discoveries, unlocks, a home base improved over time, character
levels, shortcuts you open (doors, ropes, passes), the explored map (shown
dimly), a stash chest at home, and a record of the deepest depth reached.
The owner asked Claude to suggest extras; the last four were the
suggestions they approved.

**D-022 · 2026-10-17 · How outside and inside connect** (answers Q-009)
Both: the journey starts on the surface and goes down, biome by biome, and
inside and outside also alternate. A cave can open into a secret valley,
or be a path through a mountain that comes out the other side. Which
biomes, and in what order, is Q-018.

**D-023 · 2026-10-17 · Solo, with one companion later** (answers Q-010)
You start alone. One companion can join later. What kind is Q-019.

**D-024 · 2026-10-17 · Other light sources** (answers Q-014)
All four kinds: wall torches and braziers (some already lit, some the
player can light, and lit ones stay lit), glowing life (mushrooms, moss,
crystals, creatures), light the player can carry or throw ahead, and
shafts of daylight through cracks in cave ceilings.

**D-025 · 2026-10-17 · Day and night pass with your turns** (answers Q-015)
Time moves only as the player takes turns. Outside at night the lantern is
needed; outside during the day it isn't.

**D-026 · 2026-10-17 · Reasons to switch the lantern off** (answers Q-016)
All four: no oil burns while it is off; enemies notice you less in the
dark; some things can only be seen with the lantern off (faint glowing
marks, hidden paths); and some creatures are drawn to or angered by light
and stay calm in the dark.

**D-027 · 2026-10-17 · How weapons and abilities arrive** (answers Q-017)
You start with one close-up weapon, and ranged abilities and area attacks
unlock as you grow stronger. Each weapon kind has its own attack shape
(for example a spear reaching two tiles in a line). Abilities are also
learned skills of their own, kept and usable with any weapon.

**D-028 · 2026-10-17 · The four biomes, top to bottom** (answers Q-018)
Woods and mountains on the surface, then old mines and caves, then glowing
fungal caverns, then sunken ruins at the bottom, where the mysteries and
lore come together. Where portals appear and what the depths look like is
Q-020.

**D-030 · 2026-10-17 · Dev mode: `?dev`, and it ships** (answers Q-012)
*Superseded by D-086 (2026-10-18): dev tools are on for everyone, no `?dev`.*
Adding `?dev` to the address opens dev mode. It is in the public build,
hidden unless opened, so the owner can test on GitHub Pages.

**D-031 · 2026-10-17 · A pixel font drawn in code** (answers Q-013)
All game text uses a small pixel font drawn in code, matching the crisp
16-pixel look. No font files.

**D-032 · 2026-10-17 · Portals and the depths** (answers Q-020)
Each biome has one or more portals, so dives open up early and grow harder
further down. A depth is a darker, stranger, twisted version of the biome
its portal sits in, with the same kinds of tiles and creatures, warped,
and rarer loot.

**D-034 · 2026-10-17 · The companion is a faery** (supersedes D-029, D-033)
The owner swapped the dog for a faery friend. It speaks, gives
information and holds conversations. It is not bound to the grid: it
flies freely around the hero and flies toward things when there is a
reason to. You rescue it in the first cave, and it follows you from then
on. It has only a faint glow, so it can be seen in the dark but the
lantern stays the real light. It speaks up on its own (hints, warnings,
remarks on lore and new monsters), and you can tap it to ask about
topics. All of it is written dialogue that works offline. It never
fights; it guides.

**D-035 · 2026-10-17 · The design brief is approved**
The owner approved `docs/DESIGN.md` by merging PR #8. It is the one-page
summary of the game and is kept in step with this log.

**D-036 · 2026-10-17 · The hero is a lamplighter** (answers Q-022)
The hero's trade is tending lights. Why they go down is a combination,
revealed slowly: the gloam is spreading up from below and lights are
failing, there are tales of treasure and secrets, and something calls from
below. In the owner's words, "not everything is revealed early, and some
things must be uncovered."

**D-037 · 2026-10-17 · Oil burns per turn while lit** (answers Q-023)
Every turn with the lantern on burns a little oil, even standing still.
With it off, nothing burns (D-026). Amounts are still to be tuned.

**D-038 · 2026-10-17 · How you get stronger** (answers Q-024)
All four ways: levels from experience (fighting and discovering), gear
and loot, home base upgrades, and small lasting boosts from uncovering
lore and secrets. Growth is slow, per pillar 4.
