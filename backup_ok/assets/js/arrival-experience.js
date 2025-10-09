/**
 * ===================================================================
 * ARRIVAL EXPERIENCE CONTROLLER
 * Autor: Luis Alberto Oraa García  
 * Descripción: Controlador de interacciones para la experiencia de llegada
 * ===================================================================
 */

'use strict';

class ArrivalExperience {
    constructor() {
        this.isReady = false;
        this.worldPortals = [];
        this.activeModal = null;
        this.interactionEffects = new Map();
        
        // Experience state
        this.experienceState = {
            visitedPortals: new Set(),
            hoverTime: 0,
            clickCount: 0,
            journeyStarted: false
        };
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    /**
     * Initialize the arrival experience
     */
    init() {
        console.log('🌟 Arrival Experience: Inicializando controlador...');
        
        // Wait for quantum engine to be ready
        this.waitForQuantumEngine().then(() => {
            this.setupExperience();
        });
    }
    
    /**
     * Wait for quantum engine initialization
     */
    async waitForQuantumEngine() {
        return new Promise((resolve) => {
            const checkEngine = () => {
                if (window.quantumEngine && window.quantumEngine.isInitialized) {
                    resolve();
                } else {
                    setTimeout(checkEngine, 100);
                }
            };
            checkEngine();
        });
    }
    
    /**
     * Setup the complete arrival experience
     */
    setupExperience() {
        // Initialize core interactions
        this.initializeHeroInteractions();
        this.initializeWorldPortals();
        this.initializeContactSystem();
        this.initializeNavigationEffects();
        this.initializeKeyboardShortcuts();
        
        // Start experience tracking
        this.initializeExperienceTracking();
        
        // Setup scroll effects
        this.initializeScrollEffects();
        
        // Mark as ready
        this.isReady = true;
        
        console.log('✨ Arrival Experience: Sistema completamente operativo');
        
        // Trigger ready event
        this.triggerReadyEvent();
    }
    
    /**
     * Initialize hero section interactions
     */
    initializeHeroInteractions() {
        // Metric crystals interactions
        const metricCrystals = document.querySelectorAll('.metric-crystal');
        metricCrystals.forEach((crystal, index) => {
            this.setupMetricCrystalEffects(crystal, index);
        });
        
        // Main CTA button
        const beginButton = document.getElementById('begin-exploration');
        if (beginButton) {
            this.setupMainCTA(beginButton);
        }
        
        // Quick action buttons
        this.setupQuickActions();
        
        // Name interaction (easter egg)
        this.setupNameInteraction();
    }
    
    /**
     * Setup metric crystal effects
     */
    setupMetricCrystalEffects(crystal, index) {
        const experiences = [
            {
                title: '16 Años de Maestría',
                description: 'Desde junior hasta arquitecto senior, cada año ha sido una evolución continua hacia la excelencia.',
                details: ['2008: Primer Hello World', '2012: Primer liderazgo', '2016: Arquitecto', '2020: Senior', '2024: Leyenda']
            },
            {
                title: 'Proyectos Infinitos',
                description: 'Cada problema es una oportunidad. Cada solución, una obra maestra que impacta a miles de usuarios.',
                details: ['50+ APIs diseñadas', '25+ equipos liderados', '100+ bugs que se convirtieron en features', '∞ líneas de código con propósito']
            },
            {
                title: 'Impacto Inmensurable',
                description: 'El verdadero éxito se mide en vidas mejoradas, procesos optimizados y futuros posibles.',
                details: ['Millones de transacciones procesadas', 'Equipos inspirados', 'Sistemas que nunca fallan', 'Innovación constante']
            }
        ];
        
        const experience = experiences[index];
        if (!experience) return;
        
        crystal.addEventListener('mouseenter', () => {
            this.showMetricTooltip(crystal, experience);
            window.quantumEngine.triggerQuantumEffect(crystal);
        });
        
        crystal.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
        
        crystal.addEventListener('click', () => {
            this.showMetricModal(experience);
            this.trackInteraction('metric-click', { index, title: experience.title });
        });
    }
    
    /**
     * Setup main CTA button
     */
    setupMainCTA(button) {
        // Hover effects
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = 'var(--shadow-energy), var(--shadow-cosmic)';
            
            // Add ripple effect
            this.createRippleEffect(button);
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
            button.style.boxShadow = '';
        });
        
