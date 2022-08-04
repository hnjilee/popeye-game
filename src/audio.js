const background = new Audio('audio/background.m4a');
const eating = new Audio('audio/eating.wav');
const win = new Audio('audio/win.wav');
const lose = new Audio('audio/lose.wav');
const replay = new Audio('audio/replay.wav');

export function playBackground() {
  play(background);
}

export function playEating() {
  play(eating);
}

export function playWin() {
  play(win);
}

export function playLose() {
  play(lose);
}

export function playReplay() {
  play(replay);
}

export function pauseBackground() {
  background.pause();
}

function play(audio) {
  audio.currentTime = 0;
  audio.play();
}
