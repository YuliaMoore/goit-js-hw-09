function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

stopBtn.disabled = true;

startBtn.addEventListener('click', startBtnClick);
stopBtn.addEventListener('click', stopBtnClick);

let timeId = null;

function startBtnClick() {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');
  timeId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopBtnClick() {
  clearInterval(timeId);
  stopBtn.disabled = true;
  startBtn.disabled = false;
}
