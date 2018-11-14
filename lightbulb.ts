async function connectToBulb() {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: [0xffe5] }]
  });
  const gatt = await device.gatt.connect();
  const service = await gatt.getPrimaryService(0xffe5);
  const char = await service.getCharacteristic(0xffe9);
  return {
    setColor(r, g, b) {
      return char.writeValue(new Uint8Array([
        0x56, r, g, b, 0x00, 0xf0, 0xaa
      ]));
    }
  }
}

(async function () {
  const midi = await navigator.requestMIDIAccess();
  const midiOutput = Array.from(midi.outputs.values())
    .find(o => o.name.includes('Teensy'));
  const midiInput = Array.from(midi.inputs.values())
    .find(o => o.name.includes('Keystation'));

  const button = document.createElement('button');
  button.innerText = 'Connect!';
  button.addEventListener('click', async () => {
    const device = await connectToBulb();
    await device.setColor(0x80, 0, 0);
    setTimeout(() => device.setColor(0, 0, 0), 500);
    
    //Forward all MIDI events from Keyboard to trumpet
    let lastNote = undefined;
    midiInput.onmidimessage = ({ data }) => {
      if (data[2]) {
        lastNote = data[1];
        const colors = [
          [0x80, 0, 0], // C
          [0, 0x80, 0],
          [0, 0, 0x80], // D
          [0x80, 0x80, 0],
          [0, 0x80, 0x80], // E
          [0x80, 0x80, 0x80],  // F
          [0x80, 0, 0], 
          [0, 0x80, 0], // G
          [0, 0, 0x80], 
          [0x80, 0x80, 0], // A
          [0, 0x80, 0x80],
          [0x80, 0x80, 0x80], // B          
        ];
        const noteIdx = data[1];
        const color = colors[noteIdx % colors.length];
        device.setColor(color[0], color[1], color[2]);
      } else if (data[1] == lastNote) {
        device.setColor(0, 0, 0);
        lastNote = undefined;
      }
      midiOutput.send([data[0], data[1], data[2] ? 127 : 0]);
    }
  });
  document.body.appendChild(button);

})().catch(console.error);
