
/* ==========================================
   ANIMATIONS.JS - Animations légères et interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeParallaxEffect();
    initializeElementHovers();
    initializeScrollIndicator();
});

/* ==========================================
   PARALLAX EFFECT
   ========================================== */

function initializeParallaxEffect() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.transform = `translate3d(0, ${-scrollPosition * 0.18}px, 0)`;
        }
    });
}

/* ==========================================
   ELEMENT HOVERS
   ========================================== */

function initializeElementHovers() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                    tag.style.transition = 'transform 0.3s ease';
                }, index * 50);
            });
        });
        category.addEventListener('mouseleave', function() {
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });
        });
    });
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const marker = this.querySelector('.timeline-marker');
            if (marker) {
                marker.style.animation = 'pulse 1.5s ease-in-out';
            }
        });
        item.addEventListener('mouseleave', function() {
            const marker = this.querySelector('.timeline-marker');
            if (marker) {
                marker.style.animation = 'none';
            }
        });
    });
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
    });
}

/* ==========================================
   SCROLL INDICATOR
   ========================================== */

function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
            scrollIndicator.style.transition = 'opacity 0.3s ease';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
            scrollIndicator.style.transition = 'opacity 0.3s ease';
        }
    });
    scrollIndicator.addEventListener('click', function() {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    });
}

/* ==========================================
   COUNTERS
   ========================================== */

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterOptions = { threshold: 0.5 };
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, counterOptions);
    statNumbers.forEach(number => counterObserver.observe(number));
}

function animateCounter(element) {
    const finalValue = element.textContent;
    const isNumeric = /^\d+$/.test(finalValue);
    if (!isNumeric) return;
    const startValue = 0;
    const duration = 2000;
    const startTime = Date.now();
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        element.textContent = Math.floor(startValue + (finalValue - startValue) * progress);
        if (progress < 1) requestAnimationFrame(updateCounter);
        else element.textContent = finalValue;
    }
    updateCounter();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateCounters);
} else {
    animateCounters();
}

/* ==========================================
   RIPPLE EFFECT
   ========================================== */

function initializeRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRippleEffect);
} else {
    initializeRippleEffect();
}

/* ==========================================
   LAZY ANIMATIONS
   ========================================== */

function initializeLazyAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(el => observer.observe(el));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeLazyAnimations);
} else {
    initializeLazyAnimations();
}

