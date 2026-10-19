# Progress log archive

Entries moved out of `docs/PROGRESS.md`, newest first.

## Build plan: pre-production and foundation (steps 1 to 30, done)

Moved from `PROGRESS.md` at 0.1.27, when stage 0.2 was planned (D-159).

Pre-production (0.0.x): decisions only
- [x] 1 Inspirations and must-keeps (Q-001, Q-002), PRs #1 and #2
- [x] 2 Design pillars approved (Q-003), PR #3
- [x] 3 The lantern and oil rule (Q-004, Q-005), PR #4
- [x] 4 Turns, movement and bumping (Q-006, Q-007), PR #4
- [x] 5 Shape of a run (Q-008, Q-009, Q-010), PR #5
- [x] 6 One-page design brief (`docs/DESIGN.md`) from steps 1 to 5, approved, PRs #8 and #9

Foundation (0.1.x): one small visible thing per step
- [x] 7 Page (replaces the `index.html` that opens the study, D-012), canvas and pixel-perfect scaling, one floor tile on screen, PR #10
- [x] 8 A room built from data: floor and walls with brick faces, PR #11
- [x] 9 The hero drawn, moving one tile per tap or key, PR #12
- [x] 10 Dev mode switch, plus a first tool (grid and coordinates overlay), PR #13
- [x] 11 Content registry, plus a dev spawn tool for what exists so far, PR #14
- [x] 12 Lantern light with shadows, PR #15
- [x] 13 Fog of war (seen tiles stay dimly visible), PR #16
- [x] 14 Oil drains per step, with the oil bar (D-067 split off the flask), PR #17
- [x] 15 Oil flask pickup, the first item, 0.1.10
- [x] 16 Lantern on/off switch, 0.1.11
- [x] 17 Wait a turn, 0.1.12
- [x] Dev tools for everyone, a tidier panel, 0.1.13 (between steps)
- [x] 18 A text line, 0.1.14
- [x] 19 Torches, 0.1.15
- [x] 20 The first enemy, a rat that holds its ground, 0.1.16
- [x] 21 Fighting the rat: two lantern hits kill it, 0.1.17
- [x] 22 The rat fights back: bites, hearts and falling, 0.1.18
- [x] 23 Lighting an unlit torch, 0.1.19
- [x] 24 The rat moves: it notices in light and chases, 0.1.20
- [x] 25 Stairs and a second room, 0.1.21
- [x] 26 A flask and a rat in the second room, 0.1.22
- [x] 27 A depth counter and an endless way down, 0.1.23
- [x] 28 The first generated room, 0.1.24
- [x] 29 Rougher caves, the rat in remembered dark, 0.1.25
- [x] 30 Healing herbs, rats that notice and turn, 0.1.26

## Log entries

- **2026-10-18, 0.1.24, the first generated rooms.** Below the second
  room every depth is made from the game's seed: 2 to 4 rough caves
  joined by gaps, a torch by the stairs up, a flask and a rat guarding
  it in the dark. A depth stays as left; a fall rolls a new seed and new
  depths, their maps forgotten. Seed in the dev stats (D-147 to D-151).
  Playtest: https://claude.ai/artifact/LNhmWcYaTRaey4TR9TDwkq
- **2026-10-18, 0.1.23, a depth counter and an endless way down.**
  "DEPTH 1" in a box at the top middle. The second room's stairs down
  at 1,11 lead to a fresh copy of it at depth 3, and so on forever; each
  depth stays as left, a fall resets them all, maps kept (D-144 to
  D-146). Playtest:
  https://claude.ai/artifact/TNgfvgptV1a4Mv3YreMPFb
- **2026-10-18, 0.1.22, a flask and a rat in room 2.** The second
  room's lower cave holds an oil flask at 9,11, guarded by a rat at
  7,10; rooms can start with items. After the playtest: a flask in room
  1 (9,2), a torch by room 2's stairs up, a full tank at the start, and
  stairs that sink into the wall beside them (D-138 to D-143). Playtest:
  https://claude.ai/artifact/TPAxhRK7dncVomJ12ZwVT5
