# Decisions

Every settled decision, oldest first. IDs are permanent. To change a
decision, add a new one that supersedes it and mark the old one (see
`CLAUDE.md`, "Keeping track"). Superseded entries move to
`archive/DECISIONS-SUPERSEDED.md` once this file passes 12 KB.

Format: `D-xxx · date · title`, then the decision and, where useful, why.

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
are in `CLAUDE.md`.

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
