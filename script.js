/* global CONFIG */
(() => {
    'use strict';

    const getConfigValue = (path) => path.split('.').reduce((obj, key) => obj?.[key], CONFIG);

    function applySimpleConfig() {
        document.querySelectorAll('[data-config]').forEach((element) => {
            const value = getConfigValue(element.dataset.config);
            if (typeof value === 'string') element.textContent = value;
        });

        document.querySelectorAll('[data-instagram-link]').forEach((link) => {
            link.href = CONFIG.instagramUrl || '#';
            if (!CONFIG.instagramUrl) {
                link.setAttribute('aria-disabled', 'true');
                link.addEventListener('click', (event) => event.preventDefault());
            }
        });
    }

    function applyImages() {
        const imageMap = CONFIG.imagens || {};

        Object.entries(imageMap).forEach(([slot, source]) => {
            if (!source) return;

            const image = document.querySelector(`[data-image-element="${slot}"]`);
            const placeholder = document.querySelector(`[data-image-placeholder="${slot}"]`);
            if (!image) return;

            image.src = source;
            image.hidden = false;
            image.addEventListener('load', () => {
                if (placeholder) placeholder.hidden = true;
            });
            image.addEventListener('error', () => {
                image.hidden = true;
                if (placeholder) placeholder.hidden = false;
                console.warn(`Não foi possível carregar a imagem: ${source}`);
            });
        });

        if (imageMap.logo) {
            const logo = document.getElementById('brand-logo');
            const mark = document.getElementById('brand-mark');
            if (logo) {
                logo.src = imageMap.logo;
                logo.hidden = false;
                logo.addEventListener('load', () => {
                    logo.hidden = false;
                    if (mark) mark.hidden = true;
                    logo.closest('.brand')?.classList.add('brand--has-logo');
                });
                logo.addEventListener('error', () => {
                    logo.hidden = true;
                    if (mark) mark.hidden = false;
                });
            }
        }
    }

    function renderServices() {
        const grid = document.getElementById('services-grid');
        if (!grid || !Array.isArray(CONFIG.servicos)) return;

        grid.innerHTML = CONFIG.servicos.map((item) => `
            <article class="service-card" data-reveal>
                <div class="service-card__top">
                    <span class="service-card__number">${item.numero}</span>
                    <span class="service-card__icon"><i class="ph ${item.icone}"></i></span>
                </div>
                <h3>${item.titulo}</h3>
                <p>${item.texto}</p>
                <span class="status-pill">${item.status}</span>
            </article>
        `).join('');
    }

    function renderProcess() {
        const grid = document.getElementById('process-grid');
        if (!grid || !Array.isArray(CONFIG.processo)) return;

        grid.innerHTML = CONFIG.processo.map((item) => `
            <article class="process-card" data-reveal>
                <span>${item.numero}</span>
                <h3>${item.titulo}</h3>
                <p>${item.texto}</p>
            </article>
        `).join('');
    }

    function renderResults() {
        const list = document.getElementById('results-list');
        if (!list || !Array.isArray(CONFIG.resultados)) return;

        list.innerHTML = CONFIG.resultados.map((item, index) => `
            <article class="result-item" data-reveal>
                <span class="result-item__icon"><i class="ph ${item.icone}"></i></span>
                <div>
                    <small>0${index + 1}</small>
                    <h3>${item.titulo}</h3>
                    <p>${item.texto}</p>
                    <span>${item.status}</span>
                </div>
            </article>
        `).join('');
    }

    function renderFaq() {
        const list = document.getElementById('faq-list');
        if (!list || !Array.isArray(CONFIG.faq)) return;

        list.innerHTML = CONFIG.faq.map((item, index) => `
            <article class="faq-item" data-reveal>
                <button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-answer-${index}">
                    <span>${item.pergunta}</span>
                    <i class="ph ph-plus"></i>
                </button>
                <div class="faq-answer" id="faq-answer-${index}">
                    <p>${item.resposta}</p>
                </div>
            </article>
        `).join('');
    }

    function setupNavigation() {
        const header = document.getElementById('header');
        const nav = document.getElementById('nav');
        const toggle = document.getElementById('menu-toggle');
        const overlay = document.getElementById('menu-overlay');
        if (!nav || !toggle || !overlay) return;

        const closeMenu = () => {
            nav.classList.remove('is-open');
            overlay.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menu');
            document.body.classList.remove('menu-open');
        };

        const openMenu = () => {
            nav.classList.add('is-open');
            overlay.classList.add('is-open');
            toggle.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            toggle.setAttribute('aria-label', 'Fechar menu');
            document.body.classList.add('menu-open');
        };

        toggle.addEventListener('click', () => nav.classList.contains('is-open') ? closeMenu() : openMenu());
        overlay.addEventListener('click', closeMenu);
        nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeMenu();
        });

        const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
        window.addEventListener('scroll', updateHeader, { passive: true });
        updateHeader();
    }

    function setupFaq() {
        document.addEventListener('click', (event) => {
            const button = event.target.closest('.faq-question');
            if (!button) return;

            const current = button.closest('.faq-item');
            const wasOpen = current.classList.contains('is-open');

            document.querySelectorAll('.faq-item.is-open').forEach((item) => {
                item.classList.remove('is-open');
                item.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
            });

            if (!wasOpen) {
                current.classList.add('is-open');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    }

    function setupReveal() {
        const elements = document.querySelectorAll('[data-reveal]');
        if (!('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

        elements.forEach((element) => observer.observe(element));
    }

    function setupBackToTop() {
        const button = document.getElementById('back-to-top');
        if (!button) return;

        window.addEventListener('scroll', () => {
            button.classList.toggle('is-visible', window.scrollY > 700);
        }, { passive: true });

        button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function setupVideo() {
        const slot = document.querySelector('[data-video-slot]');
        if (!slot || !CONFIG.videoUrl) return;

        slot.classList.add('has-video-link');
        slot.setAttribute('role', 'link');
        slot.setAttribute('tabindex', '0');
        slot.setAttribute('aria-label', 'Abrir vídeo de apresentação');

        const openVideo = () => window.open(CONFIG.videoUrl, '_blank', 'noopener');
        slot.addEventListener('click', openVideo);
        slot.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openVideo();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        applySimpleConfig();
        applyImages();
        renderServices();
        renderProcess();
        renderResults();
        renderFaq();
        setupNavigation();
        setupFaq();
        setupVideo();
        setupBackToTop();

        // Aguarda os blocos dinâmicos entrarem no HTML antes de observar as animações.
        requestAnimationFrame(setupReveal);

        const year = document.getElementById('current-year');
        if (year) year.textContent = new Date().getFullYear();
    });
})();
