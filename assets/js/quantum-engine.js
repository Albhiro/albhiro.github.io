/**
 * ===================================================================
 * QUANTUM PORTFOLIO ENGINE - CORE SYSTEM
 * Autor: Luis Alberto Oraa García
 * Descripción: Motor principal del sistema de portfolio cuántico
 * ===================================================================
 */

'use strict';

class QuantumEngine {
    constructor() {
        this.isInitialized = false;
        this.systems = {
            neural: false,
            experience: false,
            innovation: false,
            multiverse: false
        };
        
        this.loadingStages = [
            { message: 'Estableciendo conexión cuántica...', duration: 800 },
            { message: 'Validando credenciales de Santander Digital Services...', duration: 1200 },
            { message: 'Sincronizando 16 años de experiencia...', duration: 1000 },
            { message: 'Cargando arsenal tecnológico...', duration: 900 },
            { message: 'Inicializando red neural de proyectos...', duration: 1100 },
            { message: 'Activando motor de innovación...', duration: 800 },
            { message: 'Preparando multiverso de habilidades...', duration: 700 },
            { message: 'Calibrando matrices de impacto...', duration: 600 },
            { message: 'Sistema cuántico listo. Inicializando experiencia...', duration: 500 }
        ];
        
        this.currentStage = 0;
        this.progress = 0;
        this.startTime = null;
        
        // Audio system
        this.audioEnabled = localStorage.getItem('quantum-audio') !== 'disabled';
        this.audioElements = {};
        
        // Performance monitoring
        this.performanceMetrics = {
            initStart: null,
            initEnd: null,
            interactionCount: 0,
            errorCount: 0
        };
        
        this.init();
    }
    
    /**
     * Initialize the quantum system
     */
    init() {
        this.performanceMetrics.initStart = performance.now();
        this.startTime = Date.now();
        
        console.log('🚀 Quantum Engine: Inicializando sistema...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startQuantumBoot());
        } else {
            this.startQuantumBoot();
        }
    }
    
    /**
     * Start the quantum boot sequence
     */
    startQuantumBoot() {
        // Initialize audio system first
        this.initializeAudio();
        
        // Start the loading sequence
        setTimeout(() => {
            this.executeBootSequence();
        }, 500);
    }
    
    /**
     * Execute the complete boot sequence
     */
    async executeBootSequence() {
        try {
            // Activate boot sound
            this.playSound('system-boot', true, 0.3);
            
            // Start system status activation
            this.activateSystemStatus();
            
            // Execute loading stages
            await this.runLoadingStages();
            
            // Complete initialization
            await this.completeInitialization();
            
        } catch (error) {
            this.handleError('Boot sequence failed', error);
        }
    }
    
    /**
     * Activate system status indicators
     */
    activateSystemStatus() {
        const systems = Object.keys(this.systems);
        const statusItems = document.querySelectorAll('.status-item');
        
        systems.forEach((system, index) => {
            setTimeout(() => {
                const statusItem = document.querySelector(`[data-system="${system}"]`);
                if (statusItem) {
                    statusItem.classList.add('system-online');
                    
                    // Update status value
                    const statusValue = statusItem.querySelector('.status-value');
                    if (statusValue) {
                        statusValue.style.color = 'var(--quantum-accent)';
                        statusValue.style.textShadow = '0 0 10px var(--quantum-accent)';
                    }
                    
                    // Activate icon
                    const statusIcon = statusItem.querySelector('.status-icon');
                    if (statusIcon) {
                        statusIcon.style.transform = 'scale(1.1)';
                        statusIcon.style.boxShadow = '0 0 20px var(--quantum-primary)';
                    }
                }
                
                this.systems[system] = true;
                
                // Add some visual flair
                this.createQuantumParticles(statusItem);
                
            }, index * 300);
        });
    }
    
