// Послуги ЦНАП: пошук по картках, підсвічування поточного дня, бейдж «Відкрито/Зачинено»

function initServices() {
	const cards = $$('#cards .card');
	$('#q').addEventListener('input', (e) => {
		const v = e.target.value.trim().toLowerCase();
		cards.forEach((c) => (c.hidden = !c.textContent.toLowerCase().includes(v)));
		$('#none').hidden = cards.some((c) => !c.hidden);
	});
	const now = new Date(),
		day = now.getDay(),
		m = now.getHours() * 60 + now.getMinutes();
	const open = day >= 1 && day <= 5 && m >= 480 && m < 1020 && !(m >= 780 && m < 840); // 08:00-17:00, обід 13:00-14:00
	$$('#sch li').forEach((li) => li.classList.toggle('today', +li.dataset.d === day));
	$('#badge').textContent = open ? 'Відкрито' : 'Зачинено';
	$('#badge').classList.toggle('c', !open);
}
initServices();
