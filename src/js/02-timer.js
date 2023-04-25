// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const dataDays = document.querySelector('[data-days]');

const dataHours = document.querySelector('[data-hours]');

const dataMinutes = document.querySelector('[data-minutes]');

const dataSeconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (this.selectedDates[0] > Date.now()) {
      startBtn.disabled = false;
    } else {
      alert('Please choose a date in the future');
    }
    console.log(selectedDates[0]);
  },
};
const fp = flatpickr(input, options);

startBtn.addEventListener('click', startBtnclick);

let timerId = null;

function startBtnclick() {
  let selectTime = fp.selectedDates[0].getTime();
  let currentTime = Date.now();
  timerId = setInterval(() => {
    currentTime = Date.now();
    const time = selectTime - currentTime;
    const { days, minutes, hours, seconds } = convertTime(time);
    dataDays.textContent = days;
    dataHours.textContent = hours;
    dataMinutes.textContent = minutes;
    dataSeconds.textContent = seconds;
    if (time <= 1000) {
      clearInterval(timerID);
    }
  }, 1000);

  startBtn.disabled = true;
}

function getZero(value) {
  return String(value).padStart(2, '0');
}

function convertTime(ms) {
  const sec = 1000;
  const min = 60 * sec;
  const hour = min * 60;
  const day = hour * 24;
  const days = getZero(Math.floor(ms / day));
  const hours = getZero(Math.floor((ms % day) / hour));
  const minutes = getZero(Math.floor(((ms % day) % hour) / min));
  const seconds = getZero(Math.floor((((ms % day) % hour) % min) / sec));

  return { days, minutes, hours, seconds };
}