    /**
     * Run the loading stages sequence
     */
    async runLoadingStages() {
        const progressBar = document.getElementById('quantum-progress');
        const progressLabel = document.getElementById('loading-stage');
        const progressPercentage = document.getElementById('loading-percentage');
        const messageStream = document.getElementById('message-stream');
        
        for (let i = 0; i < this.loadingStages.length; i++) {
            const stage = this.loadingStages[i];
            
            // Update progress with randomization
            const baseProgress = Math.round(((i + 1) / this.loadingStages.length) * 100);
            // Add random variation (±3%) but keep it realistic
            const randomVariation = (Math.random() - 0.5) * 6; // -3% to +3%
            this.progress = Math.max(0, Math.min(100, Math.round(baseProgress + randomVariation)));
            
            // Ensure progress doesn't go backwards
            if (i > 0) {
                const previousProgress = Math.round((i / this.loadingStages.length) * 100);
                this.progress = Math.max(this.progress, previousProgress + Math.floor(Math.random() * 5) + 1);
            }
            
            // Update UI elements
            if (progressBar) {
                progressBar.style.width = `${this.progress}%`;
            }
            
            if (progressLabel) {
                progressLabel.textContent = stage.message;
            }
            
            if (progressPercentage) {
                progressPercentage.textContent = `${this.progress}%`;
            }
            
            // Add message to stream
            if (messageStream) {
                this.addSystemMessage(messageStream, stage.message);
            }
            
            // Wait for randomized stage duration (±200ms variation)
            const randomDuration = stage.duration + (Math.random() - 0.5) * 400;
            const finalDuration = Math.max(300, Math.min(2000, randomDuration)); // Keep between 300ms-2000ms
            await this.wait(finalDuration);
            
            // Add some randomness for realism
            await this.wait(Math.random() * 200);
        }
    }
    
    /**
     * Add system message to stream
     */
    addSystemMessage(container, message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'system-message';
        messageElement.innerHTML = `► ${message}`;
        
        container.appendChild(messageElement);
        
        // Animate message appearance
        setTimeout(() => {
            messageElement.style.opacity = '1';
            messageElement.style.transform = 'translateY(0)';
        }, 50);
        
        // Remove old messages to prevent overflow
        const messages = container.querySelectorAll('.system-message');
        if (messages.length > 4) {
            messages[0].remove();
        }
        
        // Auto-scroll to latest message
        container.scrollTop = container.scrollHeight;
    }
    
    /**
     * Complete the initialization process
     */
    async completeInitialization() {
        // Final progress update
        this.progress = 100;
        const progressBar = document.getElementById('quantum-progress');
        const progressLabel = document.getElementById('loading-stage');
        const progressPercentage = document.getElementById('loading-percentage');
        
        if (progressBar) progressBar.style.width = '100%';
        if (progressLabel) progressLabel.textContent = 'Sistema cuántico operativo. ¡Bienvenido!';
        if (progressPercentage) progressPercentage.textContent = '100%';
        
        // Wait for final effect
        await this.wait(1000);
        
        // Hide initialization screen
        await this.transitionToMainExperience();
        
        // Mark as initialized
        this.isInitialized = true;
        this.performanceMetrics.initEnd = performance.now();
        
        // Log performance
        const initTime = this.performanceMetrics.initEnd - this.performanceMetrics.initStart;
        console.log(`🎯 Quantum Engine: Inicializado en ${initTime.toFixed(2)}ms`);
        
        // Start ambient experience
        this.startAmbientExperience();
    }
    
    /**
     * Transition from loading to main experience
     */
    async transitionToMainExperience() {
        const initContainer = document.getElementById('quantum-initialization');
        const arrivalContainer = document.getElementById('arrival-experience');
        
        // Fade out initialization
        if (initContainer) {
            initContainer.classList.add('loading-complete');
            
            // Stop boot sound and start ambient
            this.stopSound('system-boot');
            this.playSound('ambient-space', true, 0.2);
            
            // Remove from DOM after transition
            setTimeout(() => {
                initContainer.style.display = 'none';
            }, 2000);
        }
        
        // Fade in main experience
        if (arrivalContainer) {
            document.body.classList.remove('quantum-loading');
            arrivalContainer.classList.add('experience-ready');
        }
        
        // Trigger entrance animations
        this.triggerEntranceAnimations();
    }
    
