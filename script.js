/**
 * CYBER GRID — App Launcher
 * Clean Cyberpunk Theme Interactions
 */

// ==========================================================================
// DOM Utilities
// ==========================================================================
const DOM = {
    select: (selector) => document.querySelector(selector),
    selectAll: (selector) => document.querySelectorAll(selector),
    create: (tag, className = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        return element;
    }
};

// ==========================================================================
// Animation Controller
// ==========================================================================
const AnimationController = {
    initLoadingAnimations() {
        const loadingElements = DOM.selectAll('.loading');
        loadingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.15}s`;
        });
    }
};

// ==========================================================================
// Bubble Animation System
// ==========================================================================
class BubbleAnimationSystem {
    constructor() {
        this.bubbles = DOM.selectAll('.bubble');
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        this.randomizeBubbles();
        if (this.isMobile) this.optimizeForMobile();
        this.addRandomVariations();
        this.setupRespawnBubbles();
    }

    randomizeBubbles() {
        this.bubbles.forEach((bubble) => {
            const randomTop  = Math.random() * 80 + 10;
            const randomLeft = Math.random() * 80 + 10;
            const randomDelay = Math.random() * 5;
            const baseDuration = this.getBaseDuration(bubble);
            const randomDuration = baseDuration + (Math.random() * 4 - 2);

            bubble.style.top  = `${randomTop}%`;
            bubble.style.left = `${randomLeft}%`;
            bubble.style.animationDelay    = `${randomDelay}s`;
            bubble.style.animationDuration = `${randomDuration}s`;
            bubble.style.right  = 'auto';
            bubble.style.bottom = 'auto';
        });
    }

    getBaseDuration(bubble) {
        if (bubble.classList.contains('bubble-large'))   return 8;
        if (bubble.classList.contains('bubble-medium'))  return 6;
        if (bubble.classList.contains('bubble-small'))   return 4;
        if (bubble.classList.contains('bubble-tiny'))    return 3;
        if (bubble.classList.contains('bubble-respawn')) return 8;
        return 6;
    }

    addRandomVariations() {
        this.bubbles.forEach(bubble => {
            const randomScale   = 0.8 + Math.random() * 0.4;
            const randomOpacity = 0.65 + Math.random() * 0.3;
            bubble.style.setProperty('--random-scale',   randomScale);
            bubble.style.setProperty('--random-opacity', randomOpacity);
        });
    }

    setupRespawnBubbles() {
        DOM.selectAll('.bubble-respawn').forEach(bubble => {
            bubble.addEventListener('animationiteration', () => {
                this.smoothRespawn(bubble);
            });
        });
    }

    smoothRespawn(bubble) {
        setTimeout(() => {
            bubble.style.top  = `${Math.random() * 80 + 10}%`;
            bubble.style.left = `${Math.random() * 80 + 10}%`;
        }, 100);
    }

    optimizeForMobile() {
        this.bubbles.forEach(bubble => {
            const cur = parseFloat(bubble.style.animationDuration) || 6;
            bubble.style.animationDuration = `${cur * 1.5}s`;
        });
    }
}

// ==========================================================================
// Background Scroll Effects
// ==========================================================================
const BackgroundController = {
    initScrollBackground() {
        let ticking = false;

        const updateBackground = () => {
            const scrolled   = window.pageYOffset;
            const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
            const pct        = Math.min(scrolled / (docHeight || 1), 1);

            // Subtle cyan tint shifts as you scroll
            const cyan    = Math.round(5 + pct * 4);
            const magenta = Math.round(3 + pct * 3);

            document.body.style.backgroundImage = `
                radial-gradient(ellipse 80% 50% at 20% 0%,   rgba(56, 217, 245, 0.0${cyan}) 0%, transparent 60%),
                radial-gradient(ellipse 60% 40% at 80% 100%, rgba(240, 80, 122, 0.0${magenta}) 0%, transparent 60%),
                linear-gradient(180deg, #0e1525 0%, #121c30 50%, #162038 100%)
            `;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateBackground);
                ticking = true;
            }
        });
    }
};

// ==========================================================================
// Interactive Effects
// ==========================================================================
const InteractiveEffects = {
    addRippleEffect(event, element) {
        const ripple = DOM.create('div', 'ripple');
        const rect   = element.getBoundingClientRect();
        const size   = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top  - size / 2;

        ripple.style.width  = ripple.style.height = `${size}px`;
        ripple.style.left   = `${x}px`;
        ripple.style.top    = `${y}px`;

        element.style.position = 'relative';
        element.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 600);
    },

    addHoverFeedback(element) {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.06)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1)';
        });
    }
};

// ==========================================================================
// Responsive Behavior
// ==========================================================================
const ResponsiveController = {
    handleResize() {
        // no star elements in cyberpunk theme — placeholder kept for compat
    },
    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }
};

// ==========================================================================
// Performance Optimizer
// ==========================================================================
const PerformanceOptimizer = {
    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });

        DOM.selectAll('.app-card').forEach(card => observer.observe(card));
    },

    optimizeForPerformance() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }
};

// ==========================================================================
// Main Application
// ==========================================================================
const OceanStarsApp = {
    init() {
        this.bindEvents();
        this.startAnimations();
        this.initializeFeatures();
    },

    bindEvents() {
        DOM.selectAll('.app-card').forEach(card => {
            card.addEventListener('click', (e) => InteractiveEffects.addRippleEffect(e, card));
            InteractiveEffects.addHoverFeedback(card);
        });

        window.addEventListener('resize',
            ResponsiveController.debounce(ResponsiveController.handleResize, 250)
        );
    },

    startAnimations() {
        AnimationController.initLoadingAnimations();
    },

    initializeFeatures() {
        new BubbleAnimationSystem();
        BackgroundController.initScrollBackground();

        if ('IntersectionObserver' in window) {
            PerformanceOptimizer.initIntersectionObserver();
        }

        PerformanceOptimizer.optimizeForPerformance();
        this.addDynamicStyles();
    },

    addDynamicStyles() {
        const style = DOM.create('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 245, 255, 0.15);
                border: 1px solid rgba(0, 245, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to { transform: scale(4); opacity: 0; }
            }

            .animate-in {
                animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }

            @keyframes slideInUp {
                from { opacity: 0; transform: translateY(16px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            .reduced-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            .low-performance .bubble {
                animation-duration: 20s !important;
            }
        `;
        document.head.appendChild(style);
    }
};

// ==========================================================================
// Boot
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    OceanStarsApp.init();
});

document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('paused', document.hidden);
});
