document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation menu
  const menuToggle = document.getElementById("menu-toggle");
  const mainNavigation = document.getElementById("main-navigation");

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", function () {
      const menuIsOpen = mainNavigation.classList.toggle("menu-visible");

      menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
      menuToggle.setAttribute(
        "aria-label",
        menuIsOpen ? "Close navigation menu" : "Open navigation menu"
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

  // Friend photos and photo placeholders
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

    // Check whether the image has already loaded
    if (image.complete) {
      if (image.naturalWidth > 0) {
        showPhoto();
      } else {
        showPlaceholder();
      }
    }
  });
});