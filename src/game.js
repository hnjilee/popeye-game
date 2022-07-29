import Progress from './progress.js';
import { Plate, Item } from './plate.js';
import Status from './status.js';
import * as Sound from './audio.js';

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  replay: 'replay',
});

export class GameBuilder {
  withTimeLimitInSec(timeLimitInSec) {
    this.timeLimitInSec = timeLimitInSec;
    return this;
  }

  withNumOfSpinach(numOfSpinach) {
    this.numOfSpinach = numOfSpinach;
    return this;
  }

  withNumOfPoison(numOfPoison) {
    this.numOfPoison = numOfPoison;
    return this;
  }

  withItemSize(itemSize) {
    this.itemSize = itemSize;
    return this;
  }

  build() {
    return new Game(
      this.timeLimitInSec,
      this.numOfSpinach,
      this.numOfPoison,
      this.itemSize
    );
  }
}

class Game {
  constructor(timeLimitInSec, numOfSpinach, numOfPoison, itemSize) {
    this.timeLimitInSec = timeLimitInSec;
    this.numOfSpinach = numOfSpinach;
    this.numOfPoison = numOfPoison;
    this.itemSize = itemSize;

    this.started = false;
    this.counter = 0;

    this.progress = new Progress(this.timeLimitInSec);
    this.progress.setBtnClickListener(this.onBtnClick);
    this.progress.setTimeLimitExceedListener(() => this.stop(Reason.lose));

    this.plate = new Plate(this.numOfSpinach, this.numOfPoison, this.itemSize);
    this.plate.setItemClickListener(this.onItemClick);

    this.popeyeStatus = new Status(this.numOfSpinach);
  }

  setStopListener(onStop) {
    this.onStop = onStop;
  }

  setResetListener(onReset) {
    this.onReset = onReset;
  }

  onBtnClick = () => {
    if (!this.started) {
      this.start();
    } else {
      this.stop(Reason.replay);
    }
  };

  onItemClick = (target, itemName) => {
    if (!this.started) {
      return;
    }

    if (itemName === Item.spinach) {
      Sound.playEating();
      target.remove();
      this.counter++;
      this.popeyeStatus.scale(this.counter);
      if (this.counter < this.numOfSpinach) {
        return;
      }
      this.stop(Reason.win);
    } else {
      this.stop(Reason.lose);
    }
  };

  start() {
    this.started = true;
    this.progress.showStopBtn();
    this.progress.startTimer();
    this.plate.init();
    Sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.onStop && this.onStop(reason);
    this.progress.disableBtn();
    this.progress.stopTimer();
    this.popeyeStatus.change(reason);
    Sound.pauseBackground();
  }

  reset() {
    this.onReset && this.onReset();
    this.progress.resetBtn();
    this.progress.resetTimer();
    this.plate.clear();
    this.counter = 0;
    this.popeyeStatus.reset();
  }
}
