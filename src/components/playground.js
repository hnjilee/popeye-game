import * as sound from '../sound.js';

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
    this.playground.addEventListener('click', e => this.onClick(e));
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  setSpinachClickListener(onSpinachClick) {
    this.onSpinachClick = onSpinachClick;
  }

  setPoisonClickListener(onPoisonClick) {
    this.onPoisonClick = onPoisonClick;
  }

  handleClick(e) {
    const target = e.target;
    if (!target.matches('.playground__item')) {
      return;
    }

    if (target.matches('.spinach')) {
      this.#onSpinach(target);
    } else if (target.matches('.poison')) {
      this.#onPoison();
    }
  }

  #onSpinach = target => {
    sound.playSpinachClick();
    target.remove();
    this.onSpinachClick();
  };

  #onPoison = () => this.onPoisonClick();

  displayItems() {
    const x1 = 0;
    const x2 =
      this.playgroundRect.right -
      this.playgroundRect.left -
      Playground.#ITEM_WIDTH;
    const y1 = 0;
    const y2 =
      this.playgroundRect.bottom -
      this.playgroundRect.top -
      Playground.#ITEM_HEIGHT;

    for (let i = 0; i < this.#numOfItems; i++) {
      this.#displayItem(Item.spinach, x1, x2, y1, y2);
      this.#displayItem(Item.poison, x1, x2, y1, y2);
    }
  }

  #displayItem(name, x1, x2, y1, y2) {
    const x = Playground.#random(x1, x2);
    const y = Playground.#random(y1, y2);

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
    item.classList.add('playground__item');

    return item;
  }

  clear() {
    this.playground.innerHTML = `
    <img
    src="images/plate.png"
    alt="plate in playground"
    class="playground__plate"
    />
    `;
  }

  static #random(min, max) {
    return Math.random() * (max - min) + min;
  }
}
