document.addEventListener("DOMContentLoaded", () => {
  const config = window.SITE_CONFIG || SITE_CONFIG;

  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const backToTop = document.getElementById("back-to-top");
  const currentYear = document.getElementById("current-year");
  const contactStatus = document.getElementById("contact-status");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Header ao rolar
  const updateHeader = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 24);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 700);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Menu mobile
  const closeMenu = () => {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.remove("active");
    mainNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !mainNav) return;
    menuToggle.classList.add("active");
    mainNav.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
    document.body.classList.add("menu-open");
  };

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.contains("active") ? closeMenu() : openMenu();
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // WhatsApp
  const digitsOnly = (value) => String(value || "").replace(/\D/g, "");
  const whatsappNumber = digitsOnly(config?.profissional?.whatsapp);
  const whatsappMessage = config?.whatsapp?.mensagem || "";
  const whatsappElements = document.querySelectorAll(".js-whatsapp");

  if (whatsappNumber.length >= 12) {
    const whatsappUrl =
      `https://wa.me/${whatsappNumber}` +
      (whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : "");

    whatsappElements.forEach((element) => {
      element.href = whatsappUrl;
      element.target = "_blank";
      element.rel = "noopener";
      element.classList.remove("is-disabled");

      if (element.textContent.includes("WhatsApp a definir")) {
        element.innerHTML =
          '<i class="ph ph-whatsapp-logo"></i> Falar pelo WhatsApp';
      }
    });

    if (contactStatus) {
      contactStatus.textContent =
        "Você será direcionado para uma conversa com o Guilherme.";
    }
  } else {
    whatsappElements.forEach((element) => {
      element.href = "#contato";
      element.classList.add("is-disabled");
      element.setAttribute(
        "aria-label",
        "WhatsApp ainda não informado no arquivo config.js"
      );
    });
  }

  // FAQ
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const wasActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("active");
        const faqButton = faqItem.querySelector(".faq-question");
        if (faqButton) faqButton.setAttribute("aria-expanded", "false");
      });

      if (!wasActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Reveal
  const revealItems = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("revealed"));
  }

  // Voltar ao topo
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
