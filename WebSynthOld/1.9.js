const audioContext = new AudioContext();
const oscList = [];
let mainGainNode = null;
const keyboard = document.querySelector(".keyboard");
const wavePicker = document.querySelector("select[name='waveform']");
const volumeControl = document.querySelector("input[name='volume']");
let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;
function changeVolume(event) {
  mainGainNode.gain.value = volumeControl.value;
}
function noteReleased(event) {
  const dataset = event.target.dataset;

  if (dataset && dataset["pressed"]) {
    const octave = Number(dataset["octave"]);
    oscList[octave][dataset["note"]].stop();
    delete oscList[octave][dataset["note"]];
    delete dataset["pressed"];
  }
}
function notePressed(event) {
  if (event.buttons & 1) {
    const dataset = event.target.dataset;

    if (!dataset["pressed"]) {
      const octave = Number(dataset["octave"]);
      oscList[octave][dataset["note"]] = playTone(dataset["frequency"]);
      dataset["pressed"] = "yes";
    }
  }
}
function createKey(note, octave, freq) {
  const keyElement = document.createElement("div");
  const labelElement = document.createElement("div");

  keyElement.className = "key";
  keyElement.dataset["octave"] = octave;
  keyElement.dataset["note"] = note;
  keyElement.dataset["frequency"] = freq;

  labelElement.innerHTML = `${note}<sub>${octave}</sub>`;
  keyElement.appendChild(labelElement);

  keyElement.addEventListener("mousedown", notePressed, false);
  keyElement.addEventListener("mouseup", noteReleased, false);
  keyElement.addEventListener("mouseover", notePressed, false);
  keyElement.addEventListener("mouseleave", noteReleased, false);

  return keyElement;
}
function createNoteTable() {
  const noteFreq = [];
  for (let i = 0; i < 9; i++) {
    noteFreq[i] = [];
  }

  noteFreq[0]["A"] = 27.5;
  noteFreq[0]["A#"] = 29.135235094880619;
  noteFreq[0]["B"] = 30.867706328507756;

  noteFreq[1]["C"] = 32.703195662574829;
  noteFreq[1]["C#"] = 34.647828872109012;
  noteFreq[1]["D"] = 36.708095989675945;
  noteFreq[1]["D#"] = 38.890872965260113;
  noteFreq[1]["E"] = 41.203444614108741;
  noteFreq[1]["F"] = 43.653528929125485;
  noteFreq[1]["F#"] = 46.249302838954299;
  noteFreq[1]["G"] = 48.999429497718661;
  noteFreq[1]["G#"] = 51.913087197493142;
  noteFreq[1]["A"] = 55.0;
  noteFreq[1]["A#"] = 58.270470189761239;
  noteFreq[1]["B"] = 61.735412657015513;
  // …
  noteFreq[2]["C"] = 65.41;
  noteFreq[2]["C#"] = 69.3;
  noteFreq[2]["D"] = 73.42;
  noteFreq[2]["D#"] = 77.78;
  noteFreq[2]["E"] = 82.41;
  noteFreq[2]["F"] = 87.31;
  noteFreq[2]["F#"] = 92.5;
  noteFreq[2]["G"] = 98.0;
  noteFreq[2]["G#"] = 103.83;
  noteFreq[2]["A"] = 110.0;
  noteFreq[2]["A#"] = 116.54;
  noteFreq[2]["B"] = 123.47;
  // …
  noteFreq[3]["C"] = 130.81;
  noteFreq[3]["C#"] = 138.59;
  noteFreq[3]["D"] = 146.83;
  noteFreq[3]["D#"] = 155.56;
  noteFreq[3]["E"] = 164.81;
  noteFreq[3]["F"] = 174.61;
  noteFreq[3]["F#"] = 185.0;
  noteFreq[3]["G"] = 196.0;
  noteFreq[3]["G#"] = 207.65;
  noteFreq[3]["A"] = 220.0;
  noteFreq[3]["A#"] = 233.08;
  noteFreq[3]["B"] = 246.94;
  // …
  noteFreq[4]["C"] = 261.63;
  noteFreq[4]["C#"] = 277.18;
  noteFreq[4]["D"] = 293.66;
  noteFreq[4]["D#"] = 311.13;
  noteFreq[4]["E"] = 329.63;
  noteFreq[4]["F"] = 349.23;
  noteFreq[4]["F#"] = 369.99;
  noteFreq[4]["G"] = 392.0;
  noteFreq[4]["G#"] = 415.3;
  noteFreq[4]["A"] = 440.0;
  noteFreq[4]["A#"] = 466.16;
  noteFreq[4]["B"] = 493.88;
  // …
  noteFreq[5]["C"] = 523.25;
  noteFreq[5]["C#"] = 554.37;
  noteFreq[5]["D"] = 587.33;
  noteFreq[5]["D#"] = 622.25;
  noteFreq[5]["E"] = 659.25;
  noteFreq[5]["F"] = 698.46;
  noteFreq[5]["F#"] = 739.99;
  noteFreq[5]["G"] = 783.99;
  noteFreq[5]["G#"] = 830.61;
  noteFreq[5]["A"] = 880.0;
  noteFreq[5]["A#"] = 932.33;
  noteFreq[5]["B"] = 987.77;
  // …
  noteFreq[6]["C"] = 32.703195662574829;
  noteFreq[6]["C#"] = 34.647828872109012;
  noteFreq[6]["D"] = 36.708095989675945;
  noteFreq[6]["D#"] = 38.890872965260113;
  noteFreq[6]["E"] = 41.203444614108741;
  noteFreq[6]["F"] = 43.653528929125485;
  noteFreq[6]["F#"] = 46.249302838954299;
  noteFreq[6]["G"] = 48.999429497718661;
  noteFreq[6]["G#"] = 51.913087197493142;
  noteFreq[6]["A"] = 55.0;
  noteFreq[6]["A#"] = 58.270470189761239;
  noteFreq[6]["B"] = 61.735412657015513;
  // …
  noteFreq[7]["C"] = 2093.004522404789077;
  noteFreq[7]["C#"] = 2217.461047814976769;
  noteFreq[7]["D"] = 2349.318143339260482;
  noteFreq[7]["D#"] = 2489.015869776647285;
  noteFreq[7]["E"] = 2637.020455302959437;
  noteFreq[7]["F"] = 2793.825851464031075;
  noteFreq[7]["F#"] = 2959.955381693075191;
  noteFreq[7]["G"] = 3135.963487853994352;
  noteFreq[7]["G#"] = 3322.437580639561108;
  noteFreq[7]["A"] = 3520.0;
  noteFreq[7]["A#"] = 3729.310092144719331;
  noteFreq[7]["B"] = 3951.066410048992894;

  noteFreq[8]["C"] = 4186.009044809578154;
  return noteFreq;
}
function setup() {
  noteFreq = createNoteTable();

  volumeControl.addEventListener("change", changeVolume, false);

  mainGainNode = audioContext.createGain();
  mainGainNode.connect(audioContext.destination);
  mainGainNode.gain.value = volumeControl.value;

  // Create the keys; skip any that are sharp or flat; for
  // our purposes we don't need them. Each octave is inserted
  // into a <div> of class "octave".

  noteFreq.forEach((keys, idx) => {
    const keyList = Object.entries(keys);
    const octaveElem = document.createElement("div");
    octaveElem.className = "octave";

    keyList.forEach((key) => {
      if (key[0].length === 1) {
        octaveElem.appendChild(createKey(key[0], idx, key[1]));
      }
    });

    keyboard.appendChild(octaveElem);
  });
  sineTerms = new Float32Array([0, 0, 1, 0, 1]);
  cosineTerms = new Float32Array(sineTerms.length);
  customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);

  for (let i = 0; i < 9; i++) {
    oscList[i] = {};
  }
}
/*document
  .querySelector("div[data-note='B'][data-octave='5']")
  .scrollIntoView(false);*/
function playTone(freq) {
  const osc = audioContext.createOscillator();
  osc.connect(mainGainNode);

  const type = wavePicker.options[wavePicker.selectedIndex].value;

  if (type === "custom") {
    osc.setPeriodicWave(customWaveform);
  } else {
    osc.type = type;
  }

  osc.frequency.value = freq;
  osc.start();

  return osc;
}

setup();
