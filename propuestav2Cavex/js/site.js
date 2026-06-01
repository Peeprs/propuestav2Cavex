// Ocultar Skeleton Loader al finalizar la carga
window.addEventListener('load', function() {
    const loader = document.getElementById('skeleton-loader');
    if (loader) {
        loader.classList.add('is-hidden');
        setTimeout(() => loader.remove(), 600);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Definir el orden de las páginas para el desplazamiento
    const pages = [
        "index.html",
        "como-funciona.html",
        "seguridad.html",
        "preguntas-frecuentes.html",
        "contacto.html"
    ];

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    let currentIndex = pages.findIndex(p => currentPath.includes(p));
    if(currentIndex === -1) currentIndex = 0; // fallback

    const prevIndex = sessionStorage.getItem("cavexPageIndex");
    const mainEl = document.querySelector(".page-transition");
    
    if (mainEl && prevIndex !== null) {
        const prev = parseInt(prevIndex, 10);
        if (currentIndex > prev) {
            // Viene de un link anterior, entra desde la derecha
            mainEl.style.animation = "slideInRight 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards";
        } else if (currentIndex < prev) {
            // Viene de un link posterior, entra desde la izquierda
            mainEl.style.animation = "slideInLeft 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards";
        } else {
            mainEl.style.animation = "fadeInUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards";
        }
    } else if (mainEl) {
        mainEl.style.animation = "fadeInUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) forwards";
    }

    sessionStorage.setItem("cavexPageIndex", currentIndex);
});

// Configuración de Scroll Reveal
const revealOptions = {
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        } else {
            // Opcional: remover para animar en scroll hacia arriba
            // entry.target.classList.remove('reveal-visible');
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
