// Optimized Particle System for Background
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        this.isVisible = true;
        
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
        const particleCount = isMobile ? 30 : 60;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                color: `hsl(${220 + Math.random() * 40}, 60%, 50%)`
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });
        
        // Pause animation when not visible
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
    }
    
    updateParticles() {
        if (!this.isVisible) return;
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Subtle opacity animation
            particle.opacity += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.003;
            particle.opacity = Math.max(0.05, Math.min(0.4, particle.opacity));
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw subtle connections
        this.drawConnections();
    }
    
    drawConnections() {
        const maxDistance = window.innerWidth < 768 ? 60 : 80;
        
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (maxDistance - distance) / maxDistance * 0.1;
                    this.ctx.strokeStyle = '#3b82f6';
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
    }
    
    animate() {
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

// Self-Animated Particle Text System
class ParticleText {
    constructor(canvas, text) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.text = text;
        this.particles = [];
        this.animationId = null;
        this.time = 0;
        this.isVisible = true;
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        this.resizeCanvas();
        this.createTextParticles();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createTextParticles() {
        this.particles = [];
        
        // Adjust font size for mobile
        const isMobile = window.innerWidth < 768;
        const fontSize = isMobile ? 
            Math.min(window.innerWidth * 0.12, 60) : 
            Math.min(window.innerWidth * 0.08, 100);
        
        this.ctx.font = `900 ${fontSize}px Inter`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Create temporary canvas for text rendering
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        
        tempCtx.font = this.ctx.font;
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = '#ffffff';
        tempCtx.fillText(this.text, tempCanvas.width / 2, tempCanvas.height / 2);
        
        // Get image data
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imageData.data;
        
        // Sample particles from text - reduced density for performance
        const gap = isMobile ? 4 : 3;
        for (let y = 0; y < tempCanvas.height; y += gap) {
            for (let x = 0; x < tempCanvas.width; x += gap) {
                const index = (y * tempCanvas.width + x) * 4;
                const alpha = data[index + 3];
                
                if (alpha > 128) {
                    this.particles.push({
                        x: x,
                        y: y,
                        targetX: x,
                        targetY: y,
                        size: Math.random() * 1.2 + 0.8,
                        opacity: Math.random() * 0.4 + 0.6,
                        color: `hsl(${220 + Math.random() * 40}, 70%, ${60 + Math.random() * 20}%)`,
                        phase: Math.random() * Math.PI * 2,
                        speed: Math.random() * 0.02 + 0.01
                    });
                }
            }
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createTextParticles();
        });
        
        // Pause animation when not visible
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
        });
    }
    
    updateParticles() {
        if (!this.isVisible) return;
        
        this.time += 0.016; // Approximately 60fps
        
        this.particles.forEach(particle => {
            // Self-animated floating motion
            const floatX = Math.sin(this.time * particle.speed + particle.phase) * 2;
            const floatY = Math.cos(this.time * particle.speed * 0.7 + particle.phase) * 1.5;
            
            particle.x = particle.targetX + floatX;
            particle.y = particle.targetY + floatY;
            
            // Breathing opacity effect
            particle.opacity = 0.6 + Math.sin(this.time * 0.5 + particle.phase) * 0.3;
            
            // Subtle size variation
            particle.size = 0.8 + Math.sin(this.time * 0.3 + particle.phase) * 0.3;
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    animate() {
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

// Scroll Animation Observer
class ScrollAnimationObserver {
    constructor() {
        this.setupObserver();
    }
    
    setupObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll(
            '.definition-title, .definition-subtitle, .text-block, .definition-quote, .definition-visual, .portfolio-title, .portfolio-description, .portfolio-item'
        );
        
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system only on desktop for performance
    const canvas = document.getElementById('particleCanvas');
    let particleSystem = null;
    
    if (window.innerWidth > 768) {
        particleSystem = new ParticleSystem(canvas);
    }
    
    // Initialize particle text
    const textCanvas = document.getElementById('textCanvas');
    const particleText = new ParticleText(textCanvas, 'NOCTE VENTURES');
    
    // Initialize scroll animations
    new ScrollAnimationObserver();
    
    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('.legal-link');
    const closeButtons = document.querySelectorAll('.close');

    // Open modal
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

    // Close modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with Escape key
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

    // Enhanced button interactions
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.definition-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (particleSystem) {
            particleSystem.destroy();
        }
        particleText.destroy();
    });

    // Handle resize for performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reinitialize particle system based on screen size
            if (window.innerWidth > 768 && !particleSystem) {
                particleSystem = new ParticleSystem(canvas);
            } else if (window.innerWidth <= 768 && particleSystem) {
                particleSystem.destroy();
                particleSystem = null;
            }
        }, 250);
    });
});
