import * as Sound from './audio.js';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.message = document.querySelector('.pop-up__message');
    this.replayBtn = document.querySelector('.pop-up__replay');
    this.replayBtn.addEventListener('click', () => {
      this.onReplayClick && this.onReplayClick();
    });
    this.cancelBtn = document.querySelector('.pop-up__cancel');
    this.cancelBtn.addEventListener('click', () => {
      this.onCancelClick && this.onCancelClick();
    });
  }

  setReplayClickListener(onClick) {
    this.onReplayClick = onClick;
  }

  setCancelClickListener(onClick) {
    this.onCancelClick = onClick;
  }

  show(reason) {
    this.fillMessage(reason);
    this.popUp.classList.remove('pop-up--hidden');
  }

  fillMessage(reason) {
    switch (reason) {
      case 'win':
        this.message.textContent = 'I GOT STRONG 💪';
        Sound.playWin();
        break;
      case 'lose':
        this.message.textContent = 'I AM DEAD 👻';
        Sound.playLose();
        break;
      case 'replay':
        this.message.textContent = 'Wanna replay?';
        Sound.playReplay();
        break;
      default:
        throw new Error('not handled reason');
    }
  }

  hide() {
    this.popUp.classList.add('pop-up--hidden');
  }
}
