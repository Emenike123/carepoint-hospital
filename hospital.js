
document.addEventListener("DOMContentLoaded", function () {

  // 1. MOBILE NAVIGATION
   const menuToggle = document.getElementById("menuToggle");
//   const navMenu = document.getElementById("navMenu");
   if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");

      menuToggle.textContent = isOpen ? "✕" : "☰";
       menuToggle.setAttribute("aria-expanded", String(isOpen));
       menuToggle.setAttribute(
      "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
   });
 }

  // 2. CURRENT YEAR
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // 3. ACTIVE NAVIGATION LINK
  const currentPage =
    window.location.pathname.split("/").pop() || "hospital.html";

  document.querySelectorAll(".navbar nav a").forEach(function (link) {
    const linkPage = (link.getAttribute("href") || "").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // 4. SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // 5. APPOINTMENT FORM VALIDATION
  const appointmentForm = document.getElementById("appointmentForm");
  const appointmentDate = document.getElementById("appointmentDate");
  const formMessage = document.getElementById("formMessage");

  function setMinimumDate() {
    if (!appointmentDate) return;

    const today = new Date();
    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    appointmentDate.min = localToday;
  }

  setMinimumDate();

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();

        if (formMessage) {
          formMessage.textContent =
            "Please complete all required fields correctly.";
          formMessage.style.color = "#d62828";
        }

        return;
      }

      if (formMessage) {
        formMessage.textContent =
          "Thank you! Your appointment request has been received .";
        formMessage.style.color = "#16803c";
      }

      appointmentForm.reset();
      setMinimumDate();
    });
  }

  
                           // 6. DOCTOR SEARCH
  const doctorSearch = document.getElementById("doctorSearch");
  const doctorCards = document.querySelectorAll(".doctor-card");
  const doctorNoResults = document.getElementById("doctorNoResults");

  if (doctorSearch && doctorCards.length) {
    doctorSearch.addEventListener("input", function () {
      const searchTerm = doctorSearch.value.trim().toLowerCase();
      let visibleCount = 0;

      doctorCards.forEach(function (card) {
        const searchableText = [
          card.dataset.name || "",
          card.dataset.specialty || "",
          card.textContent || ""
        ].join(" ").toLowerCase();

        const matches = searchableText.includes(searchTerm);

        card.style.display = matches ? "" : "none";

        if (matches) visibleCount++;
      });

      if (doctorNoResults) {
        doctorNoResults.style.display =
          visibleCount === 0 ? "block" : "none";
      }
    });
  }

  // 7. GALLERY LIGHTBOX
  const galleryImages = document.querySelectorAll(".gallery-image");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");

  function closeLightbox() {
    if (lightbox) {
      lightbox.style.display = "none";
      lightbox.setAttribute("aria-hidden", "true");
    }
  }

  galleryImages.forEach(function (image) {
    image.addEventListener("click", function () {
      if (!lightbox || !lightboxImage) return;

      lightbox.style.display = "flex";
      lightbox.setAttribute("aria-hidden", "false");
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt || "Gallery image";

      if (lightboxCaption) {
        lightboxCaption.textContent =
          image.dataset.caption || image.alt || "";
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  // 8. FAQ ACCORDION
  document.querySelectorAll(".faq-question").forEach(function (question) {
    question.addEventListener("click", function () {
      const item = question.closest(".faq-item");

      if (!item) return;

      const wasOpen = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(function (faqItem) {
        faqItem.classList.remove("active");

        const button = faqItem.querySelector(".faq-question");

        if (button) {
          button.setAttribute("aria-expanded", "false");
        }
      });

      if (!wasOpen) {
        item.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  // 9. CONTACT FORM VALIDATION
  const contactForm = document.getElementById("contactForm");
  const contactMessageStatus =
    document.getElementById("contactMessageStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();

        if (contactMessageStatus) {
          contactMessageStatus.textContent =
            "Please complete all required fields correctly.";
          contactMessageStatus.style.color = "#d62828";
        }

        return;
      }

      if (contactMessageStatus) {
        contactMessageStatus.textContent =
          "Thank you for contacting CarePoint Hospital. Your message has been received .";
        contactMessageStatus.style.color = "#16803c";
      }

      contactForm.reset();
    });
  }

  // 10. DARK MODE
  const darkModeButton = document.createElement("button");

  darkModeButton.type = "button";
  darkModeButton.className = "dark-mode-toggle";
  darkModeButton.textContent = "🌙";
  darkModeButton.setAttribute("aria-label", "Toggle dark mode");
  darkModeButton.title = "Toggle dark mode";

  const navbar = document.querySelector(".navbar");

if (navbar) {
    navbar.appendChild(darkModeButton);
}
  let darkModeEnabled = false;

  try {
    darkModeEnabled =
      localStorage.getItem("carepoint-dark-mode") === "enabled";
  } catch (error) {
    // Storage may be unavailable.
  }

  function applyDarkMode(enabled) {
    document.body.classList.toggle("dark-mode", enabled);

    darkModeButton.textContent = enabled ? "☀️" : "🌙";

    darkModeButton.setAttribute(
      "aria-label",
      enabled ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  applyDarkMode(darkModeEnabled);

  darkModeButton.addEventListener("click", function () {
    darkModeEnabled = !document.body.classList.contains("dark-mode");

    applyDarkMode(darkModeEnabled);

    try {
      localStorage.setItem(
        "carepoint-dark-mode",
        darkModeEnabled ? "enabled" : "disabled"
      );
    } catch (error) {
      // Ignore storage errors.
    }
  });

  // 11. BACK TO TOP BUTTON
  const backToTop = document.createElement("button");

  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.textContent = "↑";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.title = "Back to top";

  document.body.appendChild(backToTop);

  function updateBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 300);
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // 12. HERO IMAGE SLIDER
  const heroImage = document.querySelector(".hero-image img");
  const heroImageContainer = document.querySelector(".hero-image");

  if (heroImage && heroImageContainer) {
    const originalImage = heroImage.getAttribute("src");

    const imageFolder =
      originalImage && originalImage.includes("/")
        ? originalImage.substring(
            0,
            originalImage.lastIndexOf("/") + 1
          )
        : "hospitalimg/";

    const sliderImages = [
      imageFolder + "hospital2.jpg",
      imageFolder + "hospital3.jpg",
      imageFolder + "hospital4.jpg",
      imageFolder + "hospital6.jpg"
    ];

    let currentSlide = Math.max(
      0,
      sliderImages.indexOf(originalImage)
    );

    let sliderTimer;

    const controls = document.createElement("div");

    controls.className = "hero-slider-dots";
    controls.setAttribute("aria-label", "Hero image controls");

    const dots = sliderImages.map(function (_, index) {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.className = "hero-slider-dot";
      dot.setAttribute("aria-label", "Show slide " + (index + 1));

      dot.addEventListener("click", function () {
        showSlide(index);
        restartSlider();
      });

      controls.appendChild(dot);

      return dot;
    });

    function showSlide(index) {
      currentSlide = index;
      heroImage.src = sliderImages[currentSlide];

      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle(
          "active",
          dotIndex === currentSlide
        );
      });
    }

    function restartSlider() {
      window.clearInterval(sliderTimer);

      sliderTimer = window.setInterval(function () {
        showSlide((currentSlide + 1) % sliderImages.length);
      }, 5000);
    }

    heroImage.addEventListener(
      "error",
      function () {
        if (originalImage) {
          heroImage.src = originalImage;
        }

        controls.style.display = "none";
        window.clearInterval(sliderTimer);
      },
      { once: true }
    );

    if (sliderImages.length > 1) {
      heroImageContainer.appendChild(controls);
      showSlide(currentSlide);
      restartSlider();
    }
  }

  // 13. ANIMATED HOMEPAGE COUNTERS
  const heroSection = document.querySelector(".hero");
  const existingStats = document.querySelector(".stats-section");

  if (heroSection && !existingStats) {
    const statsSection = document.createElement("section");

    statsSection.className = "stats-section";

    statsSection.innerHTML = `
      <div class="stat-item">
        <h3 class="counter" data-target="20">0</h3>
        <p>Healthcare Professionals</p>
      </div>

      <div class="stat-item">
        <h3 class="counter" data-target="8">0</h3>
        <p>Departments</p>
      </div>

      <div class="stat-item">
        <h3 class="counter" data-target="24">0</h3>
        <p>Hours Emergency Support</p>
      </div>

      <div class="stat-item">
        <h3 class="counter" data-target="1000">0</h3>
        <p>Patients Served</p>
      </div>
    `;

    heroSection.insertAdjacentElement(
      "afterend",
      statsSection
    );

    const counters = statsSection.querySelectorAll(".counter");
    const duration = 1500;

    counters.forEach(function (counter) {
      const target = Number(counter.dataset.target) || 0;
      const startTime = performance.now();

      function animateCounter(now) {
        const progress = Math.min(
          (now - startTime) / duration,
          1
        );

        counter.textContent = Math.floor(
          target * progress
        ).toLocaleString();

        if (progress < 1) {
          window.requestAnimationFrame(animateCounter);
        } else {
          counter.textContent =
            target.toLocaleString() +
            (target === 24 ? "/7" : "+");
        }
      }

      window.requestAnimationFrame(animateCounter);
    });
  }

  // 14. LOADING SPINNER
  const loader = document.createElement("div");

  loader.className = "page-loader";

  loader.innerHTML =
    '<div class="loader-spinner" role="status" aria-label="Loading"></div>';

  document.body.appendChild(loader);

  window.addEventListener("load", function () {
    loader.classList.add("loader-hidden");

    window.setTimeout(function () {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 500);
  });

});
