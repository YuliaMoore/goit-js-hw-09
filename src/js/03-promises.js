const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  let { delay, step, amount } = form.elements;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
