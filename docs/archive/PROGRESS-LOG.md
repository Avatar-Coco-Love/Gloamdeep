# Progress log archive

Entries moved out of `docs/PROGRESS.md`, newest first.

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
