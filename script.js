document.addEventListener("DOMContentLoaded", () => {
  const config =
    typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {};

  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  const backToTop = document.getElementById("back-to-top");
  const currentYear = document.getElementById("current-year");
  const contactStatus = document.getElementById("contact-status");
  const progressBar = document.getElementById("scroll-progress-bar");
  const pageLoader = document.getElementById("page-loader");
  const motionToggle = document.getElementById("motion-toggle");
  const hero = document.querySelector(".hero");
  const heroVisual = document.querySelector(".hero-visual");
  const cursorAura = document.getElementById("cursor-aura");
  const networkCanvas = document.getElementById("nexus-network");
  const comparison = document.getElementById("comparison-experience");
  const comparisonRange = document.getElementById("comparison-range");

  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const systemReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storedMotion = localStorage.getItem("nexus-motion");
  let motionReduced =
    storedMotion === "reduced" ||
    (storedMotion === null && systemReducedMotion.matches);

  let networkController = null;

  // ======================================================
  // Initial experience
  // ======================================================
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const splitKineticText = () => {
    document.querySelectorAll("[data-kinetic]").forEach((element) => {
      if (element.dataset.split === "true") return;

      const words = element.textContent.trim().split(/\s+/);
      element.innerHTML = words
        .map(
          (word, index) =>
            `<span class="word" style="--word-index:${index}">${word}</span>`
        )
        .join(" ");

      element.dataset.split = "true";
    });
  };

  splitKineticText();

  const finishLoading = () => {
    document.body.classList.add("is-loaded");
    if (pageLoader) {
      pageLoader.classList.add("is-hidden");
      window.setTimeout(() => pageLoader.remove(), 850);
    }
  };

  window.addEventListener("load", () => {
    window.setTimeout(finishLoading, motionReduced ? 0 : 450);
  });

  window.setTimeout(() => {
    if (!document.body.classList.contains("is-loaded")) finishLoading();
  }, 2400);

  // ======================================================
  // Motion preference and explicit control
  // ======================================================
  const updateMotionButton = () => {
    if (!motionToggle) return;

    motionToggle.setAttribute("aria-pressed", String(motionReduced));
    motionToggle.setAttribute(
      "aria-label",
      motionReduced ? "Ativar efeitos visuais" : "Reduzir efeitos visuais"
    );

    motionToggle.innerHTML = motionReduced
      ? '<i class="ph ph-play"></i><span>Ativar</span>'
      : '<i class="ph ph-sparkle"></i><span>Efeitos</span>';
  };

  const applyMotionPreference = () => {
    document.body.classList.toggle("motion-reduced", motionReduced);
    updateMotionButton();

    if (networkController) {
      motionReduced ? networkController.stop() : networkController.start();
    }
  };

  applyMotionPreference();

  if (motionToggle) {
    motionToggle.addEventListener("click", () => {
      motionReduced = !motionReduced;
      localStorage.setItem(
        "nexus-motion",
        motionReduced ? "reduced" : "full"
      );
      applyMotionPreference();
    });
  }

  // ======================================================
  // Header, progress and navigation
  // ======================================================
  const updateScrollState = () => {
    const scrollTop = window.scrollY;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress =
      maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0;

    document.documentElement.style.setProperty(
      "--progress",
      `${progress}%`
    );

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 24);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", scrollTop > 700);
    }

    if (heroVisual && hero && !motionReduced && window.innerWidth > 700) {
      const heroHeight = hero.offsetHeight;
      const localProgress = Math.min(1, scrollTop / heroHeight);
      heroVisual.style.setProperty(
        "--hero-parallax",
        `${localProgress * 42}px`
      );
    }
  };

  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });

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

  // Estado ativo da navegação
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const observedSections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && observedSections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-current",
            link.getAttribute("href") === `#${visible.target.id}`
          );
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.2, 0.5]
      }
    );

    observedSections.forEach((section) => navObserver.observe(section));
  }

  // ======================================================
  // WhatsApp
  // ======================================================
  const digitsOnly = (value) =>
    String(value || "").replace(/\D/g, "");

  const whatsappNumber = digitsOnly(config?.profissional?.whatsapp);
  const whatsappMessage = config?.whatsapp?.mensagem || "";
  const whatsappElements = document.querySelectorAll(".js-whatsapp");

  if (whatsappNumber.length >= 12) {
    const whatsappUrl =
      `https://wa.me/${whatsappNumber}` +
      (whatsappMessage
        ? `?text=${encodeURIComponent(whatsappMessage)}`
        : "");

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

  // ======================================================
  // Reveal with intelligent staggering
  // ======================================================
  const revealItems = [...document.querySelectorAll("[data-reveal]")];

  const setRevealDelays = () => {
    const groupedParents = new Map();

    revealItems.forEach((item) => {
      const parent = item.parentElement;
      if (!groupedParents.has(parent)) groupedParents.set(parent, []);
      groupedParents.get(parent).push(item);
    });

    groupedParents.forEach((items) => {
      if (items.length < 2 || items.length > 8) return;
      items.forEach((item, index) => {
        item.style.setProperty(
          "--reveal-delay",
          `${Math.min(index * 90, 420)}ms`
        );
      });
    });
  };

  setRevealDelays();

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
        threshold: 0.11,
        rootMargin: "0px 0px -45px 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("revealed"));
  }

  // ======================================================
  // Interactive comparison
  // ======================================================
  if (comparison && comparisonRange) {
    const updateComparison = () => {
      comparison.style.setProperty(
        "--split",
        `${comparisonRange.value}%`
      );
    };

    comparisonRange.addEventListener("input", updateComparison);
    updateComparison();
  }

  // ======================================================
  // FAQ
  // ======================================================
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const wasActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("active");
        const faqButton = faqItem.querySelector(".faq-question");
        if (faqButton) {
          faqButton.setAttribute("aria-expanded", "false");
        }
      });

      if (!wasActive) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ======================================================
  // Pointer aura and hero spotlight
  // ======================================================
  if (supportsHover.matches) {
    document.body.classList.add("has-pointer");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let auraX = pointerX;
    let auraY = pointerY;
    let auraFrame = null;

    const animateAura = () => {
      auraX += (pointerX - auraX) * 0.14;
      auraY += (pointerY - auraY) * 0.14;

      document.documentElement.style.setProperty(
        "--mouse-x",
        `${auraX}px`
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        `${auraY}px`
      );

      auraFrame = requestAnimationFrame(animateAura);
    };

    document.addEventListener(
      "pointermove",
      (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;

        if (hero) {
          const rect = hero.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          hero.style.setProperty("--hero-x", `${x}%`);
          hero.style.setProperty("--hero-y", `${y}%`);
        }
      },
      { passive: true }
    );

    if (!motionReduced) {
      auraFrame = requestAnimationFrame(animateAura);
    }

    motionToggle?.addEventListener("click", () => {
      if (motionReduced && auraFrame) {
        cancelAnimationFrame(auraFrame);
        auraFrame = null;
      } else if (!motionReduced && !auraFrame) {
        auraFrame = requestAnimationFrame(animateAura);
      }
    });
  }

  // ======================================================
  // 3D tilt cards
  // ======================================================
  const tiltElements = document.querySelectorAll("[data-tilt]");

  tiltElements.forEach((element) => {
    const depth = Number(element.dataset.depth || 8);

    element.addEventListener("pointermove", (event) => {
      if (!supportsHover.matches || motionReduced) return;

      const rect = element.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const percentX = localX / rect.width;
      const percentY = localY / rect.height;

      const rotateY = (percentX - 0.5) * depth;
      const rotateX = (0.5 - percentY) * depth;

      element.style.setProperty("--tilt-x", `${rotateX}deg`);
      element.style.setProperty("--tilt-y", `${rotateY}deg`);
      element.style.setProperty("--surface-x", `${percentX * 100}%`);
      element.style.setProperty("--surface-y", `${percentY * 100}%`);
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--tilt-x", "0deg");
      element.style.setProperty("--tilt-y", "0deg");
      element.style.setProperty("--surface-x", "50%");
      element.style.setProperty("--surface-y", "50%");
    });
  });

  // ======================================================
  // Magnetic buttons
  // ======================================================
  document.querySelectorAll("[data-magnetic]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      if (!supportsHover.matches || motionReduced) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      element.style.setProperty("--magnetic-x", `${x * 0.14}px`);
      element.style.setProperty("--magnetic-y", `${y * 0.14}px`);
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--magnetic-x", "0px");
      element.style.setProperty("--magnetic-y", "0px");
    });
  });

  // ======================================================
  // Card spotlight
  // ======================================================
  document.querySelectorAll("[data-spotlight-card]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty(
        "--spot-x",
        `${event.clientX - rect.left}px`
      );
      card.style.setProperty(
        "--spot-y",
        `${event.clientY - rect.top}px`
      );
    });
  });

  // ======================================================
  // Animated Nexus network canvas
  // ======================================================
  const createNetwork = (canvas) => {
    if (!canvas) {
      return { start() {}, stop() {} };
    }

    const context = canvas.getContext("2d");
    let nodes = [];
    let animationFrame = null;
    let running = false;
    let width = 0;
    let height = 0;
    let pointer = { x: -1000, y: -1000 };
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );

      const desiredCount = Math.min(
        62,
        Math.max(24, Math.floor(width / 24))
      );

      nodes = Array.from({ length: desiredCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        radius: 1 + Math.random() * 1.7,
        pulse: Math.random() * Math.PI * 2
      }));
    };

    const draw = (time) => {
      if (!running) return;

      context.clearRect(0, 0, width, height);

      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.012;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        const pointerDx = pointer.x - node.x;
        const pointerDy = pointer.y - node.y;
        const pointerDistance = Math.hypot(pointerDx, pointerDy);

        if (pointerDistance < 150 && pointerDistance > 0) {
          node.x -= (pointerDx / pointerDistance) * 0.15;
          node.y -= (pointerDy / pointerDistance) * 0.15;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);

          if (distance < 125) {
            const opacity = (1 - distance / 125) * 0.18;
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(0, 58, 93, ${opacity})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }
      }

      nodes.forEach((node) => {
        const pulse = 0.75 + Math.sin(node.pulse) * 0.25;
        context.beginPath();
        context.arc(
          node.x,
          node.y,
          node.radius * pulse,
          0,
          Math.PI * 2
        );
        context.fillStyle = "rgba(86, 124, 153, 0.55)";
        context.fill();
      });

      animationFrame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running || motionReduced) return;
      running = true;
      resize();
      animationFrame = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      context.clearRect(0, 0, width, height);
    };

    const handlePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };

    hero?.addEventListener("pointermove", handlePointer, {
      passive: true
    });

    hero?.addEventListener("pointerleave", () => {
      pointer = { x: -1000, y: -1000 };
    });

    window.addEventListener("resize", () => {
      if (running) resize();
    });

    return { start, stop };
  };

  networkController = createNetwork(networkCanvas);
  if (!motionReduced) networkController.start();

  // ======================================================
  // Back to top
  // ======================================================
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
