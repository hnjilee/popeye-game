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
const popeyeImg = document.querySelector('.popeye__img');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');

let started = false;
let timer;
let counter = 0;

playgroundBtn.addEventListener('click', () => {
  if (!started) {
    start();
  } else {
    stop();
  }
});

function start() {
  started = true;
  switchBtn();
  startTimer();
  initPlate();
}

function stop(reason) {
  started = false;
  showPopUp(reason);
  disableBtn();
  stopTimer();
  changePopeye(reason);
}

function switchBtn() {
  playgroundBtn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
}

function disableBtn() {
  playgroundBtn.setAttribute('disabled', true);
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

function stopTimer() {
  clearInterval(timer);
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
  if (!target.classList.contains('playground__item')) {
    return;
  }

  if (target.classList.contains('spinach')) {
    onSpinachClick(target);
  } else {
    stop('lose');
  }
});

function onSpinachClick(target) {
  target.remove();
  counter++;
  scalePopeye();
  if (counter < NUM_OF_SPIANACH) {
    return;
  }
  stop('win');
}

function scalePopeye() {
  popeyeImg.style.width = `${50 + (counter / NUM_OF_SPIANACH) * 50}%`;
  popeyeImg.style.height = `${50 + (counter / NUM_OF_SPIANACH) * 50}%`;
}

function showPopUp(reason) {
  fillPopUpMessage(reason);
  popUp.classList.remove('pop-up--hidden');
}

function fillPopUpMessage(reason) {
  switch (reason) {
    case 'win':
      popUpMessage.textContent = 'I GOT STRONG 💪';
      break;
    case 'lose':
      popUpMessage.textContent = 'I AM DEAD 👻';
      break;
    case 'replay':
      popUpMessage.textContent = 'Wanna replay?';
      break;
    default:
      throw new Error('not handled reason');
  }
}

function changePopeye(reason) {
  popeyeImg.classList.remove('popeye__default');
  popeyeImg.setAttribute('src', `images/${reason}.png`);
}
