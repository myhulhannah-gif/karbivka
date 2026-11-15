// Бургер-меню (планшет і телефон) та приховування зображень, яких ще немає

$('.burger').addEventListener('click', () => $('#nav').classList.toggle('open'));
document.addEventListener(
	'error',
	(e) => {
		if (e.target.tagName === 'IMG') e.target.style.visibility = 'hidden';
	},
	true,
);
