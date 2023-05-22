import { Reason } from './game.js';

export class Modal {
  constructor() {
    this.modal = document.querySelector('.modal');
    this.title = document.querySelector('.modal__title');
    this.replayBtn = document.querySelector('.modal__replay');
    this.replayBtn.addEventListener('click', () => this.onReplay());
    this.cancelBtn = document.querySelector('.modal__cancel');
    this.cancelBtn.addEventListener('click', () => this.onCancel());
  }

  setReplayListener = onReplay => {
    this.onReplay = onReplay;
  };

  setCancelListener = onCancel => {
    this.onCancel = onCancel;
  };

  show(reason) {
    this.#setTitle(reason);
    this.modal.classList.remove('modal--hidden');
  }

  #setTitle(reason) {
    switch (reason) {
      case Reason.win:
        this.title.textContent = "💪 I'm strong 💪";
        break;
      case Reason.lose:
        this.title.textContent = "💀 I'm dead 💀";
        break;
      case Reason.replay:
        this.title.textContent = 'Wanna replay?';
        break;
      default:
        console.log('reason not handled');
    }
  }

  hide = () => {
    this.modal.classList.add('modal--hidden');
  };
}
