document.addEventListener('DOMContentLoaded', (): void => {
  const header = document.querySelector('.header') as HTMLElement | null;
  const hamburgerMenu = document.getElementById('hamburgerMenu') as HTMLButtonElement | null;
  const navBar = document.getElementById('navBar') as HTMLElement | null;

  if (!header || !hamburgerMenu || !navBar) return;

  const navLinks = navBar.querySelectorAll<HTMLAnchorElement>('.nav-links a, .btn-nav');

  // --- LÓGICA DEL MENÚ DESPLEGABLE ---
  const openMenu = (): void => {
    hamburgerMenu.classList.add('active');
    navBar.classList.add('active');
    hamburgerMenu.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = (): void => {
    hamburgerMenu.classList.remove('active');
    navBar.classList.remove('active');
    hamburgerMenu.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = (): void => {
    const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
    isExpanded ? closeMenu() : openMenu();
  };

  hamburgerMenu.addEventListener('click', (event: MouseEvent): void => {
    event.stopPropagation();
    toggleMenu();
  });

  navLinks.forEach((link: HTMLAnchorElement): void => {
    link.addEventListener('click', (): void => {
      closeMenu();
    });
  });

  document.addEventListener('click', (event: MouseEvent): void => {
    const target = event.target as Node;
    if (!header.contains(target) && navBar.classList.contains('active')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && navBar.classList.contains('active')) {
      closeMenu();
    }
  });

  // --- LÓGICA DE SCROLL FLUIDO (rAF) ---
  let lastScrollY: number = window.scrollY;
  let ticking: boolean = false;
  const threshold: number = 15; // Umbral para ignorar micro-movimientos

  const updateHeaderPosition = (): void => {
    const currentScrollY: number = window.scrollY;

    // Si el menú móvil está abierto o estamos arriba del todo, siempre visible
    if (navBar.classList.contains('active') || currentScrollY <= 60) {
      header.classList.remove('header--hidden');
      lastScrollY = currentScrollY;
      ticking = false;
      return;
    }

    // Filtrar pequeñas variaciones
    if (Math.abs(currentScrollY - lastScrollY) >= threshold) {
      if (currentScrollY > lastScrollY) {
        // Hacia abajo -> Ocultar
        header.classList.add('header--hidden');
      } else {
        // Hacia arriba -> Mostrar
        header.classList.remove('header--hidden');
      }
      lastScrollY = currentScrollY;
    }

    ticking = false;
  };

  const onScroll = (): void => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderPosition);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
});