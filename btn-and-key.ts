// Some MIDI constants
const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;

// Notes you can play on the trumpet:
const
  F3 = 53, Fs3 = 54, G3 = 55, Gs3 = 56, A3 = 57, As3 = 58, B3 = 59,
  C4 = 60, Cs4 = 61, D4 = 62, Ds4 = 63,  E4 = 64, F4 = 65,
  Fs4 = 66, G4 = 67, Gs4 = 68, A4 = 69, As4 = 70, B4 = 71,
  C5 = 72, Cs5 = 73, D5 = 74, Ds5 = 75,  E5 = 76, F5 = 77,
  Fs5 = 78, G5 = 79, Gs5 = 80, A5 = 81, As5 = 82, B5 = 83,
  C6 = 84, Cs6 = 85, D6 = 86, Ds6 = 87,  E6 = 88, F6 = 89,
  Fs6 = 90, G6 = 91, Gs6 = 92, A6 = 93, As6 = 94, B6 = 95,
  C7 = 96;

const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

(async function() {
  const midi = await navigator.requestMIDIAccess();
  const midiOutput = Array.from(midi.outputs.values())
    .find(o => o.name.includes('Teensy'));

  const noteOn = (idx, velocity = 127) =>
    midiOutput.send([NOTE_ON, idx, velocity]);

  const noteOff = (idx) =>
    midiOutput.send([NOTE_OFF, idx, 0]);

  document.body.style.background='pink';
  const btn = document.createElement('button');
  btn.innerText = 'Play C4';
  btn.addEventListener('mousedown', () => {
    noteOn(C4);    
  });
  btn.addEventListener('mouseup', () => {
    noteOff(C4);    
  });
  const keyMap = {
    q: C4,
    w: D4,
    e: E4,
    r: F4,
    t: G4,
    y: A4,
    u: B4,
    i: C5
  };
  window.addEventListener('keydown', (e) => {
    if (keyMap[e.key]) {
      noteOn(keyMap[e.key]);          
    }
  });
  window.addEventListener('keyup', (e) => {
    if (keyMap[e.key]) {
      noteOff(keyMap[e.key]);          
    }
  });
  document.body.appendChild(btn);

})().catch(console.error);
