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
  await playNote(C4, 100);
  await delay(85);
  await playNote(C4, 146);
  await delay(54);
  await playNote(C5, 124);
  await delay(87);
  await playNote(C4, 91);
  await delay(64);
  await playNote(C4, 133);
  await delay(54);
  await playNote(As4, 107);
  await delay(94);
  await playNote(C4, 101);
  await delay(61);
  await playNote(C4, 135);
  await delay(44);
  await playNote(Gs4, 114);
  await delay(103);
  await playNote(C4, 98);
  await delay(63);
  await playNote(C4, 145);
  await delay(42);
  await playNote(Fs4, 106);
  await delay(96);
  await playNote(C4, 93);
  await delay(65);
  await playNote(C4, 124);
  await delay(77);
  await playNote(G4, 91);
  await delay(75);
  await playNote(Gs4, 127);
  await delay(94);
  await playNote(C4, 102);
  await delay(72);
  await playNote(C4, 138);
  await delay(50);
  await playNote(C5, 125);
  await delay(102);
  await playNote(C4, 107);
  await delay(59);
  await playNote(C4, 134);
  await delay(50);
  await playNote(As4, 100);
  await delay(107);
  await playNote(C4, 104);
  await delay(64);
  await playNote(C4, 105);
  await delay(71);
  await playNote(Gs4, 157);
  await delay(67);
  await playNote(C4, 92);
  await delay(63);
  await playNote(C4, 137);
  await delay(94);
  await playNote(Fs4, 696);
  await delay(309);
  await playNote(C4, 90);
  await delay(83);
  await playNote(C4, 138);
  await delay(80);
  await playNote(C5, 131);
  await delay(52);
  await playNote(C4, 87);
  await delay(70);
  await playNote(C4, 124);
  await delay(92);
  await playNote(As4, 117);
  await delay(63);
  await playNote(C4, 79);
  await delay(58);
  await playNote(C4, 146);
  await delay(73);
  await playNote(Gs4, 140);
  await delay(82);
  await playNote(C4, 93);
  await delay(67);
  await playNote(C4, 150);
  await delay(69);
  await playNote(Fs4, 127);
  await delay(84);
  await playNote(C4, 91);
  await delay(57);
  await playNote(C4, 139);
  await delay(81);
  await playNote(G4, 111);
  await delay(54);
  await playNote(Gs4, 138);
  await delay(102);
  await playNote(C4, 106);
  await delay(77);
  await playNote(C4, 135);
  await delay(57);
  await playNote(C5, 110);
  await delay(129);
  await playNote(C4, 87);
  await delay(65);
  await playNote(C4, 144);
  await delay(45);
  await playNote(As4, 136);
  await delay(112);
  await playNote(C4, 99);
  await delay(68);
  await playNote(C4, 123);
  await delay(61);
  await playNote(Gs4, 156);
  await delay(62);
  await playNote(C4, 77);
  await delay(90);
  await playNote(C4, 119);
  await delay(99);
  await playNote(Fs4, 903);
})().catch(console.error);
