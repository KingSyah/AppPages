// Simplified Splash Cursor Effect - PC Only
class SplashCursor {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0, prevX: 0, prevY: 0 };
        this.isActive = false;
        this.animationId = null;
        
        // Check if device is PC (not mobile)
        this.isPCDevice = this.checkIfPC();
        
        if (this.isPCDevice) {
            this.init();
        }
    }
    
    checkIfPC() {
        // Multiple checks to ensure we're on a PC/Desktop
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const hasSmallScreen = window.innerWidth <= 768;

        // Relaxed performance check - allow devices with 2+ cores or unknown
        const hasLowPerformance = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 2;

        console.log('Device Check:', {
            isMobile,
            isTouchDevice,
            hasSmallScreen,
            hasLowPerformance,
            screenWidth: window.innerWidth,
            cores: navigator.hardwareConcurrency
        });

        // Only activate on desktop with reasonable performance
        const isPC = !isMobile && !isTouchDevice && !hasSmallScreen && !hasLowPerformance;
        console.log('Is PC Device:', isPC);

        return isPC;
    }
    
    init() {
        console.log('Initializing Splash Cursor...');

        this.canvas = document.getElementById('splash-canvas');
        if (!this.canvas) {
            console.error('Splash canvas not found! Creating one...');
            this.createCanvas();
        }

        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Could not get 2D context!');
            return;
        }

        this.resizeCanvas();

        // Show canvas only on PC
        this.canvas.style.display = 'block';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '10';

        console.log('Canvas displayed, size:', this.canvas.width, 'x', this.canvas.height);

        this.bindEvents();
        this.startAnimation();

        console.log('Splash Cursor initialized successfully!');
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'splash-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 10;
            background: transparent;
        `;
        document.body.appendChild(this.canvas);
        console.log('Canvas created and added to DOM');
    }
    
    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    bindEvents() {
        // Mouse events
        document.addEventListener('mousemove', (e) => {
            this.mouse.prevX = this.mouse.x;
            this.mouse.prevY = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            const velocity = Math.sqrt(
                Math.pow(this.mouse.x - this.mouse.prevX, 2) +
                Math.pow(this.mouse.y - this.mouse.prevY, 2)
            );

            // Lower threshold for easier triggering
            if (velocity > 1) {
                console.log('Creating splash at', this.mouse.x, this.mouse.y, 'velocity:', velocity);
                this.createSplash(this.mouse.x, this.mouse.y, velocity);
            }
        });
        
        document.addEventListener('mousedown', (e) => {
            console.log('Mouse click at', e.clientX, e.clientY);
            this.createBurst(e.clientX, e.clientY);
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        
        // Performance monitoring
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }
    
    createSplash(x, y, velocity) {
        const particleCount = Math.min(Math.floor(velocity / 2), 12); // More particles, easier trigger

        console.log('Creating', particleCount, 'splash particles');

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 30,
                y: y + (Math.random() - 0.5) * 30,
                vx: (Math.random() - 0.5) * velocity * 0.5,
                vy: (Math.random() - 0.5) * velocity * 0.5,
                life: 1.0,
                decay: 0.01 + Math.random() * 0.02, // Slower decay
                size: 3 + Math.random() * 6, // Bigger particles
                color: this.getRandomColor(),
                alpha: 0.9
            });
        }

        console.log('Total particles:', this.particles.length);
    }
    
    createBurst(x, y) {
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2;
            const speed = 3 + Math.random() * 5;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1.0,
                decay: 0.015 + Math.random() * 0.015,
                size: 3 + Math.random() * 5,
                color: this.getRandomColor(),
                alpha: 0.9
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            { r: 100, g: 200, b: 255 },  // Light blue
            { r: 255, g: 100, b: 150 },  // Pink
            { r: 150, g: 255, b: 100 },  // Light green
            { r: 255, g: 200, b: 100 },  // Orange
            { r: 200, g: 150, b: 255 },  // Purple
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply friction
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            
            // Update life
            particle.life -= particle.decay;
            particle.alpha = particle.life * 0.8;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    render() {
        // Clear canvas completely for better visibility
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render particles
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;

            // Create gradient for better visibility
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * particle.life
            );
            gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.alpha})`);
            gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        // Debug info
        if (this.particles.length > 0) {
            console.log('Rendering', this.particles.length, 'particles');
        }
    }
    
    animate() {
        this.updateParticles();
        this.render();
        
        if (this.isActive) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    startAnimation() {
        if (!this.isActive) {
            this.isActive = true;
            this.animate();
        }
    }
    
    pauseAnimation() {
        this.isActive = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    resumeAnimation() {
        if (this.isPCDevice && !this.isActive) {
            this.startAnimation();
        }
    }
    
    destroy() {
        this.pauseAnimation();
        this.particles = [];
        if (this.canvas) {
            this.canvas.style.display = 'none';
        }
    }
}

// Initialize splash cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing splash cursor...');

    // Only initialize on PC devices
    const splashCursor = new SplashCursor();

    // Store reference globally for potential cleanup
    window.splashCursor = splashCursor;

    // Test function - create some particles on load
    setTimeout(() => {
        if (window.splashCursor && window.splashCursor.isPCDevice) {
            console.log('Testing splash cursor with initial burst...');
            window.splashCursor.createBurst(window.innerWidth / 2, window.innerHeight / 2);
        }
    }, 1000);
});

// Performance monitoring
let performanceCheck = setInterval(() => {
    if (window.splashCursor && window.splashCursor.particles.length > 100) {
        // If too many particles, reduce creation rate
        console.log('Splash cursor: High particle count, optimizing...');
        window.splashCursor.particles = window.splashCursor.particles.slice(0, 50);
    }
}, 5000);

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.splashCursor) {
        window.splashCursor.destroy();
    }
    clearInterval(performanceCheck);
});
