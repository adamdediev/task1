
const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formatTime = (time) => {
  const hours = String(time.hours).padStart(2, '0');
  const minutes = String(time.minutes).padStart(2, '0');
  const seconds = String(time.seconds).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

const createTimerAnimator = () => {
  let intervalId;

  return ({ hours, minutes, seconds }) => {
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    clearInterval(intervalId);

    const updateTimer = () => {
      const remainingHours = Math.floor(totalSeconds / 3600);
      const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
      const remainingSeconds = totalSeconds % 60;

      timerEl.textContent = formatTime({
        hours: remainingHours,
        minutes: remainingMinutes,
        seconds: remainingSeconds,
      });

      totalSeconds--;

      if (totalSeconds < 0) {
        clearInterval(intervalId);
      }
    };

    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const inputValue = inputEl.value;
  const seconds = Number(inputValue);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  animateTimer({ hours, minutes, seconds: remainingSeconds });

  inputEl.value = '';
});
