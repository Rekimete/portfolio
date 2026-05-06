

/* ==========================================
   NAVIGATION.JS - Gestion avancée de la navigation
   ========================================== */

/* ==========================================
   GESTION DES SECTIONS ACTIVES
   ========================================== */

function setupSectionTracking() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const options = {
        threshold: 0.3,
        rootMargin: '-50% 0px -50% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
}

/* ==========================================
   SMOOTH SCROLL BEHAVIOR
   ========================================== */

/* ==========================================
   SMOOTH SCROLL
   ========================================== */

function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section') || link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                const navMenu = document.getElementById('navMenu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

/* ==========================================
   NAVBAR STICKY BEHAVIOR
   ========================================== */

/* ==========================================
   NAVBAR BEHAVIOR
   ========================================== */

function setupNavbarBehavior() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = 0;
    let scrollDirection = 'down';
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            scrollDirection = 'down';
        } else {
            scrollDirection = 'up';
        }
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = currentScrollY;
    });
}

/* ==========================================
   LOGO CLICK TO TOP
   ========================================== */

/* ==========================================
   LOGO -> SCROLL TOP
   ========================================== */

function setupLogoClickToTop() {
    const logo = document.querySelector('.navbar-logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        logo.style.cursor = 'pointer';
    }
}

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */

function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!hamburger || !navMenu) return;
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    document.addEventListener('click', (e) => {
        const isClickInsideNav = e.target.closest('.navbar');
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ==========================================
   BREADCRUMB NAVIGATION (OPTIONNEL)
   ========================================== */

/* ==========================================
   NAV STATE SYNC
   ========================================== */

function updateNavigationState() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentSection = getCurrentSection();
    navLinks.forEach(link => {
        const section = link.getAttribute('data-section');
        if (section === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ==========================================
   HELPERS
   ========================================== */

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;

    for (let section of sections) {
        if (section.offsetTop <= scrollPosition && 
            section.offsetTop + section.offsetHeight > scrollPosition) {
            return section.id;
        }
    }

    return 'home';
}

/* ==========================================
   KEYBOARD NAVIGATION
   ========================================== */

/* ==========================================
   KEYBOARD NAVIGATION
   ========================================== */

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        const navLinks = document.querySelectorAll('.nav-link');
        const currentActive = document.querySelector('.nav-link.active');
        if (!currentActive) return;
        let nextLink = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const currentIndex = Array.from(navLinks).indexOf(currentActive);
            nextLink = navLinks[currentIndex + 1] || navLinks[0];
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const currentIndex = Array.from(navLinks).indexOf(currentActive);
            nextLink = navLinks[currentIndex - 1] || navLinks[navLinks.length - 1];
        } else if (e.key === 'Enter' && e.ctrlKey) {
            currentActive.click();
            return;
        }
        if (nextLink) {
            e.preventDefault();
            nextLink.click();
            nextLink.focus();
        }
    });
}

/* ==========================================
   INITIALISATION
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    setupSectionTracking();
    setupSmoothScroll();
    setupNavbarBehavior();
    setupLogoClickToTop();
    setupMobileMenu();
    setupKeyboardNavigation();
    updateNavigationState();
});

// Mettre à jour l'état de la navigation au scroll
window.addEventListener('scroll', () => {
    updateNavigationState();
});

