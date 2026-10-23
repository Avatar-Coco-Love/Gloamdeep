// § sound: the game's sounds, made in code with Web Audio (TECH.md), no audio files.
// The first is the footstep (D-255): a soft tap each time the hero moves a tile.
// A browser plays sound only after a tap, click or key, so the sound maker starts
// on the first one; until then, and with Sound: Off, nothing plays.
import { rng } from '../core/rng.js';

// Each step plays its own slice of a second of noise, at its own pitch and loudness,
// so no two sound alike (seconds and hertz; changed after the playtest: no thump, half as loud)
const STEP = { gain: 0.11, attack: 0.006, end: 0.08, low: 480, high: 720, quiet: 0.7, rate: 0.12 };
const NOISE_S = 1; // the noise's length, in seconds
const SEED = 255; // the noise and the steps' variety, the same on every visit
const between = (r, lo, hi) => lo + r() * (hi - lo);

export function createSound(isOn) {
  let ac = null, noise = null;
  const vary = rng(SEED + 1); // each step's slice, pitch and loudness
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

  // § footstep: a short burst of muffled noise, a light "tk"
  function footstep() {
    if (!ac || ac.state !== 'running' || !isOn()) return;
    const t = ac.currentTime;
    const src = ac.createBufferSource(), filter = ac.createBiquadFilter(), gain = ac.createGain();
    src.buffer = noise;
    src.playbackRate.value = between(vary, 1 - STEP.rate, 1 + STEP.rate);
    filter.type = 'lowpass';
    filter.frequency.value = between(vary, STEP.low, STEP.high);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(STEP.gain * between(vary, STEP.quiet, 1), t + STEP.attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + STEP.end);
    src.connect(filter).connect(gain).connect(ac.destination);
    src.start(t, between(vary, 0, NOISE_S - 2 * STEP.end), STEP.end);
  }
  return { footstep };
}
