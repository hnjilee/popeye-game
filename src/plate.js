export const Item = Object.freeze({
  spinach: 'spinach',
  poison: 'poison',
});

export class Plate {
  constructor(numOfSpinach, numOfPoison, itemSize) {
    this.numOfSpinach = numOfSpinach;
    this.numOfPoison = numOfPoison;
    this.itemSize = itemSize;
    this.plate = document.querySelector('.playground__plate');
    this.plateRect = this.plate.getBoundingClientRect();
    this.plate.addEventListener('click', this.onClick);
  }

  setItemClickListener(onClick) {
    this.onItemClick = onClick;
  }

  onClick = e => {
    const target = e.target;
    if (!target.matches('.playground__item')) {
      return;
    }

    if (target.matches('.spinach')) {
      this.onItemClick && this.onItemClick(target, Item.spinach);
    } else {
      this.onItemClick && this.onItemClick(target, Item.poison);
    }
  };

  init() {
    this.#displayItems(Item.spinach, this.numOfSpinach);
    this.#displayItems(Item.poison, this.numOfPoison);
  }

  #displayItems(itemName, numOfItems) {
    for (let i = 0; i < numOfItems; i++) {
      const item = document.createElement('img');
      item.setAttribute('src', `images/${itemName}.png`);
      item.setAttribute('class', 'playground__item');
      item.classList.add(itemName);

      const x = Plate.#random(0, this.plateRect.width - this.itemSize);
      const y = Plate.#random(0, this.plateRect.height - this.itemSize);
      item.style.top = `${y}px`;
      item.style.left = `${x}px`;

      this.plate.append(item);
    }
  }

  static #random(min, max) {
    return Math.trunc(Math.random() * (max - min + 1) + min);
  }

  clear() {
    this.plate.innerHTML =
      '<img src="images/plate.png" alt="plate" class="plate__img" />';
  }
}
