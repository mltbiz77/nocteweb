// Optimized Particle Animation System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
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
        const particleCount = Math.min(100, Math.floor((this.canvas.width * this.canvas.height) / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.4 + 0.2,
                color: `hsl(${220 + Math.random() * 40}, 70%, 60%)`,
                originalVx: (Math.random() - 0.5) * 0.3,
                originalVy: (Math.random() - 0.5) * 0.3
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.particles = [];
            this.createParticles();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 120;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                particle.vx += Math.cos(angle) * force * 0.015;
                particle.vy += Math.sin(angle) * force * 0.015;
            }
            
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            particle.vx += (particle.originalVx - particle.vx) * 0.008;
            particle.vy += (particle.originalVy - particle.vy) * 0.008;
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            particle.opacity += Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.005;
            particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));
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
        
        this.drawConnections();
    }
    
    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (80 - distance) / 80 * 0.15;
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

// Particle Text Animation System
class ParticleText {
    constructor(canvas, text) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.text = text;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        
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
        
        // Set font for text measurement
        const fontSize = Math.min(window.innerWidth * 0.08, 120);
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
        
        // Sample particles from text
        const gap = 3;
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
                        vx: 0,
                        vy: 0,
                        size: Math.random() * 1.5 + 0.5,
                        opacity: Math.random() * 0.6 + 0.4,
                        color: `hsl(${220 + Math.random() * 40}, 70%, ${60 + Math.random() * 20}%)`,
                        life: Math.random() * 100
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
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const force = (maxDistance - distance) / maxDistance;
                const angle = Math.atan2(dy, dx);
                particle.vx += Math.cos(angle) * force * 0.3;
                particle.vy += Math.sin(angle) * force * 0.3;
            }
            
            // Return to target position
            const targetDx = particle.targetX - particle.x;
            const targetDy = particle.targetY - particle.y;
            particle.vx += targetDx * 0.02;
            particle.vy += targetDy * 0.02;
            
            // Apply friction
            particle.vx *= 0.95;
            particle.vy *= 0.95;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Subtle floating animation
            particle.life += 0.02;
            particle.y += Math.sin(particle.life) * 0.1;
            
            // Update opacity
            particle.opacity = 0.4 + Math.sin(particle.life * 0.5) * 0.2;
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = 10;
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

// Optimized Custom Cursor System
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.isMoving = false;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!this.isMoving) {
                this.isMoving = true;
                this.updateCursor(mouseX, mouseY);
            }
        });
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .cta-button, .legal-link, .close, .scroll-indicator');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
        
        document.addEventListener('mousedown', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
    
    updateCursor(x, y) {
        this.cursor.style.left = x + 'px';
        this.cursor.style.top = y + 'px';
        this.isMoving = false;
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
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.definition-title, .definition-subtitle, .definition-main, .definition-secondary, .definition-tertiary, .definition-visual, .portfolio-title, .portfolio-item');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    const canvas = document.getElementById('particleCanvas');
    const particleSystem = new ParticleSystem(canvas);
    
    // Initialize particle text
    const textCanvas = document.getElementById('textCanvas');
    const particleText = new ParticleText(textCanvas, 'NOCTE VENTURES');
    
    // Initialize custom cursor for desktop
    if (window.innerWidth > 768) {
        new CustomCursor();
    }
    
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

    // Enhanced hover effects for company name
    const companyName = document.querySelector('.company-name');
    if (companyName) {
        companyName.addEventListener('mouseenter', function() {
            // Particle text will handle the interaction
        });
        
        companyName.addEventListener('mouseleave', function() {
            // Particle text will handle the interaction
        });
    }

    // Enhanced button interactions
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
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
        particleSystem.destroy();
        particleText.destroy();
    });
});
