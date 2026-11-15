// Допоміжні функції (глобальні, підключаються першими)

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
function el(html) {
	const t = document.createElement('template');
	t.innerHTML = html.trim();
	return t.content.firstChild;
}
