// Мобільне меню (планшет і телефон) та приховування зображень, яких ще немає
const burger = $('.burger');
const setMenu = (open) => {
	document.body.classList.toggle('menu-open', open);
	burger.setAttribute('aria-expanded', open);
};

burger.addEventListener('click', () => setMenu(true));
$('.nav-close').addEventListener('click', () => setMenu(false));
$('.nav-overlay').addEventListener('click', () => setMenu(false));
$$('#nav a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') setMenu(false);
});
// якщо розтягнули вікно до ПК-розміру, закриваємо панель
window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
	if (e.matches) setMenu(false);
});

document.addEventListener(
	'error',
	(e) => {
		if (e.target.tagName === 'IMG') e.target.style.visibility = 'hidden';
	},
	true,
);

// підсвічуємо пункт меню поточної сторінки
const page = location.pathname.split('/').pop() || 'index.html';
$$('#nav a').forEach((a) => {
	a.classList.toggle('on', a.getAttribute('href') === page);
});