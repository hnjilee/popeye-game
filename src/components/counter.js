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
    }
  };

  increasePopeye = count => {
    const size = `
      ${(count / this.#numOfItems) * 50 + 50}%
      `;
    this.popeyeImg.style.width = size;
    this.popeyeImg.style.height = size;
  };
}
