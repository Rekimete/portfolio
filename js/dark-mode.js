/* ==========================================
   DARK-MODE.JS - Gestion du mode sombre
   À charger avec: <script src="js/dark-mode.js"></script>
   ========================================== */

/* ==========================================
   DARK-MODE.JS - Gestion du mode sombre
   ========================================== */

/* ==========================================
   DARK MODE TOGGLE
   ========================================== */

class DarkModeToggle {
    constructor() {
        this.htmlElement = document.documentElement;
        this.storageKey = 'portfolio-dark-mode';
        this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.toggleButton = document.getElementById('darkModeToggle');
        this.init();
    }
    init() {
        const savedMode = localStorage.getItem(this.storageKey);
        if (savedMode !== null) this.setDarkMode(savedMode === 'true');
        else if (this.prefersDark.matches) this.setDarkMode(true);
        else this.setDarkMode(false, false);
        this.setupToggleButton();
        this.prefersDark.addEventListener('change', (e) => {
            if (localStorage.getItem(this.storageKey) === null) this.setDarkMode(e.matches, false);
        });
    }
    setupToggleButton() {
        if (!this.toggleButton) return;
        this.toggleButton.addEventListener('click', () => this.toggle());
    }
    updateToggleUI(isDark) {
        if (!this.toggleButton) return;
        this.toggleButton.setAttribute('aria-pressed', String(isDark));
        this.toggleButton.setAttribute('aria-label', isDark ? 'Activer le mode clair' : 'Activer le mode sombre');
        this.toggleButton.dataset.theme = isDark ? 'dark' : 'light';
    }
    setDarkMode(isDark, persist = true) {
        if (isDark) this.htmlElement.classList.add('dark-mode');
        else this.htmlElement.classList.remove('dark-mode');
        if (persist) localStorage.setItem(this.storageKey, isDark ? 'true' : 'false');
        this.updateToggleUI(isDark);
    }
    toggle() {
        const isDark = this.htmlElement.classList.contains('dark-mode');
        this.setDarkMode(!isDark, true);
    }
}

new DarkModeToggle();




