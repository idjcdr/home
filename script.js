// Load header and then bind menu + language logic
fetch('header.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('header').innerHTML = html;

    const menuBtn = document.getElementById("menuButton");
    const dropdown = document.getElementById("menuDropdown");
    const langToggleBtn = document.getElementById("langToggleBtn");
    let isEnglish = false;

    // Dropdown toggle
    menuBtn?.addEventListener("click", () => {
      dropdown?.classList.toggle("show");
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        dropdown?.classList.remove("show");
        menuBtn?.setAttribute("aria-expanded", "false");
      }
    });

      const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      };

      const setHTML = (id, html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      };

      // Header
      setText('header-title', isEnglish ? 'IDJ House of Refuge' : 'IDJ Casa de Refugio');
      setText('header-subtitle', isEnglish ? 'Vuelve a Casa' : 'Vuelve a Casa');

      // Nav
      setText('nav-welcome', isEnglish ? 'Welcome' : 'Bienvenida');
      setText('nav-pastor', 'Pastor');
      setText('nav-contact', isEnglish ? 'Information' : 'Información');
      setText('nav-gallery', isEnglish ? 'Gallery' : 'Galería');

      // Footer
      setText('footer-privacy', 'Privacy Policy');
      setText('footer-prayer', isEnglish ? 'Prayer' : 'Oracion/Prayer');
      setText('footer-church-info', 'Church Filing Info');
    });

// Header scroll behavior
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const header =
    document.getElementById("header") ||
    document.getElementById("headeren");

  if (!header) return;

  const currentScrollY = window.scrollY;

  // Hide when scrolling down
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.classList.add("hide-header");
  }

  // Show when scrolling up
  if (currentScrollY < lastScrollY) {
    header.classList.remove("hide-header");
  }

  // Change navbar color after scrolling 50px
  if (currentScrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScrollY = currentScrollY;
});

// Load footer
fetch('footer.html')
  .then(response => response.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });

// Handle popup & animations
document.addEventListener("DOMContentLoaded", () => {
  const popupOverlay = document.getElementById('popupOverlay');
  const popupCloseBtn = document.getElementById('popupCloseBtn');

  // AOS animation
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Show popup after 10s
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!popupOverlay || !popupCloseBtn) return;
      popupOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      popupCloseBtn.focus();
    }, 10000);
  });

  function closePopup() {
    if (!popupOverlay) return;
    popupOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }

  popupCloseBtn?.addEventListener('click', closePopup);

  popupOverlay?.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popupOverlay?.style.display === 'flex') {
      closePopup();
    }
  });
});


// Lightbox logic
document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  // Open lightbox on image click
  document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
    });
  });

  // Close lightbox
  closeBtn?.addEventListener("click", function () {
    lightbox.style.display = "none";
  });

  // Close if you click outside the image
  lightbox?.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
});

// Load English header and footer
document.addEventListener("DOMContentLoaded", () => {

  // Load headeren.html
  fetch("headeren.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("headeren").innerHTML = data;

      // Set up dropdown AFTER header has loaded
      const menuBtn = document.getElementById("menuButton");
      const dropdown = document.getElementById("menuDropdown");

      menuBtn?.addEventListener("click", () => {
        dropdown?.classList.toggle("show");

        const expanded =
          menuBtn.getAttribute("aria-expanded") === "true";

        menuBtn.setAttribute(
          "aria-expanded",
          String(!expanded)
        );
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) {
          dropdown?.classList.remove("show");
          menuBtn?.setAttribute("aria-expanded", "false");
        }
      });
    })
    .catch(err => console.error("Error loading header:", err));


  // Load footeren.html
  fetch("footeren.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footeren").innerHTML = data;
    })
    .catch(err => console.error("Error loading footer:", err));

});
