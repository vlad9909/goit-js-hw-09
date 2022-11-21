import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector("button[data-start]");
const daysRef = document.querySelector("span[data-days]");
const hoursRef = document.querySelector("span[data-hours]");
const minsRef = document.querySelector("span[data-minutes]");
const secsRef = document.querySelector("span[data-seconds]");
let currentTime = new Date();
let interval = null;
btnStart.setAttribute("disabled", true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < currentTime) {
      alert("Please choose a date in the future");
      btnStart.setAttribute("disabled", true);
    } else {
      btnStart.removeAttribute("disabled");
    }
  },
};
const calendar = flatpickr("#datetime-picker", options);
btnStart.addEventListener("click", onBtnStartClick);
function onBtnStartClick() {
  const startTime = calendar.selectedDates[0];
  console.log(startTime);
  interval = setInterval(() => {
    const deltaTime = startTime - new Date();
    console.log(deltaTime);
    if (deltaTime <= 0) {
      clearInterval(interval);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minsRef.textContent = addLeadingZero(minutes);
    secsRef.textContent = addLeadingZero(seconds);
  }, 1000);
}
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
