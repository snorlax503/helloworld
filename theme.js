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

  const ensureAboutLink = () => {
    const nav = document.querySelector('.site-header nav');
    if (!nav || nav.querySelector('a[href$="about.html"]')) return;

    const cvLink = nav.querySelector('a[href$="cv.html"]');
    if (!cvLink) return;

    const about = document.createElement('a');
    about.className = 'nav-link';
    about.href = window.location.pathname.includes('/posts/') ? '../about.html' : 'about.html';
    about.textContent = 'about';
    nav.insertBefore(about, cvLink);
  };

  document.addEventListener('DOMContentLoaded', () => {
    ensureAboutLink();
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