    /**
     * Trigger entrance animations for main content
     */
    triggerEntranceAnimations() {
        const elements = [
            { selector: '.name-first', delay: 500 },
            { selector: '.name-last', delay: 1000 },
            { selector: '.title-sequence', delay: 1500 },
            { selector: '.impact-metrics', delay: 2000 },
            { selector: '.arrival-cta', delay: 2500 }
        ];
        
        elements.forEach(({ selector, delay }) => {
            setTimeout(() => {
                const element = document.querySelector(selector);
                if (element) {
                    element.classList.add('quantum-revealed');
                }
            }, delay);
        });
    }
    
    /**
     * Start ambient experience effects
     */
    startAmbientExperience() {
        // Start cosmic effects
        this.initializeCosmicEffects();
        
        // Initialize interaction tracking
        this.initializeInteractionTracking();
        
        // Start performance monitoring
        this.startPerformanceMonitoring();
        
        console.log('✨ Ambient experience iniciada - Sistema completamente operativo');
    }
    
    /**
     * Initialize cosmic background effects
     */
    initializeCosmicEffects() {
        const starFields = document.querySelectorAll('.star-field');
        const nebula = document.querySelector('.nebula-effect');
        
        // Add random twinkle effects to stars
        starFields.forEach((field, index) => {
            setInterval(() => {
                const opacity = 0.3 + Math.random() * 0.7;
                field.style.opacity = opacity;
            }, 2000 + (index * 500));
        });
        
        // Animate nebula
        if (nebula) {
            setInterval(() => {
                const scale = 1 + Math.random() * 0.1;
                const opacity = 0.1 + Math.random() * 0.05;
                nebula.style.transform = `scale(${scale})`;
                nebula.style.opacity = opacity;
            }, 3000);
        }
    }
    
