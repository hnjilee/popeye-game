export class Status {
  #timer;
  constructor() {
    this.btn = document.querySelector('.status__btn');
    this.btn.addEventListener('click', () => this.onBtnClick());
    this.time = document.querySelector('.status__time');
    this.progressValue = document.querySelector('.status__progress-value');
    this.#timer = null;
  }

  setBtnClickListener = onBtnClick => {
    this.onBtnClick = onBtnClick;
  };

  setTimeLimitExceeded = onTimeLimitExceeded => {
    this.onTimeLimitExceeded = onTimeLimitExceeded;
  };

  switchBtn(started) {
    if (started) {
      this.btn.innerHTML = '<i class="fa-solid fa-stop"></i> stop';
    } else {
      this.btn.innerHTML = '<i class="fa-solid fa-play"></i> start';
    }
  }

  enableBtn() {
    this.btn.removeAttribute('disabled');
  }

  disableBtn() {
    this.btn.setAttribute('disabled', '');
  }

  startTimer(timeLimitInSec, isGameStarted) {
    const timeLimit = timeLimitInSec;
    let remainingTime = timeLimit;

    this.time.textContent = formatTime(remainingTime);
    this.progressValue.style.width = '100%';

    this.#timer = setInterval(() => {
      remainingTime--;
      this.time.textContent = formatTime(remainingTime);
      this.progressValue.style.width = `${(remainingTime / timeLimit) * 100}%`;
      if (remainingTime <= 0) {
        if (isGameStarted) {
          this.onTimeLimitExceeded();
        }
        clearInterval(this.#timer);
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.#timer);
  }

  resetTimer() {
    this.time.textContent = '00:00';
    this.progressValue.style.width = '0';
  }
}

function formatTime(timeInSec) {
  const minutes = parseInt(timeInSec / 60);
  const seconds = parseInt(timeInSec % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}
