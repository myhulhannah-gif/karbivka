// Послуги ЦНАП: пошук по картках, підсвічування поточного дня

function initServices() {
	const cards = $$('#cards .card');
	$('#q').addEventListener('input', (e) => {
		const v = e.target.value.trim().toLowerCase();
		cards.forEach((c) => {
			const title = $('h3', c).textContent.toLowerCase();
			c.hidden = !title.includes(v);
		});
		$('#none').hidden = cards.some((c) => !c.hidden);
	});
	const day = new Date().getDay();
	$$('#sch li').forEach((li) => li.classList.toggle('today', +li.dataset.d === day));
}
initServices();
