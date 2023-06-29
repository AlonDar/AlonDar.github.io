var AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const masterVolume = context.createGain();
const oscVolume1 = context.createGain();
const oscVolume2 = context.createGain();
const oscVolume3 = context.createGain();
masterVolume.connect(context.destination);
volumeNodes = [oscVolume1, oscVolume2, oscVolume3];
for (i = 0; i < volumeNodes.length; i++) {
  volumeNodes[i].connect(masterVolume);
}
oscVolume1.connect(masterVolume);
//oscVolume2.connect(masterVolume.destination);
//oscVolume3.connect(masterVolume.destination);
oscVolume1.gain.value = 0.5;
oscVolume2.gain.value = 0.5;
oscVolume3.gain.value = 0.5;
masterVolume.gain.value = 0.1;
const oscillator1 = context.createOscillator();
const oscillator2 = context.createOscillator();
const oscillator3 = context.createOscillator();

const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const volumeControl = document.querySelector("#volume-control");
const volumeControl1 = document.querySelector("#volume-control1");
const volumeControl2 = document.querySelector("#volume-control2");
const volumeControl3 = document.querySelector("#volume-control3");
const detuneControl1 = document.querySelector("#detune-control1");
const detuneControl2 = document.querySelector("#detune-control2");
const detuneControl3 = document.querySelector("#detune-control3");

volumeControl.addEventListener("input", function () {
  masterVolume.gain.value = this.value;
});
volumeControl1.addEventListener("input", function () {
  oscVolume1.gain.value = this.value;
});
volumeControl2.addEventListener("input", function () {
  oscVolume2.gain.value = this.value;
});
volumeControl3.addEventListener("input", function () {
  oscVolume3.gain.value = this.value;
});

let detuneOne = 0;
let detuneTwo = 0;
let detuneThree = 0;
detuneControl1.addEventListener("input", function () {
  detuneOne = document.getElementById("detune-control1").value;
});
detuneControl2.addEventListener("input", function () {
  deunteTwo = document.getElementById("detune-control2").value;
});
detuneControl3.addEventListener("input", function () {
  detuneThree = document.getElementById("detune-control3").value;
});

let waveform1;
let waveform2;
let waveform3;
const waveforms1 = document.getElementsByName("waveform1");
const waveforms2 = document.getElementsByName("waveform2");
const waveforms3 = document.getElementsByName("waveform3");

function setWaveform1() {
  for (var i = 0; i < waveforms1.length; i++) {
    if (waveforms1[i].checked) {
      waveform1 = waveforms1[i].value;
      oscillator1.type = waveform1;
    }
  }
}
function setWaveform2() {
  for (var i = 0; i < waveforms2.length; i++) {
    if (waveforms2[i].checked) {
      waveform2 = waveforms2[i].value;
      oscillator2.type = waveform2;
    }
  }
}
function setWaveform3() {
  for (var i = 0; i < waveforms3.length; i++) {
    if (waveforms3[i].checked) {
      waveform3 = waveforms3[i].value;
      oscillator3.type = waveform3;
    }
  }
}
oscillator1.frequency.setValueAtTime(220, 0);
oscillator2.frequency.setValueAtTime(220, 0);
oscillator3.frequency.setValueAtTime(220, 0);
oscillator1.start();
oscillator2.start();
oscillator3.start();
startButton.addEventListener("click", function () {
  console.log("button clicked");
  setWaveform1();
  setWaveform2();
  setWaveform3();
  oscillator1.connect(oscVolume1);
  oscillator2.connect(oscVolume2);
  oscillator3.connect(oscVolume3);
  stopButton.addEventListener("click", function () {
    oscillator1.disconnect(oscVolume1);
    oscillator2.disconnect(oscVolume2);
    oscillator3.disconnect(oscVolume3);
  });
  waveforms1.forEach((waveformInputOne) => {
    waveformInputOne.addEventListener("change", function () {
      setWaveform1();
    });
  });
  waveforms2.forEach((waveformInputTwo) => {
    waveformInputTwo.addEventListener("change", function () {
      setWaveform2();
    });
  });
  waveforms3.forEach((waveformInputThree) => {
    waveformInputThree.addEventListener("change", function () {
      setWaveform3();
    });
  });
});
