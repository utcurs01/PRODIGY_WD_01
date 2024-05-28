let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let laps = 0;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        startStopBtn.innerHTML = "Stop";
        running = true;
        document.getElementById('startSound').play();
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = "Start";
        running = false;
        // document.getElementById('startSound').play();
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    startStopBtn.innerHTML = "Start";
    hoursElement.innerHTML = "00";
    minutesElement.innerHTML = "00";
    secondsElement.innerHTML = "00";
    millisecondsElement.innerHTML = "000";
    lapsList.innerHTML = "";
    laps = 0;
    // document.getElementById('startSound').play();
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (60 * 60 * 1000));
    let minutes = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000));
    let seconds = Math.floor((difference % (60 * 1000)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    hoursElement.innerHTML = pad(hours);
    minutesElement.innerHTML = pad(minutes);
    secondsElement.innerHTML = pad(seconds);
    millisecondsElement.innerHTML = pad(milliseconds, 3);
}

function recordLap() {
    if (running && laps < 100) {
        laps++;
        const lapTime = `${hoursElement.innerHTML}:${minutesElement.innerHTML}:${secondsElement.innerHTML}.${millisecondsElement.innerHTML}`;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${laps}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function pad(number, digits = 2) {
    return String(number).padStart(digits, '0');
}
