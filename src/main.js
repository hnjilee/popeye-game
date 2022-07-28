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
const plate = document.querySelector('.playground__plate');
const plateRect = plate.getBoundingClientRect();

let started = false;
let timer;
let counter = 0;

const popeyeStatus = new Status();
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
  initPlate();
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
  clearPlate();
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

function initPlate() {
  displayItems('spinach', NUM_OF_SPIANACH);
  displayItems('poison', NUM_OF_POISON);
}

function displayItems(itemName, numOfItems) {
  for (let i = 0; i < numOfItems; i++) {
    const item = document.createElement('img');
    item.setAttribute('src', `images/${itemName}.png`);
    item.setAttribute('class', 'playground__item');
    item.classList.add(itemName);

    const x = random(0, plateRect.width - ITEM_SIZE);
    const y = random(0, plateRect.height - ITEM_SIZE);
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;

    plate.append(item);
  }
}

function random(min, max) {
  return Math.trunc(Math.random() * (max - min + 1) + min);
}

plate.addEventListener('click', e => {
  if (!started) {
    return;
  }

  const target = e.target;
  if (!target.matches('.playground__item')) {
    return;
  }

  if (target.matches('.spinach')) {
    onSpinachClick(target);
  } else {
    stop('lose');
  }
});

function onSpinachClick(target) {
  Sound.playEating();
  target.remove();
  counter++;
  popeyeStatus.scale(counter, NUM_OF_SPIANACH);
  if (counter < NUM_OF_SPIANACH) {
    return;
  }
  stop('win');
}

function clearPlate() {
  plate.innerHTML =
    '<img src="images/plate.png" alt="plate" class="plate__img" />';
}
