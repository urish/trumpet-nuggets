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

  // Keith's Random Underground Music
  await playNote(C4, 116);
  await delay(5);
  await playNote(D4, 142);
  await delay(129);
  await playNote(E4, 144);
  await delay(252);
  await playNote(E4, 202);
  await delay(163);
  await playNote(E4, 157);
  await delay(90);
  await playNote(D4, 138);
  await delay(35);
  await playNote(C4, 164);
  await delay(244);
  await playNote(G4, 744);
  await delay(744);
  await playNote(E4, 340);
  await playNote(C4, 505);
  await delay(646);
  await playNote(C4, 178);
  await playNote(E4, 391);
  await delay(101);
  await playNote(G4, 395);
  await delay(568);
  await playNote(C4, 208);
  await playNote(C5, 245);
  await playNote(A3, 224);
  await playNote(A4, 150);
  await playNote(As3, 229);
  await playNote(As4, 214);
  await delay(913);
  await playNote(C4, 184);
  await playNote(C5, 256);
  await playNote(A3, 202);
  await playNote(A4, 167);
  await playNote(As3, 160);
  await playNote(As4, 322);
  await delay(813);
  await playNote(F3, 162);
  await playNote(F4, 272);
  await playNote(D4, 266);
  await delay(56);
  await playNote(Ds4, 501);
  await delay(470); 
})().catch(console.error);
