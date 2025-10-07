// ===============================================
// DANTE'S INFERNO PORTAL CONTROLLER
// ALBHIRO.MULTIVERSE - 5 Circles of Digital Hell
// ===============================================

class DantePortal {
    constructor() {
        this.currentCircle = null;
        this.isTransitioning = false;
        this.portalActive = false;
        
        // Circle configurations (Dante's Levels)
        this.circles = {
            // Level 5 - Paradise (Terminal Core)
            terminal: {
                level: 5,
                name: 'TERMINAL CORE',
                file: 'terminal.html',
                color: '#00ff00',
                description: 'Command Center - Digital Paradise',
                element: 'terminalCore'
            },
            // Level 4 - Neon Hell (Cyberpunk)
            cyberpunk: {
                level: 4,
                name: 'NIGHT CITY',
                file: 'index-cyberpunk.html',
                color: '#00ffff',
                description: 'Cyberpunk Neon Hell',
                element: 'cyberpunkRing'
            },
            // Level 3 - Frost Realm (Skyrim)
            skyrim: {
                level: 3,
                name: 'TAMRIEL',
                file: 'index-skyrim.html',
                color: '#ffd700',
                description: 'Nordic Frost Realm',
                element: 'skyrimRing'
            },
            // Level 2 - Nature Realm (Zelda)
            zelda: {
                level: 2,
                name: 'HYRULE',
                file: 'index-zelda.html',
                color: '#228b22',
                description: 'Adventure Nature Realm',
                element: 'zeldaRing'
            },
            // Level 1 - Pixel Limbo (Retro)
            retro: {
                level: 1,
                name: 'ARCADE',
                file: 'index-retro.html',
                color: '#ff6600',
                description: 'Pixel Gaming Limbo',
                element: 'retroRing'
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
        console.log('🔥 Initializing DANTE\'S INFERNO Portal...');
        console.log('⚡ 5 Circles of Digital Reality Loading...');
        
        this.createCosmicBackground();
        this.setupCircleInteractions();
        this.startPortalEffects();
        this.createEnergyParticles();
        this.setupKeyboardControls();
        
        this.portalActive = true;
        
        console.log('🌀 Dante\'s Portal ready for interdimensional descent');
        console.log('🎮 Terminal Core at center - 4 Realms surround');
    }

    // ==========================================
    // COSMIC BACKGROUND EFFECTS
    // ==========================================

    createCosmicBackground() {
        const canvas = document.getElementById('starsCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const stars = [];
        const starCount = 300;
        
        // Create cosmic stars with different colors
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 0.5,
                color: this.getCosmicColor(),
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                brightness: Math.random(),
                angle: Math.random() * Math.PI * 2,
                distance: Math.random() * 100 + 50
            });
        }
        
        const animateStars = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            stars.forEach(star => {
                // Orbital movement around center
                star.angle += 0.001;
                star.x = centerX + Math.cos(star.angle) * star.distance;
                star.y = centerY + Math.sin(star.angle) * star.distance;
                
                // Twinkle effect
                star.brightness += star.twinkleSpeed;
                if (star.brightness > 1) {
                    star.brightness = 0;
                }
                
                ctx.save();
                ctx.globalAlpha = star.brightness;
                ctx.fillStyle = star.color;
                ctx.shadowBlur = star.size * 3;
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

    getCosmicColor() {
        const colors = [
            '#ffffff', '#00ffff', '#00ff00', '#ffd700', 
            '#ff6600', '#8a2be2', '#ff1493', '#00fa9a'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // ==========================================
    // CIRCLE INTERACTIONS
    // ==========================================

    setupCircleInteractions() {
        Object.keys(this.circles).forEach(circleKey => {
            const circle = this.circles[circleKey];
            const element = document.getElementById(circle.element);
            
            if (element) {
                // Mouse enter - Show preview
                element.addEventListener('mouseenter', () => {
                    this.showCirclePreview(circleKey);
                });
                
                // Mouse leave - Hide preview
                element.addEventListener('mouseleave', () => {
                    this.hideCirclePreview(circleKey);
                });
                
                // Click - Enter realm
                element.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.enterCircle(circleKey);
                });
                
                // Add circle-specific effects
                this.addCircleEffects(element, circle);
            }
        });

        // Control buttons
        document.getElementById('terminalReturn')?.addEventListener('click', () => {
            this.enterCircle('terminal');
        });

        document.getElementById('randomPortal')?.addEventListener('click', () => {
            this.enterRandomCircle();
        });
    }

    addCircleEffects(element, circle) {
        // Add floating particles around each circle
        const particleCount = circle.level * 2;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '3px';
            particle.style.height = '3px';
            particle.style.background = circle.color;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 10px ${circle.color}`;
            particle.style.pointerEvents = 'none';
            particle.style.opacity = '0.7';
            
            // Random orbit position
            const angle = (i / particleCount) * Math.PI * 2;
            const radius = 60 + circle.level * 20;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            particle.style.left = `calc(50% + ${x}px)`;
            particle.style.top = `calc(50% + ${y}px)`;
            particle.style.transform = 'translate(-50%, -50%)';
            
            // Orbit animation
            particle.style.animation = `circleOrbit${circle.level} ${10 + circle.level * 2}s linear infinite`;
            particle.style.animationDelay = `${i * 0.1}s`;
            
            element.appendChild(particle);
        }
        
        // Add orbit animations
        this.addOrbitAnimations();
    }

    addOrbitAnimations() {
        if (document.getElementById('orbitStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'orbitStyles';
        style.textContent = `
            @keyframes circleOrbit1 {
                from { transform: translate(-50%, -50%) rotate(0deg) translateX(80px) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg) translateX(80px) rotate(-360deg); }
            }
            @keyframes circleOrbit2 {
                from { transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(-360deg) translateX(100px) rotate(360deg); }
            }
            @keyframes circleOrbit3 {
                from { transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg); }
            }
            @keyframes circleOrbit4 {
                from { transform: translate(-50%, -50%) rotate(0deg) translateX(140px) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(-360deg) translateX(140px) rotate(360deg); }
            }
            @keyframes circleOrbit5 {
                from { transform: translate(-50%, -50%) rotate(0deg) translateX(160px) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg) translateX(160px) rotate(-360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // PREVIEW SYSTEM
    // ==========================================

    showCirclePreview(circleKey) {
        const circle = this.circles[circleKey];
        const preview = document.querySelector(`.${circleKey}-preview`);
        
        if (preview) {
            preview.style.opacity = '1';
            preview.style.transform = 'translate(-50%, -50%) scale(1)';
            preview.style.pointerEvents = 'all';
            
            // Start zigzag lightning system
            this.startZigzagLightning(circle.color);
        }
        
        // Add glow to circle
        const element = document.getElementById(circle.element);
        if (element) {
            element.style.boxShadow = `0 0 50px ${circle.color}, 0 0 80px ${circle.color}`;
            element.style.transform = 'translate(-50%, -50%) scale(1.15)';
        }
        
        // Update NPC speech
        this.updateNPCSpeech(circle.name, circle.color);
        
        // Create ripple effect
        this.createRippleEffect(circle.color);
        
        console.log(`🔮 Previewing ${circle.name} - Level ${circle.level}`);
    }

    hideCirclePreview(circleKey) {
        const circle = this.circles[circleKey];
        const preview = document.querySelector(`.${circleKey}-preview`);
        
        if (preview) {
            preview.style.opacity = '0';
            preview.style.transform = 'translate(-50%, -50%) scale(0.8)';
            preview.style.pointerEvents = 'none';
            
            // Stop zigzag lightning
            this.stopZigzagLightning();
        }
        
        // Remove glow from circle
        const element = document.getElementById(circle.element);
        if (element) {
            element.style.boxShadow = '';
            element.style.transform = 'translate(-50%, -50%) scale(1)';
        }
        
        // Reset NPC speech
        this.resetNPCSpeech();
    }

    createRippleEffect(color) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.border = `3px solid ${color}`;
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'danteRipple 1s ease-out forwards';
        ripple.style.zIndex = '1000';
        
        document.body.appendChild(ripple);
        
        // Add ripple animation
        if (!document.getElementById('danteRippleStyle')) {
            const style = document.createElement('style');
            style.id = 'danteRippleStyle';
            style.textContent = `
                @keyframes danteRipple {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(15); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }

    // ==========================================
    // PORTAL TRAVEL
    // ==========================================

    enterCircle(circleKey) {
        if (this.isTransitioning) return;
        
        const circle = this.circles[circleKey];
        if (!circle) return;
        
        this.isTransitioning = true;
        this.currentCircle = circleKey;
        
        console.log(`🌀 Entering ${circle.name} - Dante's Level ${circle.level}`);
        
        // Special handling for terminal (center)
        if (circleKey === 'terminal') {
            this.ascendToParadise();
        } else {
            this.descendToHell(circle);
        }
    }

    ascendToParadise() {
        console.log('🌟 Ascending to Digital Paradise...');
        this.showTransition('TERMINAL CORE', '#00ff00', 'ascending');
        
        setTimeout(() => {
            window.location.href = 'terminal.html';
        }, 3000);
    }

    descendToHell(circle) {
        console.log(`🔥 Descending to ${circle.description}...`);
        this.showTransition(circle.name, circle.color, 'descending');
        
        setTimeout(() => {
            window.location.href = circle.file;
        }, 3000);
    }

    showTransition(destination, color, direction) {
        const transition = document.getElementById('dimensionalTransition');
        const destinationText = document.getElementById('destinationText');
        const travelingText = document.querySelector('.traveling-text');
        
        if (destinationText) {
            destinationText.textContent = destination;
            destinationText.style.color = color;
        }
        
        if (travelingText) {
            travelingText.textContent = direction === 'ascending' ? 
                'Ascendiendo al paraíso digital...' : 
                'Descendiendo a los círculos infernales...';
        }
        
        transition.classList.remove('hidden');
        
        // Screen effects
        document.body.style.animation = 'infernalShake 0.8s ease-in-out infinite';
        
        // Add shake animation
        if (!document.getElementById('infernalShakeStyle')) {
            const style = document.createElement('style');
            style.id = 'infernalShakeStyle';
            style.textContent = `
                @keyframes infernalShake {
                    0%, 100% { transform: translateX(0) translateY(0); }
                    25% { transform: translateX(-3px) translateY(-2px); }
                    50% { transform: translateX(2px) translateY(-3px); }
                    75% { transform: translateX(-2px) translateY(2px); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Create dimensional tears
        this.createDimensionalTears(color);
        
        // Stop effects
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2500);
    }

    createDimensionalTears(color) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const tear = document.createElement('div');
                tear.style.position = 'fixed';
                tear.style.left = Math.random() * 100 + '%';
                tear.style.top = Math.random() * 100 + '%';
                tear.style.width = '2px';
                tear.style.height = Math.random() * 200 + 100 + 'px';
                tear.style.background = `linear-gradient(0deg, transparent, ${color}, transparent)`;
                tear.style.transform = `rotate(${Math.random() * 360}deg)`;
                tear.style.pointerEvents = 'none';
                tear.style.animation = 'tearExpand 0.5s ease-out forwards';
                tear.style.zIndex = '1001';
                
                document.body.appendChild(tear);
                
                if (!document.getElementById('tearStyle')) {
                    const style = document.createElement('style');
                    style.id = 'tearStyle';
                    style.textContent = `
                        @keyframes tearExpand {
                            0% { opacity: 0; transform: scaleX(0) rotate(var(--rotation)); }
                            50% { opacity: 1; transform: scaleX(1) rotate(var(--rotation)); }
                            100% { opacity: 0; transform: scaleX(0) rotate(var(--rotation)); }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                setTimeout(() => {
                    if (tear.parentNode) {
                        tear.parentNode.removeChild(tear);
                    }
                }, 500);
            }, i * 100);
        }
    }

    enterRandomCircle() {
        const circleKeys = Object.keys(this.circles).filter(key => key !== 'terminal');
        const randomCircle = circleKeys[Math.floor(Math.random() * circleKeys.length)];
        
        console.log('🎲 Opening random portal to the circles...');
        this.enterCircle(randomCircle);
    }

    // ==========================================
    // PORTAL EFFECTS
    // ==========================================

    startPortalEffects() {
        // Continuous energy bursts
        setInterval(() => {
            if (this.portalActive) {
                this.createEnergyBurst();
            }
        }, 3000);
        
        // Random cosmic events
        setInterval(() => {
            if (this.portalActive && Math.random() < 0.4) {
                this.triggerCosmicEvent();
            }
        }, 7000);
    }

    createEnergyParticles() {
        const energyCore = document.getElementById('energyCore');
        if (!energyCore) return;
        
        // Create central energy particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = this.getCosmicColor();
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = '0 0 15px currentColor';
            particle.style.pointerEvents = 'none';
            
            // Random position in center area
            const angle = (i / 20) * Math.PI * 2;
            const radius = Math.random() * 30 + 10;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            particle.style.left = `calc(50% + ${x}px)`;
            particle.style.top = `calc(50% + ${y}px)`;
            particle.style.transform = 'translate(-50%, -50%)';
            
            particle.style.animation = `coreFloat ${Math.random() * 8 + 12}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 3 + 's';
            
            energyCore.appendChild(particle);
        }
        
        // Add core float animation
        if (!document.getElementById('coreFloatStyle')) {
            const style = document.createElement('style');
            style.id = 'coreFloatStyle';
            style.textContent = `
                @keyframes coreFloat {
                    0%, 100% { 
                        transform: translate(-50%, -50%) scale(1) rotate(0deg); 
                        opacity: 0.8; 
                    }
                    25% { 
                        transform: translate(-50%, -50%) scale(1.2) rotate(90deg); 
                        opacity: 1; 
                    }
                    50% { 
                        transform: translate(-50%, -50%) scale(0.8) rotate(180deg); 
                        opacity: 0.6; 
                    }
                    75% { 
                        transform: translate(-50%, -50%) scale(1.1) rotate(270deg); 
                        opacity: 1; 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createEnergyBurst() {
        const colors = ['#00ff00', '#00ffff', '#ffd700', '#228b22', '#ff6600'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const burst = document.createElement('div');
        burst.style.position = 'fixed';
        burst.style.left = '50%';
        burst.style.top = '50%';
        burst.style.width = '10px';
        burst.style.height = '10px';
        burst.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
        burst.style.borderRadius = '50%';
        burst.style.transform = 'translate(-50%, -50%)';
        burst.style.pointerEvents = 'none';
        burst.style.animation = 'energyExplosion 1.5s ease-out forwards';
        burst.style.zIndex = '500';
        
        document.body.appendChild(burst);
        
        if (!document.getElementById('energyExplosionStyle')) {
            const style = document.createElement('style');
            style.id = 'energyExplosionStyle';
            style.textContent = `
                @keyframes energyExplosion {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    50% { transform: translate(-50%, -50%) scale(8); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(25); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 1500);
    }

    triggerCosmicEvent() {
        const events = ['lightning', 'vortex', 'pulse', 'wave'];
        const event = events[Math.floor(Math.random() * events.length)];
        
        switch (event) {
            case 'lightning':
                this.createCosmicLightning();
                break;
            case 'vortex':
                this.createVortexEffect();
                break;
            case 'pulse':
                this.createCosmicPulse();
                break;
            case 'wave':
                this.createEnergyWave();
                break;
        }
    }

    createCosmicLightning() {
        const lightning = document.createElement('div');
        lightning.style.position = 'fixed';
        lightning.style.left = Math.random() * 100 + '%';
        lightning.style.top = '0%';
        lightning.style.width = '3px';
        lightning.style.height = '100%';
        lightning.style.background = 'linear-gradient(0deg, transparent, #ffffff, #00ffff, #ffffff, transparent)';
        lightning.style.boxShadow = '0 0 20px #00ffff, 0 0 40px #ffffff';
        lightning.style.animation = 'lightningStrike 0.3s ease-out forwards';
        lightning.style.pointerEvents = 'none';
        lightning.style.zIndex = '999';
        
        document.body.appendChild(lightning);
        
        if (!document.getElementById('lightningStyle')) {
            const style = document.createElement('style');
            style.id = 'lightningStyle';
            style.textContent = `
                @keyframes lightningStrike {
                    0% { opacity: 0; transform: scaleX(0); }
                    20% { opacity: 1; transform: scaleX(1); }
                    40% { opacity: 0; transform: scaleX(1); }
                    60% { opacity: 1; transform: scaleX(1); }
                    80% { opacity: 0; transform: scaleX(1); }
                    100% { opacity: 0; transform: scaleX(0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (lightning.parentNode) {
                lightning.parentNode.removeChild(lightning);
            }
        }, 300);
    }

    createVortexEffect() {
        // Implementation for vortex effect
        console.log('🌪️ Cosmic vortex activated');
    }

    createCosmicPulse() {
        document.body.style.filter = 'brightness(1.5) contrast(1.2)';
        setTimeout(() => {
            document.body.style.filter = '';
        }, 200);
    }

    createEnergyWave() {
        // Implementation for energy wave
        console.log('🌊 Energy wave spreading through dimensions');
    }

    // ==========================================
    // ZIGZAG LIGHTNING SYSTEM
    // ==========================================

    startZigzagLightning(color) {
        this.stopZigzagLightning();
        
        const canvas = document.getElementById('lightningCanvas');
        if (!canvas) return;
        
        const container = document.querySelector('.dimensional-windows-container');
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        this.lightningActive = true;
        this.lightningColor = color;
        
        // Create lightning bolts at random intervals
        this.lightningInterval = setInterval(() => {
            if (!this.lightningActive) return;
            
            // Random chance of lightning
            if (Math.random() < 0.6) {
                this.createZigzagBolt(ctx, color);
            }
        }, Math.random() * 800 + 400);
        
        // Create multiple simultaneous bolts occasionally
        this.multipleBoltsInterval = setInterval(() => {
            if (!this.lightningActive) return;
            
            if (Math.random() < 0.3) {
                for (let i = 0; i < 2 + Math.random() * 3; i++) {
                    setTimeout(() => {
                        this.createZigzagBolt(ctx, color);
                    }, i * 50);
                }
            }
        }, Math.random() * 2000 + 1500);
    }

    stopZigzagLightning() {
        this.lightningActive = false;
        
        if (this.lightningInterval) {
            clearInterval(this.lightningInterval);
            this.lightningInterval = null;
        }
        
        if (this.multipleBoltsInterval) {
            clearInterval(this.multipleBoltsInterval);
            this.multipleBoltsInterval = null;
        }
        
        // Clear canvas
        const canvas = document.getElementById('lightningCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    createZigzagBolt(ctx, color) {
        const canvas = ctx.canvas;
        
        // Random starting point
        const startX = Math.random() * canvas.width * 0.3;
        const startY = Math.random() * canvas.height;
        
        // Random ending point
        const endX = canvas.width * 0.7 + Math.random() * canvas.width * 0.3;
        const endY = Math.random() * canvas.height;
        
        // Generate zigzag path
        const points = this.generateZigzagPath(startX, startY, endX, endY);
        
        // Draw the lightning bolt with multiple passes for glow effect
        this.drawLightningBolt(ctx, points, color);
        
        // Fade out the bolt
        setTimeout(() => {
            this.fadeLightningBolt(ctx, points, color);
        }, 100);
    }

    generateZigzagPath(startX, startY, endX, endY) {
        const points = [{x: startX, y: startY}];
        
        const segments = 5 + Math.random() * 8; // 5-13 segments
        const dx = endX - startX;
        const dy = endY - startY;
        
        for (let i = 1; i < segments; i++) {
            const progress = i / segments;
            
            // Base position along the line
            const baseX = startX + dx * progress;
            const baseY = startY + dy * progress;
            
            // Add random deviation (zigzag)
            const deviation = (Math.random() - 0.5) * 60; // ±30 pixels deviation
            const angle = Math.atan2(dy, dx) + Math.PI / 2; // Perpendicular to main direction
            
            const zigzagX = baseX + Math.cos(angle) * deviation;
            const zigzagY = baseY + Math.sin(angle) * deviation;
            
            points.push({x: zigzagX, y: zigzagY});
        }
        
        points.push({x: endX, y: endY});
        return points;
    }

    drawLightningBolt(ctx, points, color) {
        // Clear previous frame
        ctx.globalCompositeOperation = 'source-over';
        
        // Draw glow effect (multiple passes)
        for (let pass = 0; pass < 3; pass++) {
            ctx.strokeStyle = color;
            ctx.lineWidth = (3 - pass) * 2 + 1;
            ctx.shadowColor = color;
            ctx.shadowBlur = (3 - pass) * 8;
            ctx.globalAlpha = 0.8 - pass * 0.2;
            
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            
            ctx.stroke();
        }
        
        // Draw core bolt (bright)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        
        ctx.stroke();
        
        // Add sparks at joints
        points.forEach((point, index) => {
            if (index > 0 && index < points.length - 1 && Math.random() < 0.4) {
                this.drawSpark(ctx, point.x, point.y, color);
            }
        });
    }

    drawSpark(ctx, x, y, color) {
        const sparkCount = 3 + Math.random() * 3;
        
        for (let i = 0; i < sparkCount; i++) {
            const angle = (Math.PI * 2 / sparkCount) * i + Math.random() * 0.5;
            const length = 5 + Math.random() * 10;
            
            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;
            
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.shadowColor = color;
            ctx.shadowBlur = 5;
            ctx.globalAlpha = 0.8;
            
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }

    fadeLightningBolt(ctx, points, color) {
        let opacity = 1;
        const fadeInterval = setInterval(() => {
            opacity -= 0.1;
            
            if (opacity <= 0) {
                clearInterval(fadeInterval);
                // Clear this specific area
                const minX = Math.min(...points.map(p => p.x)) - 20;
                const maxX = Math.max(...points.map(p => p.x)) + 20;
                const minY = Math.min(...points.map(p => p.y)) - 20;
                const maxY = Math.max(...points.map(p => p.y)) + 20;
                
                ctx.clearRect(minX, minY, maxX - minX, maxY - minY);
                return;
            }
            
            // Redraw with reduced opacity
            ctx.globalAlpha = opacity;
            this.drawLightningBolt(ctx, points, color);
        }, 50);
    }

    // ==========================================
    // NPC INTERACTION SYSTEM
    // ==========================================

    updateNPCSpeech(worldName, color) {
        const speech = document.getElementById('npcSpeech');
        const speechText = speech.querySelector('.speech-text');
        
        if (speechText) {
            speechText.textContent = `Accediendo a ${worldName}...`;
            speech.style.borderColor = color;
            speech.style.color = color;
            speech.style.opacity = '1';
        }
        
        // Animate NPC pointing more intensely
        const pointingArm = document.querySelector('.pointing-right');
        if (pointingArm) {
            pointingArm.style.boxShadow = `0 0 15px ${color}`;
            pointingArm.style.animation = 'pointingIntense 1s ease-in-out infinite';
        }
        
        // Add intense staff glow
        const staff = document.querySelector('.magic-staff');
        if (staff) {
            staff.style.boxShadow = `0 0 20px ${color}`;
        }
    }

    resetNPCSpeech() {
        const speech = document.getElementById('npcSpeech');
        const speechText = speech.querySelector('.speech-text');
        
        if (speechText) {
            speechText.textContent = 'Selecciona un portal dimensional...';
            speech.style.borderColor = '#00d4ff';
            speech.style.color = '#00d4ff';
            speech.style.opacity = '0';
        }
        
        // Reset NPC animations
        const pointingArm = document.querySelector('.pointing-right');
        if (pointingArm) {
            pointingArm.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.5)';
            pointingArm.style.animation = 'pointingGesture 3s ease-in-out infinite';
        }
        
        const staff = document.querySelector('.magic-staff');
        if (staff) {
            staff.style.boxShadow = '';
        }
    }

    // ==========================================
    // KEYBOARD CONTROLS
    // ==========================================

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            // ESC - Return to terminal
            if (e.key === 'Escape') {
                this.enterCircle('terminal');
            }
            
            // Number keys for direct circle access
            const circleMap = {
                '1': 'retro',      // Level 1
                '2': 'zelda',      // Level 2
                '3': 'skyrim',     // Level 3
                '4': 'cyberpunk',  // Level 4
                '5': 'terminal'    // Level 5 (Paradise)
            };
            
            if (circleMap[e.key]) {
                this.enterCircle(circleMap[e.key]);
            }
            
            // R - Random circle
            if (e.key.toLowerCase() === 'r') {
                this.enterRandomCircle();
            }
            
            // Space - Energy burst
            if (e.key === ' ') {
                e.preventDefault();
                this.createEnergyBurst();
            }
            
            // C - Cosmic event
            if (e.key.toLowerCase() === 'c') {
                this.triggerCosmicEvent();
            }
        });
    }

    // ==========================================
    // NOTIFICATIONS
    // ==========================================

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

// Initialize Dante's Portal
window.dantePortal = new DantePortal();

// Console messages
console.log('🔥 DANTE\'S INFERNO PORTAL - Initialized');
console.log('⚡ 5 Digital Circles Ready:');
console.log('   Level 5 (Center): Terminal Paradise');
console.log('   Level 4: Cyberpunk Neon Hell');
console.log('   Level 3: Skyrim Frost Realm');
console.log('   Level 2: Zelda Nature Realm');
console.log('   Level 1: Retro Pixel Limbo');
console.log('🎮 Keyboard: 1-5 for levels, R for random, C for cosmic events');
console.log('🌀 Hover circles to preview, click to descend/ascend');
