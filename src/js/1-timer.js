import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateToday = new Date();
let timerId = null;
let selectedDateSecond = null;
const buttonStart = document.querySelector('button[data-start]');
buttonStart.addEventListener('click', startTimer);
buttonStart.setAttribute('disabled', 'disabled');

const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMin = document.querySelector('span[data-minutes]');
const spanSec = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    clearInterval(timerId);
    timerId = null;
    addItem(0);
  },
  onClose(selectedDates) {
    selectedDateSecond = selectedDates[0].getTime();
    checkDate(selectedDateSecond);
  },
};

flatpickr('#datetime-picker', options);

function checkDate(selectedDateSecond) {
  const dateNow = new Date().getTime();
  if (selectedDateSecond > dateNow) {
    buttonStart.removeAttribute('disabled');
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    buttonStart.setAttribute('disabled', 'disabled');
  }
}

function startTimer(event) {
  event.preventDefault();
  if (timerId) {
    iziToast.warning({
      title: 'Warning',
      message: 'The timer has already started!',
    });
    return;
  }

  buttonStart.setAttribute('disabled', 'disabled');
  document
    .querySelector('#datetime-picker')
    .setAttribute('disabled', 'disabled');

  timerId = setInterval(() => {
    const dateNow = new Date().getTime();
    const timer = selectedDateSecond - dateNow;

    if (timer <= 0) {
      iziToast.success({
        title: 'Success',
        message: 'Timer is completed!',
      });
      clearInterval(timerId);
      addItem(0);
      document.querySelector('#datetime-picker').removeAttribute('disabled');
      return;
    }

    addItem(timer);
  }, 1000);
}

function addItem(timer) {
  const { days, hours, minutes, seconds } = convertMs(timer);
  spanDays.textContent = addLeadingZero(days);
  spanHours.textContent = addLeadingZero(hours);
  spanMin.textContent = addLeadingZero(minutes);
  spanSec.textContent = addLeadingZero(seconds);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// console.dir(spanSec)

//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
