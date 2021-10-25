const toggleMenu = () => {

	const menu = document.querySelector('menu');

	const handlerMenu = elem => {

		if (!menu.classList.contains('active-menu')) {
			menu.classList.add('active-menu');
		} else if (elem.matches('a')) {
			menu.classList.remove('active-menu');
		}
	};

	document.addEventListener('click', event => {

		const target = event.target;

		// Отслеживание клика по иконке бургера или эл-там меню
		// чтобы запустить ф-цию еще раз для проверки класса
		if (target.closest('.menu') || target.closest('menu')) {
			handlerMenu(target);
		}
	});
};
export default toggleMenu;
