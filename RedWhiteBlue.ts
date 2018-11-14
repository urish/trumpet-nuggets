
// Some MIDI constants
const NOTE_ON = 0x90;
const NOTE_OFF = 0x80;

// Notes you can play on the trumpet:
const notes = {
  F3: 53, Fs3: 54, G3: 55, Gs3: 56, A3: 57, As3: 58, B3: 59,
  C4: 60, Cs4: 61, D4: 62, Ds4: 63, E4: 64, F4: 65,
  Fs4: 66, G4: 67, Gs4: 68, A4: 69, As4: 70, B4: 71,
  C5: 72, Cs5: 73, D5: 74, Ds5: 75, E5: 76, F5: 77,
  Fs5: 78, G5: 79, Gs5: 80, A5: 81, As5: 82, B5: 83,
  C6: 84, Cs6: 85, D6: 86, Ds6: 87, E6: 88, F6: 89,
  Fs6: 90, G6: 91, Gs6: 92, A6: 93, As6: 94, B6: 95,
  C7: 96
};

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

  // Your code here:
  async function playNote(idx, duration) {
    noteOn(idx, 127);
    await delay(duration);
    noteOff(idx);
  }

  const whole = 1200;
  document.body.style.fontSize = '4em';

  const Player =
    {
      play: async function (lineNo: number, tune: string) {
        for (const line of tune.trim().split('\n')) {
          const l = line.trim();
          const des = l.split("/");
          const note = des[0].trim();
          const pt = des[1].split(".");
          const tx = (pt.length > 1) ? pt[1] : "";
          const ps = pt[0].split("*");
          let p = 0;
          if (ps.length === 1) { //    /4 - timing - integer part of a whole
            p = parseInt(ps[0]);
            if (isNaN(p)) { p = 1; }
          } else {               // .  /3*8 - timing - n * integer parts of a whole
            let pc = parseInt(ps[0]);
            if (isNaN(pc)) { pc = 1; }
            let pd = parseInt(ps[1]);
            if (isNaN(pd)) { pd = 1; }
            p = pd / pc; // reverse, because p is 'part' (divisor)
            if (isNaN(p)) { p = 1; }
          }
          p = Math.abs(p);
          if (note == "-") {
            document.body.innerHTML += " - "
            await delay(whole / p);
          } else {
            document.body.innerHTML += (" "+tx);
            document.body.scrollTop = document.body.scrollHeight;
            await playNote(notes[note], whole / p);      
          }
        }
      }
    };

  await Player.play(71,`
-/1.Break
F4/8.Oh
D4/8.-
As3/4.say,
D4/4.can
F4/4.you 
As4/2.see
D5/8.by
C5/8.the
As4/4.dawn's
D4/4.ear-
E4/4.ly
F4/2.light,
F4/8.What
F4/8.so
D5/4.proud-
C5/4.ly
As4/4.we
A4/2.hailed
G4/8.at
A4/8.the
As4/4.twi-
As4/4.light's
F4/4.last
D4/4.gleam-
As3/4.ing?
D5/8.And
D5/8.the
D5/4.rock-
Ds5/4.et's
F5/4.red
F5/2.glare,
Ds5/8.the
D5/8.bombs
C5/4.burst-
D5/4.ing
Ds5/4.in
Ds5/2.air,
Ds5/4.Gave
D5/4.proof
C5/4.thro'
As4/4.the
A4/2.night
G4/8.that
A4/8.our
As4/4.flag
D4/4.was
E4/4.still
F4/2.there,
F4/4.Oh,
As4/4.say,
As4/8,that
A4/8.-
G4/4.star
G4/4.span-
G4/4.gled
C5/4.ban-
Ds5/8.ner
D5/8.-
C5/8.yet
As4/8.-
As4/3*8.wave
A4/5*8.-
-/3*8.-
F4/8.O'er
F4/8.the
As4/3*8.land
C5/8.-
D5/3*16.of
Ds5/4.the
F5/3*4.free
As4/8.and
C5/8.the
D5/3*8.home
Ds5/3*16.of
C5/3*8.the
-/16.-
As4/3*2.brave?
-/1.Break
`);


})().catch(console.error);
