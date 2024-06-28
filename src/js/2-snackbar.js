import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function createPromise(position, delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        iziToast.success({
          title: 'Успіх',
          message: `✅ Виконано обіцянку за ${delay}мс`,
        });
        resolve();
      } else {
        iziToast.error({
          title: 'Помилка',
          message: `❌ Відхилено обіцянку за ${delay}мс`,
        });
        reject();
      }
    }, delay);
  });
}

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onButtonSubmit);

function onButtonSubmit(e) {
  e.preventDefault();

  const delay = Number(e.currentTarget.elements.delay.value);
  const state = e.currentTarget.elements.state.value;
  e.currentTarget.reset();

  createPromise(1, delay, state)
    .then(success => success)
    .catch(error => error);
}
