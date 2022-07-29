export default class Progress {
  constructor(timeLimitInSec) {
    this.timeLimitInSec = timeLimitInSec;
    this.btn = document.querySelector('.playground__btn');
    this.btn.addEventListener('click', () => {
      this.onBtnClick && this.onBtnClick();
    });
    this.timerNumber = document.querySelector('.timer__number');
    this.timerBarValue = document.querySelector('.timer__bar-value');
    this.timer;
  }

  setBtnClickListener(onClick) {
    this.onBtnClick = onClick;
  }

  setTimeLimitExceedListener(onExceed) {
    this.onTimeLimitExceed = onExceed;
  }

  showStopBtn() {
    this.btn.innerHTML = '<i class="fa-solid fa-stop"></i> Stop';
  }

  disableBtn() {
    this.btn.setAttribute('disabled', true);
  }

  resetBtn() {
    this.btn.removeAttribute('disabled');
    this.btn.innerHTML = '<i class="fa-solid fa-play"></i> Play';
  }

  startTimer() {
    let remainingSeconds = this.timeLimitInSec;
    this.#updateTimerNumber(remainingSeconds);
    this.#updateTimerBar(this.timeLimitInSec, remainingSeconds);

    this.timer = setInterval(() => {
      this.#updateTimerNumber(--remainingSeconds);
      this.#updateTimerBar(this.timeLimitInSec, remainingSeconds);
      if (remainingSeconds > 0) {
        return;
      }
      this.stopTimer();
      this.onTimeLimitExceed && this.onTimeLimitExceed();
    }, 1000);
  }

  #updateTimerNumber(remainingSeconds) {
    this.timerNumber.textContent = Progress.#formatTime(remainingSeconds);
  }

  #updateTimerBar(timeLimitInSec, remainingSeconds) {
    this.timerBarValue.style.width = `${
      (remainingSeconds / timeLimitInSec) * 100
    }%`;
  }

  static #formatTime(seconds) {
    const min = Math.trunc(seconds / 60);
    const sec = Math.trunc(seconds % 60);
    const formattedMin = min >= 10 ? min : `0${min}`;
    const formattedSec = sec >= 10 ? sec : `0${sec}`;
    return `${formattedMin}:${formattedSec}`;
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  resetTimer() {
    this.timerNumber.textContent = '00:00';
    this.timerBarValue.style.width = '0';
  }
}
