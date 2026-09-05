// Web Audio API harmonic sound generator for warm Indian classical tanpura/flute drone
class IndianClassicalSynth {
  constructor() {
    this.audioCtx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.oscillators = [];
    this.intervalId = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
  }

  play() {
    this.init();
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Master Gain
    this.gainNode = this.audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.18, this.audioCtx.currentTime + 3);

    // Warm Low Pass Filter to sound like acoustic woodwind/tanpura
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 650;
    this.gainNode.connect(filter);
    filter.connect(this.audioCtx.destination);

    // Raag Yaman / Bhairavi Fundamental Root Notes (Sa, Pa, Sa', Ga)
    // Sa = C# (138.59 Hz), Pa = G# (207.65 Hz), Sa' = 277.18 Hz, Ga = 174.61 Hz
    const baseFreqs = [138.59, 207.65, 277.18, 174.61];

    this.oscillators = baseFreqs.map((freq, idx) => {
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();

      // Tanpura overtone simulation
      osc.type = idx % 2 === 0 ? "sawtooth" : "sine";
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      // Gentle detuning for shimmer
      osc.detune.setValueAtTime((idx - 1.5) * 4, this.audioCtx.currentTime);

      oscGain.gain.setValueAtTime(0.12 / (idx + 1), this.audioCtx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();
      return osc;
    });

    // Gentle melodic notes (Sitar / Bansuri phrase pulse)
    const melodyScale = [277.18, 311.13, 349.23, 369.99, 415.30, 466.16, 523.25, 554.37];
    let noteIndex = 0;

    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.audioCtx) return;
      const noteFreq = melodyScale[noteIndex % melodyScale.length];
      noteIndex = (noteIndex + Math.floor(Math.random() * 3) + 1) % melodyScale.length;

      const melOsc = this.audioCtx.createOscillator();
      const melGain = this.audioCtx.createGain();

      melOsc.type = "sine";
      melOsc.frequency.setValueAtTime(noteFreq, this.audioCtx.currentTime);

      melGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      melGain.gain.linearRampToValueAtTime(0.06, this.audioCtx.currentTime + 1.2);
      melGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 4.5);

      melOsc.connect(melGain);
      melGain.connect(this.gainNode);

      melOsc.start();
      melOsc.stop(this.audioCtx.currentTime + 5);
    }, 3800);
  }

  stop() {
    if (!this.isPlaying) return;
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(osc => {
          try { osc.stop(); } catch(e) {}
        });
        this.oscillators = [];
        this.isPlaying = false;
        if (this.intervalId) clearInterval(this.intervalId);
      }, 1600);
    } else {
      this.isPlaying = false;
      if (this.intervalId) clearInterval(this.intervalId);
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }
}

export const soundManager = new IndianClassicalSynth();
