document.addEventListener("DOMContentLoaded", function () {
  // Welcome screen
  const enterButton = document.getElementById("enter-button");

  document.body.classList.add("intro-active");

  if (enterButton) {
    enterButton.addEventListener("click", function () {
      document.body.classList.add("leaving-intro");

      setTimeout(function () {
        document.body.classList.remove("intro-active");
        document.body.classList.remove("leaving-intro");
      }, 800);
    });
  }

  // Mobile navigation menu
  const menuToggle = document.getElementById("menu-toggle");
  const mainNavigation = document.getElementById("main-navigation");

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNavigation.classList.toggle("menu-visible");

      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    const navigationLinks = mainNavigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mainNavigation.classList.remove("menu-visible");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Friend photos and placeholders
  const friendImages = document.querySelectorAll(".friend-image");

  friendImages.forEach(function (image) {
    const placeholder = image.nextElementSibling;

    function showPlaceholder() {
      image.style.display = "none";

      if (placeholder) {
        placeholder.style.display = "flex";
      }
    }

    function showPhoto() {
      image.style.display = "block";

      if (placeholder) {
        placeholder.style.display = "none";
      }
    }

    image.addEventListener("load", showPhoto);
    image.addEventListener("error", showPlaceholder);

    // Handle photos that loaded before these listeners were added
    if (image.complete) {
      if (image.naturalWidth > 0) {
        showPhoto();
      } else {
        showPlaceholder();
      }
    }
  });
});