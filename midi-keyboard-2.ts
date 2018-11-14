(async function() {
  const midi = await navigator.requestMIDIAccess();
  const midiOutput = Array.from(midi.outputs.values())
    .find(o => o.name.includes('Teensy'));
  const midiInput = Array.from(midi.inputs.values())
    .find(o => o.name.includes('Keystation'));

  document.body.style.wordWrap = 'break-word';
  document.body.style.lineHeight = '40px';

  // Forward all MIDI events from Keyboard to trumpet
  midiInput.onmidimessage = ({data}) => {
    midiOutput.send([data[0], data[1], data[2] ? 127 : 0]);
    const colors = ['red', 'green', 'blue'];
    const color = (data[1] - 46) * 5;
    const position = (data[1] - 46) - 30;
    document.body.style.backgroundColor = `hsl(${color},50%,50%)`;
    if (data[2]) {
      document.body.innerHTML +=
         `<span style="position: relative; bottom: ${position}">♩</span>`;
    }
  };

})().catch(console.error);
