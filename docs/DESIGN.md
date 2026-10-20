# Design brief

One page that says what Gloamdeep is. Everything here comes from
the decisions (IDs in brackets; D-001 to D-038 are in
`archive/DECISIONS-PREPRODUCTION.md`). Where this page and a decision disagree,
the decision wins. Anything not decided yet is listed at the bottom.

## In one line
A grid-based, turn-based survival micro-RPG for phones and any browser:
carry a lantern down through the gloam, from the woods to the sunken ruins
far below. [D-002, D-003, D-028]

## The hero and the reason [D-036]
You are a **lamplighter**, whose trade is tending lights. Why you go down
is revealed slowly: the gloam is spreading up from below and lights are
failing, there are tales of treasure and secrets, and something calls from
below. Not everything is revealed early.

## The pillars [D-013]
Every idea is checked against these. An idea that serves none is cut.
1. **The lantern is your world.**
2. **Always one floor deeper.**
3. **Curiosity pays off.**
4. **Stronger, slowly.**

## The journey
- One persistent journey, like Dungeon Siege, not a series of fresh runs.
  The world is generated once per save from a seed and then stays the
  same, with hand-made landmarks (the home base, story places). [D-019]
- It starts on the surface and goes down, biome by biome: **woods and
  mountains**, **old mines and caves**, **glowing fungal caverns**, then
  **sunken ruins**, where the mysteries and lore come together. Inside and
  outside alternate too: a cave can open into a secret valley or cut
  through a mountain. [D-022, D-028]
- Every biome has one or more **portals**. Each leads into a generated
  depth, a darker, twisted version of that biome with rarer loot, made
  anew on every visit. A dive plays like a roguelite run. [D-019, D-032]
- The world is split into regions, each a grid of rooms with its own
  rules, joined by stairs, side openings, water and secret ways. Light
  comes through openings, and a world map is uncovered as you go. Details
  in `WORLD.md`. [D-169 to D-176]

## Light
- The lantern is your main light. Oil sets how far its light reaches,
  and nothing else. Every turn it is lit burns a little oil, even
  standing still. [D-014, D-037]
- When the oil runs out the light shrinks to an ember and enemies grow
  bolder, but the journey goes on: there is always a chance to find more.
  [D-015]
- You can switch the lantern off at will. Off, it burns no oil, enemies
  notice you less, some hidden things show up, and some creatures stay
  calm. [D-015, D-026]
- Other light: torches and braziers (some you can light, and they stay
  lit), glowing mushrooms, moss and creatures, light you carry or throw,
  and shafts of daylight. Some places are darker or brighter than others.
  [D-015, D-024]
- Day and night pass with your turns. Outside by day you don't need the
  lantern; at night you do. [D-015, D-025]

## Turns and fighting
- Nothing moves until you act, so there is always time to think. [D-016]
- Walk into an enemy to attack it. You start with one close-up weapon.
  Each weapon kind has its own attack shape. Ranged abilities, area
  attacks and learned skills unlock as you grow stronger. [D-017, D-027]

## Getting stronger [D-038]
Slowly, in four ways: levels from experience (fighting and discovering),
gear and loot, home base upgrades, and small lasting boosts from
uncovering lore and secrets.

## Death and what you keep
- Die in the world: you wake at home or your last camp, and your bag stays
  where you fell, ready to fetch. Die in a portal depth: you are thrown out
  and lose that dive's finds. [D-020]
- Always kept: levels, unlocks, lore and discoveries, the home base and
  its stash, opened shortcuts, the explored map, and your deepest depth.
  [D-021]

## Company
You start alone. In the first cave you rescue a **faery**, and it stays
with you from then on. It flies freely around you, off the grid, and
darts toward things worth noticing. It speaks up with hints, warnings and
lore, and you can tap it to ask about things. It glows faintly but lights
almost nothing, and it never fights: it guides. [D-023, D-034]

## Look and feel
Style study 1 is the look, and all of it stays: real light and shadows,
stepped dithered light, fog of war, brick wall faces, crisp 16-pixel
tiles, the palette and small signs of life. Text uses a pixel font drawn
in code. Details in `ART-DIRECTION.md`. [D-005, D-009, D-031]

## Built how
Plain HTML, CSS and JavaScript, everything drawn and synthesized in code,
phone first, hosted on GitHub Pages. Dev tools are on for everyone.
Details in `TECH.md` and `DEV-TOOLS.md`. [D-003, D-006, D-010, D-086]

## Not decided yet
Nothing on this page is open right now.
