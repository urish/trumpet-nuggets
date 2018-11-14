async function connectToRope() {
  const ropeService = '8fc3fc00-f21d-11e3-976c-0002a5d5c51b';
  const ropeCharacheristic = '8fc3fc25-f21d-11e3-976c-0002a5d5c51b'
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: [0xfc00] }],
    optionalServices: [ropeService]
  });
  const gatt = await device.gatt.connect();
  const service = await gatt.getPrimaryService(ropeService);
  const char = await service.getCharacteristic(ropeCharacheristic);
  char.addEventListener('characteristicvaluechanged', () => {
    console.log(char.value);
  });
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
    await connectToRope();
  });
  document.body.appendChild(button);

})().catch(console.error);
