import Progress from './progress.js';
import Plate from './plate.js';
import Status from './status.js';
import PopUp from './pop-up.js';
import * as Sound from './audio.js';

const TIME_LIMIT_IN_SEC = 5;
const NUM_OF_SPIANACH = 3;
const NUM_OF_POISON = 3;
const ITEM_SIZE = 50;

const instruction = document.querySelector('.instruction');

let started = false;
let counter = 0;

const progress = new Progress(TIME_LIMIT_IN_SEC);
const plate = new Plate(NUM_OF_SPIANACH, NUM_OF_POISON, ITEM_SIZE);
const popeyeStatus = new Status(NUM_OF_SPIANACH);
const popUp = new PopUp();

instruction.addEventListener('click', () =>
  instruction.classList.add('instruction--hidden')
);

progress.setBtnClickListener(() => {
  if (!started) {
    start();
  } else {
    stop('replay');
  }
});

progress.setTimeLimitExceedListener(() => stop('lose'));

popUp.setReplayClickListener(() => {
  reset();
  start();
});

popUp.setCancelClickListener(reset);

function start() {
  started = true;
  progress.showStopBtn();
  progress.startTimer();
  plate.init();
  Sound.playBackground();
}

function stop(reason) {
  started = false;
  popUp.show(reason);
  progress.disableBtn();
  progress.stopTimer();
  popeyeStatus.change(reason);
  Sound.pauseBackground();
}

function reset() {
  popUp.hide();
  progress.resetBtn();
  progress.resetTimer();
  plate.clear();
  counter = 0;
  popeyeStatus.reset();
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
