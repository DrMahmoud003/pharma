(function () {
    'use strict';
    const STORAGE_KEY = 'orgaColorTheme';
    const THEMES = ['default', 'emerald', 'dark'];
    const THEME_LABELS = { default: 'الافتراضي (نيلي)', emerald: 'أخضر', dark: 'داكن (أسود)' };
    function getTheme() {
        try {
            const t = localStorage.getItem(STORAGE_KEY);
            return THEMES.indexOf(t) !== -1 ? t : 'default';
        } catch (_) {
            return 'default';
        }
    }
    function syncSwatches(theme) {
        document.querySelectorAll('.app-theme-swatch, .theme-swatch').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-theme-choice') === theme);
        });
    }
    function applyTheme(theme) {
        if (THEMES.indexOf(theme) === -1) theme = 'default';
        document.documentElement.setAttribute('data-theme', theme);
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
        syncSwatches(theme);
    }
    function injectWidget() {
        if (document.querySelector('.app-theme-switcher')) { syncSwatches(getTheme()); return; }
        const wrap = document.createElement('div');
        wrap.className = 'app-theme-switcher';
        wrap.title = 'شكل الألوان';
        THEMES.forEach(function (t) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'app-theme-swatch';
            btn.setAttribute('data-theme-choice', t);
            btn.title = THEME_LABELS[t] || t;
            btn.addEventListener('click', function () { applyTheme(t); });
            wrap.appendChild(btn);
        });
        document.body.appendChild(wrap);
        syncSwatches(getTheme());
    }
    applyTheme(getTheme());
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectWidget);
    } else {
        injectWidget();
    }
    window.AppTheme = { get: getTheme, set: applyTheme, THEMES: THEMES.slice(), STORAGE_KEY: STORAGE_KEY };
})();
