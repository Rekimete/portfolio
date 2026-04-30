/* ==========================================
   MAIN.JS - Script principal
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
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

        // Récupérer les données
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

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

