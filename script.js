let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    difference = 0;
    running = false;
    startStopBtn.textContent = 'Start';
    lapCount = 0;
    laps.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let time = new Date(difference);

    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();
    let milliseconds = Math.floor(time.getUTCMilliseconds() / 10);

    display.textContent =
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + ':' +
        (milliseconds < 10 ? '0' : '') + milliseconds;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCount}: ${display.textContent}`;
        laps.appendChild(lapTime);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
