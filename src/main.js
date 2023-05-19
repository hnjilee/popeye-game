import { Status } from './components/status.js';

const TIME_LIMIT_IN_SEC = 3;
let started = false;

const gameStatus = new Status();
gameStatus.setBtnClickListener(startGame);

function startGame() {
  started = true;
  //    playBackground();
  gameStatus.switchBtn(started);
  gameStatus.startTimer(TIME_LIMIT_IN_SEC);
  //  displayItems();
}
