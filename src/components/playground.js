const Item = Object.freeze({
  spinach: 'spinach',
  poison: 'poison',
});

export class Playground {
  static #ITEM_WIDTH = 50;
  static #ITEM_HEIGHT = 50;
  #numOfItems;

  constructor(numOfItems) {
    this.#numOfItems = numOfItems;

    this.playground = document.querySelector('.playground');
    window.addEventListener('load', () => {
      this.playgroundRect = this.playground.getBoundingClientRect();
    });
  }

  displayItems = () => {
    const x1 = this.playgroundRect.left;
    const x2 = this.playgroundRect.right - Playground.#ITEM_WIDTH;
    const y1 = this.playgroundRect.top;
    const y2 = this.playgroundRect.bottom - Playground.#ITEM_HEIGHT;

    for (let i = 0; i < this.#numOfItems; i++) {
      this.#displayItem(Item.spinach, x1, x2, y1, y2);
      this.#displayItem(Item.poison, x1, x2, y1, y2);
    }
  };

  #displayItem(name, x1, x2, y1, y2) {
    const x = random(x1, x2);
    const y = random(y1, y2);

    const item = this.#createItem(name);
    item.style.position = 'absolute';
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;

    this.playground.append(item);
  }

  #createItem(name) {
    const item = document.createElement('img');
    item.setAttribute('src', `/images/${name}.png`);
    item.classList.add(name);

    return item;
  }
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
