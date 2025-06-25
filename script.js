// Loading Animation
window.addEventListener('load', function() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.animationDelay = `${index * 0.2}s`;
        }, index * 100);
    });
});

// App Card Click Animation
document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.app-card').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });

        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Dynamic Bubble Animation
class BubbleManager {
    constructor() {
        this.bubbles = document.querySelectorAll('.bubble');
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

        // Add subtle interaction effects
        this.addInteractionEffects();

        // Handle visibility changes for performance
        this.handleVisibilityChange();

        // Add random animation variations
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
            const randomDelay = Math.random() * 8; // 0 to 8 seconds

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
        return 5;
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
        const respawnBubbles = document.querySelectorAll('.bubble-respawn');

        respawnBubbles.forEach(bubble => {
            const duration = parseFloat(bubble.style.animationDuration) || 8;

            // Listen untuk animation end untuk smooth respawn
            bubble.addEventListener('animationiteration', () => {
                this.smoothRespawn(bubble);
            });
        });

        // Setup collision detection
        this.setupCollisionDetection();
    }

    smoothRespawn(bubble) {
        // Tunggu sampai bubble benar-benar menghilang (opacity 0)
        setTimeout(() => {
            // Generate posisi baru saat bubble tidak terlihat
            const newTop = Math.random() * 80 + 10;
            const newLeft = Math.random() * 80 + 10;

            // Pastikan tidak overlap dengan bubble lain
            const safePosition = this.findSafePosition(newTop, newLeft, bubble);

            bubble.style.top = `${safePosition.top}%`;
            bubble.style.left = `${safePosition.left}%`;
        }, 100); // Delay kecil saat bubble menghilang
    }

    findSafePosition(top, left, currentBubble) {
        const minDistance = 80; // Minimum distance in pixels
        let attempts = 0;
        let safeTop = top;
        let safeLeft = left;

        while (attempts < 10) {
            let isSafe = true;

            this.bubbles.forEach(otherBubble => {
                if (otherBubble === currentBubble) return;

                const otherRect = otherBubble.getBoundingClientRect();
                const otherTop = (otherRect.top / window.innerHeight) * 100;
                const otherLeft = (otherRect.left / window.innerWidth) * 100;

                const distance = Math.sqrt(
                    Math.pow(safeTop - otherTop, 2) +
                    Math.pow(safeLeft - otherLeft, 2)
                );

                if (distance < 8) { // 8% of screen
                    isSafe = false;
                }
            });

            if (isSafe) break;

            // Generate new position
            safeTop = Math.random() * 80 + 10;
            safeLeft = Math.random() * 80 + 10;
            attempts++;
        }

        return { top: safeTop, left: safeLeft };
    }

    setupCollisionDetection() {
        if (this.isMobile) return; // Skip collision on mobile for performance

        // Lightweight collision detection
        setInterval(() => {
            this.checkCollisions();
        }, 100); // Check every 100ms
    }

    checkCollisions() {
        const bubbleArray = Array.from(this.bubbles);

        for (let i = 0; i < bubbleArray.length; i++) {
            for (let j = i + 1; j < bubbleArray.length; j++) {
                const bubble1 = bubbleArray[i];
                const bubble2 = bubbleArray[j];

                if (this.isColliding(bubble1, bubble2)) {
                    this.handleCollision(bubble1, bubble2);
                }
            }
        }
    }

    isColliding(bubble1, bubble2) {
        const rect1 = bubble1.getBoundingClientRect();
        const rect2 = bubble2.getBoundingClientRect();

        const centerX1 = rect1.left + rect1.width / 2;
        const centerY1 = rect1.top + rect1.height / 2;
        const centerX2 = rect2.left + rect2.width / 2;
        const centerY2 = rect2.top + rect2.height / 2;

        const distance = Math.sqrt(
            Math.pow(centerX1 - centerX2, 2) +
            Math.pow(centerY1 - centerY2, 2)
        );

        const radius1 = rect1.width / 2;
        const radius2 = rect2.width / 2;

        return distance < (radius1 + radius2) * 0.8; // 80% overlap for natural feel
    }

    handleCollision(bubble1, bubble2) {
        // Simple bounce effect
        const bounce1 = this.createBounceEffect();
        const bounce2 = this.createBounceEffect();

        // Apply bounce animation
        bubble1.style.animation += `, ${bounce1} 0.3s ease-out`;
        bubble2.style.animation += `, ${bounce2} 0.3s ease-out`;

        // Clean up after bounce
        setTimeout(() => {
            bubble1.style.animation = bubble1.style.animation.replace(`, ${bounce1} 0.3s ease-out`, '');
            bubble2.style.animation = bubble2.style.animation.replace(`, ${bounce2} 0.3s ease-out`, '');
        }, 300);
    }

    createBounceEffect() {
        // Generate random bounce direction
        const directions = ['bounceLeft', 'bounceRight', 'bounceUp', 'bounceDown'];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    optimizeForMobile() {
        // Reduce animation complexity on mobile
        this.bubbles.forEach((bubble, index) => {
            if (index > 6) { // Hide some bubbles on mobile
                bubble.style.display = 'none';
            } else {
                // Simplify remaining animations
                bubble.style.animationTimingFunction = 'ease-out';
            }
        });
    }

    addInteractionEffects() {
        // Ensure bubbles maintain their animation without interference
        this.bubbles.forEach(bubble => {
            bubble.style.animationFillMode = 'both';
            bubble.style.animationIterationCount = 'infinite';
        });

        // Add natural floating physics
        this.addFloatingPhysics();
    }

    addFloatingPhysics() {
        // Simulate natural bubble floating behavior
        this.bubbles.forEach((bubble, index) => {
            // Add slight upward drift like real bubbles
            const driftSpeed = 0.5 + Math.random() * 0.5; // 0.5-1.0 pixels per second
            let currentY = parseFloat(bubble.style.top) || 50;

            setInterval(() => {
                if (!this.isMobile) { // Only on desktop for performance
                    currentY -= driftSpeed / 10; // Slow upward movement

                    // Reset position when bubble reaches top
                    if (currentY < -5) {
                        currentY = 105; // Start from bottom
                        // Also randomize horizontal position
                        const newX = Math.random() * 80 + 10;
                        bubble.style.left = `${newX}%`;
                    }

                    bubble.style.top = `${currentY}%`;
                }
            }, 100); // Update every 100ms
        });
    }

    handleVisibilityChange() {
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.bubbles.forEach(bubble => {
                    bubble.style.animationPlayState = 'paused';
                });
            } else {
                this.bubbles.forEach(bubble => {
                    bubble.style.animationPlayState = 'running';
                });
            }
        });
    }
}

// Initialize bubble manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BubbleManager();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize on significant size changes
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== (window.innerWidth <= 768)) {
        location.reload(); // Simple approach for demo
    }
});