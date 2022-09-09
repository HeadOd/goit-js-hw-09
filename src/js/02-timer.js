//* flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
//* notiflix
import { Report } from 'notiflix/build/notiflix-report-aio';


const ref = {
    input: document.querySelector('input[type="text"]'),
    startBtn: document.querySelector('button'),

    seconds: document.querySelector('span[data-seconds]'),
    minutes: document.querySelector('span[data-minutes]'),
    hours: document.querySelector('span[data-hours]'),
    days: document.querySelector('span[data-days]'),
};

ref.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
            Report.failure(
                'Error',
                'Please choose a date in the future',
                'Okay',
            );
            return;
        }
        ref.startBtn.disabled = false;
  },
};

flatpickr(ref.input, options)

//*startTimer
ref.startBtn.addEventListener('click', startTimer);

function startTimer() {
    const currentDate = new Date(`${ref.input.value}`);

    const timerInterval = setInterval(() => { 
        const nowTime = Date.now();
        let counterTime = currentDate.getTime() - nowTime;
        
        const { days, hours, minutes, seconds } = convertMs(counterTime);
        ref.seconds.textContent = seconds;
        ref.minutes.textContent = minutes;
        ref.hours.textContent = hours;
        ref.days.textContent = days;

        if (counterTime <= 1000) {
            clearInterval(timerInterval)
        };        
    }, 1000);
};

//* calc time
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}