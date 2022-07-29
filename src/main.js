import Plate from './plate.js';
import Status from './status.js';
import PopUp from './pop-up.js';
import * as Sound from './audio.js';

const TIME_LIMIT_IN_SEC = 5;
const NUM_OF_SPIANACH = 3;
const NUM_OF_POISON = 3;
const ITEM_SIZE = 50;

const instruction = document.querySelector('.instruction');
const playgroundBtn = document.querySelector('.playground__btn');
const timerNumber = document.querySelector('.timer__number');
const timerBarValue = document.querySelector('.timer__bar-value');

let started = false;
let timer;
let counter = 0;

const plate = new Plate(NUM_OF_SPIANACH, NUM_OF_POISON, ITEM_SIZE);
const popeyeStatus = new Status(NUM_OF_SPIANACH);
const popUp = new PopUp();

instruction.addEventListener('click', () =>
  instruction.classList.add('instruction--hidden')
);

playgroundBtn.addEventListener('click', () => {
  if (!started) {
    start();
  } else {
    stop('replay');
  }
});

popUp.setReplayClickListener(() => {
  reset();
  start();
});

popUp.setCancelClickListener(reset);

function start() {
  started = true;
  showStopBtn();
  startTimer();
  plate.init();
  Sound.playBackground();
}

function stop(reason) {
  started = false;
  popUp.show(reason);
  disableBtn();
  stopTimer();
  popeyeStatus.change(reason);
  Sound.pauseBackground();
}

function reset() {
  popUp.hide();
  resetBtn();
  resetTimer();
  plate.clear();
  counter = 0;
  popeyeStatus.reset();
}

function showStopBtn() {
  playgroundBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
}

function disableBtn() {
  playgroundBtn.setAttribute('disabled', true);
}

function resetBtn() {
  playgroundBtn.removeAttribute('disabled');
  playgroundBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
}

function startTimer() {
  const timeLimitInSec = TIME_LIMIT_IN_SEC;
  let remainingSeconds = timeLimitInSec;

  updateTimerNumber(remainingSeconds);
  updateTimerBar(timeLimitInSec, remainingSeconds);

  timer = setInterval(() => {
    updateTimerNumber(--remainingSeconds);
    updateTimerBar(timeLimitInSec, remainingSeconds);
    if (remainingSeconds > 0) {
      return;
    }
    stopTimer();
    if (counter < NUM_OF_SPIANACH) {
      stop('lose');
    }
  }, 1000);
}

function updateTimerNumber(remainingSeconds) {
  timerNumber.textContent = formatTime(remainingSeconds);
}

function updateTimerBar(timeLimitInSec, remainingSeconds) {
  timerBarValue.style.width = `${(remainingSeconds / timeLimitInSec) * 100}%`;
}

function formatTime(seconds) {
  const min = Math.trunc(seconds / 60);
  const sec = Math.trunc(seconds % 60);
  const formattedMin = min >= 10 ? min : `0${min}`;
  const formattedSec = sec >= 10 ? sec : `0${sec}`;
  return `${formattedMin}:${formattedSec}`;
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  timerNumber.textContent = '00:00';
  timerBarValue.style.width = '0';
}

plate.setItemClickListener((target, itemName) => {
  if (!started) {
    return;
  }

  if (itemName === 'spinach') {
    Sound.playEating();
    target.remove();
    counter++;
    popeyeStatus.scale(counter);
    if (counter < NUM_OF_SPIANACH) {
      return;
    }
    stop('win');
  } else {
    stop('lose');
  }
});
