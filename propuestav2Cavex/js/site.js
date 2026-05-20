// Ocultar Skeleton Loader al finalizar la carga
window.addEventListener('load', function() {
    const loader = document.getElementById('skeleton-loader');
    if (loader) {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }
});

// Configuración de Scroll Reveal
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        } else {
            entry.target.classList.remove('reveal-visible');
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Configuración de Menú Móvil
document.addEventListener("DOMContentLoaded", () => {
    const mobileBtn = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("is-open");
            mobileBtn.setAttribute("aria-expanded", String(isOpen));
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("is-open");
                mobileBtn.setAttribute("aria-expanded", "false");
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const revealOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
