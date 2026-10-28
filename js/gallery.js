document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation menu
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

    mainNavigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNavigation.classList.remove("menu-visible");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Display photos or their placeholders
  const galleryImages = document.querySelectorAll(".gallery-image");

  galleryImages.forEach(function (image) {
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

    // Handle images that have already finished loading
    if (image.complete) {
      if (image.naturalWidth > 0) {
        showPhoto();
      } else {
        showPlaceholder();
      }
    }
  });

  // Full-size photo viewer
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  let previousButton = null;

  function openLightbox(button) {
    const image = button.querySelector(".gallery-image");

    // Do not open the viewer if the photo is missing
    if (!image || image.naturalWidth === 0) {
      return;
    }

    previousButton = button;

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = button.dataset.caption || image.alt;

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    lightboxClose.focus();
  }

  function closeLightbox() {
    if (lightbox.hidden) {
      return;
    }

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";

    if (previousButton) {
      previousButton.focus();
      previousButton = null;
    }
  }

  document.querySelectorAll(".memory-photo").forEach(function (button) {
    button.addEventListener("click", function () {
      openLightbox(button);
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  // Close the viewer when clicking its dark background
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Close the viewer with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
});