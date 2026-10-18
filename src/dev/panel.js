// § panel: the dev panel's tools, in sections (D-087): a fixed grid of
// section buttons, the open section below; which one is saved. A new tool
// adds a section here.
import { ALL } from '../core/registry.js';
import { roomCode } from '../core/roomcode.js';

export function el(tag, props) {
  return Object.assign(document.createElement(tag), props);
}

const button = (text, onClick, className = '') => {
  const b = el('button', { type: 'button', textContent: text, className });
  b.addEventListener('click', onClick);
  return b;
};
const row = (...kids) => { const r = el('div', { className: 'dev-row' }); r.append(...kids); return r; };

// Builds the sections into `panel`. `opts` holds the switches and the open
// sections, `saved()` stores them. Returns flip(name) for the keys, picked()
// for the spawn tool and sync(state), called each frame.
export function buildPanel(panel, opts, saved, game) {
  // § sections: View, Spawn, Room, Oil, Share. Their buttons sit in a fixed
  // grid at the top and the open section shows below, so nothing moves under
  // the finger. One open at a time; tap it again to fold it (D-087).
  const tabs = el('div', { className: 'dev-tabs' });
  panel.append(tabs);
  const sections = [];
  const show = (id) => {
    for (const s of sections) {
      s.body.hidden = s.id !== id;
      s.tab.setAttribute('aria-expanded', String(s.id === id));
    }
    opts.open = id ? [id] : [];
    saved();
  };
  const section = (id, title) => {
    const body = el('div', { className: 'dev-body', hidden: opts.open[0] !== id });
    const tab = button(title, () => show(body.hidden ? id : null));
    tab.setAttribute('aria-expanded', String(!body.hidden));
    sections.push({ id, tab, body });
    tabs.append(tab);
    panel.append(body);
    return body;
  };

  // § view: switches as buttons, two to a row, with their PC key (D-090)
  const view = section('view', 'View');
  const switches = {};
  const flip = (name, on = !opts[name]) => {
    opts[name] = on;
    switches[name].setAttribute('aria-pressed', String(on));
    saved();
  };
  const views = [['grid', 'Grid', 'G'], ['coords', 'Coords', 'C'], ['noLight', 'No light', ''], ['reveal', 'Reveal', 'R']];
  view.append(row(...views.map(([name, label, key]) => {
    switches[name] = button(key ? `${label} (${key})` : label, () => flip(name), 'dev-switch');
    switches[name].setAttribute('aria-pressed', String(opts[name]));
    return switches[name];
  })));

  // § spawn: one chip per registry entry, grouped by kind (D-089). Tap a chip
  // to pick it, then each tap on the room puts it there (D-049); tap it again
  // to drop the pick. The pick is not saved.
  const spawn = section('spawn', 'Spawn');
  let picked = null;
  const chips = [];
  for (const kind of new Set(ALL.map((e) => e.kind))) {
    spawn.append(el('div', { className: 'dev-kind', textContent: kind + 's' }));
    spawn.append(row(...ALL.filter((e) => e.kind === kind).map((entry) => {
      const chip = button(entry.name, () => {
        picked = picked === entry ? null : entry;
        for (const c of chips) c.b.setAttribute('aria-pressed', String(c.entry === picked));
      }, 'dev-chip');
      chip.setAttribute('aria-pressed', 'false');
      chips.push({ b: chip, entry });
      return chip;
    })));
  }

  // § room: Reset room (D-050, D-062) and Forget (D-061)
  section('room', 'Room').append(row(
    button('Reset room', () => game.set(game.reset())),
    button('Forget', () => game.set(game.forget())),
  ));

  // § oil: a slider for any amount (D-091), Refill and Empty (D-066); no turn passes
  const oil = section('oil', 'Oil');
  const slider = el('input', { type: 'range', min: 0, max: 100, step: 1, value: 0 });
  slider.setAttribute('aria-label', 'Oil');
  const amount = el('span', { className: 'dev-amount' });
  slider.addEventListener('input', () => game.set(game.setOil(slider.value / 100)));
  const setter = el('label', { className: 'dev-slider' });
  setter.append(slider, amount);
  oil.append(setter, row(button('Refill', () => game.set(game.setOil(1))), button('Empty', () => game.set(game.setOil(0)))));
  let shownOil = null;

  // § share: Copy room, to hand to Claude (D-051, D-052). If the browser
  // blocks the clipboard, a box shows the code, selected, to copy by hand.
  const share = section('share', 'Share');
  const box = el('textarea', { id: 'dev-code', readOnly: true, hidden: true, rows: 4, spellcheck: false });
  let copyTimer = 0;
  const copy = button('Copy room', async () => {
    const code = roomCode(game.get());
    box.hidden = true;
    try { await navigator.clipboard.writeText(code); said('Copied!'); return; } catch { /* blocked: try the box */ }
    box.value = code;
    box.hidden = false;
    box.focus(); box.select(); box.scrollTop = 0;
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { /* not supported */ }
    if (ok) { box.hidden = true; said('Copied!'); } else said('Copy from the box');
  });
  const said = (text) => {
    copy.textContent = text;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copy.textContent = 'Copy room'; }, 1500);
  };
  share.append(row(copy), box);

  return {
    flip,
    picked: () => picked,
    // Keeps the slider on the real oil, which steps and flasks change too.
    sync(state) {
      if (state.oil === shownOil) return;
      shownOil = state.oil;
      const pct = Math.round(state.oil * 100);
      slider.value = pct;
      amount.textContent = pct + '%';
    },
  };
}
