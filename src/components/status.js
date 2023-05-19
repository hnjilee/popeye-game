export class Status {
  constructor() {
    this.btn = document.querySelector('.status__btn');
    this.btn.addEventListener('click', () => this.onBtnClick());
    this.time = document.querySelector('.status__time');
    this.progressValue = document.querySelector('.status__progress-value');
  }

  setBtnClickListener = onBtnClick => {
    this.onBtnClick = onBtnClick;
  };

  switchBtn(started) {
    if (started) {
      this.btn.innerHTML = '<i class="fa-solid fa-stop"></i> stop';
    } else {
      this.btn.innerHTML = '<i class="fa-solid fa-start"></i> start';
    }
  }

  startTimer(timeLimitInSec) {
    const timeLimit = timeLimitInSec;
    let remainingTime = timeLimit;

    const timer = setInterval(() => {
      remainingTime--;
      this.time.textContent = formatTime(remainingTime);
      this.progressValue.style.width = `${(remainingTime / timeLimit) * 100}%`;
      if (remainingTime <= 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
}

function formatTime(timeInSec) {
  const minutes = parseInt(timeInSec / 60);
  const seconds = parseInt(timeInSec % 60);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}
