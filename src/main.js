import { Instruction } from './components/instruction.js';
import { Status } from './components/status.js';
import { Playground } from './components/playground.js';
import { Counter } from './components/counter.js';
import { Modal } from './components/modal.js';
import * as Sound from './sound.js';

const TIME_LIMIT_IN_SEC = 3;
const NUM_OF_ITMES = 3;

export let started = false;
let count = 0;

const gameInstruction = new Instruction();

const gameStatus = new Status();
gameStatus.setBtnClickListener(() => {
  if (!started) {
    startGame();
  } else {
    stopGame('replay');
  }
});
gameStatus.setTimeLimitExceeded(() => stopGame('lose'));

const gamePlayground = new Playground(NUM_OF_ITMES);
const gameCounter = new Counter(NUM_OF_ITMES);

gamePlayground.setSpinachClickListener(() => {
  gameCounter.increasePopeye(++count);
  if (count === NUM_OF_ITMES) {
    stopGame('win');
  }
});

const gameModal = new Modal();
gameModal.setReplayListener(() => {
  resetGame();
  startGame();
});
gameModal.setCancelListener(() => {
  resetGame();
  gameInstruction.show();
});

gamePlayground.setPoisonClickListener(() => {
  stopGame('lose');
});

function startGame() {
  started = true;
  Sound.playBackground();
  gameStatus.switchBtn(started);
  gameStatus.startTimer(TIME_LIMIT_IN_SEC);
  gamePlayground.displayItems();
  gameCounter.switchPopeye('start');
}

function stopGame(reason) {
  started = false;
  Sound.pauseBackground();
  Sound.playStop(reason);
  gameModal.show(reason);
  gameStatus.disableBtn();
  gameStatus.stopTimer();
  gameCounter.switchPopeye(reason);
}

function resetGame() {
  gameModal.hide();
  gameStatus.switchBtn(started);
  gameStatus.enableBtn();
  gameStatus.resetTimer();
  gamePlayground.clear();
  count = 0;
  gameCounter.resetPopeye();
}
