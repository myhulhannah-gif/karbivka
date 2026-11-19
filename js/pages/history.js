function initHistory() {
    const tl = $('#tl'),
        tip = el('<div class="tip2"></div>'),
        gem = el('<div class="nav-gem"></div>'),
        dotBig = el('<div class="dot big"></div>'),
        dotSmall = el('<div class="dot small"></div>');
    tl.append(gem, tip, dotBig, dotSmall);


    /*
     Для кожного року:
     x, y, dy  – позиція ромба (як у CSS .yr.y1…y5), не чіпати
     card      – [dx, dy, ox, oy]
                 dx, dy: де стоїть опорна точка картки відносно центра ромба (в u)
                 ox, oy: яка точка картки в неї потрапляє
                         (0,0) лівий верх, (1,0) правий верх,
                         (0,1) лівий низ,  (1,1) правий низ
     big       – [dx, dy] центр великого кола відносно центра ромба (в u)
     small     – [dx, dy] центр малого кола відносно центра ромба (в u)
     Необов'язково: w, font (в u), minTop (px)
     */
    const cfg = {
        y1782: {
            x: 14.93, y: 11.85, dy: -0.6,
            card: [-5.2, 3.9, 0, 0],
            big: [-2.9, 3.3],
            font: 0.55,
            minTop: -150,
            small: [-1.9, 2.0],
        },
        y1920: {
            x: 33.56, y: 72.35, dy: -0.5,
            card: [7.0, -3.3, 1, 1],
            big: [2.7, -2.4],
            minTop: -150,
            small: [1.5, -1.4],
        },
        y1950: {
            x: 53.08, y: 52.81, dy: -1.0,
            card: [-2.2, -8, 1, 1],
            big: [-1.6, -0.9],
            small: [-0.8, -0.4],
        },
        y1991: {
            x: 80.96, y: 14.97, dy: -0.5,
            card: [0.2, 2.8, 1, 0],
            big: [-1.9, 2.2],
            small: [-1.5, 1.3],
        },
        y2026: {
            x: 88.29, y: 90.85, dy: -0.45,
            card: [-3.2, 1.58, 1, 1],
            big: [-2.6, -0.1],
            small: [-1.8, 0.6],
        },
    };


    // загальні розміри (в u)
    const K = {
        cardW: 8.5,
        cardFont: 0.6,
        gemW: 2.9,
        gemH: 2.7,
        gemGap: 0.15,
        bigD: 0.9, // 36 / 40
        smallD: 0.425, // 17 / 40
    };


    const mq = window.matchMedia('(min-width: 600px) and (max-width: 900px)');


    // планшет: ширша горизонтальна картка + свої координати
    const KT = { cardW: 8.6, cardFont: 0.5 };
    const tab = {
        y1782: { x: 12.04, y: 23.9,  dx: 0.05,  dy: -0.77, card: [2.4, -2.7, 0, 0],   big: [1.6, -1.3],  small: [0.8, -0.7] },
        y1920: { x: 18.2, y: 55.55, dx: 1.92,  dy: 0.42,  card: [0.6, 5.5, 0, 1],   big: [1.5, 1.3],  small: [0.5, 0.9] },
        y1950: { x: 55.78, y: 43.85, dx: -1.88, dy: 0.44,  card: [-3.9, 2.9, 0, 0],     big: [0.9, 2.0],   small: [0.2, 1.1] },
        y1991: { x: 80.51, y: 36.07, dx: 0.06,  dy: -0.69, card: [-2.0, -5.0, 1, 0],   big: [-2.4, -0.9],  small: [-1.0, -0.8] },
        y2026: { x: 90.1, y: 85.08, dx: -1.7, dy: 1.2,   card: [-2.8, 0.6, 1, 1],   big: [-1.9, -0.2],  small: [-1.0, 0.3] },
    };


    const DEFAULT_ID = 'y1950';
    let current = DEFAULT_ID;
    let isOpen = false;
    const btns = $$('.yr', tl);
    const parts = [dotSmall, dotBig, tip]; // порядок появи


    const place = (node, left, top, w, h) => {
        node.style.left = left + 'px';
        node.style.top = top + 'px';
        if (w != null) node.style.width = w + 'px';
        if (h != null) node.style.height = h + 'px';
    };


    // центр ромба та одиниця u в пікселях
    function diamond(id) {
        const t = mq.matches ? tab[id] : null;
        const { x, y, dy } = t || cfg[id];
        const dx = t ? t.dx : 0;
        const btn = btns.find((b) => b.getAttribute('href') === '#' + id);
        const u = parseFloat(getComputedStyle(btn).fontSize);
        return {
            u,
            cx: (x / 100) * tl.clientWidth + dx * u,
            cy: (y / 100) * tl.clientHeight + dy * u,
        };
    }


    function layoutGem() {
        const { u, cx, cy } = diamond(current);
        const w = K.gemW * u,
            h = K.gemH * u;
        place(gem, cx - w / 2, cy - 0.6125 * u - K.gemGap * u - h, w, h);
    }


    function layoutTip() {
        if (!isOpen) return;
        const t = mq.matches;
        const c = cfg[current];
        const { card, big, small } = t ? tab[current] : c;
        const cw = t ? KT.cardW : c.w ?? K.cardW;
        const cf = t ? KT.cardFont : c.font ?? K.cardFont;
        const minTop = c.minTop ?? -100;
        const { u, cx, cy } = diamond(current);


        const w = t ? 313 : cw * u;
        tip.style.width = w + 'px';
        tip.style.fontSize = cf * u + 'px';
        const h = tip.offsetHeight;


        const [dx, dy, ox, oy] = card;
        let left = cx + dx * u - ox * w;
        let top = cy + dy * u - oy * h;
        left = Math.min(Math.max(left, 0), tl.clientWidth - w);
        top = Math.max(top, minTop);
        place(tip, left, top);


        const bd = t ? 36 : K.bigD * u,
            sd = t ? 17 : K.smallD * u;
        place(dotBig, cx + big[0] * u - bd / 2, cy + big[1] * u - bd / 2, bd, bd);
        place(dotSmall, cx + small[0] * u - sd / 2, cy + small[1] * u - sd / 2, sd, sd);
    }


    function layout() {
        layoutGem();
        layoutTip();
    }


    function setActive(id) {
        current = id;
        btns.forEach((o) =>
            o.classList.toggle('act', o.getAttribute('href') === '#' + id)
        );
    }


    function showTip(id) {
        // знімаємо show, щоб анімація стартувала заново
        parts.forEach((p) => p.classList.remove('show'));


        const e = document.getElementById(id);
        const more = e.dataset.more || tl.dataset.more || 'ЧИТАТИ ДАЛІ ↓';
        tip.innerHTML = `<img class="ph" src="${$('img', e).getAttribute('src')}" alt=""><div class="tx"><span>${$('h3 span', e).textContent.replace(/(індустріаліза)(ція)/i, '1<spanclass="hy">-</span><brclass="br-tab">2')}</span><a href="#${id}">${more}</a></div>`;


        isOpen = true;
        layout();


        void tip.offsetWidth; // примусовий reflow
        parts.forEach((p) => p.classList.add('show'));
    }


    function hideTip() {
        isOpen = false;
        parts.forEach((p) => p.classList.remove('show'));
    }


    btns.forEach((b) => {
        const id = b.getAttribute('href').slice(1);


        b.addEventListener('click', (ev) => {
            ev.preventDefault();
            const wasOpen = b.classList.contains('act') && isOpen;
            setActive(id);
            if (wasOpen) {
                hideTip();
                layoutGem();
            } else {
                showTip(id);
            }
        });
    });


    // за замовчуванням: 1950 активний і картка відкрита
    applyYearPos();
    setActive(DEFAULT_ID);
    showTip(DEFAULT_ID);


    window.addEventListener('resize', () => { applyYearPos(); layout(); });
    mq.addEventListener('change', () => { applyYearPos(); layout(); });
    // фото й шрифти вантажаться пізніше: перераховуємо висоту картки
    tip.addEventListener('load', layoutTip, true);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);


    // позиції років на планшеті беруться з tab; на десктопі повертаємо CSS
function applyYearPos() {
    btns.forEach((b) => {
        const t = tab[b.getAttribute('href').slice(1)];
        if (mq.matches) {
            b.style.left = t.x + '%';
            b.style.top = t.y + '%';
            b.style.setProperty('--dx', t.dx + 'em');
            b.style.setProperty('--dy', t.dy + 'em');
        } else {
            b.style.left = '';
            b.style.top = '';
            b.style.removeProperty('--dx');
            b.style.removeProperty('--dy');
        }
    });
}
}
initHistory();

