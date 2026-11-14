(() => {
  document.documentElement.classList.add('js');
  const header = document.querySelector('.site-nav');
  const hero = document.querySelector('.hero');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-links');
  const updateHeader = () => {
    header?.classList.toggle('is-light', window.scrollY > (hero?.offsetHeight || 100) - 85);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', updateHeader);
  if (menuButton && navigation) {
    menuButton.hidden = false;
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      navigation.classList.toggle('is-open', open);
    });
    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
  }
  const filters = [...document.querySelectorAll('[data-filter]')];
  const notes = [...document.querySelectorAll('.note-row[data-topic]')];
  const status = document.querySelector('.filter-status');
  filters.forEach((button) => button.addEventListener('click', () => {
    const topic = button.dataset.filter;
    let count = 0;
    filters.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
    notes.forEach((note) => {
      note.hidden = topic !== 'all' && note.dataset.topic !== topic;
      if (!note.hidden) count += 1;
    });
    if (status) status.textContent = `${count} ${count === 1 ? 'note' : 'notes'}`;
  }));
})();
