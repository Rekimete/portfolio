/* ==========================================
   MAIN.JS - Script principal
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeProjectsCarousel();
    initializeContactForm();
    initializeObserverAnimations();
});

/* ==========================================
   GESTION DE LA NAVIGATION
   ========================================== */

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu au clic sur le hamburger
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('.navbar-container');
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ==========================================
   EFFETS DE SCROLL
   ========================================== */

function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        // Ajouter une classe au navbar au scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Mise à jour du lien actif de la nav
        updateActiveNavLink();
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.scrollY + 100;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[data-section="${section.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

/* ==========================================
   CAROUSEL DES PROJETS
   ========================================== */

function initializeProjectsCarousel() {
    const carousel = document.querySelector('[data-carousel="projects"]');

    if (!carousel) return;

    const track = carousel.querySelector('.projects-carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.project-slide'));
    const prevButton = carousel.querySelector('.carousel-button-prev');
    const nextButton = carousel.querySelector('.carousel-button-next');
    const dotsContainer = document.querySelector('.projects-carousel-dots');

    if (!track || slides.length === 0 || !prevButton || !nextButton || !dotsContainer) return;

    let currentIndex = 0;

    dotsContainer.innerHTML = '';

    const dots = slides.map((slide, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Aller au projet ${index + 1}`);
        dot.addEventListener('click', () => scrollToSlide(index));
        dotsContainer.appendChild(dot);
        return dot;
    });

    function getPreviousIndex(index) {
        return (index - 1 + slides.length) % slides.length;
    }

    function getNextIndex(index) {
        return (index + 1) % slides.length;
    }

    function updateCarouselState(index) {
        currentIndex = ((index % slides.length) + slides.length) % slides.length;

        const previousIndex = getPreviousIndex(currentIndex);
        const nextIndex = getNextIndex(currentIndex);

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle('is-active', dotIndex === currentIndex);
            dot.setAttribute('aria-current', dotIndex === currentIndex ? 'true' : 'false');
        });

        slides.forEach((slide, slideIndex) => {
            slide.classList.remove('is-active', 'is-prev', 'is-next', 'is-hidden');

            if (slideIndex === currentIndex) {
                slide.classList.add('is-active');
            } else if (slideIndex === previousIndex) {
                slide.classList.add('is-prev');
            } else if (slideIndex === nextIndex) {
                slide.classList.add('is-next');
            } else {
                slide.classList.add('is-hidden');
            }
        });

        prevButton.disabled = false;
        nextButton.disabled = false;
    }

    function scrollToSlide(index) {
        updateCarouselState(index);
    }

    prevButton.addEventListener('click', () => scrollToSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => scrollToSlide(currentIndex + 1));

    track.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollToSlide(currentIndex - 1);
        }

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollToSlide(currentIndex + 1);
        }
    });

    slides.forEach((slide, slideIndex) => {
        slide.addEventListener('click', function() {
            if (slideIndex !== currentIndex) {
                scrollToSlide(slideIndex);
            }
        });
    });

    track.setAttribute('tabindex', '0');
    updateCarouselState(0);
}

/* ==========================================
   FORMULAIRE DE CONTACT
   ========================================== */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validation du formulaire
        if (!validateForm()) {
            return;
        }


        // Afficher un message de succès (à remplacer par une vraie soumission)
        showFormSuccess();
        contactForm.reset();
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    // Réinitialiser les erreurs
    clearFormErrors();

    // Validation du nom
    if (name.value.trim() === '') {
        showFieldError(name, 'Le nom est requis');
        isValid = false;
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        showFieldError(email, 'Veuillez entrer une adresse email valide');
        isValid = false;
    }

    // Validation du message
    if (message.value.trim() === '') {
        showFieldError(message, 'Le message est requis');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showFieldError(message, 'Le message doit contenir au moins 10 caractères');
        isValid = false;
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error show';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const errorInputs = document.querySelectorAll('input.error, textarea.error');
    
    errorElements.forEach(el => el.remove());
    errorInputs.forEach(input => input.classList.remove('error'));
}

function showFormSuccess() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success show';
    successMessage.textContent = '✓ Merci ! Votre message a été envoyé avec succès.';
    
    contactForm.insertBefore(successMessage, contactForm.firstChild);

    // Retirer le message après 5 secondes
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

/* ==========================================
   INTERSECTION OBSERVER POUR LES ANIMATIONS
   ========================================== */

function initializeObserverAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateElement(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.project-card, .skill-category, .soft-skill-item, .stat-card, .timeline-item, .contact-form, .contact-info'
    );

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

function animateElement(element) {
    // Ajouter une classe d'animation si elle n'est pas déjà présente
    if (!element.classList.contains('animate-fadeInUp')) {
        element.style.opacity = '1';
        element.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }
}

/* ==========================================
   UTILITAIRES
   ========================================== */

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar').clientHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

