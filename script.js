// Ultra-lightweight particle system with Matrix-style effects
class HackerParticleSystem {
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
        
        // Matrix-style falling particles
        const particleCount = isMobile ? 6 : 12;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                vx: 0,
                vy: Math.random() * 2 + 1,
                size: Math.random() * 1 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                color: Math.random() > 0.5 ? '#00ff41' : '#0099ff',
                char: String.fromCharCode(0x30A0 + Math.random() * 96),
                life: Math.random() * 100
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
            particle.y += particle.vy;
            particle.life++;
            
            // Fade effect
            particle.opacity = Math.sin(particle.life * 0.02) * 0.3 + 0.2;
            
            // Reset when off screen
            if (particle.y > this.canvas.height + 50) {
                particle.y = -50;
                particle.x = Math.random() * this.canvas.width;
                particle.char = String.fromCharCode(0x30A0 + Math.random() * 96);
                particle.life = 0;
            }
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
            this.ctx.font = `${particle.size * 12}px monospace`;
            this.ctx.fillText(particle.char, particle.x, particle.y);
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
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('in-view');
                    
                    // Restart terminal animations when visible
                    if (entry.target.classList.contains('ventures-section')) {
                        this.restartTerminalAnimations();
                    }
                }
            });
        }, observerOptions);
        
        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    setupSmoothTransitions() {
        // Add smooth transition classes to sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    restartTerminalAnimations() {
        // Reset terminal animation elements
        const terminalElements = document.querySelectorAll(
            '.terminal-window, .terminal-button, .terminal-title, .prompt, .command, .output-line, .terminal-cursor'
        );
        
        terminalElements.forEach(el => {
            // Remove and re-add animation class to restart
            const animationName = el.style.animationName;
            el.style.animationName = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animationName = animationName;
        });
    }
}

// Terminal typing effect controller
class TerminalTypingController {
    constructor() {
        this.setupTypingEffects();
    }
    
    setupTypingEffects() {
        // Enhanced typewriter effect for command
        const commandElement = document.getElementById('command');
        if (commandElement) {
            this.typewriterEffect(commandElement, './execute', 3500);
        }
        
        // Add interactive terminal features
        this.addTerminalInteractivity();
    }
    
    typewriterEffect(element, text, delay) {
        setTimeout(() => {
            element.style.width = '0';
            element.style.borderRight = '2px solid #00ff41';
            
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    element.textContent = text.substring(0, i + 1);
                    i++;
                } else {
                    clearInterval(typing);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        }, delay);
    }
    
    addTerminalInteractivity() {
        // Add glow effect on terminal hover
        const terminal = document.querySelector('.terminal-window');
        if (terminal) {
            terminal.addEventListener('mouseenter', () => {
                terminal.style.boxShadow = `
                    0 25px 50px rgba(0, 0, 0, 0.8),
                    0 0 50px rgba(0, 255, 65, 0.2)
                `;
            });
            
            terminal.addEventListener('mouseleave', () => {
                terminal.style.boxShadow = `
                    0 25px 50px rgba(0, 0, 0, 0.8),
                    0 0 30px rgba(0, 255, 65, 0.1)
                `;
            });
        }
        
        // Add click effect to terminal buttons
        const buttons = document.querySelectorAll('.terminal-button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                button.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }
}

// Performance monitor
class PerformanceMonitor {
    constructor() {
        this.lastTime = performance.now();
        this.frameCount = 0;
        this.fps = 60;
        this.monitor();
    }
    
    monitor() {
        const currentTime = performance.now();
        this.frameCount++;
        
        if (currentTime >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Reduce particle count if performance is poor
            if (this.fps < 30) {
                this.optimizePerformance();
            }
        }
        
        requestAnimationFrame(() => this.monitor());
    }
    
    optimizePerformance() {
        // Reduce animations if performance is poor
        const particles = document.querySelectorAll('#particleCanvas, #venturesParticleCanvas');
        particles.forEach(canvas => {
            if (canvas) {
                canvas.style.display = 'none';
            }
        });
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle systems for both sections
    const heroCanvas = document.getElementById('particleCanvas');
    const venturesCanvas = document.getElementById('venturesParticleCanvas');
    let heroParticleSystem = null;
    let venturesParticleSystem = null;
    
    // Check for high performance device
    const isHighPerformance = navigator.hardwareConcurrency > 4 && window.innerWidth > 768;
    
    if (isHighPerformance) {
        if (heroCanvas) {
            heroParticleSystem = new HackerParticleSystem(heroCanvas);
        }
        if (venturesCanvas) {
            venturesParticleSystem = new HackerParticleSystem(venturesCanvas);
        }
    }
    
    // Initialize performance monitoring
    new PerformanceMonitor();
    
    // Initialize smooth scroll animations
    new SmoothScrollAnimationObserver();
    
    // Initialize terminal typing effects
    new TerminalTypingController();
    
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
            const venturesSection = document.querySelector('.ventures-section');
            if (venturesSection) {
                venturesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (heroParticleSystem) {
            heroParticleSystem.destroy();
        }
        if (venturesParticleSystem) {
            venturesParticleSystem.destroy();
        }
    });
});
