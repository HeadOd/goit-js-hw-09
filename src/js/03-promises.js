import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', generatePromise);

function generatePromise(e) {
  e.preventDefault();

  const { elements: {delay, step, amount} } = e.currentTarget;
  let stepCount = 0;

  for (let i = 1; i <= Number(amount.value); i += 1) {
    let delayTime = (Number(delay.value) + stepCount)

    setTimeout(() => {
      createPromise(i, delayTime);
    }, delayTime);

    stepCount += Number(step.value);
  }
};

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      }
  });
};