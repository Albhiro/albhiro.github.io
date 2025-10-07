// ===========================================
// MAIN JAVASCRIPT - PORTFOLIO LUIS ALBERTO
// ===========================================

class PortfolioApp {
    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        this.setupSimpleLoading();
        this.setupSmoothScrolling();
        this.setupSonicRings();
        this.initializeWorldEffects();
        this.setupEpicTransitions();
    }

    setupSimpleLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Verificar si venimos de un mundo
        const isBackNavigation = document.referrer.includes('zelda.html') ||
                                document.referrer.includes('tamriel.html') ||
                                document.referrer.includes('cyberpunk.html') ||
                                document.referrer.includes('retro.html');
        
        if (isBackNavigation) {
            // Si venimos de un mundo, ocultar el loading screen inmediatamente
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
            // Aplicar transición suave
            document.body.classList.add('back-from-world');
        } else {
            // Carga inicial normal
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 1500);
        }
    }

    // Loading Screen
    async loadingScreen() {
        return new Promise(resolve => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                loadingScreen.classList.add('hidden');
                resolve();
            }, 2000);
        });
    }

    // Navigation Setup
    setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Navigation link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Close mobile menu
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    
                    // Smooth scroll
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active link
                    this.updateActiveNavLink(link);
                }
            });
        });

        // Scroll spy
        window.addEventListener('scroll', () => {
            this.updateNavOnScroll();
        });
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    this.updateActiveNavLink(correspondingLink);
                }
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add fade-in class to timeline items and other elements
        document.querySelectorAll('.timeline-item, .project-card, .about-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Typing Animation
    setupTypingAnimation() {
        const typingElement = document.getElementById('typingText');
        const texts = [
            'Technical Architect',
            'Full-Stack Developer', 
            'IA Researcher',
            'Innovation Driver',
            'Problem Solver'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        };

        type();
    }

    // Stats Counter
    setupStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    this.animateNumber(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateNumber(element, target) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }

    // Charts Initialization
    initializeCharts() {
        this.createSkillsChart();
    }

    createSkillsChart() {
        const ctx = document.getElementById('skillsChart');
        if (!ctx) return;

        const skillsData = {
            labels: ['Python', 'JavaScript', 'FastAPI', 'Angular', 'Docker', 'Machine Learning'],
            datasets: [{
                label: 'Nivel de Experiencia',
                data: [95, 85, 90, 80, 85, 75],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(240, 147, 251, 0.8)',
                    'rgba(0, 212, 170, 0.8)',
                    'rgba(255, 185, 70, 0.8)',
                    'rgba(255, 107, 107, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(240, 147, 251, 1)',
                    'rgba(0, 212, 170, 1)',
                    'rgba(255, 185, 70, 1)',
                    'rgba(255, 107, 107, 1)'
                ],
                borderWidth: 2
            }]
        };

        new Chart(ctx, {
            type: 'radar',
            data: skillsData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Skills Técnicos',
                        color: '#ffffff',
                        font: {
                            size: 18
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#b0b3b8',
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#ffffff',
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado! Te contactaré pronto.');
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Load Projects
    async loadProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        
        const projects = [
            {
                icon: '📊',
                title: 'FastAPI Dashboard',
                description: 'Dashboard profesional inspirado en mi trabajo diario en Santander. Control de horas/proyecto con visualizaciones interactivas.',
                tech: ['FastAPI', 'Chart.js', 'SQLAlchemy', 'Docker'],
                demoUrl: 'http://localhost:8000',
                codeUrl: './projects/fastapi-dashboard/'
            },
            {
                icon: '📧',
                title: 'Email Processor',
                description: 'Automatización real: 130+ emails diarios procesados automáticamente. Migración Access→Python implementada en producción.',
                tech: ['Python', 'pandas', 'IMAP', 'Excel'],
                demoUrl: './projects/email-automation-toolkit/demo/',
                codeUrl: './projects/email-automation-toolkit/'
            },
            {
                icon: '🔤',
                title: 'NLP Spanish Processor',
                description: 'Motor de procesamiento de lenguaje natural para castellano. Análisis gramatical, léxico y ortográfico completo.',
                tech: ['JavaScript', 'NLP', 'Machine Learning', 'Sentiment Analysis'],
                demoUrl: './projects/nlp-spanish-processor/demo/',
                codeUrl: './projects/nlp-spanish-processor/'
            },
            {
                icon: '📈',
                title: 'Data Analysis Toolkit',
                description: 'Herramientas de análisis desarrolladas para optimizar mis tareas diarias de reporting y análisis de datos.',
                tech: ['Chart.js', 'CSV Processing', 'Statistics', 'Visualization'],
                demoUrl: './projects/data-analysis-toolkit/demo/',
                codeUrl: './projects/data-analysis-toolkit/'
            },
            {
                icon: '🤖',
                title: 'Neural Networks Lab',
                description: 'Playground de redes neuronales desde básicas hasta complejas. Investigación personal en arquitecturas interconectadas.',
                tech: ['TensorFlow.js', 'WebGL', 'Neural Networks', 'Visualization'],
                demoUrl: './projects/neural-network-playground/demo/',
                codeUrl: './projects/neural-network-playground/'
            },
            {
                icon: '🐳',
                title: 'Docker Templates',
                description: 'Templates de despliegue basados en mi experiencia con RHEL8, nginx y Openshift en infraestructura Santander.',
                tech: ['Docker', 'nginx', 'RHEL8', 'Openshift'],
                demoUrl: './projects/docker-deployment-template/demo/',
                codeUrl: './projects/docker-deployment-template/'
            }
        ];

        projectsGrid.innerHTML = projects.map(project => `
            <div class="project-card fade-in">
                <span class="project-icon">${project.icon}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoUrl}" class="project-link primary" target="_blank">
                        <i class="fas fa-play"></i> Demo Live
                    </a>
                    <a href="${project.codeUrl}" class="project-link secondary">
                        <i class="fab fa-github"></i> Código
                    </a>
                </div>
            </div>
        `).join('');

        // Re-observe new project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('fade-in');
        });
    }

    // Setup World Selector
    setupSonicRings() {
        const worldSections = document.querySelectorAll('.world-section');
        
        worldSections.forEach(section => {
            // Click handler for world navigation
            section.addEventListener('click', (e) => {
                e.preventDefault();
                const worldType = section.dataset.world;
                
                // Add selection animation
                section.classList.add('selected');
                
                // Play selection sound effect
                this.playRingSound('collect');
                
                // Create selection effect
                this.createSelectionEffect(section);
                
                // Transition to world
                setTimeout(() => {
                    this.navigateToWorld(worldType);
                }, 800);
            });
            
            // Hover effects
            section.addEventListener('mouseenter', () => {
                this.playRingSound('hover');
                this.createWorldHoverEffect(section);
            });
            
            // Add parallax effect to background image
            section.addEventListener('mousemove', (e) => {
                this.createParallaxEffect(section, e);
            });
            
            section.addEventListener('mouseleave', () => {
                this.resetParallaxEffect(section);
            });
        });
        
        // Add ambient world effects
        this.initializeWorldEffects();
    }

    playRingSound(type) {
        // Use synthetic audio if available
        if (typeof sonicAudio !== 'undefined') {
            switch(type) {
                case 'collect':
                    sonicAudio.playRingCollect();
                    break;
                case 'hover':
                    sonicAudio.playRingHover();
                    break;
                case 'transition':
                    sonicAudio.playWorldTransition();
                    break;
                case 'powerup':
                    sonicAudio.playPowerUp();
                    break;
                default:
                    sonicAudio.playRingHover();
            }
        } else {
            // Fallback: try to load audio files
            try {
                const audio = new Audio(`./assets/audio/ring-${type}.mp3`);
                audio.volume = type === 'hover' ? 0.1 : 0.3;
                audio.play().catch(() => {}); // Ignore if audio fails
            } catch (e) {
                console.log('Audio not available');
            }
        }
    }

    createSelectionEffect(section) {
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create expanding ring effect
        const expandingRing = document.createElement('div');
        expandingRing.className = 'selection-ring';
        expandingRing.style.cssText = `
            position: fixed;
            width: 50px;
            height: 50px;
            border: 3px solid var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${centerX - 25}px;
            top: ${centerY - 25}px;
            box-shadow: 0 0 20px var(--primary-color);
            animation: expandRing 0.8s ease-out forwards;
        `;
        
        // Add ring animation styles if not already added
        if (!document.getElementById('selection-ring-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'selection-ring-styles';
            styleElement.textContent = `
                @keyframes expandRing {
                    0% { 
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                    100% { 
                        transform: scale(10) rotate(360deg);
                        opacity: 0;
                    }
                }
                
                .world-section.selected {
                    transform: scale(1.05);
                    filter: brightness(1.2);
                }
            `;
            document.head.appendChild(styleElement);
        }
        
        document.body.appendChild(expandingRing);
        setTimeout(() => expandingRing.remove(), 800);
        
        // Add particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX - 2}px;
                top: ${centerY - 2}px;
                box-shadow: 0 0 8px var(--accent-color);
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 150 + Math.random() * 100;
            const targetX = centerX + Math.cos(angle) * distance;
            const targetY = centerY + Math.sin(angle) * distance;
            
            const animation = particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }

    createWorldHoverEffect(section) {
        // Create subtle glow pulse on the world section
        const currentBoxShadow = section.style.boxShadow;
        section.style.transition = 'box-shadow 0.3s ease';
        section.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.3)';
        
        setTimeout(() => {
            section.style.boxShadow = currentBoxShadow;
        }, 300);
    }

    createParallaxEffect(section, event) {
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;
        
        const moveX = mouseX * 0.02;
        const moveY = mouseY * 0.02;
        
        section.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
    }

    resetParallaxEffect(section) {
        section.style.transition = 'transform 0.5s ease';
        section.style.transform = 'translate(0, 0) scale(1)';
        
        setTimeout(() => {
            section.style.transition = '';
        }, 500);
    }

    initializeWorldEffects() {
        // Add subtle floating animation to world circles
        const worldCircles = document.querySelectorAll('.world-circle');
        worldCircles.forEach((circle, index) => {
            const floatDelay = index * 0.5;
            circle.style.animation = `worldFloat 4s ease-in-out infinite ${floatDelay}s`;
        });
        
        // Add floating animation if not already added
        if (!document.getElementById('world-float-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'world-float-styles';
            styleElement.textContent = `
                @keyframes worldFloat {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(styleElement);
        }
    }

    navigateToWorld(worldType) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'world-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="sonic-logo">⚡</div>
                <div class="transition-text">Entering ${worldType.toUpperCase().replace('-', ' ')} World...</div>
                <div class="loading-rings">
                    <div class="loading-ring"></div>
                    <div class="loading-ring"></div>
                    <div class="loading-ring"></div>
                </div>
            </div>
        `;
        
        // Add transition styles if not already added
        if (!document.getElementById('world-transition-styles')) {
            const transitionStyles = document.createElement('style');
            transitionStyles.id = 'world-transition-styles';
            transitionStyles.textContent = `
                .world-transition-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #0B0D17 0%, #1A1B2E 50%, #0B0D17 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                }
                
                .transition-content {
                    text-align: center;
                    color: var(--primary-color);
                }
                
                .sonic-logo {
                    font-size: 4rem;
                    margin-bottom: 20px;
                    animation: bounce 0.6s ease-in-out infinite alternate;
                }
                
                .transition-text {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 30px;
                    text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
                }
                
                .loading-rings {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                }
                
                .loading-ring {
                    width: 20px;
                    height: 20px;
                    border: 2px solid var(--primary-color);
                    border-radius: 50%;
                    animation: ringPulse 1s ease-in-out infinite;
                }
                
                .loading-ring:nth-child(2) { animation-delay: 0.2s; }
                .loading-ring:nth-child(3) { animation-delay: 0.4s; }
                
                @keyframes bounce {
                    from { transform: translateY(0); }
                    to { transform: translateY(-20px); }
                }
                
                @keyframes ringPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.5); opacity: 0.5; }
                }
            `;
            document.head.appendChild(transitionStyles);
        }
        
        // Add overlay to body
        document.body.appendChild(overlay);
        
        // Animate overlay in
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });
        
        // Play transition sound
        setTimeout(() => {
            this.playRingSound('transition');
        }, 200);
        
        // Navigate after animation
        setTimeout(() => {
            let targetUrl = '';
            switch(worldType) {
                case 'hyrule':
                    targetUrl = './hyrule.html';
                    break;
                case 'tamriel':
                    targetUrl = './tamriel.html';
                    break;
                case 'night-city':
                    targetUrl = './night-city.html';
                    break;
                case 'arcade':
                    targetUrl = './arcade.html';
                    break;
                default:
                    targetUrl = './index.html';
            }
            
            window.location.href = targetUrl;
        }, 1500);
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    static formatNumber(num) {
        return new Intl.NumberFormat('es-ES').format(num);
    }

    static isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Clean Navigation System
    setupEpicTransitions() {
        const worldSections = document.querySelectorAll('.world-section');
        
        worldSections.forEach(section => {
            section.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Añadir clase de transición suave
                section.classList.add('world-transition');
                
                // Obtener la URL de destino
                const targetUrl = section.getAttribute('href');
                
                // Navegación suave
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 200);
            });
        });
    }
}

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            renderTime: 0,
            interactionTime: 0
        };
        this.startTime = performance.now();
    }

    markLoadComplete() {
        this.metrics.loadTime = performance.now() - this.startTime;
        console.log(`Portfolio loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
    }

    markRenderComplete() {
        this.metrics.renderTime = performance.now() - this.startTime;
        console.log(`Portfolio rendered in ${this.metrics.renderTime.toFixed(2)}ms`);
    }

    trackInteraction(eventType) {
        const interactionTime = performance.now();
        console.log(`${eventType} interaction at ${interactionTime.toFixed(2)}ms`);
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    const performanceMonitor = new PerformanceMonitor();
    
    // Initialize main app
    const app = new PortfolioApp();
    
    // Mark performance milestones
    window.addEventListener('load', () => {
        performanceMonitor.markLoadComplete();
    });

    // Track user interactions
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link') || 
            e.target.classList.contains('btn') ||
            e.target.closest('.project-card')) {
            performanceMonitor.trackInteraction('click');
        }
    });



    // Add some Easter eggs
    const easterEggs = {
        konamiCode: '38,38,40,40,37,39,37,39,66,65',
        currentCode: []
    };

    document.addEventListener('keydown', (e) => {
        easterEggs.currentCode.push(e.keyCode);
        if (easterEggs.currentCode.length > 10) {
            easterEggs.currentCode.shift();
        }
        
        if (easterEggs.currentCode.join(',') === easterEggs.konamiCode) {
            console.log('🎉 ¡Easter Egg encontrado! Luis Alberto te saluda 👋');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 3000);
        }
    });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, Utils, PerformanceMonitor };
}
