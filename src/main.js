import { Status } from './components/status.js';
import { Playground } from './components/playground.js';
import * as Sound from './sound.js';

const TIME_LIMIT_IN_SEC = 3;
const NUM_OF_ITMES = 3;

let started = false;

const gameStatus = new Status();
gameStatus.setBtnClickListener(startGame);

const gamePlayground = new Playground(NUM_OF_ITMES);

function startGame() {
  started = true;
  Sound.playBackground();
  gameStatus.switchBtn(started);
  gameStatus.startTimer(TIME_LIMIT_IN_SEC);
  gamePlayground.displayItems();
}
