/* eslint-disable no-useless-escape */
const checkInputs = input => {

	// Проверка имени
	const checkName = val => {

		const lowerVal = val.toLowerCase();
		val = lowerVal.replace(/(^[а-яё])/gi, match => match.toUpperCase());
		val = val.replace(/[^а-яё-\s]/gim, '');
		val = val.replace(/((^-|-$)|(\s(?=\s)))/gim, '');
		val = val.replace(/-{2}/gm, '-');
		return val;

	};

	// Проверка email
	const checkEmail = email => {

		email = email.replace(/[^\w\d@\.\!~\*\'_-]/gi, '');
		email = email.replace(/((^-|-$)|(\s(?=\s)))/g, '');
		email = email.replace(/-{2}/g, '-');
		return email;

	};

	// Проверка телефона
	const checkPhone = phone => {

		phone = phone.replace(/[^\d()+]/g, '');
		phone = phone.replace(/(^-|-$)/g, '');
		phone = phone.replace(/-{2}/g, '-');
		return phone;

	};

	// Проверка сообщения
	const checkMessage = message => {

		message = message.replace(/[^а-яё\.\?\!-\"\';\:,]/gi, '');
		message = message.replace(/((^-|-$)|(\s(?=\s)))/gim, '');
		message = message.replace(/-{2}/gm, '-');
		return message;
	};

	if (input.name === 'user_name') {
		return checkName(input.value);
	}

	if (input.name === 'user_email') {
		return checkEmail(input.value);
	}

	if (input.name === 'user_phone') {
		return checkPhone(input.value);
	}
	if (input.name === 'user_message') {
		return checkMessage(input.value);
	}

};
export default checkInputs;
