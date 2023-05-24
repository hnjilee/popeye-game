import { Status } from './status.js';
import { Playground } from './playground.js';
import { Counter } from './counter.js';
import { Modal } from './modal.js';
import * as sound from '../sound.js';

export const Reason = Object.freeze({
  start: 'start',
  win: 'win',
  lose: 'lose',
  replay: 'replay',
});

export class Game {
  #timeLimitInSec;
  #numOfItems;
  #state;
  #count;

  constructor(timeLimitInSec, numOfItems) {
    this.#timeLimitInSec = timeLimitInSec;
    this.#numOfItems = numOfItems;

    this.#state = { isStarted: false };
    this.#count = 0;

    this.status = new Status();
    this.status.setBtnClickListener(() => this.onStatusBtnClick());
    this.status.setTimeLimitExceeded(() => this.onTimeLimitExceeded());

    this.playground = new Playground(this.#numOfItems);
    this.playground.setClickListener(e => this.onPlaygroundClick(e));
    this.playground.setSpinachClickListener(() => this.onSpinachClick());
    this.playground.setPoisonClickListener(() => this.onPoisonClick());

    this.counter = new Counter(this.#numOfItems);

    this.modal = new Modal();
    this.modal.setReplayListener(() => this.onReplay());
    this.modal.setCancelListener(() => this.onCancel());
  }

  setGameCancelListener(onGameCancel) {
    this.onGameCancel = onGameCancel;
  }

  onStatusBtnClick() {
    if (!this.#state.isStarted) {
      this.start();
    } else {
      this.stop(Reason.replay);
    }
  }

  onTimeLimitExceeded() {
    this.stop(Reason.lose);
  }

  onPlaygroundClick(e) {
    if (!this.#state.isStarted) {
      return;
    }

    this.playground.handleClick(e);
  }

  onSpinachClick() {
    if (++this.#count === this.#numOfItems) {
      this.stop(Reason.win);
      return;
    }
    this.counter.increasePopeye(this.#count);
  }

  onPoisonClick() {
    this.stop(Reason.lose);
  }

  onReplay() {
    this.reset();
    this.start();
  }

  onCancel() {
    this.reset();
    this.onGameCancel();
  }

  start() {
    this.#state.isStarted = true;
    sound.playBackground();
    this.status.switchBtn(this.#state.isStarted);
    this.status.startTimer(this.#timeLimitInSec, this.#state.isStarted);
    this.playground.displayItems();
    this.counter.switchPopeye(Reason.start);
  }

  stop(reason) {
    this.#state.isStarted = false;
    sound.pauseBackground();
    sound.playStop(reason);
    this.modal.show(reason);
    this.status.disableBtn();
    this.status.stopTimer();
    this.counter.switchPopeye(reason);
  }

  reset() {
    this.modal.hide();
    this.status.switchBtn(this.#state.isStarted);
    this.status.enableBtn();
    this.status.resetTimer();
    this.playground.clear();
    this.#count = 0;
    this.counter.resetPopeye();
  }
}