        // Click action
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.beginExplorationJourney();
        });
        
        // Add pulsing effect
        setInterval(() => {
            if (!button.matches(':hover')) {
                button.style.boxShadow = '0 0 40px var(--quantum-primary)';
                setTimeout(() => {
                    button.style.boxShadow = '';
                }, 1000);
            }
        }, 5000);
    }
    
    /**
     * Setup quick action buttons
     */
    setupQuickActions() {
        const directContact = document.getElementById('direct-contact');
        const randomWorld = document.getElementById('random-world');
        
        if (directContact) {
            directContact.addEventListener('click', (e) => {
                e.preventDefault();
                this.openContactModal();
                this.trackInteraction('quick-contact');
            });
        }
        
        if (randomWorld) {
            randomWorld.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToRandomWorld();
                this.trackInteraction('random-world');
            });
        }
    }
    
    /**
     * Setup name interaction (easter egg)
     */
    setupNameInteraction() {
        const heroName = document.querySelector('.hero-name');
        if (!heroName) return;
        
        let clickCount = 0;
        const maxClicks = 5;
        
        heroName.addEventListener('click', () => {
            clickCount++;
            
            if (clickCount === maxClicks) {
                this.triggerEasterEgg();
                clickCount = 0;
            }
            
            // Visual feedback
            heroName.style.transform = 'scale(1.05)';
            setTimeout(() => {
                heroName.style.transform = '';
            }, 200);
        });
    }
    
    /**
     * Initialize world portals
     */
    initializeWorldPortals() {
        const portals = document.querySelectorAll('.world-portal');
        
        portals.forEach((portal, index) => {
            this.setupWorldPortal(portal, index);
            this.worldPortals.push(portal);
        });
        
        // Setup guided tour functionality
        this.setupGuidedTour();
    }
    
    /**
     * Setup individual world portal
     */
    setupWorldPortal(portal, index) {
        const worldData = this.getWorldData(portal.dataset.world);
        
        // Hover effects
        portal.addEventListener('mouseenter', () => {
            this.experienceState.visitedPortals.add(portal.dataset.world);
            this.activatePortalEffects(portal, worldData);
        });
        
        portal.addEventListener('mouseleave', () => {
            this.deactivatePortalEffects(portal);
        });
        
        // Click handling
        portal.addEventListener('click', (e) => {
            // Let the link work naturally, but track the interaction
            this.trackInteraction('world-portal-click', { 
                world: portal.dataset.world,
                index 
            });
            
            // Add dramatic exit effect
            this.triggerPortalExit(portal);
        });
        
        // Add staggered entrance animation
        setTimeout(() => {
            portal.classList.add('portal-revealed');
        }, index * 200);
    }
    
    /**
     * Get world-specific data
     */
    getWorldData(worldId) {
        const worldsData = {
            'hyrule': {
                color: 'var(--quantum-primary)',
                description: 'El reino donde la infraestructura nunca falla',
                tech: ['Python', 'FastAPI', 'Docker', 'Microservicios'],
                experience: '16 años perfeccionando el arte del backend'
            },
            'tamriel': {
                color: 'var(--quantum-secondary)',
                description: 'Imperio del dominio full-stack completo',
                tech: ['Angular', 'React', 'TypeScript', 'CSS'],
                experience: 'Maestría en toda la cadena tecnológica'
            },
            'night-city': {
                color: 'var(--quantum-accent)',
                description: 'Donde el futuro se construye hoy',
                tech: ['AI/ML', 'Data Science', 'Automation', 'Innovation'],
                experience: 'Pionero en tecnologías emergentes'
            },
            'arcade': {
                color: 'var(--quantum-warning)',
                description: 'Dimensión de la creatividad sin límites',
                tech: ['Creative Coding', 'Problem Solving', 'Innovation'],
                experience: 'Resolviendo lo imposible con estilo'
            }
        };
        
        return worldsData[worldId] || {};
    }
    
    /**
     * Activate portal effects
     */
    activatePortalEffects(portal, worldData) {
        // Add glow effect
        portal.style.boxShadow = `0 0 40px ${worldData.color}`;
        
        // Activate frame
        const frame = portal.querySelector('.world-frame');
        if (frame) {
            frame.style.opacity = '1';
            frame.style.background = worldData.color;
        }
        
        // Animate particles
        const particles = portal.querySelector('.frame-particles');
        if (particles) {
            particles.style.animationPlayState = 'running';
        }
        
        // Show enhanced tooltip
        this.showWorldTooltip(portal, worldData);
    }
    
    /**
     * Deactivate portal effects
     */
    deactivatePortalEffects(portal) {
        portal.style.boxShadow = '';
        
        const frame = portal.querySelector('.world-frame');
        if (frame) {
            frame.style.opacity = '';
            frame.style.background = '';
        }
        
        this.hideTooltip();
    }
    
    /**
     * Setup guided tour
     */
    setupGuidedTour() {
        const guidedTourBtn = document.getElementById('guided-tour');
        const surpriseMeBtn = document.getElementById('surprise-me');
        const contactFirstBtn = document.getElementById('contact-first');
        
        if (guidedTourBtn) {
            guidedTourBtn.addEventListener('click', () => {
                this.startGuidedTour();
                this.trackInteraction('guided-tour-start');
            });
        }
        
        if (surpriseMeBtn) {
            surpriseMeBtn.addEventListener('click', () => {
                this.navigateToRandomWorld();
                this.trackInteraction('surprise-me');
            });
        }
        
        if (contactFirstBtn) {
            contactFirstBtn.addEventListener('click', () => {
                this.openContactModal();
                this.trackInteraction('contact-first');
            });
        }
    }
    
    /**
     * Initialize contact system
     */
    initializeContactSystem() {
        const modal = document.getElementById('contact-modal');
        const closeBtn = document.getElementById('close-contact');
        const overlay = modal?.querySelector('.modal-overlay');
        
        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeContactModal();
            });
        }
        
        // Overlay click to close
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeContactModal();
            });
        }
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeContactModal();
            }
        });
        
        // Track contact option clicks
        const contactOptions = document.querySelectorAll('.contact-option');
        contactOptions.forEach((option, index) => {
            option.addEventListener('click', () => {
                this.trackInteraction('contact-option-click', { 
                    method: option.href ? 'external' : 'internal',
                    index 
                });
            });
        });
    }
    
    /**
     * Initialize navigation effects
     */
    initializeNavigationEffects() {
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add hover effects to all interactive elements
        document.querySelectorAll('.quantum-btn, .guidance-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
                this.createGlowEffect(btn);
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }
    
    /**
     * Initialize keyboard shortcuts
     */
    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case '1':
                    this.navigateToWorld('hyrule');
                    break;
                case '2':
                    this.navigateToWorld('tamriel');
                    break;
                case '3':
                    this.navigateToWorld('night-city');
                    break;
                case '4':
                    this.navigateToWorld('arcade');
                    break;
                case 'c':
                    this.openContactModal();
                    break;
                case 'r':
                    this.navigateToRandomWorld();
                    break;
                case 't':
                    this.startGuidedTour();
                    break;
                case 'a':
                    window.quantumEngine.toggleAudio();
                    break;
            }
        });
        
        // Show keyboard shortcuts hint
        this.showKeyboardShortcuts();
    }
    
    /**
     * Initialize experience tracking
     */
    initializeExperienceTracking() {
        // Track time spent
        setInterval(() => {
            this.experienceState.hoverTime += 1;
        }, 1000);
        
        // Track scroll behavior
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.trackScrollBehavior();
            }, 150);
        });
        
        // Track page visibility
        document.addEventListener('visibilitychange', () => {
            this.trackVisibilityChange();
        });
        
        // Track before unload
        window.addEventListener('beforeunload', () => {
            this.saveExperienceData();
        });
    }
    
    /**
     * Initialize scroll effects
     */
    initializeScrollEffects() {
        // Parallax effect for cosmic background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.star-field');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
        
        // Reveal animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-revealed');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        document.querySelectorAll('.world-portal, .guidance-content, .teaser-content').forEach(el => {
            observer.observe(el);
        });
    }
    
    /**
     * Begin exploration journey
     */
    beginExplorationJourney() {
        this.experienceState.journeyStarted = true;
        
        // Smooth scroll to world selection
        const worldSelection = document.getElementById('world-selection');
        if (worldSelection) {
            worldSelection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Add visual indicator
        setTimeout(() => {
            document.querySelectorAll('.world-portal').forEach((portal, index) => {
                setTimeout(() => {
                    portal.classList.add('exploration-highlight');
                    
                    setTimeout(() => {
                        portal.classList.remove('exploration-highlight');
                    }, 2000);
                }, index * 200);
            });
        }, 1000);
        
        this.trackInteraction('exploration-journey-started');
    }
    
    /**
     * Navigate to random world
     */
    navigateToRandomWorld() {
        const worlds = ['hyrule', 'tamriel', 'night-city', 'arcade'];
        const randomWorld = worlds[Math.floor(Math.random() * worlds.length)];
        
        // Add dramatic effect
        const portal = document.querySelector(`[data-world="${randomWorld}"]`);
        if (portal) {
            portal.classList.add('random-selected');
            
            // Navigate after effect
            setTimeout(() => {
                this.navigateToWorld(randomWorld);
            }, 1000);
        }
    }
    
    /**
     * Navigate to specific world
     */
    navigateToWorld(worldId) {
        const worldUrls = {
            'hyrule': 'hyrule.html',
            'tamriel': 'tamriel.html',
            'night-city': 'night-city.html',
            'arcade': 'arcade.html'
        };
        
        const url = worldUrls[worldId];
        if (url) {
            // Add transition effect
            document.body.classList.add('world-transition');
            
            // Navigate
            setTimeout(() => {
                window.location.href = url;
            }, 500);
        }
    }
    
    /**
     * Start guided tour
     */
    startGuidedTour() {
        const tourSteps = [
            {
                element: '.hero-impact',
                title: 'Bienvenido al Portfolio Cuántico',
                content: 'Este no es un CV tradicional. Es una demostración en vivo de lo que soy capaz de crear.',
                position: 'bottom'
            },
            {
                element: '.impact-metrics',
                title: 'Métricas de Impacto',
                content: '16 años, infinitos proyectos, impacto inmensurable. Cada número cuenta una historia.',
                position: 'top'
            },
            {
                element: '.worlds-matrix',
                title: 'Elige Tu Aventura',
                content: 'Cada mundo representa una faceta de mi experiencia. ¿Por dónde quieres empezar?',
                position: 'top'
            }
        ];
        
        this.runTour(tourSteps);
    }
    
    /**
     * Open contact modal
     */
    openContactModal() {
        const modal = document.getElementById('contact-modal');
        if (modal) {
            modal.classList.add('modal-active');
            this.activeModal = modal;
            
            // Focus management
            const firstFocusable = modal.querySelector('button, a, input');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    }
    
    /**
     * Close contact modal
     */
    closeContactModal() {
        const modal = document.getElementById('contact-modal');
        if (modal) {
            modal.classList.remove('modal-active');
            this.activeModal = null;
        }
    }
    
    /**
     * Trigger easter egg
     */
    triggerEasterEgg() {
        // Create spectacular effect
        const body = document.body;
        body.classList.add('quantum-overload');
        
        // Show hidden message
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--gradient-quantum);
                color: white;
                padding: 2rem;
                border-radius: 20px;
                text-align: center;
                z-index: 10000;
                box-shadow: var(--shadow-cosmic);
                font-family: var(--font-primary);
            ">
                <h3>🎉 EASTER EGG ACTIVADO 🎉</h3>
                <p>¡Has descubierto el secreto cuántico!</p>
                <p>Atención al detalle: ✅</p>
                <p>Curiosidad innata: ✅</p>
                <p>¿Te imaginas lo que podemos crear juntos?</p>
            </div>
        `;
        
        body.appendChild(message);
        
        // Remove after 5 seconds
        setTimeout(() => {
            body.removeChild(message);
            body.classList.remove('quantum-overload');
        }, 5000);
        
        this.trackInteraction('easter-egg-activated');
    }
    
    /**
     * Create ripple effect
     */
    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'quantum-ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            animation: rippleExpand 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    /**
     * Create glow effect
     */
    createGlowEffect(element) {
        element.style.boxShadow = '0 0 30px var(--quantum-primary)';
        
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 300);
    }
    
    /**
     * Show world tooltip
     */
    showWorldTooltip(portal, worldData) {
        // Implementation for enhanced tooltips
        console.log('Showing tooltip for', worldData);
    }
    
    /**
     * Show metric tooltip
     */
    showMetricTooltip(crystal, experience) {
        // Implementation for metric tooltips
        console.log('Showing metric tooltip', experience);
    }
    
    /**
     * Hide tooltip
     */
    hideTooltip() {
        // Implementation for hiding tooltips
    }
    
    /**
     * Track interaction
     */
    trackInteraction(type, data = {}) {
        const interaction = {
            type,
            data,
            timestamp: Date.now(),
            url: window.location.href
        };
        
        console.log('🎯 Interaction:', interaction);
        
        // Store for analytics
        const interactions = JSON.parse(localStorage.getItem('arrival-interactions') || '[]');
        interactions.push(interaction);
        
        if (interactions.length > 100) {
            interactions.splice(0, 50);
        }
        
        localStorage.setItem('arrival-interactions', JSON.stringify(interactions));
    }
    
    /**
     * Trigger ready event
     */
    triggerReadyEvent() {
        const event = new CustomEvent('arrivalExperienceReady', {
            detail: { experience: this }
        });
        document.dispatchEvent(event);
    }
    
    /**
     * Get experience metrics
     */
    getMetrics() {
        return {
            ...this.experienceState,
            isReady: this.isReady,
            portalsCount: this.worldPortals.length,
            activeModal: this.activeModal ? true : false
        };
    }
}

// Initialize arrival experience
window.arrivalExperience = new ArrivalExperience();

// Add CSS for dynamic effects
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
    
    .exploration-highlight {
        animation: explorationPulse 2s ease-in-out;
    }
    
    @keyframes explorationPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); box-shadow: 0 0 50px var(--quantum-primary); }
    }
    
    .quantum-overload {
        animation: quantumOverload 1s ease-in-out;
    }
    
    @keyframes quantumOverload {
        0%, 100% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
    }
    
    .portal-revealed {
        animation: portalReveal 1s ease-out forwards;
    }
    
    @keyframes portalReveal {
        from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }
    
    .world-transition {
        transition: all 0.5s ease-in-out;
        filter: blur(5px);
    }
    
    .scroll-revealed {
        animation: scrollReveal 0.8s ease-out forwards;
    }
    
    @keyframes scrollReveal {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArrivalExperience;
}
