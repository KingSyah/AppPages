// Update current year automatically
function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Initialize year on page load
document.addEventListener('DOMContentLoaded', function() {
    updateYear();
});

// Add loading animation when clicking app items
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.add('loading');
        
        // Remove loading class after a short delay
        setTimeout(() => {
            this.classList.remove('loading');
        }, 1000);
    });
});

// Add floating animation to background shapes
function createFloatingShape() {
    const shape = document.createElement('div');
    shape.className = 'floating-shapes';
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.width = (Math.random() * 15 + 10) + 'px';
    shape.style.height = shape.style.width;
    shape.style.animationDelay = Math.random() * 6 + 's';
    
    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation) {
        bgAnimation.appendChild(shape);
        
        // Remove shape after animation completes
        setTimeout(() => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        }, 6000);
    }
}

// Create new floating shapes periodically
setInterval(createFloatingShape, 2000);

// Add hover sound effect (visual feedback)
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add touch feedback for mobile
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    item.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.transform = 'scale(1.05)';
        }, 100);
    });
});

// Smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add performance optimization for animations
function optimizeAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
optimizeAnimations();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Add focus styles for keyboard navigation
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    // Remove focus styles when using mouse
    document.body.classList.remove('keyboard-navigation');
});

// Add error handling for external links
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', function(e) {
        const url = this.getAttribute('href');
        
        // Basic URL validation
        try {
            new URL(url);
        } catch (error) {
            e.preventDefault();
            console.error('Invalid URL:', url);
            alert('Link tidak valid atau tidak tersedia.');
        }
    });
});

// Add intersection observer for fade-in animations
function setupFadeInAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe app sections for fade-in effect
    document.querySelectorAll('.app-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize fade-in animations when DOM is loaded
document.addEventListener('DOMContentLoaded', setupFadeInAnimations);