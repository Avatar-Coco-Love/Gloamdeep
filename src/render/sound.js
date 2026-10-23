// § sound: the game's sounds, made in code with Web Audio (TECH.md), no audio files.
// The first is the footstep (D-255): a soft, low tap each time the hero moves a tile.
// A browser plays sound only after a tap, click or key, so the sound maker starts
// on the first one; until then, and with Sound: Off, nothing plays.
import { rng } from '../core/rng.js';

const STEP = { gain: 0.22, attack: 0.004, end: 0.09, low: 520, high: 640 }; // seconds and hertz
const THUD = { gain: 0.12, from: 110, to: 60, end: 0.06 };
const NOISE_SEED = 255; // the noise is the same on every visit

export function createSound(isOn) {
  let ac = null, noise = null, foot = 0;
  // § start: on the first tap, click or key, the sound maker and its noise are made once
  function start() {
    if (!ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ac = new AC();
      noise = ac.createBuffer(1, Math.ceil(ac.sampleRate * STEP.end), ac.sampleRate);
      const r = rng(NOISE_SEED), data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = r() * 2 - 1;
    }
    if (ac.state === 'suspended') ac.resume();
  }
  addEventListener('pointerdown', start, { capture: true });
  addEventListener('keydown', start, { capture: true });

  // § footstep: a short burst of muffled noise over a falling thud; the feet take
  // turns, the second a little lower, so a walk sounds like left, right
  function footstep() {
    if (!ac || ac.state !== 'running' || !isOn()) return;
    const t = ac.currentTime;
    foot = 1 - foot;
    const src = ac.createBufferSource(), filter = ac.createBiquadFilter(), gain = ac.createGain();
    src.buffer = noise;
    filter.type = 'lowpass';
    filter.frequency.value = foot ? STEP.high : STEP.low;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(STEP.gain, t + STEP.attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + STEP.end);
    src.connect(filter).connect(gain).connect(ac.destination);
    src.start(t);
    const osc = ac.createOscillator(), body = ac.createGain();
    osc.frequency.setValueAtTime(THUD.from, t);
    osc.frequency.exponentialRampToValueAtTime(THUD.to, t + THUD.end);
    body.gain.setValueAtTime(THUD.gain, t);
    body.gain.exponentialRampToValueAtTime(0.0001, t + THUD.end);
    osc.connect(body).connect(ac.destination);
    osc.start(t);
    osc.stop(t + THUD.end);
  }
  return { footstep };
}
