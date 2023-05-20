export class Modal {
  constructor() {
    this.modal = document.querySelector('.modal');
    this.title = document.querySelector('.modal__title');
  }

  show(reason) {
    this.#setTitle(reason);
    this.modal.classList.remove('modal--hidden');
  }

  #setTitle(reason) {
    switch (reason) {
      case 'win':
        this.title.textContent = "💪 I'm strong 💪";
        break;
      case 'lose':
        this.title.textContent = "💀 I'm dead 💀";
        break;
      case 'replay':
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
