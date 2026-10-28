document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  const menuToggle = document.getElementById("menu-toggle");
  const mainNavigation = document.getElementById("main-navigation");

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNavigation.classList.toggle("menu-visible");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    });

    const navigationLinks = mainNavigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mainNavigation.classList.remove("menu-visible");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Smoothly reveal story chapters as they enter the screen
  const storyCards = document.querySelectorAll(".timeline-card");

  if ("IntersectionObserver" in window) {
    const storyObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("chapter-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    storyCards.forEach(function (card) {
      storyObserver.observe(card);
    });
  } else {
    storyCards.forEach(function (card) {
      card.classList.add("chapter-visible");
    });
  }
});