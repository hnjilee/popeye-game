export default class Status {
  constructor(numOfSpinach) {
    this.numOfSpinach = numOfSpinach;
    this.popeyeImg = document.querySelector('.popeye__img');
  }

  scale(counter) {
    this.popeyeImg.style.width = `${50 + (counter / this.numOfSpinach) * 50}%`;
    this.popeyeImg.style.height = `${50 + (counter / this.numOfSpinach) * 50}%`;
  }

  change(reason) {
    if (reason === 'replay') {
      return;
    }
    this.popeyeImg.style.width = '100%';
    this.popeyeImg.style.height = '100%';
    this.popeyeImg.setAttribute('src', `images/${reason}.png`);
  }

  reset() {
    this.popeyeImg.removeAttribute('style');
    this.popeyeImg.setAttribute('src', 'images/default.png');
  }
}
