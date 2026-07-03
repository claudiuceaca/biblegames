const fs = require('fs');
const path = require('path');
const makeWave = (samples, sampleRate = 22050) => {
  const numChannels = 1;
  const bitsPerSample = 16;
  const blockAlign = numChannels * bitsPerSample / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);
  for (let i = 0; i < samples.length; i++) {
    buffer.writeInt16LE(samples[i], 44 + i * 2);
  }
  return buffer;
};
const makeSine = (freq, duration, amplitude = 0.4, sampleRate = 22050) => {
  const len = Math.floor(duration * sampleRate);
  const samples = new Int16Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / sampleRate;
    samples[i] = Math.round(32767 * amplitude * Math.sin(2 * Math.PI * freq * t) * (1 - t / duration));
  }
  return samples;
};
const directory = path.join(__dirname, '..', 'assets', 'sounds');
fs.mkdirSync(directory, { recursive: true });
const catchSamples = makeSine(880, 0.18, 0.4);
fs.writeFileSync(path.join(directory, 'catch.wav'), makeWave(catchSamples));
const ouchSamples = makeSine(220, 0.22, 0.35);
fs.writeFileSync(path.join(directory, 'ouch.wav'), makeWave(ouchSamples));
const gameOverSamples = (() => {
  const sampleRate = 22050;
  const duration = 0.5;
  const len = Math.floor(duration * sampleRate);
  const samples = new Int16Array(len);
  for (let i = 0; i < len; i++) {
    const t = i / sampleRate;
    const freq = 600 - 400 * (t / duration);
    samples[i] = Math.round(32767 * 0.28 * Math.sin(2 * Math.PI * freq * t) * (1 - t / duration));
  }
  return samples;
})();
fs.writeFileSync(path.join(directory, 'gameover.wav'), makeWave(gameOverSamples));
console.log('generated sound files', directory);
