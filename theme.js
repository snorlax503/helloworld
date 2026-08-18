(() => {
  const key = 'maximus-theme';
  const root = document.documentElement;
  const stored = localStorage.getItem(key);

  if (stored === 'dark') {
    root.dataset.theme = 'dark';
  }

  const updateLabels = () => {
    const isDark = root.dataset.theme === 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.textContent = isDark ? 'turn the lights on' : 'turn the lights off';
      button.setAttribute('aria-pressed', String(isDark));
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateLabels();

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        if (root.dataset.theme === 'dark') {
          delete root.dataset.theme;
          localStorage.setItem(key, 'light');
        } else {
          root.dataset.theme = 'dark';
          localStorage.setItem(key, 'dark');
        }

        updateLabels();
      });
    });
  });
})();
