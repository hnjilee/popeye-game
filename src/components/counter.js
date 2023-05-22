export class Counter {
  #numOfItems;
  constructor(numOfItems) {
    this.#numOfItems = numOfItems;
    this.popeyeImg = document.querySelector('.sidebar__popeye-img');
  }

  switchPopeye = status => {
    switch (status) {
      case 'start':
        this.popeyeImg.setAttribute('src', '/images/popeye-spinach.png');
        this.popeyeImg.style.width = '50%';
        this.popeyeImg.style.height = '50%';
        break;
      case 'win':
        this.popeyeImg.setAttribute('src', '/images/popeye-win.png');
        break;
      case 'lose':
        this.popeyeImg.setAttribute('src', '/images/popeye-lose.png');
        this.popeyeImg.style.width = '100%';
        this.popeyeImg.style.height = 'auto';
        break;
      case 'replay':
        return;
      default:
        console.log(`${status}: not handled status`);
    }
  };

  increasePopeye = count => {
    const size = `
      ${(count / this.#numOfItems) * 50 + 50}%
      `;
    this.popeyeImg.style.width = size;
    this.popeyeImg.style.height = size;
  };

  resetPopeye = () => {
    this.popeyeImg.setAttribute('src', '/images/popeye-default.png');
    this.popeyeImg.style.width = 'auto';
    this.popeyeImg.style.height = 'auto';
  };
}
