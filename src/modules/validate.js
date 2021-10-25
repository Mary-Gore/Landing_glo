import checkInputs from './checkInputs';

const validate = () => {

	// Обработчик события через делегирование
	// Валидация всех форм (кроме калькулятора)
	document.body.addEventListener('input', event => {

		if (!event.target.matches('select, .calc-square, .calc-count, .calc-day')) {
			event.target.value = checkInputs(event.target);
		}

	}, true);

	// Валидация значений полей калькулятора
	document.querySelector('.calc-block').addEventListener('blur', event => {

		if (event.target.matches('.calc-square, .calc-count, .calc-day')) {
			event.target.value = event.target.value.replace(/\D/g, '');
		}

	}, true);
};
export default validate;
