import { Reason } from './components/game.js';

const audioBackground = new Audio('/audio/background.m4a');
const audioSpinach = new Audio('/audio/spinach.wav');
const audioWin = new Audio('/audio/win.wav');
const audioLose = new Audio('/audio/lose.wav');
const audioBtn = new Audio('/audio/btn.wav');

export function playBackground() {
  play(audioBackground);
}

export function pauseBackground() {
  pause(audioBackground);
}

export function playSpinachClick() {
  play(audioSpinach);
}

export function playStop(reason) {
  switch (reason) {
    case Reason.win:
      playWin();
      break;
    case Reason.lose:
      playLose();
      break;
    case Reason.replay:
      playStopBtnClick();
      break;
    default:
      console.log(`${reason}: not handled reason`);
  }
}

function playWin() {
  play(audioWin);
}

function playLose() {
  play(audioLose);
}

function playStopBtnClick() {
  play(audioBtn);
}

function play(audio) {
  audio.currentTime = 0;
  audio.play();
}

function pause(audio) {
  audio.pause();
}
