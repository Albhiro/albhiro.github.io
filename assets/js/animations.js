// ===========================================
// ANIMATIONS - PORTFOLIO LUIS ALBERTO
// ===========================================

class AnimationController {
    constructor() {
        this.initializeAnimations();
    }

    initializeAnimations() {
        this.setupHeroAnimation();
        this.setupParticleSystem();
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    // Hero Background Animation
    setupHeroAnimation() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        
        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Animation variables
        const particles = [];
        const connections = [];
        const mouse = { x: 0, y: 0, radius: 150 };
        
        // Mouse tracking
        canvas.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.baseOpacity = this.opacity;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    this.opacity = this.baseOpacity + (1 - distance / mouse.radius) * 0.5;
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.vx -= Math.cos(angle) * force * 0.01;
                    this.vy -= Math.sin(angle) * force * 0.01;
                } else {
                    this.opacity = this.baseOpacity;
                }

                // Limit velocity
                this.vx = Math.max(-2, Math.min(2, this.vx));
                this.vy = Math.max(-2, Math.min(2, this.vy));
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#667eea';
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particles
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            ctx.strokeStyle = 'rgba(102, 126, 234, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = (100 - distance) / 100 * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationId);
        });
    }

    // Particle System for sections
    setupParticleSystem() {
        this.createFloatingElements();
    }

    createFloatingElements() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            if (section.id === 'hero') return; // Skip hero as it has its own animation
            
            const floatingContainer = document.createElement('div');
            floatingContainer.className = 'floating-elements';
            floatingContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
            `;
            
            section.style.position = 'relative';
            section.appendChild(floatingContainer);
            
            // Create floating elements
            for (let i = 0; i < 5; i++) {
                const element = document.createElement('div');
                element.className = 'floating-element';
                element.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 10 + 5}px;
                    height: ${Math.random() * 10 + 5}px;
                    background: rgba(102, 126, 234, ${Math.random() * 0.3 + 0.1});
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 10 + 10}s infinite linear;
                `;
                
                floatingContainer.appendChild(element);
            }
        });

        // Add CSS animation
        if (!document.querySelector('#floating-animations')) {
            const style = document.createElement('style');
            style.id = 'floating-animations';
            style.textContent = `
                @keyframes float {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
                    100% { transform: translateY(0px) rotate(360deg); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Scroll-based animations
    setupScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Timeline items animation
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            gsap.fromTo(item, 
                {
                    opacity: 0,
                    x: index % 2 === 0 ? -100 : 100,
                    y: 50
                },
                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Project cards stagger animation
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.fromTo(card,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Section titles animation
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title,
                {
                    opacity: 0,
                    y: 30,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Parallax effect for backgrounds
        gsap.utils.toArray('.section').forEach(section => {
            gsap.to(section, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    // Hover effects
    setupHoverEffects() {
        // Card hover animations
        document.querySelectorAll('.project-card, .about-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });

        // Navigation link hover effects
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    x: 5,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    x: 0,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    // Text reveal animation
    setupTextReveal() {
        gsap.utils.toArray('.hero-title .title-line').forEach((line, index) => {
            gsap.fromTo(line,
                {
                    opacity: 0,
                    y: 100,
                    skewY: 7
                },
                {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    duration: 1.5,
                    delay: index * 0.2,
                    ease: "power4.out"
                }
            );
        });
    }

    // Page transition animation
    pageTransition(callback) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            z-index: 9999;
            transform: translateY(100%);
        `;
        
        document.body.appendChild(overlay);
        
        gsap.to(overlay, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                if (callback) callback();
                gsap.to(overlay, {
                    y: -window.innerHeight,
                    duration: 0.5,
                    delay: 0.1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        document.body.removeChild(overlay);
                    }
                });
            }
        });
    }

    // Morphing shapes animation
    createMorphingShapes() {
        const shapes = document.querySelectorAll('.morphing-shape');
        
        shapes.forEach(shape => {
            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            tl.to(shape, {
                morphSVG: "M10,10 Q50,5 90,10 Q95,50 90,90 Q50,95 10,90 Q5,50 10,10 Z",
                duration: 2,
                ease: "power2.inOut"
            })
            .to(shape, {
                morphSVG: "M10,50 Q25,10 50,25 Q75,10 90,50 Q75,90 50,75 Q25,90 10,50 Z",
                duration: 2,
                ease: "power2.inOut"
            });
        });
    }
}

// Scroll-triggered counter animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.observer = null;
        this.setupObserver();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate();
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.observer.observe(this.element);
    }

    animate() {
        let current = 0;
        const increment = this.target / (this.duration / 16);
        
        const counter = () => {
            current += increment;
            if (current >= this.target) {
                current = this.target;
                this.element.textContent = Math.floor(current);
                return;
            }
            
            this.element.textContent = Math.floor(current);
            requestAnimationFrame(counter);
        };
        
        counter();
    }
}

// Loading animation
class LoadingAnimation {
    constructor() {
        this.createLoadingElements();
    }

    createLoadingElements() {
        const loadingContainer = document.querySelector('.loading-content');
        if (!loadingContainer) return;

        // Add additional loading elements
        const progressBar = document.createElement('div');
        progressBar.className = 'loading-progress';
        progressBar.style.cssText = `
            width: 200px;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            margin: 20px auto;
            overflow: hidden;
        `;

        const progressFill = document.createElement('div');
        progressFill.className = 'loading-progress-fill';
        progressFill.style.cssText = `
            width: 0%;
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 2px;
            transition: width 0.3s ease;
        `;

        progressBar.appendChild(progressFill);
        loadingContainer.appendChild(progressBar);

        // Animate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressFill.style.width = progress + '%';
        }, 200);
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new LoadingAnimation();
    
    // Initialize counters for stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        new CounterAnimation(stat, target);
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AnimationController, CounterAnimation, LoadingAnimation };
}