    /**
     * Initialize interaction tracking
     */
    initializeInteractionTracking() {
        // Track clicks
        document.addEventListener('click', (e) => {
            this.performanceMetrics.interactionCount++;
            this.trackInteraction('click', e.target);
        });
        
        // Track hovers on important elements
        document.querySelectorAll('.world-portal, .quantum-btn, .metric-crystal').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.performanceMetrics.interactionCount++;
                this.trackInteraction('hover', e.target);
                this.playHoverSound();
            });
        });
    }
    
    /**
     * Track user interactions
     */
    trackInteraction(type, element) {
        const data = {
            type,
            element: element.className || element.tagName,
            timestamp: Date.now(),
            sessionTime: Date.now() - this.startTime
        };
        
        // Store in localStorage for analytics
        const interactions = JSON.parse(localStorage.getItem('quantum-interactions') || '[]');
        interactions.push(data);
        
        // Keep only last 50 interactions
        if (interactions.length > 50) {
            interactions.splice(0, interactions.length - 50);
        }
        
        localStorage.setItem('quantum-interactions', JSON.stringify(interactions));
    }
    
    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        // Monitor frame rate
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkPerformance = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Log if performance is poor
                if (fps < 30) {
                    console.warn(`⚠️ Performance: ${fps} FPS - Consider reducing effects`);
                }
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }
    
    /**
     * Initialize audio system
     */
    initializeAudio() {
        const audioIds = ['system-boot', 'ambient-space', 'ui-hover'];
        
        audioIds.forEach(id => {
            const audio = document.getElementById(id);
            if (audio) {
                this.audioElements[id] = audio;
                audio.volume = 0;
                
                // Preload
                audio.load();
            }
        });
        
        // Setup audio toggle
        const audioToggle = document.getElementById('audio-toggle');
        if (audioToggle) {
            audioToggle.addEventListener('click', () => this.toggleAudio());
            this.updateAudioButton();
        }
    }
    
    /**
     * Play sound effect
     */
    playSound(soundId, loop = false, volume = 0.5) {
        if (!this.audioEnabled || !this.audioElements[soundId]) return;
        
        const audio = this.audioElements[soundId];
        audio.loop = loop;
        audio.volume = volume;
        
        // Fade in volume
        let currentVolume = 0;
        audio.volume = 0;
        
        const fadeIn = setInterval(() => {
            if (currentVolume < volume) {
                currentVolume += 0.05;
                audio.volume = Math.min(currentVolume, volume);
            } else {
                clearInterval(fadeIn);
            }
        }, 50);
        
        audio.play().catch(error => {
            console.log('Audio play prevented:', error.message);
        });
    }
    
    /**
     * Stop sound effect
     */
    stopSound(soundId) {
        if (!this.audioElements[soundId]) return;
        
        const audio = this.audioElements[soundId];
        
        // Fade out
        const fadeOut = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume -= 0.05;
            } else {
                audio.pause();
                audio.currentTime = 0;
                clearInterval(fadeOut);
            }
        }, 50);
    }
    
    /**
     * Play hover sound effect
     */
    playHoverSound() {
        if (!this.audioEnabled) return;
        
        // Create subtle hover sound using Web Audio API
        const audioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioContext) return;
        
        const ctx = new audioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    }
    
    /**
     * Toggle audio system
     */
    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        localStorage.setItem('quantum-audio', this.audioEnabled ? 'enabled' : 'disabled');
        
        if (!this.audioEnabled) {
            // Stop all audio
            Object.values(this.audioElements).forEach(audio => {
                audio.pause();
            });
        } else {
            // Resume ambient if system is ready
            if (this.isInitialized) {
                this.playSound('ambient-space', true, 0.2);
            }
        }
        
        this.updateAudioButton();
    }
    
    /**
     * Update audio button visual state
     */
    updateAudioButton() {
        const audioButton = document.getElementById('audio-toggle');
        if (!audioButton) return;
        
        const icon = audioButton.querySelector('i');
        if (icon) {
            icon.className = this.audioEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        }
        
        audioButton.title = this.audioEnabled ? 'Silenciar Audio' : 'Activar Audio';
        audioButton.style.opacity = this.audioEnabled ? '1' : '0.6';
    }
    
    /**
     * Create quantum particle effects
     */
    createQuantumParticles(container) {
        if (!container) return;
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--quantum-primary);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: quantumFloat ${2 + Math.random() * 3}s ease-in-out infinite;
                opacity: ${0.3 + Math.random() * 0.7};
                z-index: 1;
                pointer-events: none;
            `;
            
            container.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        }
    }
    
    /**
     * Handle errors gracefully
     */
    handleError(message, error) {
        this.performanceMetrics.errorCount++;
        console.error(`❌ Quantum Engine Error: ${message}`, error);
        
        // Still try to show main experience if initialization fails
        if (!this.isInitialized) {
            setTimeout(() => {
                this.transitionToMainExperience();
            }, 1000);
        }
    }
    
    /**
     * Utility: Wait for specified milliseconds
     */
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * Get system performance metrics
     */
    getMetrics() {
        return {
            ...this.performanceMetrics,
            audioEnabled: this.audioEnabled,
            systemsOnline: Object.values(this.systems).every(status => status),
            sessionTime: Date.now() - this.startTime
        };
    }
    
    /**
     * Public method to trigger special effects
     */
    triggerQuantumEffect(element) {
        if (!element) return;
        
        // Add quantum glow effect
        element.style.boxShadow = '0 0 30px var(--quantum-primary)';
        element.style.transform = 'scale(1.05)';
        
        // Create particle burst
        this.createQuantumParticles(element);
        
        // Reset after effect
        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.transform = '';
        }, 1000);
    }
}

// Initialize the Quantum Engine when script loads
window.quantumEngine = new QuantumEngine();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumEngine;
}
