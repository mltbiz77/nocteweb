// Ultra-lightweight particle system
class MinimalParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.isVisible = true;
        this.frameCount = 0;
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        const isMobile = window.innerWidth < 768;
        
        // Reduced particle count for better performance
        const particleCount = isMobile ? 12 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.08,
                vy: (Math.random() - 0.5) * 0.08,
                size: Math.random() * 0.6 + 0.3,
                opacity: Math.random() * 0.15 + 0.05,
                color: `hsl(${220 + Math.random() * 40}, 60%, 50%)`
            });
        }
    }
    
    setupEventListeners() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                this.createParticles();
            }, 250);
        });
        
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
    }
    
    updateParticles() {
        if (!this.isVisible) return;
        
        // Only update every 4th frame for better performance
        if (this.frameCount % 4 !== 0) return;
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }
    
    drawParticles() {
        // Clear with low frequency
        if (this.frameCount % 3 === 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    animate() {
        this.frameCount++;
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Enhanced Intersection Observer for smooth section transitions
class SmoothScrollAnimationObserver {
    constructor() {
        this.setupObserver();
        this.setupSmoothTransitions();
    }
    
    setupObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('in-view');
                }
            });
        }, observerOptions);
        
        // Observe animated elements
        const animatedElements = document.querySelectorAll(
            '.definition-title, .definition-subtitle, .text-card, .definition-essence, .portfolio-title, .portfolio-description, .portfolio-item'
        );
        
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }
    
    setupSmoothTransitions() {
        // Add smooth transition classes to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize particles on desktop and high-performance devices
    const canvas = document.getElementById('particleCanvas');
    let particleSystem = null;
    
    // Check for high performance device
    const isHighPerformance = navigator.hardwareConcurrency > 4 && window.innerWidth > 768;
    
    if (isHighPerformance) {
        particleSystem = new MinimalParticleSystem(canvas);
    }
    
    // Initialize smooth scroll animations
    new SmoothScrollAnimationObserver();
    
    // Enhanced modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('.legal-link');
    const closeButtons = document.querySelectorAll('.close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetModal = document.querySelector(this.getAttribute('href'));
            if (targetModal) {
                targetModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Enhanced smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.definition-section').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (particleSystem) {
            particleSystem.destroy();
        }
    });
});
