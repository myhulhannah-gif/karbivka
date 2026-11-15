// Головна: кнопка «До календаря» створює файл події .ics із даних картки

function initHome() {
	$$('.evt .btn').forEach((btn) =>
		btn.addEventListener('click', () => {
			const e = btn.closest('.evt'),
				t = (s) => s.replace(':', '') + '00',
				d = e.dataset.date.replace(/-/g, '');
			const ics = [
				'BEGIN:VCALENDAR',
				'VERSION:2.0',
				'BEGIN:VEVENT',
				`SUMMARY:${$('h3', e).textContent}`,
				`LOCATION:${$('.pl', e).textContent}`,
				`DTSTART:${d}T${t(e.dataset.from)}`,
				`DTEND:${d}T${t(e.dataset.to)}`,
				'END:VEVENT',
				'END:VCALENDAR',
			].join('\r\n');
			const a = el('<a></a>');
			a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
			a.download = 'event.ics';
			a.click();
			URL.revokeObjectURL(a.href);
		}),
	);
}
initHome();
