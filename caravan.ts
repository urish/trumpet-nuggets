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
  await playNote(C5, 2088);
  await delay(143);
  await playNote(Cs5, 315);
  await delay(87);
  await playNote(C5, 271);
  await delay(76);
  await playNote(G4, 215);
  await delay(63);
  await playNote(As4, 234);
  await delay(18);
  await playNote(C5, 342);
  await delay(105);
  await playNote(E5, 322);
  await delay(9);
  await playNote(G4, 201);
  await delay(59);
  await playNote(As4, 2066);
  await delay(279);
  await playNote(C5, 176);
  await delay(92);
  await playNote(Cs5, 131);
  await delay(64);
  await playNote(C5, 206);
  await delay(32);
  await playNote(Cs5, 259);
  await delay(478);
  await playNote(B4, 415);
  await delay(388);
  await playNote(As4, 1483);
  await delay(399);
  await playNote(B4, 137);
  await delay(257);
  await playNote(B4, 52);
  await delay(169);
  await playNote(As4, 46);
  await delay(241);
  await playNote(A4, 301);
  await delay(275);
  await playNote(Fs4, 24);
  await delay(365);
  await playNote(E4, 335);
  await delay(16);
  await playNote(F4, 715);
  await delay(243);
  await playNote(C4, 199);
  await delay(130);
  await playNote(Cs4, 327);
  await delay(115);
  await playNote(E4, 273);
  await delay(162);
  await playNote(F4, 292);
  await delay(266);
  await playNote(C4, 211);
  await delay(162);
  await playNote(Gs3, 204);
  await delay(164);
  await playNote(F3, 397); 
})().catch(console.error);
