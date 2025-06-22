// Debug version of Splash Cursor - Simplified for testing
console.log('Loading splash debug script...');

// Simple device check - More permissive for testing
function isDesktop() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isWideScreen = window.innerWidth > 600; // Lower threshold for testing

    console.log('Device check:', {
        isMobile,
        isWideScreen,
        width: window.innerWidth,
        userAgent: navigator.userAgent.substring(0, 50)
    });

    // For testing, allow most desktop browsers
    return !isMobile && isWideScreen;
}

// Simple particle system
class SimpleParticle {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.life = 1.0;
        this.size = 5 + Math.random() * 10;
        this.color = {
            r: 100 + Math.random() * 155,
            g: 100 + Math.random() * 155,
            b: 255
        };
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.98;
        this.vy *= 0.98;
        this.life -= 0.02;
        return this.life > 0;
    }
    
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Main splash system
class SimpleSplash {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.isRunning = false;
        
        if (isDesktop()) {
            this.init();
        } else {
            console.log('Not a desktop device, splash disabled');
        }
    }
    
    init() {
        console.log('Initializing simple splash...');
        
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 999;
            background: transparent;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        this.bindEvents();
        this.start();
        
        // Test burst after 2 seconds
        setTimeout(() => {
            console.log('Creating test burst...');
            this.createBurst(window.innerWidth / 2, window.innerHeight / 2);
            console.log('Test burst created! Particles:', this.particles.length);
        }, 2000);

        // Another test after 4 seconds
        setTimeout(() => {
            console.log('Creating second test burst...');
            this.createBurst(100, 100);
        }, 4000);
        
        console.log('Simple splash initialized!');
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log('Canvas resized to:', this.canvas.width, 'x', this.canvas.height);
    }
    
    bindEvents() {
        console.log('Binding events...');

        // Mouse move - more frequent particles
        document.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.3) { // 30% chance to create particles
                this.createParticles(e.clientX, e.clientY, 2);
                console.log('Mouse move particles created at:', e.clientX, e.clientY);
            }
        });

        // Mouse click
        document.addEventListener('mousedown', (e) => {
            this.createBurst(e.clientX, e.clientY);
            console.log('Click burst at:', e.clientX, e.clientY, 'Total particles:', this.particles.length);
        });

        // Resize
        window.addEventListener('resize', () => {
            console.log('Window resized');
            this.resize();
        });

        console.log('Events bound successfully');
    }
    
    createParticles(x, y, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            this.particles.push(new SimpleParticle(x, y, vx, vy));
        }
    }
    
    createBurst(x, y) {
        this.createParticles(x, y, 20);
    }
    
    update() {
        // Update particles
        this.particles = this.particles.filter(particle => particle.update());
        
        // Limit particles
        if (this.particles.length > 200) {
            this.particles = this.particles.slice(-100);
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles
        this.particles.forEach(particle => particle.draw(this.ctx));

        // Always show debug info
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`Splash Active - Particles: ${this.particles.length}`, 10, 25);
        this.ctx.fillText(`Canvas: ${this.canvas.width}x${this.canvas.height}`, 10, 45);
        this.ctx.fillText(`Move mouse or click to create particles`, 10, 65);

        // Draw a small indicator dot
        this.ctx.fillStyle = 'lime';
        this.ctx.beginPath();
        this.ctx.arc(20, 80, 5, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.animate());
    }
    
    start() {
        this.isRunning = true;
        this.animate();
        console.log('Animation started');
    }
    
    stop() {
        this.isRunning = false;
        console.log('Animation stopped');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready, creating simple splash...');
    window.simpleSplash = new SimpleSplash();
});

console.log('Splash debug script loaded');
