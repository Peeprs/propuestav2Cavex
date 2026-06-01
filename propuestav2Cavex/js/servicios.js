document.addEventListener("DOMContentLoaded", () => {
    setupDeviceIcons();
    setupMobileMenu();
    setupRevealAnimations();
});

window.addEventListener("load", () => {
    hideSkeletonLoader();
});

/**
 * Oculta el loader inicial.
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
 * Activa visualmente los iconos de dispositivo.
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
 * Controla el menú móvil.
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
 * Activa animaciones cuando las secciones entran en pantalla.
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
                } else {
                    entry.target.classList.remove("reveal-visible");
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px"
        }
    );

    elements.forEach((element) => observer.observe(element));
}