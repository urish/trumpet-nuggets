// Some MIDI constants
const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;

// Notes you can play on the trumpet:
const
  F3 = 53, Fs3 = 54, G3 = 55, Gs3 = 56, A3 = 57, As3 = 58, B3 = 59,
  C4 = 60, Cs4 = 61, D4 = 62, Ds4 = 63, E4 = 64, F4 = 65,
  Fs4 = 66, G4 = 67, Gs4 = 68, A4 = 69, As4 = 70, B4 = 71,
  C5 = 72, Cs5 = 73, D5 = 74, Ds5 = 75, E5 = 76, F5 = 77,
  Fs5 = 78, G5 = 79, Gs5 = 80, A5 = 81, As5 = 82, B5 = 83,
  C6 = 84, Cs6 = 85, D6 = 86, Ds6 = 87, E6 = 88, F6 = 89,
  Fs6 = 90, G6 = 91, Gs6 = 92, A6 = 93, As6 = 94, B6 = 95,
  C7 = 96;

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

(async function () {
  const midi = await navigator.requestMIDIAccess();
  const midiOutput = Array.from(midi.outputs.values())
    .find(o => o.name.includes('Teensy'));

  const noteOn = (idx, velocity = 127) =>
    midiOutput.send([NOTE_ON, idx, velocity]);

  const noteOff = (idx) =>
    midiOutput.send([NOTE_OFF, idx, 0]);

  async function playNote(idx, duration) {
    noteOn(idx, 127);
    await delay(duration);
    noteOff(idx);
  }

  // Your code here:
  await playNote(C4, 1181);
  await playNote(C5, 1125);
  await delay(37);
  await playNote(B4, 727);
  await playNote(G4, 490);
  await playNote(A4, 545);
  await playNote(B4, 883);
  await playNote(C5, 1039);
  await delay(114);
  await playNote(C4, 1352);
  await delay(64);
  await playNote(A4, 1511);
  await delay(148);
  await playNote(G4, 1595);
  await delay(300);
  await playNote(A3, 1265);
  await delay(118);
  await playNote(F4, 1221);
  await delay(104);
  await playNote(E4, 867);
  await playNote(C4, 544);
  await playNote(D4, 550);
  await playNote(E4, 1046);
  await playNote(F4, 969);
  await delay(38);
  await playNote(D4, 911);
  await playNote(B3, 574);
  await playNote(C4, 551);
  await playNote(D4, 1029);
  await playNote(E4, 1120);
  await playNote(C4, 1618); 
})().catch(console.error);
