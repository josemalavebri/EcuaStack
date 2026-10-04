document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");

  // Sombra al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
    } else {
      header.style.boxShadow = "var(--shadow-sm)";
    }
  });
});
