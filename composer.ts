// Notes you can play on the trumpet:
const noteMap = new Map([
  [53, 'F3'], [54, 'Fs3'], [55, 'G3'], [56, 'Gs3'],
  [57, 'A3'], [58, 'As3'], [59, 'B3'], [60, 'C4'],
  [61, 'Cs4'], [62, 'D4'], [63, 'Ds4'], [64, 'E4'],
  [65, 'F4'], [66, 'Fs4'], [67, 'G4'], [68, 'Gs4'],
  [69, 'A4'], [70, 'As4'], [71, 'B4'], [72, 'C5'],
  [73, 'Cs5'], [74, 'D5'], [75, 'Ds5'], [76, 'E5'],
  [77, 'F5'], [78, 'Fs5'], [79, 'G5'], [80, 'Gs5'],
  [81, 'A5'], [82, 'As5'], [83, 'B5'], [84, 'C6'],
  [85, 'Cs6'], [86, 'D6'], [87, 'Ds6'], [88, 'E6'],
  [89, 'F6'], [90, 'Fs6'], [91, 'G6'], [92, 'Gs6'],
  [93, 'A6'], [94, 'As6'], [95, 'B6'], [96, 'C7'],
]);

(async function() {
  const midi = await navigator.requestMIDIAccess();
  const midiOutput = Array.from(midi.outputs.values())
    .find(o => o.name.includes('Teensy'));
  const midiInput = Array.from(midi.inputs.values())
    .find(o => o.name.includes('Keystation'));

  let heldNote = undefined;
  let noteStart = undefined;
  let pauseStart = undefined;
  midiInput.onmidimessage = ({timeStamp, data}) => {
    // Forward all MIDI events from Keyboard to trumpet
    if (midiOutput) {
      midiOutput.send([data[0], data[1], data[2] ? 127 : 0]);
    }

    let note = noteMap.get(data[1]);

    // Write the code to play the notes
    if (data[2] > 0) {
      // Override the currently held note if necessary
      if (heldNote !== undefined) {
        let duration = Math.round(timeStamp - noteStart);
        document.body.innerHTML += `await playNote(${heldNote}, ${duration});<br>`;
      }

      // Record the delay since the last note
      if (pauseStart !== undefined) {
        let duration = Math.round(timeStamp - pauseStart);
        document.body.innerHTML += `await delay(${duration});<br>`;
        pauseStart = undefined;
      }

      // Start holding a new note
      heldNote = noteMap.get(data[1]);
      noteStart = timeStamp;
    } else if (data[2] == 0 && heldNote == note) {
      // Record the released note if it is the one that was held
      let duration = Math.round(timeStamp - noteStart);
      document.body.innerHTML += `await playNote(${heldNote}, ${duration});<br>`;
      heldNote = undefined;
      noteStart = undefined;
      pauseStart = timeStamp;
    }
  };

})().catch(console.error);
