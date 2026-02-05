/**
 * Modern App Launcher - JavaScript
 * Clean and Simple Interactions
 */

// ==========================================================================
// Utility Functions
// ==========================================================================
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ==========================================================================
// Card Interactions
// ==========================================================================
const CardInteractions = {
    init() {
        const cards = $$('.app-card');
        
        cards.forEach(card => {
            // Add ripple effect on click
            card.addEventListener('click', (e) => {
                this.createRipple(e, card);
            });
            
            // Add subtle scale on hover (touch devices)
            if ('ontouchstart' in window) {
                card.addEventListener('touchstart', () => {
                    card.style.transform = 'scale(0.98)';
                });
                
                card.addEventListener('touchend', () => {
                    card.style.transform = '';
                });
            }
        });
    },
    
    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
};

// ==========================================================================
// Smooth Scroll
// ==========================================================================
const SmoothScroll = {
    init() {
        // Add smooth scroll to all anchor links
        $$('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = $(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// ==========================================================================
// Lazy Loading Animation
// ==========================================================================
const LazyAnimation = {
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            // Observe sections and cards
            $$('.app-section').forEach((section, index) => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                observer.observe(section);
            });
        } else {
            // Fallback for older browsers
            $$('.app-section').forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }
    }
};

// ==========================================================================
// Performance Optimization
// ==========================================================================
const PerformanceOptimizer = {
    init() {
        // Pause animations when page is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.style.animationPlayState = 'paused';
            } else {
                document.body.style.animationPlayState = 'running';
            }
        });
        
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            $$('.bubble').forEach(bubble => {
                bubble.style.animation = 'none';
                bubble.style.opacity = '0.2';
            });
        }
    }
};

// ==========================================================================
// Add Dynamic Styles
// ==========================================================================
const DynamicStyles = {
    init() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// ==========================================================================
// Initialize Application
// ==========================================================================
const App = {
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    },
    
    start() {
        console.log('🚀 App Launcher initialized');
        
        // Initialize all modules
        DynamicStyles.init();
        CardInteractions.init();
        SmoothScroll.init();
        LazyAnimation.init();
        PerformanceOptimizer.init();
        
        // Add loaded class to body
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }
};

// Start the application
App.init();
