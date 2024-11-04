// script.js
let startTime, elapsedTime = 0, intervalId;
let isRunning = false;

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", recordLap);

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(intervalId);
  display.textContent = "00:00:00.000";
  elapsedTime = 0;
  isRunning = false;
  lapList.innerHTML = "";
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  const time = new Date(elapsedTime);

  const minutes = String(time.getUTCMinutes()).padStart(2, "0");
  const seconds = String(time.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(time.getUTCMilliseconds()).padStart(3, "0");

  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
  if (isRunning) {
    const lapItem = document.createElement("li");
    lapItem.textContent = display.textContent;
    lapList.appendChild(lapItem);
  }
}
