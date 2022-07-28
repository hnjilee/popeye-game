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
const replayBtn = document.querySelector('.pop-up__replay');
const cancelBtn = document.querySelector('.pop-up__cancel');

let started = false;
let timer;
let counter = 0;

const audioBackground = new Audio('audio/background.m4a');
const audioEating = new Audio('audio/eating.wav');
const audioWin = new Audio('audio/win.wav');
const audioLose = new Audio('audio/lose.wav');
const audioReplay = new Audio('audio/replay.wav');

playgroundBtn.addEventListener('click', () => {
  if (!started) {
    start();
  } else {
    stop('replay');
  }
});

replayBtn.addEventListener('click', () => {
  reset();
  start();
});

cancelBtn.addEventListener('click', () => {
  reset();
});

function start() {
  started = true;
  showStopBtn();
  startTimer();
  initPlate();
  playAudio(audioBackground);
}

function stop(reason) {
  started = false;
  showPopUp(reason);
  disableBtn();
  stopTimer();
  changePopeye(reason);
  audioBackground.pause();
}

function reset() {
  hidePopUp();
  resetBtn();
  resetTimer();
  clearPlate();
  counter = 0;
  resetPopeye();
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
  playAudio(audioEating);
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

function changePopeye(reason) {
  if (reason === 'replay') {
    return;
  }
  popeyeImg.style.width = '100%';
  popeyeImg.style.height = '100%';
  popeyeImg.setAttribute('src', `images/${reason}.png`);
}

function resetPopeye() {
  popeyeImg.removeAttribute('style');
  popeyeImg.setAttribute('src', 'images/default.png');
}

function clearPlate() {
  plate.innerHTML =
    '<img src="images/plate.png" alt="plate" class="plate__img" />';
}

function showPopUp(reason) {
  fillPopUpMessage(reason);
  popUp.classList.remove('pop-up--hidden');
}

function fillPopUpMessage(reason) {
  switch (reason) {
    case 'win':
      popUpMessage.textContent = 'I GOT STRONG 💪';
      playAudio(audioWin);
      break;
    case 'lose':
      popUpMessage.textContent = 'I AM DEAD 👻';
      playAudio(audioLose);
      break;
    case 'replay':
      popUpMessage.textContent = 'Wanna replay?';
      playAudio(audioReplay);
      break;
    default:
      throw new Error('not handled reason');
  }
}

function hidePopUp() {
  popUp.classList.add('pop-up--hidden');
}

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}
