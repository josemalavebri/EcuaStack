/* js/animations.js */

document.addEventListener("DOMContentLoaded", () => {
  const createObserver = (callback, threshold = 0.2) => {
    return new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          callback(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold,
      },
    );
  };

  /* Hero */

  const initHeroAnimations = () => {
    const hero = document.getElementById("inicio");

    if (!hero) {
      return;
    }

    requestAnimationFrame(() => {
      hero.classList.add("is-visible");
    });
  };

  /* Servicios */

  const initServicesAnimations = () => {
    const section = document.getElementById("servicios");
    const texture = document.getElementById("servicesTexture");

    if (!section) {
      return;
    }

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
  initServicesAnimations();
});
