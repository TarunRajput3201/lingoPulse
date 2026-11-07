const fs = require('fs');
const path = require('path');

function createWavBase64(sampleRate, samples) {
  const buffer = Buffer.alloc(44 + samples.length * 2);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + samples.length * 2, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(1, 22); // mono
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32); // block align
  buffer.writeUInt16LE(16, 34); // bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.floor(s < 0 ? s * 32768 : s * 32767), 44 + i * 2);
  }
  return 'data:audio/wav;base64,' + buffer.toString('base64');
}

const SR = 22050;

// 1. Correct Answer: Pleasant, cheerful marimba chime C5 -> E5 -> G5 + C6
const durCorrect = 0.32;
const numCorrect = Math.floor(SR * durCorrect);
const bufCorrect = new Float32Array(numCorrect);

for (let i = 0; i < numCorrect; i++) {
  const t = i / SR;
  let val = 0;
  // Note 1: C5 (523.25)
  if (t < 0.18) {
    const env = (1 - Math.exp(-t / 0.003)) * Math.exp(-t / 0.07);
    val += 0.38 * env * Math.sin(2 * Math.PI * 523.25 * t);
    val += 0.08 * env * Math.sin(2 * Math.PI * 1046.5 * t);
  }
  // Note 2: E5 (659.25)
  if (t >= 0.05 && t < 0.25) {
    const dt = t - 0.05;
    const env = (1 - Math.exp(-dt / 0.003)) * Math.exp(-dt / 0.08);
    val += 0.42 * env * Math.sin(2 * Math.PI * 659.25 * dt);
    val += 0.09 * env * Math.sin(2 * Math.PI * 1318.5 * dt);
  }
  // Note 3: G5 (783.99) + C6 (1046.5)
  if (t >= 0.10) {
    const dt = t - 0.10;
    const env = (1 - Math.exp(-dt / 0.003)) * Math.exp(-dt / 0.095);
    val += 0.46 * env * Math.sin(2 * Math.PI * 783.99 * dt);
    val += 0.22 * env * Math.sin(2 * Math.PI * 1046.5 * dt);
    val += 0.06 * env * Math.sin(2 * Math.PI * 1567.98 * dt);
  }
  bufCorrect[i] = Math.max(-0.95, Math.min(0.95, val * 0.9));
}

// 2. Wrong Answer: Gentle, warm descending wooden marimba tap
const durWrong = 0.24;
const numWrong = Math.floor(SR * durWrong);
const bufWrong = new Float32Array(numWrong);

for (let i = 0; i < numWrong; i++) {
  const t = i / SR;
  let val = 0;
  // Tap 1: 220Hz -> 190Hz
  if (t < 0.11) {
    const freq = 220 - (30 * (t / 0.11));
    const env = (1 - Math.exp(-t / 0.004)) * Math.exp(-t / 0.045);
    val += 0.40 * env * Math.sin(2 * Math.PI * freq * t);
    val += 0.08 * env * Math.sin(2 * Math.PI * (freq * 2) * t);
  }
  // Tap 2: 175Hz -> 135Hz
  if (t >= 0.05) {
    const dt = t - 0.05;
    const freq = 175 - (40 * (dt / 0.19));
    const env = (1 - Math.exp(-dt / 0.004)) * Math.exp(-dt / 0.06);
    val += 0.45 * env * Math.sin(2 * Math.PI * freq * dt);
    val += 0.10 * env * Math.sin(2 * Math.PI * (freq * 2) * dt);
  }
  bufWrong[i] = Math.max(-0.95, Math.min(0.95, val * 0.85));
}

// 3. Section Fanfare: Celebratory arpeggio + triumphant sustained chord
const durFanfare = 0.95;
const numFanfare = Math.floor(SR * durFanfare);
const bufFanfare = new Float32Array(numFanfare);

const notes = [
  { start: 0.00, freq: 392.00, dur: 0.20, gain: 0.30 }, // G4
  { start: 0.08, freq: 523.25, dur: 0.22, gain: 0.35 }, // C5
  { start: 0.16, freq: 659.25, dur: 0.24, gain: 0.40 }, // E5
  { start: 0.24, freq: 783.99, dur: 0.28, gain: 0.45 }, // G5
];

for (let i = 0; i < numFanfare; i++) {
  const t = i / SR;
  let val = 0;
  for (const n of notes) {
    if (t >= n.start && t < n.start + n.dur) {
      const dt = t - n.start;
      const env = (1 - Math.exp(-dt / 0.004)) * Math.exp(-dt / 0.09);
      val += n.gain * env * Math.sin(2 * Math.PI * n.freq * dt);
    }
  }
  if (t >= 0.32) {
    const dt = t - 0.32;
    const shimmer = 1.0 + 0.08 * Math.sin(2 * Math.PI * 6.0 * dt);
    const env = (1 - Math.exp(-dt / 0.005)) * Math.exp(-dt / 0.23);
    val += 0.30 * env * Math.sin(2 * Math.PI * 523.25 * dt);
    val += 0.30 * env * Math.sin(2 * Math.PI * 659.25 * dt);
    val += 0.35 * env * Math.sin(2 * Math.PI * 783.99 * dt);
    val += 0.38 * env * shimmer * Math.sin(2 * Math.PI * 1046.5 * dt);
    val += 0.12 * env * Math.sin(2 * Math.PI * 1318.5 * dt);
  }
  bufFanfare[i] = Math.max(-0.95, Math.min(0.95, val * 0.75));
}

// 4. Subtle Tap
const durTap = 0.02;
const numTap = Math.floor(SR * durTap);
const bufTap = new Float32Array(numTap);
for (let i = 0; i < numTap; i++) {
  const t = i / SR;
  const env = Math.exp(-t / 0.004);
  bufTap[i] = 0.5 * env * Math.sin(2 * Math.PI * 800 * t);
}

const correctDataUri = createWavBase64(SR, bufCorrect);
const wrongDataUri = createWavBase64(SR, bufWrong);
const fanfareDataUri = createWavBase64(SR, bufFanfare);
const tapDataUri = createWavBase64(SR, bufTap);

const tsContent = `/**
 * LingoPulse In-Memory Audio Assets
 * Zero-latency pre-rendered 16-bit PCM WAV sound effects encoded as Base64 Data URIs.
 * Eliminates all remote network requests, CDN delays, and playback buffering.
 */

export const AUDIO_ASSETS = {
  CORRECT_CHIME: '${correctDataUri}',
  WRONG_THUD: '${wrongDataUri}',
  SECTION_COMPLETE_FANFARE: '${fanfareDataUri}',
  TACTILE_TAP: '${tapDataUri}',
} as const;

export type AudioAssetKey = keyof typeof AUDIO_ASSETS;
`;

const targetFile = path.resolve(__dirname, '../mobile/src/services/audioAssets.ts');
fs.writeFileSync(targetFile, tsContent, 'utf8');
console.log('Successfully wrote audioAssets.ts to', targetFile);
