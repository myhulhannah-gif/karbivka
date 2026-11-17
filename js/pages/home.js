// Головна: кнопка «До календаря» відкриває Google Календар із заповненою подією

function initHome() {
	$$('.evt .btn').forEach((btn) =>
		btn.addEventListener('click', () => {
			const e = btn.closest('.evt'),
				t = (s) => s.replace(':', '') + '00',
				d = e.dataset.date.replace(/-/g, '');
			const params = new URLSearchParams({
				action: 'TEMPLATE',
				text: $('h3', e).textContent,
				location: $('.pl', e).textContent,
				dates: `${d}T${t(e.dataset.from)}/${d}T${t(e.dataset.to)}`,
				ctz: 'Europe/Kyiv', // часовий пояс, щоб час не зсунувся
			});
			window.open('https://calendar.google.com/calendar/render?' + params, '_blank', 'noopener');
		}),
	);
}
initHome();