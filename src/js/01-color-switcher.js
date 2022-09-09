const ref = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};
let timerId = null;

ref.startBtn.addEventListener('click', onStartChange);
ref.stopBtn.addEventListener('click', onStopChange);

ref.stopBtn.disabled = true;

function onStartChange() {
    timerId = setInterval(changeBodyColor, 1000);
}

function changeBodyColor() {
    ref.body.style.backgroundColor = getRandomHexColor();
    ref.startBtn.disabled = true;
    ref.stopBtn.disabled = false;
}

function onStopChange() {
    clearInterval(timerId);
    ref.startBtn.disabled = false;
    ref.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};