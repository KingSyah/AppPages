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

// Add loading animation when clicking app items - Optimized
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.add('loading');

        // Remove loading class after a shorter delay
        setTimeout(() => {
            this.classList.remove('loading');
        }, 600);
    });
});

// Optimized floating animation - Only on desktop
function createFloatingShape() {
    // Skip on mobile devices for better performance
    if (window.innerWidth <= 768) return;

    const shape = document.createElement('div');
    shape.className = 'floating-shapes';
    shape.style.left = Math.random() * 100 + '%';
    shape.style.top = Math.random() * 100 + '%';
    shape.style.width = (Math.random() * 10 + 8) + 'px';
    shape.style.height = shape.style.width;
    shape.style.animationDelay = Math.random() * 3 + 's';

    const bgAnimation = document.querySelector('.bg-animation');
    if (bgAnimation && bgAnimation.children.length < 8) { // Limit max shapes
        bgAnimation.appendChild(shape);

        // Remove shape after animation completes
        setTimeout(() => {
            if (shape.parentNode) {
                shape.parentNode.removeChild(shape);
            }
        }, 3000);
    }
}

// Create new floating shapes less frequently
let shapeInterval;
function initFloatingShapes() {
    if (window.innerWidth > 768) {
        shapeInterval = setInterval(createFloatingShape, 3000);
    }
}

// Handle resize events
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && shapeInterval) {
        clearInterval(shapeInterval);
        shapeInterval = null;
    } else if (window.innerWidth > 768 && !shapeInterval) {
        initFloatingShapes();
    }
});

// Initialize
initFloatingShapes();

// Optimized hover effects
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.15s ease';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.15s ease';
    });
});

// Optimized touch feedback for mobile
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('touchstart', function(e) {
        this.style.transform = 'scale(0.98)';
        this.style.transition = 'all 0.1s ease';
    }, { passive: true });

    item.addEventListener('touchend', function(e) {
        setTimeout(() => {
            this.style.transform = '';
            this.style.transition = 'all 0.15s ease';
        }, 50);
    }, { passive: true });
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

// Optimized intersection observer for fade-in animations
function setupFadeInAnimations() {
    // Skip complex animations on mobile for better performance
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Simple fade-in for mobile
        document.querySelectorAll('.app-section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '20px'
    });

    // Observe app sections for fade-in effect
    document.querySelectorAll('.app-section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(15px)';
        section.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}

// Initialize fade-in animations when DOM is loaded
document.addEventListener('DOMContentLoaded', setupFadeInAnimations);

// Device detection for enhanced effects
function isHighPerformanceDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const hasGoodCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency >= 4;
    const hasLargeScreen = window.innerWidth > 768;

    return !isMobile && !isTouchDevice && hasGoodCPU && hasLargeScreen;
}

// Enhanced hover effects for high-performance devices
if (isHighPerformanceDevice()) {
    document.querySelectorAll('.app-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.1)';
            this.style.backdropFilter = 'blur(15px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.backdropFilter = '';
        });
    });

    // Add subtle glow effect to sections on high-performance devices
    document.querySelectorAll('.app-section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.05)';
        });

        section.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Performance monitoring
let performanceMonitor = {
    frameCount: 0,
    lastTime: performance.now(),
    fps: 60,

    update() {
        const now = performance.now();
        this.frameCount++;

        if (now - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastTime = now;

            // If FPS drops too low, disable some effects
            if (this.fps < 30 && window.splashCursor) {
                console.log('Low FPS detected, optimizing effects...');
                window.splashCursor.pauseAnimation();
            }
        }

        requestAnimationFrame(() => this.update());
    }
};

// Start performance monitoring on high-performance devices
if (isHighPerformanceDevice()) {
    performanceMonitor.update();
}