- **2026-10-18, 0.1.21, stairs and a second room.** Stairs down at 1,1
  (the study's) lead to a second room, two empty caves and a gap; you
  arrive on stairs up and can go back. Rooms stay as left; rats don't
  follow or bite as you go; a fall wakes you in room 1, both reset. A
  faint violet glow, a fade and a line (D-130 to D-137). Playtest:
  https://claude.ai/artifact/Xr6TssVDe39zh1AFjck47z
- **2026-10-18, 0.1.20, the rat moves.** A rat on a lit tile (lantern
  or torch) notices the hero and keeps coming until it dies or they
  fall: one tile a turn, the farther way first, else the other way,
  else it waits; no going around walls. It slides like the hero, and
  one that steps next to the hero bites a turn later (D-126 to D-129,
  Q-031 and Q-032 opened). Playtest:
  https://claude.ai/artifact/Uq4RbG9JV7S1S5nhkShLMU
- **2026-10-18, 0.1.19, an unlit torch.** A fourth torch, unlit, hangs
  on the small block at 7,9, a charred stub near the start. Walking into
  its wall from below with the lantern lit lights it for good: "You light
  the torch.", one turn. With the lantern off the hero bumps and hears
  "Your lantern is dark." A fall or reset puts it back unlit; the spawn
  tool has unlit torches (D-121 to D-125). Playtest:
  https://claude.ai/artifact/SFtxL1voF3Fc6D9NfQ1oRX
- **2026-10-18, 0.1.18, the rat fights back.** After each passed turn a
  rat next to the hero bites for 1, lit or dark, and stays put. The hero
  has 5 health as pixel hearts top left; a bite flashes them red, shakes
  the room and says "The rat bites you." (it beats other lines). At 0
  they fall and wake at the start: room as it began, full health, 75%
  oil, map kept (D-114 to D-120, Q-030 closed). Playtest:
  https://claude.ai/artifact/5iy2XRbjCkvWkQWRjmWEDU
- **2026-10-18, 0.1.17, fighting the rat.** Walking into the rat swings
  the lantern: the first hit says "The rat squeaks and holds its
  ground.", the second kills it with "The rat squeaks and falls still."
  and it flashes and is gone. A hit passes a turn and burns oil. It
  doesn't fight back yet (D-109 to D-113, Q-030 narrowed). Playtest:
  https://claude.ai/artifact/NBwf6Tqa3gJRmuuKRtLErp
- **2026-10-18, 0.1.16, the rat.** The first enemy, redrawn from the
  study's rat (option A), sits at 2,10 and bobs. Walking into it flashes
  it white, shakes the room a pixel and says "The rat squeaks and holds
  its ground."; no turn passes. It shows only in real light, never in
  memory. Spawn has an Enemies group (D-104 to D-108, Q-030 opened).
  Playtest: https://claude.ai/artifact/DSjdcNS3Emo2XoRgRVpgWV
- **2026-10-18, 0.1.15, torches.** Three wall torches in the first
  room, as in the study (the top-right one a tile left, clear of the oil
  bar): orange light that flickers, a swaying flame and rising embers,
  shown even with the lantern off. Lights are their own registry kind;
  a torch takes the look of where it sits, a brick face or a wall side
  (D-098 to D-103). Playtest:
  https://claude.ai/artifact/TTjokfKEau23XoE6QBvsip
- **2026-10-18, 0.1.14, the text line.** A strip under the room where
  the game speaks, in a pixel font drawn in code. "The flame is getting
  low." as the oil drops under 20%, "The lantern gutters to an ember."
  in amber as it runs dry; each once per crossing. A line stays 5
  turns, then fades (D-094 to D-097, Q-028 closed). Playtest:
  https://claude.ai/artifact/T2zbFW9vJsdr6RyDRmM1hg
- **2026-10-18, 0.1.13, dev tools for everyone.** The wrench and a
  stats line (turn, oil %, lit, hero tile) show on every build. The
  panel has View, Spawn, Room, Oil and Share buttons, one open below; spawn entries are
  chips by kind; an oil slider; PC keys ` G C R. A start-up hook syncs
  `main` (D-086 to D-093). Playtest:
  https://claude.ai/artifact/Ws3G6Ya6NXtCob5cbvnHHw
- **2026-10-18, 0.1.12, wait a turn.** Tap or click the hero, or press
  Space (hold it to keep waiting), and the hero stands still for a
  turn. Oil burns as for a step while the lantern is lit. Only the oil
  bar shows it. A finger held on the hero does nothing (D-084, D-085,
  Q-029 closed). Playtest:
  https://claude.ai/artifact/8XGRMyr6qHVeyipi2DWBPd
- **2026-10-18, 0.1.11, the lantern switch.** A lantern button next to
  the oil bar, or the L key, switches the lantern off and on, for free.
  Off, no oil burns and the room is pitch dark except the remembered
  tiles (D-080 to D-082). A faint outline for the hero was tried and
  dropped. Older decisions moved to an archive file
  (D-083). Playtest:
  https://claude.ai/artifact/SVaAtJiDT1ufgzVCJM5B2i
- **2026-10-18, 0.1.10, the oil flask.** The first item: the study's
  bottle, bobbing on its shadow. Walking onto one pours in 45% of a tank,
  even into a full lantern. Flasks only come from the dev spawn list for
  now; "Reset room" clears them (D-077 to D-079). Superseded decisions
  moved to the archive. Playtest:
  https://claude.ai/artifact/L4ezEfThPFULMmhFdG8zUM
- **2026-10-18, 0.1.9, docs audit.** Conversations pull `main` first;
  docs name a PR by its version; open-PR decisions change in place
  after a playtest; merges aren't listed as waiting; the PR body is
  updated each push; the playtest bundler is `tools/playtest.js`.
  Stale text fixed in the README and four docs, and the 0.0.x
  changelog moved to the archive (D-070 to D-076).
- **2026-10-18, PR #18 (0.1.8), audit next.** Docs only: Next up is a
  docs audit with the problems seen so far; the build plan's order may
  change as we go.
- **2026-10-18, PR #17 (0.1.7), oil.** The lantern starts three
  quarters full and 60 steps empty a full tank (the study's 40 felt
  too short, 80 too long).
  The light shrinks with the oil, from 5.2 tiles to 1.6, then an ember.
  The study's 10-segment oil bar sits in the top right corner. Dev panel:
  "Refill oil" and "Empty oil". The flask became step 15 (D-064 to D-069,
  Q-028 and Q-029 opened).
- **2026-10-18, PR #16 (0.1.6), fog of war.** Tiles the lantern has
  reached are remembered and stay faintly visible; a tile counts once
  the light reaches its middle, and the edge fades over 4 pixels in the
  dither. Dev panel: "Reveal room" and "Forget"; "Reset room" forgets
  too. After the playtest the study's blue felt too bright and like
  moonlight, so each place now sets its darkness: this cave is pitch
  black with a faint grey memory (D-059 to D-063, Q-027 opened).
- **2026-10-18, PR #15 (0.1.5), the lantern lights the room.** The
  hero holds the study's lantern, and its warm light reaches about 5
  tiles in dithered bands, with a gentle flicker. Walls cast shadows,
  whose edges now fade over 4 pixels instead of stepping (picked from a
  side-by-side picture). Outside the light is almost black until fog of
  war. Dev panel: "Lighting off". The playtest showed teeth on the
  left wall, so walls are now lit as whole tiles (D-053 to D-058).
- **2026-10-18, PR #14 (0.1.4), the registry and spawning.** One content
  registry gathers each kind's own file (tiles for now, keyed by id). The
  wrench panel's Spawn list (None, Wall, Floor) comes from it: pick one,
  then each tap or click places it, with no turn passed and never a wall
  on the hero. "Reset room" brings the room back; nothing is kept after a
  reload (D-048 to D-050). "Copy room" puts the room on the clipboard
  as one line of code to hand to Claude, with a box to copy from if the
  browser blocks it (D-051, D-052).
- **2026-10-18, PR #13 (0.1.3), dev mode.** `?dev` turns it on and
  the browser remembers it (`?dev=off` forgets). A wrench button opens
  switches, off at first, for a faint tile grid and a coordinates readout
  with a bright outline on the pointed tile; ` toggles them on a PC. The
  playtest dropped "Leave dev mode" (D-045 to D-047).
- **2026-10-18, PR #12 (0.1.2), the hero walks.** The study's hero
  (lantern later) steps one tile per key, tap, swipe or held finger, in
  4 directions with a quick slide. Walls stop the hero with a small nudge
  and no turn passes. Held walking slowed to 4 steps a second after the
  playtest (D-042 to D-044). Opened Q-025 (a tap/swipe switch)
  and Q-026 (walking around walls to a held finger).
- **2026-10-18, PR #11 (0.1.1), a room built from data.** The study
  room's shape, written as a text map, with brick wall faces, shade under
  walls and moss (D-040). A small tile table says what each letter means.
  The decision log split: D-001 to D-038 moved to the archive (D-041).
- **2026-10-18, PR #10 (0.1.0), the first code.** The front page is the
  game now: one crypt floor tile on a fixed 176 × 208 canvas, enlarged
  with crisp pixels, plus a small version number. Code folders and two
  tests set up (D-039).
- **2026-10-17, PR #9 (0.0.9), brief approved, Q-022 to Q-024 answered.**
  The brief is approved (D-035). The hero is a lamplighter, with reasons
  uncovered slowly (D-036). Oil burns per lit turn (D-037). Growth comes
  from levels, gear, home upgrades and discoveries (D-038). Pre-production
  is done.
- **2026-10-17, PR #8 (0.0.8), design brief drafted.** `docs/DESIGN.md`
  gathers D-002 to D-033 on one page, waiting for approval. It found three
  gaps, now Q-022 to Q-024. D-004's pace is marked superseded by D-018.
  The owner swapped the dog for a talking faery guide (D-034).
- **2026-10-17, PR #7 (0.0.7), Q-020 and Q-021 answered.** Every biome
  has portals into a twisted version of itself (D-032). The companion is a
  dog you rescue in the first cave (D-033). No questions are open.
- **2026-10-17, PR #6 (0.0.6), Q-012 to Q-019 answered.** Other light
  sources, a day and night cycle by turns, and reasons to switch the
  lantern off (D-024 to D-026). Weapons and abilities (D-027). Four biomes
  (D-028), an animal companion (D-029), dev mode via `?dev` (D-030) and a
  pixel font (D-031).
- **2026-10-17, PR #5 (0.0.5), Q-008 to Q-010 answered.** One persistent
  journey: a world generated once per save, plus portals into deep areas
  that change each visit (D-019). Death sends you home without wiping
  progress (D-020, D-021). Surface first, then down, with caves opening
  into valleys (D-022). Solo, with one companion later (D-023).
- **2026-10-17, PR #4 (0.0.4), Q-004 to Q-007 answered.** Oil is light
  only (D-014). Running dry leaves an ember and bolder enemies, not the end
  of the run; the lantern switches on and off, and other light sources
  exist (D-015). Turns pass only when you act (D-016). Bump to attack, plus
  ranged abilities, weapons and area attacks (D-017). The owner asked for
  a faster pace and multiple-choice questions (D-018).
- **2026-10-17, PR #3 (0.0.3), Q-003 answered.** The owner approved the
  four design pillars as drafted (D-013): the lantern is your world, always
  one floor deeper, curiosity pays off, and stronger, slowly. They are in
  `VISION.md`, and every later idea is checked against them.
- **2026-10-17, PR #2 (0.0.2), Q-002 and Q-011 answered.** Everything in
  style study 1 stays, with the rat and shadow edges to improve (D-009).
  The repo became lowercase `gloamdeep` and GitHub Pages went live (D-010).
  The owner dislikes the blue flash on tap, so the game will turn it off
  (D-011). The front page now opens the style study (D-012).
- **2026-10-17, PR #1 (0.0.1), Q-001 answered.** The owner said what they
  loved about Dungeon Siege: going deeper, exploring, loot, new monsters,
  mysteries and lore, getting stronger, and the curiosity to keep playing
  (D-008). Recorded in `VISION.md`.
- **2026-10-17, PR #1 (0.0.1), kickoff.** The game was named Gloamdeep
  (D-001). Style study 1 became the art baseline (D-005), and the owner said
  of it: "I really don't want to lose that." Working rules, decision log and
  docs were set up from the planning conversation. ChatGPT's art pack was
  left out on purpose (D-007).
