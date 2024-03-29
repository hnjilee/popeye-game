import { Reason } from './game.js';

export class Counter {
  #numOfItems;

  constructor(numOfItems) {
    this.#numOfItems = numOfItems;

    this.imgWin = new Image();
    this.imgWin.src = '/images/popeye-win.png';
    this.imgLose = new Image();
    this.imgLose.src = '/images/popeye-lose.png';

    this.popeyeImg = document.querySelector('.sidebar__popeye-img');
  }

  switchPopeye(reason) {
    switch (reason) {
      case Reason.start:
        this.popeyeImg.setAttribute('src', '/images/popeye-spinach.png');
        this.popeyeImg.style.width = '50%';
        this.popeyeImg.style.height = '50%';
        break;
      case Reason.win:
        this.popeyeImg.setAttribute('src', '/images/popeye-win.png');
        this.popeyeImg.style.width = '100%';
        this.popeyeImg.style.height = '100%';
        break;
      case Reason.lose:
        this.popeyeImg.setAttribute('src', '/images/popeye-lose.png');
        this.popeyeImg.style.width = '100%';
        this.popeyeImg.style.height = 'auto';
        break;
      case Reason.replay:
        return;
      default:
        throw new Error(`${reason}: not handled status`);
    }
  }

  increasePopeye(count) {
    const size = `
      ${(count / this.#numOfItems) * 50 + 50}%
      `;
    this.popeyeImg.style.width = size;
    this.popeyeImg.style.height = size;
  }

  resetPopeye() {
    this.popeyeImg.setAttribute('src', '/images/popeye-default.png');
    this.popeyeImg.style.width = 'auto';
    this.popeyeImg.style.height = 'auto';
  }
}
