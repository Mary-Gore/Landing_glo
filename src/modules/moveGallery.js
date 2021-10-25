const moveGallery = () => {

	const img = document.querySelectorAll('#command img');

	img.forEach(item => {
		const imgSrc = item.src;
		item.addEventListener('mouseenter', event => {
			event.target.src = event.target.dataset.img;
		});
		item.addEventListener('mouseleave', event => {
			event.target.src = imgSrc;
		});
	});

};
export default moveGallery;
