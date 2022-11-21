const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
const body = document.querySelector("body");
let interval = null;
btnStart.addEventListener("click", startSwitch);
btnStop.addEventListener("click", stopSwitch);

btnStop.setAttribute("disabled", true);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startSwitch() {
  btnStop.removeAttribute("disabled", false);
  btnStart.setAttribute("disabled", true);
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopSwitch() {
  btnStop.setAttribute("disabled", true);
  btnStart.removeAttribute("disabled", false);
  clearInterval(interval);
}
