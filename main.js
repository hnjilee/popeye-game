'use strict';

const TIME_LIMIT_IN_SEC = 5;
const NUM_OF_SPIANACH = 3;
const NUM_OF_POISON = 3;
const ITEM_SIZE = 50;

const playgroundBtn = document.querySelector('.playground__btn');
const timerNumber = document.querySelector('.timer__number');
const timerBarValue = document.querySelector('.timer__bar-value');
const plate = document.querySelector('.playground__plate');
const plateRect = plate.getBoundingClientRect();

playgroundBtn.addEventListener('click', () => start());

function start() {
  switchBtn();
  startTimer();
  initPlate();
}

function switchBtn() {
  playgroundBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
}

function startTimer() {
  const timeLimitInSec = TIME_LIMIT_IN_SEC;
  let remainingSeconds = timeLimitInSec;

  updateTimerNumber(remainingSeconds);
  updateTimerBar(timeLimitInSec, remainingSeconds);

  const timer = setInterval(() => {
    updateTimerNumber(--remainingSeconds);
    updateTimerBar(timeLimitInSec, remainingSeconds);
    if (remainingSeconds > 0) {
      return;
    }
    clearInterval(timer);
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

function initPlate() {
  displayItems('spinach', NUM_OF_SPIANACH);
  displayItems('poison', NUM_OF_POISON);
}

function displayItems(itemName, numOfItems) {
  for (let i = 0; i < numOfItems; i++) {
    const item = document.createElement('img');
    item.setAttribute('src', `images/${itemName}.png`);
    item.setAttribute('class', 'playground__item');

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
