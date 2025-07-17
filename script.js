/**
 * Ocean Stars Menu - Interactive JavaScript
 * Beach and Starry Sky Theme with Modern Animations
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
    // Initialize loading animations with staggered delays
    initLoadingAnimations() {
        const loadingElements = DOM.selectAll('.loading');
        loadingElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });
    }
};

// ==========================================================================
// Bubble Animation System (from Sample)
// ==========================================================================
class BubbleAnimationSystem {
    constructor() {
        this.bubbles = DOM.selectAll('.bubble');
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        // Randomize bubble positions and timing
        this.randomizeBubbles();

        // Adjust animation based device capabilities
        if (this.isMobile) {
            this.optimizeForMobile();
        }

        // Add random variations
        this.addRandomVariations();

        // Setup respawn bubbles
        this.setupRespawnBubbles();
    }

    randomizeBubbles() {
        this.bubbles.forEach((bubble, index) => {
            // Random position within safe bounds
            const randomTop = Math.random() * 80 + 10; // 10% to 90%
            const randomLeft = Math.random() * 80 + 10; // 10% to 90%

            // Random animation delay
            const randomDelay = Math.random() * 5; // 0 to 5 seconds

            // Random animation duration variation
            const baseDuration = this.getBaseDuration(bubble);
            const randomDuration = baseDuration + (Math.random() * 4 - 2); // ±2 seconds

            // Apply random properties
            bubble.style.top = `${randomTop}%`;
            bubble.style.left = `${randomLeft}%`;
            bubble.style.animationDelay = `${randomDelay}s`;
            bubble.style.animationDuration = `${randomDuration}s`;

            // Remove any existing positioning classes
            bubble.style.right = 'auto';
            bubble.style.bottom = 'auto';
        });
    }

    getBaseDuration(bubble) {
        if (bubble.classList.contains('bubble-large')) return 8;
        if (bubble.classList.contains('bubble-medium')) return 6;
        if (bubble.classList.contains('bubble-small')) return 4;
        if (bubble.classList.contains('bubble-tiny')) return 3;
        if (bubble.classList.contains('bubble-respawn')) return 8;
        return 6;
    }

    addRandomVariations() {
        // Add random scale variations
        this.bubbles.forEach(bubble => {
            const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
            bubble.style.setProperty('--random-scale', randomScale);

            // Add random opacity variation
            const randomOpacity = 0.7 + Math.random() * 0.3; // 0.7 to 1.0
            bubble.style.setProperty('--random-opacity', randomOpacity);
        });
    }

    setupRespawnBubbles() {
        // Setup respawn bubbles dengan smooth respawn
        const respawnBubbles = DOM.selectAll('.bubble-respawn');

        respawnBubbles.forEach(bubble => {
            const duration = parseFloat(bubble.style.animationDuration) || 8;

            // Listen untuk animation end untuk smooth respawn
            bubble.addEventListener('animationiteration', () => {
                this.smoothRespawn(bubble);
            });
        });
    }

    smoothRespawn(bubble) {
        // Tunggu sampai bubble benar-benar menghilang (opacity 0)
        setTimeout(() => {
            // Generate posisi baru saat bubble tidak terlihat
            const newTop = Math.random() * 80 + 10;
            const newLeft = Math.random() * 80 + 10;

            bubble.style.top = `${newTop}%`;
            bubble.style.left = `${newLeft}%`;
        }, 100); // Delay kecil saat bubble menghilang
    }

    optimizeForMobile() {
        // Reduce bubble count and slow down animations for mobile
        this.bubbles.forEach(bubble => {
            const currentDuration = parseFloat(bubble.style.animationDuration) || 6;
            bubble.style.animationDuration = `${currentDuration * 1.5}s`;
        });
    }
}

// ==========================================================================
// Background Scroll Effects
// ==========================================================================
const BackgroundController = {
    // Initialize scroll-based background changes
    initScrollBackground() {
        let ticking = false;

        const updateBackground = () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPercent = scrolled / (documentHeight - windowHeight);

            // Change background gradient based on scroll
            const body = document.body;
            if (scrollPercent < 0.3) {
                // Top - balanced dark blue
                body.style.background = `linear-gradient(180deg,
                    #2d4a7a 0%,
                    #4682b4 40%,
                    #5a9bd4 70%,
                    #87ceeb 100%
                )`;
            } else if (scrollPercent < 0.7) {
                // Middle - transition to lighter blue
                body.style.background = `linear-gradient(180deg,
                    #4682b4 0%,
                    #5a9bd4 30%,
                    #87ceeb 60%,
                    #a0d2eb 100%
                )`;
            } else {
                // Bottom - light but not too bright
                body.style.background = `linear-gradient(180deg,
                    #5a9bd4 0%,
                    #87ceeb 30%,
                    #a0d2eb 60%,
                    #b8e0f0 100%
                )`;
            }

            ticking = false;
        };

        const requestBackgroundUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateBackground);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestBackgroundUpdate);
    }
};

// ==========================================================================
// Interactive Effects
// ==========================================================================
const InteractiveEffects = {
    // Add ripple effect to app cards
    addRippleEffect(event, element) {
        const ripple = DOM.create('div', 'ripple');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        element.style.position = 'relative';
        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    },

    // Add hover feedback
    addHoverFeedback(element) {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.1) saturate(1.2)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1) saturate(1)';
        });
    }
};

// ==========================================================================
// Responsive Behavior
// ==========================================================================
const ResponsiveController = {
    // Handle window resize for responsive animations
    handleResize() {
        const width = window.innerWidth;
        const starElements = DOM.selectAll('.stars');
        
        if (width < 768) {
            // Mobile optimizations
            starElements.forEach(star => {
                star.style.animationDuration = '4s'; // Slower on mobile
            });
        } else {
            // Desktop optimizations
            starElements.forEach((star, index) => {
                const baseDuration = 3 + index;
                star.style.animationDuration = `${baseDuration}s`;
            });
        }
    },

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// ==========================================================================
// Performance Optimization
// ==========================================================================
const PerformanceOptimizer = {
    // Lazy load animations when elements are in viewport
    initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe app cards for animation
        const appCards = DOM.selectAll('.app-card');
        appCards.forEach(card => observer.observe(card));
    },

    // Reduce animations on low-performance devices
    optimizeForPerformance() {
        // Check if user prefers reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
            return;
        }
        
        // Simple performance check
        const start = performance.now();
        requestAnimationFrame(() => {
            const delta = performance.now() - start;
            if (delta > 16.67) { // More than 60fps
                document.body.classList.add('low-performance');
            }
        });
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
        // App card interactions
        const appCards = DOM.selectAll('.app-card');
        appCards.forEach(card => {
            // Add ripple effect on click
            card.addEventListener('click', (e) => {
                InteractiveEffects.addRippleEffect(e, card);
            });
            
            // Add hover feedback
            InteractiveEffects.addHoverFeedback(card);
        });
        
        // Window resize handler
        const debouncedResize = ResponsiveController.debounce(
            ResponsiveController.handleResize, 
            250
        );
        window.addEventListener('resize', debouncedResize);
        
        // Initial resize call
        ResponsiveController.handleResize();
    },

    startAnimations() {
        // Initialize loading animations
        AnimationController.initLoadingAnimations();
    },

    initializeFeatures() {
        // Initialize bubble animation system
        new BubbleAnimationSystem();

        // Initialize scroll background effect
        BackgroundController.initScrollBackground();

        // Initialize intersection observer for performance
        if ('IntersectionObserver' in window) {
            PerformanceOptimizer.initIntersectionObserver();
        }

        // Optimize for performance
        PerformanceOptimizer.optimizeForPerformance();

        // Add custom CSS for dynamic elements
        this.addDynamicStyles();
    },

    addDynamicStyles() {
        const style = DOM.create('style');
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .animate-in {
                animation: slideInUp 0.6s ease-out;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
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
// Initialize Application
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    OceanStarsApp.init();
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('paused');
    }
});
