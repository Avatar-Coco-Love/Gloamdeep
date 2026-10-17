# Art direction

Rules taken from `reference/style-study-1.html` (D-005). The study is
frozen. This file is where the rules live and change. Line numbers below
refer to the study, so read it by range, not whole.

Which features are must-keeps is still open (Q-002). Until then, treat
everything here as the baseline, and don't drop any of it without asking.

## Grid and scale
- Tiles are 16 × 16 pixels. The study room is 11 × 13 tiles (176 × 208 px).
- Draw at native size on a small canvas, then enlarge it with CSS
  `image-rendering: pixelated`. Use whole-number zoom (2×, 3×) when it
  fits, and fractional zoom only on very narrow screens. Turn image
  smoothing off.
- Every coordinate is a whole pixel. No anti-aliased shapes.

## View: top-down with a slight tilt
- A wall tile whose southern neighbour is not a wall shows a **front face**:
  a 5-pixel dark cap at the top (with a light lip line at y=4), then three
  brick courses (y 5–7, 9–11, 13–14), staggered per row and per tile
  column, with a dark base line at y=15. Other wall tiles show only the
  dark cap, with a light edge on any side that borders a non-wall tile.
- A floor tile directly below a wall gets cast shade on its top 4 rows.
- Sprites sit 2 pixels up from their tile, with a small dark oval shadow
  underneath.
- Study code: lines 177–271 (base layer).

## Palette
Named colours are in the study's `PAL` (lines 121–128). Key roles:

| Role | Colour |
| --- | --- |
| Outline / deepest dark | `#0e0c16` |
| Hero cloak (light, mid, dark, deepest) | `#a6e0e4` `#58a8b4` `#2f6a7c` `#1c3e4e` |
| Lantern, flame, oil | `#ffd66b` `#f39a3b` `#e9a94a` |
| Bone, pale highlights | `#efe6cc` `#b9ab88` |
| Hostile marks (eyes) | `#e8786a` |
| Stairs and unusual things | `#a58ce0` |
| Crypt floor (base, light, mortar) | `#3a4050` `#454c5e` `#22262f` |
| Crypt wall brick (base, top edge, mortar) | `#535d72` `#69748b` `#2b303c` |
| Moss | `#6fb04e` `#3c6e3a` |

Rule to keep: important things (oil, stairs, enemies, the hero) are
recognisable by shape **and** colour, never by colour alone.

## Light: the core of the look
The study's lighting code is at lines 309–338, plus the light setup inside
`frame()` from line 343.

- Draw the scene at full brightness, then multiply every pixel by the light
  reaching it. Darkness is the default.
- **Light sources:** the hero's lantern (warm, the largest), wall torches
  (orange, flicker more), stairs (faint violet), slimes (faint green).
- **Line of sight:** each light checks visibility in 4 × 4 pixel cells by
  marching rays through the tile grid. Walls block light. A wall is lit
  when the ray reaches it.
- **Falloff:** `f = 1 − distance / radius`, raised to the power 1.25,
  then cut into 5 bands with a 4 × 4 Bayer dither. The dithered bands are
  the retro look, so don't smooth them.
- **Lantern colour** multiplier (1.45, 1.2, 0.86). **Torch** (1.2, 0.78,
  0.42). Flicker is a sum of three sine waves (about ±3.5% for the lantern,
  ±9% for torches).
- **Fog of war:** tiles the lantern has reached are remembered and get a
  cold blue ambient light (0.15, 0.16, 0.26). Unseen tiles stay almost black
  (0.02, 0.02, 0.045).
- **Emissive layer:** flames and embers are drawn after lighting, so they
  are always bright.

## Sprites
- 16 × 16 pixel maps written as strings, one character per palette colour.
  Symmetric sprites store the left half and mirror it. See lines 129–176.
- Each sprite has a white silhouette copy for the hit flash.
- Idle life: 2-frame bob (monsters about 0.4–0.5 s, the hero 0.6 s), and a
  walking bob.

## Small life (keep it subtle)
Swaying torch flames with rising embers. Dust motes that only show where
there is light. Water ripples. A hit flash plus a 1-pixel screen shake on
bump. Respect `prefers-reduced-motion`: stop the bobbing, flicker and
drift.

## Known weak spots in the study
- The rat sprite is the weakest piece.
- Shadow edges step in 4-pixel blocks.
- The study's page chrome loads a Google Font. The game itself must not
  (D-003, Q-013).
