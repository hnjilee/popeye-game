const audioBackground = new Audio('/audio/background.m4a');
const audioSpinach = new Audio('/audio/spinach.wav');
const audioWin = new Audio('/audio/win.wav');
const audioLose = new Audio('/audio/lose.wav');
const audioBtn = new Audio('/audio/btn.wav');

export function playBackground() {
  play(audioBackground);
}

export function playSpinachClick() {
  play(audioSpinach);
}

export function playWin() {
  play(audioWin);
}

export function playLose() {
  play(audioLose);
}

export function playStopBtnClick() {
  play(audioBtn);
}

function play(audio) {
  audio.currentTime = 0;
  audio.play();
}

function pause(audio) {
  audio.pause();
}
