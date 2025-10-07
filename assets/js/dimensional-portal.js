// ===============================================
// DIMENSIONAL PORTAL CONTROLLER
// ALBHIRO.MULTIVERSE - Portal between Worlds
// ===============================================

class DimensionalPortal {
    constructor() {
        this.currentUniverse = null;
        this.isTransitioning = false;
        this.portalActive = false;
        this.particleSystem = null;
        
        // Universe configurations
        this.universes = {
            cyberpunk: {
                name: 'NIGHT CITY',
                file: 'index-cyberpunk.html',
                color: '#00ffff',
                description: 'Cyberpunk 2077 Interface'
            },
            skyrim: {
                name: 'TAMRIEL',
                file: 'index-skyrim.html',
                color: '#ffd700',
                description: 'Elder Scrolls RPG Style'
            },
            zelda: {
                name: 'HYRULE',
                file: 'index-zelda.html',
                color: '#228b22',
                description: 'Adventure & Exploration'
            },
            retro: {
                name: 'ARCADE',
                file: 'index-retro.html',
                color: '#ff6600',
                description: 'Retro Gaming Experience'
            }
        };
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        console.log('🌌 Initializing ALBHIRO.MULTIVERSE Portal...');
        
        this.createStarField();
        this.setupEventListeners();
        this.startPortalEffects();
        this.createPortalParticles();
        
        console.log('✨ Dimensional Portal ready for interdimensional travel');
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    setupEventListeners() {
        // Universe card interactions
        document.querySelectorAll('.universe-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.previewUniverse(e.currentTarget);
            });
            
            card.addEventListener('mouseleave', () => {
                this.resetPortalPreview();
            });
            
            card.addEventListener('click', (e) => {
                const universe = e.currentTarget.getAttribute('data-universe');
                this.openPortal(universe);
            });
        });

        // Control buttons
        document.getElementById('terminalReturn')?.addEventListener('click', () => {
            this.returnToTerminal();
        });

        document.getElementById('randomPortal')?.addEventListener('click', () => {
            this.openRandomPortal();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Portal center click
        document.getElementById('portalCenter')?.addEventListener('click', () => {
            this.pulsePortal();
        });
    }

    // ==========================================
    // VISUAL EFFECTS
    // ==========================================

    createStarField() {
        const canvas = document.getElementById('starsCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const stars = [];
        const starCount = 200;
        
        // Create stars
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                color: this.getRandomStarColor(),
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                brightness: Math.random()
            });
        }
        
        const animateStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                // Twinkle effect
                star.brightness += star.twinkleSpeed;
                if (star.brightness > 1) {
                    star.brightness = 0;
                }
                
                ctx.save();
                ctx.globalAlpha = star.brightness;
                ctx.fillStyle = star.color;
                ctx.shadowBlur = star.size * 2;
                ctx.shadowColor = star.color;
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            
            requestAnimationFrame(animateStars);
        };
        
        animateStars();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    getRandomStarColor() {
        const colors = ['#ffffff', '#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff8000'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    startPortalEffects() {
        this.portalActive = true;
        
        // Continuous portal energy effects
        setInterval(() => {
            if (this.portalActive) {
                this.createEnergyBurst();
            }
        }, 2000);
        
        // Random portal pulses
        setInterval(() => {
            if (this.portalActive && Math.random() < 0.3) {
                this.pulsePortal();
            }
        }, 5000);
    }

    createPortalParticles() {
        const particlesContainer = document.getElementById('portalParticles');
        if (!particlesContainer) return;
        
        // Create floating particles around the portal
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = this.getRandomStarColor();
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 10px currentColor`;
            particle.style.pointerEvents = 'none';
            
            // Random position around portal
            const angle = (i / 30) * Math.PI * 2;
            const radius = 150 + Math.random() * 50;
            const x = Math.cos(angle) * radius + 200;
            const y = Math.sin(angle) * radius + 200;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            // Animation
            particle.style.animation = `portalFloat ${Math.random() * 10 + 15}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particlesContainer.appendChild(particle);
        }
        
        // Add floating animation
        if (!document.getElementById('portalFloatStyle')) {
            const style = document.createElement('style');
            style.id = 'portalFloatStyle';
            style.textContent = `
                @keyframes portalFloat {
                    0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.6; }
                    25% { transform: translate(-20px, -30px) rotate(90deg); opacity: 1; }
                    50% { transform: translate(10px, -20px) rotate(180deg); opacity: 0.8; }
                    75% { transform: translate(-10px, 20px) rotate(270deg); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createEnergyBurst() {
        const portal = document.getElementById('mainPortal');
        if (!portal) return;
        
        const burst = document.createElement('div');
        burst.style.position = 'absolute';
        burst.style.top = '50%';
        burst.style.left = '50%';
        burst.style.width = '10px';
        burst.style.height = '10px';
        burst.style.background = 'radial-gradient(circle, #00ffff 0%, transparent 70%)';
        burst.style.borderRadius = '50%';
        burst.style.transform = 'translate(-50%, -50%)';
        burst.style.pointerEvents = 'none';
        burst.style.animation = 'energyBurst 1s ease-out forwards';
        
        portal.appendChild(burst);
        
        // Add burst animation if not exists
        if (!document.getElementById('energyBurstStyle')) {
            const style = document.createElement('style');
            style.id = 'energyBurstStyle';
            style.textContent = `
                @keyframes energyBurst {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove burst after animation
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 1000);
    }

    pulsePortal() {
        const portalCenter = document.getElementById('portalCenter');
        if (!portalCenter) return;
        
        portalCenter.style.transform = 'scale(1.2)';
        portalCenter.style.boxShadow = '0 0 50px #00ffff';
        
        setTimeout(() => {
            portalCenter.style.transform = 'scale(1)';
            portalCenter.style.boxShadow = '';
        }, 300);
        
        // Create ripple effects
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createEnergyBurst();
            }, i * 200);
        }
    }

    // ==========================================
    // UNIVERSE INTERACTIONS
    // ==========================================

    previewUniverse(card) {
        const universe = card.getAttribute('data-universe');
        const universeConfig = this.universes[universe];
        
        if (!universeConfig) return;
        
        // Update portal center
        const portalCenter = document.getElementById('portalCenter');
        const coreText = portalCenter.querySelector('.core-text');
        
        if (coreText) {
            coreText.innerHTML = `ENTRAR A<br>${universeConfig.name}`;
        }
        
        // Change portal color
        portalCenter.style.background = `radial-gradient(circle, ${universeConfig.color}30 0%, ${universeConfig.color}20 50%, transparent 100%)`;
        
        // Update rings color
        const rings = document.querySelectorAll('.portal-ring');
        rings.forEach((ring, index) => {
            ring.style.borderColor = universeConfig.color;
            ring.style.boxShadow = `0 0 ${20 - index * 5}px ${universeConfig.color}`;
        });
        
        // Add preview class
        card.classList.add('universe-preview');
        
        console.log(`🔮 Previewing universe: ${universeConfig.name}`);
    }

    resetPortalPreview() {
        // Reset portal center
        const portalCenter = document.getElementById('portalCenter');
        const coreText = portalCenter.querySelector('.core-text');
        
        if (coreText) {
            coreText.innerHTML = 'SELECCIONA<br>DIMENSIÓN';
        }
        
        // Reset portal color
        portalCenter.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, rgba(138, 43, 226, 0.2) 50%, transparent 100%)';
        
        // Reset rings
        const rings = document.querySelectorAll('.portal-ring');
        rings[0].style.borderColor = '#00d4ff';
        rings[0].style.boxShadow = '0 0 20px #00d4ff, inset 0 0 20px rgba(0, 212, 255, 0.1)';
        rings[1].style.borderColor = '#8a2be2';
        rings[1].style.boxShadow = '0 0 15px #8a2be2, inset 0 0 15px rgba(138, 43, 226, 0.1)';
        rings[2].style.borderColor = '#ffd700';
        rings[2].style.boxShadow = '0 0 10px #ffd700, inset 0 0 10px rgba(255, 215, 0, 0.1)';
        
        // Remove preview classes
        document.querySelectorAll('.universe-card').forEach(card => {
            card.classList.remove('universe-preview');
        });
    }

    // ==========================================
    // PORTAL TRAVEL
    // ==========================================

    openPortal(universe) {
        if (this.isTransitioning) return;
        
        const universeConfig = this.universes[universe];
        if (!universeConfig) return;
        
        this.isTransitioning = true;
        
        console.log(`🌀 Opening portal to ${universeConfig.name}...`);
        
        // Start transition effect
        this.showTransitionEffect(universeConfig);
        
        // Travel to universe after effect
        setTimeout(() => {
            this.travelToUniverse(universeConfig);
        }, 3000);
    }

    showTransitionEffect(universeConfig) {
        const transition = document.getElementById('dimensionalTransition');
        const destinationText = document.getElementById('destinationText');
        
        if (destinationText) {
            destinationText.textContent = universeConfig.name;
            destinationText.style.color = universeConfig.color;
        }
        
        transition.classList.remove('hidden');
        
        // Add screen shake effect
        document.body.style.animation = 'screenShake 0.5s ease-in-out infinite';
        
        // Add shake animation if not exists
        if (!document.getElementById('screenShakeStyle')) {
            const style = document.createElement('style');
            style.id = 'screenShakeStyle';
            style.textContent = `
                @keyframes screenShake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-2px); }
                    75% { transform: translateX(2px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Stop shake after 2 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }

    travelToUniverse(universeConfig) {
        console.log(`🚀 Traveling to ${universeConfig.name}...`);
        
        // Redirect to universe file
        window.location.href = universeConfig.file;
    }

    openRandomPortal() {
        const universeKeys = Object.keys(this.universes);
        const randomUniverse = universeKeys[Math.floor(Math.random() * universeKeys.length)];
        
        console.log('🎲 Opening random portal...');
        this.openPortal(randomUniverse);
    }

    returnToTerminal() {
        console.log('🔄 Returning to terminal...');
        window.location.href = 'terminal.html';
    }

    // ==========================================
    // KEYBOARD SHORTCUTS
    // ==========================================

    handleKeyboardShortcuts(e) {
        // ESC - Return to terminal
        if (e.key === 'Escape') {
            this.returnToTerminal();
        }
        
        // Number keys - Quick universe selection
        const universeKeys = {
            '1': 'cyberpunk',
            '2': 'skyrim',
            '3': 'zelda',
            '4': 'retro'
        };
        
        if (universeKeys[e.key]) {
            this.openPortal(universeKeys[e.key]);
        }
        
        // R - Random portal
        if (e.key.toLowerCase() === 'r') {
            this.openRandomPortal();
        }
        
        // Space - Pulse portal
        if (e.key === ' ') {
            e.preventDefault();
            this.pulsePortal();
        }
    }

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================

    createRippleEffect(x, y, color = '#00ffff') {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.border = `2px solid ${color}`;
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'rippleExpand 0.6s ease-out forwards';
        
        document.body.appendChild(ripple);
        
        // Add ripple animation if not exists
        if (!document.getElementById('rippleStyle')) {
            const style = document.createElement('style');
            style.id = 'rippleStyle';
            style.textContent = `
                @keyframes rippleExpand {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(10); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    showNotification(message, color = '#00ffff') {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.background = 'rgba(0, 0, 0, 0.9)';
        notification.style.color = color;
        notification.style.padding = '1rem 2rem';
        notification.style.border = `2px solid ${color}`;
        notification.style.borderRadius = '10px';
        notification.style.fontFamily = 'Orbitron, monospace';
        notification.style.fontSize = '0.9rem';
        notification.style.boxShadow = `0 0 20px ${color}`;
        notification.style.zIndex = '3000';
        notification.style.animation = 'slideInRight 0.5s ease-out';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Add slide animation if not exists
        if (!document.getElementById('slideStyle')) {
            const style = document.createElement('style');
            style.id = 'slideStyle';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }
}

// Initialize the Dimensional Portal
window.dimensionalPortal = new DimensionalPortal();

// Portal ready messages
console.log('🌌 ALBHIRO.MULTIVERSE Portal initialized');
console.log('✨ Ready for interdimensional travel');
console.log('🎮 Use number keys 1-4 for quick travel');
console.log('🎲 Press R for random portal');
console.log('⚡ Press SPACE to pulse the portal');
console.log('🔄 Press ESC to return to terminal');
