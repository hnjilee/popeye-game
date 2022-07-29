import { Game } from './game.js';
import PopUp from './pop-up.js';

const TIME_LIMIT_IN_SEC = 5;
const NUM_OF_SPIANACH = 3;
const NUM_OF_POISON = 3;
const ITEM_SIZE = 50;

const popeyeGame = new Game(
  TIME_LIMIT_IN_SEC,
  NUM_OF_SPIANACH,
  NUM_OF_POISON,
  ITEM_SIZE
);
const popUp = new PopUp();
const instruction = document.querySelector('.instruction');

popeyeGame.setStopListener(reason => popUp.show(reason));

popUp.setReplayClickListener(() => {
  popeyeGame.reset();
  popeyeGame.start();
});

popUp.setCancelClickListener(() => popeyeGame.reset());

popeyeGame.setResetListener(() => popUp.hide());

instruction.addEventListener('click', () =>
  instruction.classList.add('instruction--hidden')
);
