// Історія: лінія часу будується за секціями .ev[data-year]; клік по ромбику показує мітку

function initHistory() {
	const items = $$('.ev[data-year]'),
		tl = $('#tl');
	// точки кривої: початок, роки подій, кінець (координати у системі 1000x300)
	const pts = [[0, 100], ...items.map((e) => [+e.dataset.x, +e.dataset.y]), [1000, 255]];
	let d = `M${pts[0]}`;
	for (let i = 0; i < pts.length - 1; i++) {
		const a = pts[Math.max(i - 1, 0)],
			p = pts[i],
			q = pts[i + 1],
			n = pts[Math.min(i + 2, pts.length - 1)];
		d += ` C${p[0] + (q[0] - a[0]) / 6},${p[1] + (q[1] - a[1]) / 6} ${q[0] - (n[0] - p[0]) / 6},${q[1] - (n[1] - p[1]) / 6} ${q[0]},${q[1]}`;
	}
	tl.innerHTML = `<svg viewBox="0 0 1000 300" preserveAspectRatio="none"><path d="${d}"/></svg>`;
	const tip = el('<div class="tip2" hidden></div>');
	tl.append(tip);
	const btns = items.map((e) => {
		const x = +e.dataset.x / 10,
			y = +e.dataset.y / 3;
		const b = el(
			`<button class="pt" type="button" style="left:${x}%;top:${y}%"><i></i>${e.dataset.year}</button>`,
		);
		b.addEventListener('click', () => {
			const open = !b.classList.contains('act');
			btns.forEach((o) => o.classList.remove('act'));
			tip.hidden = !open;
			if (!open) return;
			b.classList.add('act');
			tip.style.left = Math.min(Math.max(x, 14), 84) + '%';
			tip.style.top = y + '%';
			tip.innerHTML = `<img class="ph" src="${$('img', e).getAttribute('src')}" alt="">${$('h3 span', e).textContent}<a href="#${e.id}">ЧИТАТИ ДАЛІ ›</a><u></u><s></s><img class="gem" src="img/icons/gem.svg" alt="">`;
		});
		tl.append(b);
		return b;
	});
}
initHistory();
