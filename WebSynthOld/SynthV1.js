var AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const masterVolume = context.createGain();
const oscVolume1 = context.createGain();
const oscVolume2 = context.createGain();
const oscVolume3 = context.createGain();
masterVolume.connect(context.destination);

const startButton1 = document.querySelector("#start1");
const stopButton1 = document.querySelector("#stop1");
const startButton2 = document.querySelector("#start2");
const stopButton2 = document.querySelector("#stop2");
const startButton3 = document.querySelector("#start3");
const stopButton3 = document.querySelector("#stop3");
const volumeControl = document.querySelector("#volume-control");
masterVolume.gain.value = 0.1;

volumeControl.addEventListener("input", changeVolume);

function changeVolume() {
  masterVolume.gain.value = this.value;
}

let detuneOne = 0;
function grabDetuneOne() {
  detuneOne = document.getElementById("detune-control1").value;
}
let detuneTwo = 0;
function grabDetuneTwo() {
  detuneTwo = document.getElementById("detune-control2").value;
}
let detuneThree = 0;
function grabDetuneThree() {
  detuneThree = document.getElementById("detune-control3").value;
}

const waveforms1 = document.getElementsByName("waveform1");
let waveform1;
const waveforms2 = document.getElementsByName("waveform2");
let waveform2;
const waveforms3 = document.getElementsByName("waveform3");
let waveform3;

function setWaveform1() {
  for (var i = 0; i < waveforms1.length; i++) {
    if (waveforms1[i].checked) {
      waveform1 = waveforms1[i].value;
    }
  }
}
function setWaveform2() {
  for (var i = 0; i < waveforms2.length; i++) {
    if (waveforms2[i].checked) {
      waveform2 = waveforms2[i].value;
    }
  }
}
function setWaveform3() {
  for (var i = 0; i < waveforms3.length; i++) {
    if (waveforms3[i].checked) {
      waveform3 = waveforms3[i].value;
    }
  }
}
function summation() {
  //data from osc1
  //data from osc2
  //data from osc3
  //output=1+2+3
}

startButton1.addEventListener("click", function () {
  const oscillator1 = context.createOscillator();
  grabDetuneOne();
  const frequencyOne = 220 - detuneOne;
  oscillator1.frequency.setValueAtTime(frequencyOne, 0);
  oscillator1.connect(masterVolume);
  oscillator1.start(0);
  oscillator1.type = waveform1;
  stopButton1.addEventListener("click", function () {
    oscillator1.stop(0);
    delete oscillator1;
  });
  waveforms1.forEach((waveformInput) => {
    waveformInput.addEventListener("change", function () {
      setWaveform1();
      oscillator1.type = waveform1;
    });
  });
});
startButton2.addEventListener("click", function () {
  const oscillator2 = context.createOscillator();
  grabDetuneTwo();
  const frequencyTwo = 220 - detuneTwo;
  console.log(frequencyTwo);
  oscillator2.frequency.setValueAtTime(frequencyTwo, 0);
  oscillator2.connect(masterVolume);
  oscillator2.start(0);
  oscillator2.type = waveform2;
  stopButton2.addEventListener("click", function () {
    oscillator2.stop(0);
    delete oscillator2;
  });
  waveforms2.forEach((waveformInput) => {
    waveformInput.addEventListener("change", function () {
      setWaveform2();
      oscillator2.type = waveform2;
    });
  });
});

startButton3.addEventListener("click", function () {
  const oscillator3 = context.createOscillator();
  grabDetuneThree();
  const frequencyThree = 220 - detuneThree;
  oscillator3.frequency.setValueAtTime(frequencyThree, 0);
  oscillator3.connect(masterVolume);
  oscillator3.start(0);
  oscillator3.type = waveform3;
  stopButton3.addEventListener("click", function () {
    oscillator3.stop(0);
    delete oscillator3;
  });
  waveforms3.forEach((waveformInput) => {
    waveformInput.addEventListener("change", function () {
      setWaveform3();
      oscillator3.type = waveform3;
    });
  });
});
