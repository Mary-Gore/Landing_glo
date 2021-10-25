import validate from './validate';

const sendForm = formId => {

	const errorMessage = 'Что-то пошло не так...',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

	const form = document.getElementById(formId);

	const statusMessage = document.createElement('div');
	if (form.matches('#form1')) {
		statusMessage.style.cssText = 'font-size: 2rem';
	} else if (form.matches('#form3')) {
		statusMessage.style.cssText = `font-size: 1.5rem; color: #fff;
            padding-bottom: 20px`;
	} else if (form.matches('#form2')) {
		statusMessage.style.cssText = `font-size: 2rem; 
            margin-top: 30px`;
	}

	validate();
	form.addEventListener('submit', event => {
		event.preventDefault();
		form.appendChild(statusMessage);
		statusMessage.textContent = loadMessage;
		const formData = new FormData(form),
			body = {};

		formData.forEach((key, val) => {
			body[key] = val;
		});

		const postData = body => fetch('server.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)

		});

		postData(body)
			.then(response => {
				if (response.status !== 200) {
					throw new Error('status network is not 200');
				}
				statusMessage.textContent = successMessage;
			})
			.catch(error => {
				statusMessage.textContent = errorMessage;
				console.error(error);
			});
	});
};
export default sendForm;
