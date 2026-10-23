// § sound: the game's sounds, made in code with Web Audio (TECH.md), no audio files.
// The first is the footstep (D-255): a soft tap each time the hero moves a tile;
// then the lantern's tick, on or off (D-257), and the hit on a creature (D-258).
// A browser plays sound only after a tap, click or key, so the sound maker starts
// on the first one; until then, and with Sound: Off, nothing plays.
import { rng } from '../core/rng.js';

// Each step plays its own slice of a second of noise, at its own pitch and loudness,
// so no two sound alike (seconds and hertz; changed after the playtest: no thump, half as loud)
const STEP = { gain: 0.11, attack: 0.006, end: 0.08, low: 480, high: 720, quiet: 0.7, rate: 0.12 };
// The lantern's tick: a ringing slice of noise, higher for on and lower for off (hertz, seconds)
const TICK = { on: 1200, off: 850, ring: 3, gain: 0.12, attack: 0.002, end: 0.04, from: 0.3 };
// The hit: a low tone falling, under a muffled slice of noise, a soft "dmp"; the knife adds a
// small tick. Each hit's pitch and loudness vary a little, like the steps (hertz, seconds)
const HIT = {
  thud: { from: 110, to: 60, gain: 0.12, attack: 0.006, end: 0.1 },
  dull: { freq: 350, gain: 0.06, attack: 0.004, end: 0.05, from: 0.2 },
  knife: { freq: 1000, ring: 3, gain: 0.06, attack: 0.002, end: 0.035, from: 0.3 },
  pitch: 0.1, quiet: 0.7,
};
const NOISE_S = 1; // the noise's length, in seconds
const SEED = 255; // the noise and the steps' variety, the same on every visit
const between = (r, lo, hi) => lo + r() * (hi - lo);

export function createSound(isOn) {
  let ac = null, noise = null;
  const vary = rng(SEED + 1); // each step's slice, pitch and loudness
  const varyHit = rng(SEED + 2); // each hit's pitch and loudness
  // § start: on the first tap, click or key, the sound maker and its noise are made once
  function start() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ac = new AC();
      noise = ac.createBuffer(1, Math.ceil(ac.sampleRate * NOISE_S), ac.sampleRate);
      const r = rng(SEED), data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = r() * 2 - 1;
    }
    if (ac.state === 'suspended') ac.resume();
  }
  addEventListener('pointerdown', start, { capture: true });
  addEventListener('keydown', start, { capture: true });
  const ready = () => ac && ac.state === 'running' && isOn();

  // § parts: a quick rise to `gain`, then a fall to nothing at `end`
  function envelope(t, gain, attack, end) {
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + end);
    return g;
  }
  // A slice of the noise, from `from` seconds in, through one filter
  function slice(t, { type, freq, ring = 1, gain, attack, end, from, rate = 1 }) {
    const src = ac.createBufferSource(), filter = ac.createBiquadFilter();
    src.buffer = noise;
    src.playbackRate.value = rate;
    filter.type = type;
    filter.frequency.value = freq;
    filter.Q.value = ring;
    src.connect(filter).connect(envelope(t, gain, attack, end)).connect(ac.destination);
    src.start(t, from, end);
  }
  // A pure tone sliding from one pitch to another
  function tone(t, { from, to, gain, attack, end }) {
    const osc = ac.createOscillator();
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + end);
    osc.connect(envelope(t, gain, attack, end)).connect(ac.destination);
    osc.start(t);
    osc.stop(t + end);
  }

  // § footstep: a short burst of muffled noise, a light "tk"
  function footstep() {
    if (!ready()) return;
    slice(ac.currentTime, {
      type: 'lowpass', rate: between(vary, 1 - STEP.rate, 1 + STEP.rate), freq: between(vary, STEP.low, STEP.high),
      gain: STEP.gain * between(vary, STEP.quiet, 1), attack: STEP.attack, end: STEP.end, from: between(vary, 0, NOISE_S - 2 * STEP.end),
    });
  }
  // § lantern tick: a soft "tok" each time the lantern goes on or off, by hand or by itself
  function lantern(lit) {
    if (!ready()) return;
    slice(ac.currentTime, { type: 'bandpass', freq: lit ? TICK.on : TICK.off, ring: TICK.ring, gain: TICK.gain, attack: TICK.attack, end: TICK.end, from: TICK.from });
  }
  // § hit: the hero strikes a creature, with the lantern or with the knife held
  function hit(knife) {
    if (!ready()) return;
    const t = ac.currentTime, p = between(varyHit, 1 - HIT.pitch, 1 + HIT.pitch), loud = between(varyHit, HIT.quiet, 1);
    const { thud, dull } = HIT;
    tone(t, { ...thud, from: thud.from * p, to: thud.to * p, gain: thud.gain * loud });
    slice(t, { type: 'lowpass', ...dull, freq: dull.freq * p, gain: dull.gain * loud });
    if (knife) slice(t, { type: 'bandpass', ...HIT.knife, freq: HIT.knife.freq * p, gain: HIT.knife.gain * loud });
  }
  return { footstep, lantern, hit };
}
