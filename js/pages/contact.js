// Звернення: вкладки видів, залежний список тем, валідація форми

function initContact() {
	const f = $('#f'),
		tabs = $$('#types button');
	const setType = (i) => {
		tabs.forEach((b, j) => b.classList.toggle('on', i === j));
		f.topic.innerHTML =
			'<option value="">— Оберіть тему —</option>' +
			TOPICS[i].map((t) => `<option>${t}</option>`).join('');
	};
	tabs.forEach((b, i) => b.addEventListener('click', () => setType(i)));
	setType(0);
	const rules = {
		name: (v) => v.trim().split(/\s+/).length >= 2 || "Вкажіть прізвище та ім'я",
		phone: (v) => !v || /^\+?[\d\s()-]{10,15}$/.test(v) || 'Некоректний номер телефону',
		email: (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v) || 'Некоректна електронна пошта',
		topic: (v) => !!v || 'Оберіть тему',
		text: (v) => v.trim().length >= 20 || 'Мінімум 20 символів (зараз ' + v.trim().length + ')',
	};
	const show = (n, msg) => {
		(n === 'ok' ? $('#eok') : f[n].closest('label').querySelector('.err')).textContent =
			msg === true ? '' : msg;
		return msg === true;
	};
	f.addEventListener('submit', (e) => {
		e.preventDefault();
		let ok = true;
		for (const n in rules) ok = show(n, rules[n](f[n].value)) && ok;
		ok = show('ok', f.ok.checked || 'Потрібна згода на обробку даних') && ok;
		$('#okm').hidden = !ok;
		if (ok) {
			f.reset();
			setType(0);
		}
	});
	for (const n in rules) f[n].addEventListener('blur', () => show(n, rules[n](f[n].value)));
}
initContact();
