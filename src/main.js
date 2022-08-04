import { GameBuilder } from './game.js';
import PopUp from './pop-up.js';
import Instruction from './instruction.js';

const popeyeGame = new GameBuilder()
  .withTimeLimitInSec(10)
  .withNumOfSpinach(10)
  .withNumOfPoison(10)
  .withItemSize(50)
  .build();

const popUp = new PopUp();
const instruction = new Instruction();

popeyeGame.setStopListener(reason => popUp.show(reason));

popUp.setReplayClickListener(() => {
  popeyeGame.reset();
  popeyeGame.start();
});

popUp.setCancelClickListener(() => {
  popeyeGame.reset();
  instruction.show();
});

popeyeGame.setResetListener(() => popUp.hide());
