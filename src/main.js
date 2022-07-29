import { GameBuilder } from './game.js';
import PopUp from './pop-up.js';

const popeyeGame = new GameBuilder()
  .withTimeLimitInSec(5)
  .withNumOfSpinach(3)
  .withNumOfPoison(3)
  .withItemSize(50)
  .build();

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
