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
        name: (v) => {
            const words = v.trim().split(/\s+/).filter(Boolean).length;


            if (words >= 3) return true; // 4+ слів теж дозволені (подвійні прізвища)
            if (words === 2) return 'Введено 2 слова з 3: додайте по батькові';
            if (words === 1) return "Введено 1 слово з 3: додайте ім'я та по батькові";
            return "Вкажіть прізвище, ім'я та по батькові"; // поле порожнє
        },


        phone: (v) => !v || /^\d{10}$/.test(v.trim()) || 'Введіть 10 цифр у форматі 0993461585',
        email: (v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v) || 'Некоректна електронна пошта',
        topic: (v) => !!v || 'Оберіть тему',
        addr: (v) => !v.trim() || v.trim().length >= 5 || 'Адреса занадто коротка',
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


        if (ok) {
            f.reset();
            setType(0);
            f.classList.add('sent');
            $('#okm').hidden = false;


            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            $('#okm').hidden = true;
        }
    });




    for (const n in rules) {
        f[n].addEventListener('blur', () => {
            if (f[n].value.trim()) show(n, rules[n](f[n].value));
        });


        f[n].addEventListener('input', () => {
            if (n === 'name') {
                const clean = f[n].value.replace(/[^\p{L}'’ʼ\- ]/gu, '');
                if (clean !== f[n].value) f[n].value = clean;
            }


            if (n === 'name' && f[n].value.trim()) {
                show(n, rules[n](f[n].value));
            } else {
                show(n, true);
            }
        });
    }
}
initContact();

