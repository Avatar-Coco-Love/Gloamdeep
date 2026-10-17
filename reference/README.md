# Reference

Frozen art references. Don't edit these files. A new study gets a new
number (`style-study-2.html`), and the rules taken from it go into
`docs/ART-DIRECTION.md`.

## style-study-1.html
- **What it is:** a walkable crypt room made on 2026-10-17, before the game
  had its name. The owner loved it, and it is the art baseline (D-005).
  On 2026-10-17 its title and heading were renamed to Gloamdeep. Nothing
  else changed.
- **How to view it:** open the file in any browser. Tap or click a tile to
  walk, or use the arrow keys / WASD. **L** turns lighting on and off.
- **It is not game code.** It is one throwaway file built to show the look.
  Take the ideas and numbers from it, and rebuild them properly under the
  rules in `docs/TECH.md`.
- **Don't read it whole** (545 lines). Sections by line:

| Lines | Section |
| --- | --- |
| 1–108 | page, CSS and HTML |
| 114–120 | deterministic noise (hash) |
| 121–128 | palette |
| 129–176 | sprites (pixel maps) |
| 177–271 | static base layer: floor, walls, water, stairs |
| 272–295 | world state (map, things) |
| 296–308 | canvas and scaling |
| 309–338 | lighting: visibility, flicker, dither |
| 339–342 | particles |
| 343–450 | per-frame drawing, lights, emissive layer |
| 451–518 | movement, pathfinding, bump reactions |
| 519–545 | UI buttons and the main loop |
