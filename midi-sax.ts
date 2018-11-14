(async function() {
  const midi = await navigator.requestMIDIAccess();
  const midiOutput = Array.from(midi.outputs.values())
    .find(o => o.name.includes('Teensy'));
  const midiInput = Array.from(midi.inputs.values())
    .find(o => o.name.includes('EWI-USB'));

  // Forward all MIDI events from the Sax to trumpet
  midiInput.onmidimessage = ({data}) => {
    midiOutput.send([data[0], data[1], data[2] ? 127 : 0]);
    const color = (data[1] - 46) * 5;
    document.body.style.fontSize = '4em';
    if (data[0] === 0x90 && data[2]) {
      document.body.style.backgroundColor = `hsl(${color},50%,50%)`;
      document.body.innerHTML = 'Note index: ' + data[1];
    }
  };

})().catch(console.error);
