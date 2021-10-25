let intervalAnimateTop,
	intervalAnimateBottom,
	startPosition = 0,
	time;

const popup = document.querySelector('.popup'),
	popupContent = document.querySelector('.popup-content');

const checkPopup = () => {

	if (document.body.clientWidth >= 768 &&
        document.body.clientWidth <= 1000) {
		time = 400;
	} else if (document.body.clientWidth > 1000 &&
        document.body.clientWidth < 1200) {
		time = 1000;
	} else {
		time = 300;
	}

	const popupAnimateClose = () => {

		// Отключение анимации на маленьких экранах
		if (document.body.clientWidth >= 768) {

			const start = Date.now();

			// Анимация снизу вверх и скрытие блока
			intervalAnimateBottom = setInterval(() => {

				const passedBottom = Date.now() - start;

				if (passedBottom >= time + 500) {
					clearInterval(intervalAnimateBottom);
					popup.style.display = 'none';
					return;
				}

				popupContent.style.top = (startPosition - passedBottom * 2) + 'px';

			}, 1);

		} else {
			popup.style.display = 'none';
		}
	};

	const togglePopUp = () => {

		const popupBtn = document.querySelectorAll('.popup-btn');

		popupBtn.forEach(elem => {

			elem.addEventListener('click', () => {

				// Отключение анимации на маленьких экранах
				if (document.body.clientWidth >= 768) {

					const start = Date.now();

					// Анимация сверху-вниз
					intervalAnimateTop = setInterval(() => {

						const passed = Date.now() - start;

						if (passed >= time) {
							clearInterval(intervalAnimateTop);
							startPosition = passed;
							return;
						}

						popup.style.display = 'block';
						popupContent.style.left = (popup.clientWidth / 2) - (popupContent.clientWidth / 2) + 60 + 'px';
						popupContent.style.top = passed + 'px';

					}, 2);

				} else {
					popup.style.display = 'block';
				}
			});
		});

		popup.addEventListener('click', event => {

			let target = event.target;

			if (target.classList.contains('popup-close')) {
				popupAnimateClose();
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					popupAnimateClose();
				}
			}
		});
	};

	togglePopUp();
};
export default checkPopup;
