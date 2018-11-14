(async function() {
  const midi = await navigator.requestMIDIAccess();
  const midiOutput = Array.from(midi.outputs.values())
    .find(o => o.name.includes('Teensy'));
  const midiInput = Array.from(midi.inputs.values())
    .find(o => o.name.includes('Keystation'));

  // Forward all MIDI events from Keyboard to trumpet
  midiInput.onmidimessage = ({data}) => 
    midiOutput.send([data[0], data[1], data[2] ? 127 : 0]);

})().catch(console.error);
