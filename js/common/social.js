const EXT = 'svg';
const src = (name) => `img/icons/${name}.${EXT}`;

const SOCIAL = [
	{ n: 'Facebook', i: 'facebook', u: 'https://facebook.com/' },
	{ n: 'Instagram', i: 'instagram', u: 'https://instagram.com/' },
	{ n: 'Telegram', i: 'telegram', u: 'https://t.me/' },
	{ n: 'Viber', i: 'viber', u: 'viber://chat?number=380971234567' },
	{ n: 'YouTube', i: 'youtube', u: 'https://youtube.com/' },
	{ n: 'TikTok', i: 'tiktok', u: 'https://tiktok.com/' },
];

const links = SOCIAL.map(
	(s) => `<a href="${s.u}" target="_blank" rel="noopener" aria-label="${s.n}">
		<img src="${src(s.i)}" alt="" />
	</a>`,
).join('');

/* ПК: кнопка-глобус */
const soc = el(`
	<aside class="soc" aria-label="Соціальні мережі">
		<div class="soc-list" id="soc-list">${links}</div>
		<button class="soc-btn" type="button" aria-expanded="false" aria-controls="soc-list" aria-label="Соціальні мережі">
			<img class="globe" src="${src('globe')}" alt="" />
		</button>
	</aside>`);

/* Планшет і телефон: висувна панель */
const sp = el(`
	<aside class="sp" aria-label="Соціальні мережі">
		<div class="sp-list" id="sp-list">${links}</div>
		<button class="sp-tab" type="button" aria-expanded="true" aria-controls="sp-list" aria-label="Сховати соцмережі"></button>
	</aside>`);

document.body.append(soc, sp);

/* глобус */
const list = $('.soc-list', soc);
const btn = $('.soc-btn', soc);
list.inert = true;
const toggle = () => {
	const open = soc.classList.toggle('open');
	btn.setAttribute('aria-expanded', open);
	list.inert = !open;
};
btn.addEventListener('click', toggle);
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && soc.classList.contains('open')) toggle();
});

/* висувна панель */
const spList = $('.sp-list', sp);
const tab = $('.sp-tab', sp);
const setPanel = (open) => {
	sp.classList.toggle('closed', !open);
	tab.setAttribute('aria-expanded', open);
	tab.setAttribute('aria-label', open ? 'Сховати соцмережі' : 'Показати соцмережі');
	spList.inert = !open;
};
tab.addEventListener('click', () => setPanel(sp.classList.contains('closed')));

setPanel(!['history', 'contact'].includes(document.body.dataset.p));