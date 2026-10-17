# Tech

These rules are settled (D-003). The file and folder layout is proposed
here and gets confirmed with the owner at build-plan step 7.

## Hard rules
- Vanilla HTML, CSS and JavaScript. No frameworks, no build step. Opening
  `index.html` through any static server must work.
- No external assets: no image, audio or font files, and nothing loaded from
  a CDN. Visuals use Canvas 2D, sound uses Web Audio.
- Phone first, in portrait and landscape. Tap targets are at least 44 px.
  Touch, mouse and keyboard all work (Pointer Events for tap and click).
- 60 fps on a mid-range phone. Avoid allocating memory every frame. The
  style study's per-pixel lighting runs on a 176 × 208 canvas, so keep the
  native resolution small.
- `localStorage` is wrapped in try/catch, and the game works without it.
- Respect `prefers-reduced-motion`.
- No blue flash on tap (D-011). Set `-webkit-tap-highlight-color:
  transparent` on the page, and don't let taps select text on the game
  screen. Keep a visible focus outline for keyboard users. Style study 1
  still shows the flash, because it is frozen.

## Architecture
- **State is separate from drawing.** The game rules work on plain data and
  never touch the DOM. Rendering and input are thin layers on top. This is
  what lets dev tools and tests change the game safely.
- **One content registry.** Every tile, item, enemy and NPC is one data
  entry: its id, name, how it is drawn and how it behaves. Menus, the dev
  spawn tool and saves all read from the registry. Nothing keeps its own
  hand-written list.
- **Seeded RNG.** All randomness comes from one seeded generator, so a
  seed reproduces a run exactly ("load seed 4127 and watch the bug happen").
- **Turn rules are pure functions:** `(state, action) → new state`. That
  makes them easy to test and to undo in dev mode.

## Proposed layout (confirm at step 7)
```
index.html          page shell and canvas
src/main.js         boot and the main loop
src/core/           rules, state, rng, registry (no DOM)
src/render/         drawing, lighting, sprites
src/input/          tap, mouse, keyboard
src/dev/            dev mode (see DEV-TOOLS.md)
tests/              node --test, for core/ only
```
ES modules (`<script type="module">`). Tests use Node's built-in test
runner, with no dependencies.

## Versioning in code
Once code exists, `src/core/version.js` exports `VERSION`, and it must match
the top `CHANGELOG.md` entry. Add a test that checks this.
