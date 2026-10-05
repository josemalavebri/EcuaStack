/* js/animations.js */

document.addEventListener("DOMContentLoaded", () => {
  const createObserver = (
    callback,
    threshold = 0.0,
    rootMargin = "0px 0px -50px 0px",
  ) => {
    return new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      },
    );
  };

  /* Hero */
  const initHeroAnimations = () => {
    const hero = document.getElementById("inicio");
    if (!hero) return;

    requestAnimationFrame(() => {
      hero.classList.add("is-visible");
    });
  };

  /* Animación de Conteo Numérico para Stats */
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-count"), 10) || 100;
    const duration = 1800; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = `+${target}%`;
        clearInterval(timer);
      } else {
        element.textContent = `+${Math.floor(current)}%`;
      }
    }, stepTime);
  };

  /* About / Acerca de */
  const initAboutAnimations = () => {
    const section =
      document.getElementById("about") ||
      document.getElementById("nosotros") ||
      document.getElementById("acerca-de");

    if (!section) return;

    const observer = createObserver((element) => {
      element.classList.add("is-visible");

      // Animar el porcentaje +100% cuando la sección entra en pantalla
      const statNumber = element.querySelector("[data-count]");
      if (statNumber) {
        animateCounter(statNumber);
      }
    });

    observer.observe(section);
  };

  /* Servicios */
  const initServicesAnimations = () => {
    const section = document.getElementById("servicios");
    const texture = document.getElementById("servicesTexture");

    if (!section) return;

    if (texture) {
      const particleCount = 45;
      const colors = [
        "var(--cmyk-cyan)",
        "var(--cmyk-magenta)",
        "var(--cmyk-yellow)",
      ];

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.backgroundColor =
          colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 6}s`;

        const size = 3 + Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        texture.appendChild(particle);
      }
    }

    const observer = createObserver((element) => {
      element.classList.add("is-visible");
    });

    observer.observe(section);
  };

  initHeroAnimations();
  initAboutAnimations();
  initServicesAnimations();
});
