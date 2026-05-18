document.addEventListener("DOMContentLoaded", () => {
    setupDeviceIcons();
    setupMobileMenu();
    setupFaqAccordion();
    setupRevealAnimations();
});

window.addEventListener("load", () => {
    hideSkeletonLoader();
});

/**
 * Oculta el skeleton loader inicial.
 */
function hideSkeletonLoader() {
    const loader = document.getElementById("skeleton-loader");

    if (!loader) return;

    loader.classList.add("is-hidden");

    setTimeout(() => {
        loader.remove();
    }, 600);
}

/**
 * Activa visualmente los iconos de dispositivos.
 */
function setupDeviceIcons() {
    const icons = document.querySelectorAll(".device-icon");

    icons.forEach((icon) => {
        icon.addEventListener("click", () => {
            icons.forEach((item) => item.classList.remove("active"));
            icon.classList.add("active");
        });
    });
}

/**
 * Menú móvil.
 */
function setupMobileMenu() {
    const button = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");

    if (!button || !menu) return;

    button.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            menu.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
        });
    });
}

/**
 * Acordeón de preguntas frecuentes.
 */
function setupFaqAccordion() {
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach((button) => {
        const item = button.closest(".faq-item");
        const answer = item.querySelector(".faq-answer");

        if (button.getAttribute("aria-expanded") === "true") {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }

        button.addEventListener("click", () => {
            const isOpen = button.getAttribute("aria-expanded") === "true";

            faqButtons.forEach((otherButton) => {
                const otherItem = otherButton.closest(".faq-item");
                const otherAnswer = otherItem.querySelector(".faq-answer");

                otherButton.setAttribute("aria-expanded", "false");
                otherItem.classList.remove("is-open");
                otherAnswer.style.maxHeight = null;
            });

            if (!isOpen) {
                button.setAttribute("aria-expanded", "true");
                item.classList.add("is-open");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
}

/**
 * Animaciones al hacer scroll.
 */
function setupRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        elements.forEach((element) => element.classList.add("reveal-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -80px 0px"
        }
    );

    elements.forEach((element) => observer.observe(element));
}