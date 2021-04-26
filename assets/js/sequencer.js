const howl = new Howl({
  "src": [
    "assets/audio/drumkit.webm",
    "assets/audio/drumkit.mp3"
  ],
  "sprite": {
    "clap": [
      0,
      734.2630385487529
    ],
    "closed-hihat": [
      2000,
      445.94104308390035
    ],
    "crash": [
      4000,
      1978.6848072562354
    ],
    "kick": [
      7000,
      553.0839002267571
    ],
    "open-hihat": [
      9000,
      962.7664399092968
    ],
    "snare": [
      11000,
      354.48979591836684
    ]
  }
});

const maxStep = 8;
const sequence = new Array(maxStep).fill();
let playing = false;
let currentStep = maxStep;
let timer;

// Preset sequence
reset();
sequence[0].kick = true;
sequence[4].snare = true;
sequence[4].kick = true;
sequence[2]['open-hihat'] = true;
sequence[0]['closed-hihat'] = true;
sequence[4]['closed-hihat'] = true;
sequence[6]['closed-hihat'] = true;
refresh();


document.getElementById('bpm').addEventListener('change', event => {
  if (!playing) return;
  stop();
  play();
});

document.getElementById('sequencer').addEventListener("click", event => {
  if (event.target.tagName == 'BUTTON') {
    event.preventDefault();
    let sound = event.target.dataset.sound;
    let step = event.target.dataset.step;
    sequence[step - 1][sound] = event.target.classList.toggle('step-enabled');
  }
});

document.getElementById('play').addEventListener("click", event => {
  if (playing) {
    // Stop
    stop();
    event.target.textContent = 'Play';
  } else {
    // Play
    play();
    event.target.textContent = 'Stop';
  }
  playing = !playing;
});

document.getElementById('reset').addEventListener("click", event => {
  reset();
  refresh();
});


function reset() {
  sequence.forEach((_step, i) => {
    sequence[i] = {
      "kick": false,
      "snare": false,
      "clap": false,
      "closed-hihat": false,
      "open-hihat": false,
      "crash": false,
    };
  });
}

function play() {
  let bpm = parseInt(document.getElementById('bpm').value);
  timer = setInterval(step, 60 / bpm * 250);
}

function stop() {
  if (timer) clearTimeout(timer);
  timer = null;
}

function refresh() {
  sequence.forEach((step, i) => {
    document.querySelectorAll(`.step-${i + 1}`).forEach(element => {
      element.classList.toggle('step-enabled', step[element.dataset.sound]);
    });
  });
}

function step() {
  document.querySelectorAll(`.step-${currentStep}`).forEach(element => {
    element.classList.remove('step-active');
  });
  currentStep++;
  if (currentStep > maxStep) currentStep = 1;
  for (const [sound, on] of Object.entries(sequence[currentStep - 1])) {
    if (on) howl.play(sound);
  }
  document.querySelectorAll(`.step-${currentStep}`).forEach(element => {
    element.classList.add('step-active');
  });
}
