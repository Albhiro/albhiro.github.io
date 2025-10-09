/**
 * ===================================================================
 * QUANTUM ENGINE - MOTOR CUÁNTICO COMPARTIDO
 * Autor: Luis Alberto Oraa García
 * Descripción: Motor principal del sistema cuántico reutilizable
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
        
        // Progreso aleatorizado ±3%
        this.baseProgress = 0;
        this.progressVariation = 0;
        
        this.loadingStages = [
            { message: 'Estableciendo conexión cuántica...', duration: 800 },
            { message: 'Validando credenciales de Santander Digital Services...', duration: 1200 },
            { message: 'Sincronizando 16 años de experiencia...', duration: 1000 },
            { message: 'Cargando arsenal tecnológico...', duration: 900 },
            { message: 'Inicializando red neural de proyectos...', duration: 1100 },
            { message: 'Activando motor de innovación...', duration: 800 },
            { message: 'Preparando multiverso de habilidades...', duration: 700 },
            { message: 'Calibrando matrices de impacto...', duration: 600 },
            { message: 'Sistema cuántico listo. Acceso habilitado...', duration: 500 }
        ];
        
        this.currentStage = 0;
        this.progress = 0;
        this.startTime = null;
        
        // Audio system
        this.audioEnabled = localStorage.getItem('quantum-audio') !== 'disabled';
        this.audioElements = {};
    }
    
    /**
     * Initialize the quantum system
     */
    init() {
        this.startTime = Date.now();
        console.log('🚀 Quantum Engine: Inicializando sistema...');
        console.log('🎯 DEBUG: Stages configurados:', this.loadingStages.length);
        
        // Randomizar duración de etapas ±200ms
        this.loadingStages.forEach(stage => {
            const variation = (Math.random() - 0.5) * 400; // ±200ms
            stage.duration = Math.max(300, stage.duration + variation);
        });
        
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
        console.log('🎯 DEBUG: startQuantumBoot ejecutándose...');
        this.initializeAudio();
        setTimeout(() => {
            console.log('🎯 DEBUG: Ejecutando boot sequence...');
            this.executeBootSequence();
        }, 500);
    }
    
    /**
     * Execute the complete boot sequence
     */
    async executeBootSequence() {
        try {
            console.log('🎯 DEBUG: executeBootSequence iniciado');
            this.playSound('system-boot', true, 0.3);
            this.activateSystemStatus();
            console.log('🎯 DEBUG: Iniciando runLoadingStages...');
            await this.runLoadingStages();
            console.log('🎯 DEBUG: runLoadingStages completado');
            await this.completeInitialization();
        } catch (error) {
            console.error('❌ DEBUG: Error en executeBootSequence:', error);
            this.handleError('Boot sequence failed', error);
        }
    }
    
    /**
     * Run all loading stages with randomized progress
     */
    async runLoadingStages() {
        for (let i = 0; i < this.loadingStages.length; i++) {
            this.currentStage = i;
            const stage = this.loadingStages[i];
            
            // Actualizar mensaje
            this.updateLoadingMessage(stage.message);
            
            // Para el último stage, asegurar que llegue al 100%
            let finalProgress;
            if (i === this.loadingStages.length - 1) {
                finalProgress = 100;
                console.log('🎯 DEBUG: Último stage, forzando 100%');
            } else {
                // Progreso base (0-95% para stages intermedios)
                this.baseProgress = (i / (this.loadingStages.length - 1)) * 95;
                
                // Variación aleatoria ±3%
                this.progressVariation = (Math.random() - 0.5) * 6; // ±3%
                
                // Progreso final
                finalProgress = Math.min(95, Math.max(0, this.baseProgress + this.progressVariation));
            }
            
            console.log(`🎯 DEBUG: Stage ${i+1}/${this.loadingStages.length} - Progress: ${finalProgress}%`);
            await this.updateProgressBar(finalProgress, stage.duration);
            
            // Activar sistema correspondiente
            if (i < Object.keys(this.systems).length) {
                const systemKey = Object.keys(this.systems)[i];
                this.activateSystem(systemKey);
            }
        }
        
        console.log('🎯 DEBUG: Todos los stages completados');
    }
    
    /**
     * Update progress bar with smooth animation
     */
    updateProgressBar(targetProgress, duration) {
        return new Promise(resolve => {
            const progressBar = document.querySelector('.progress-fill');
            const progressText = document.querySelector('.progress-percentage');
            
            console.log('🎯 DEBUG: Elementos encontrados?', {
                progressBar: !!progressBar,
                progressText: !!progressText,
                targetProgress: targetProgress
            });
            
            if (!progressBar || !progressText) {
                console.error('❌ DEBUG: No se encontraron elementos de progreso');
                resolve();
                return;
            }
            
            const startProgress = this.progress;
            const progressDiff = targetProgress - startProgress;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function para suavizar
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                this.progress = startProgress + (progressDiff * easeProgress);
                
                progressBar.style.width = `${this.progress}%`;
                progressText.textContent = `${Math.round(this.progress)}%`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }
    
    /**
     * Update loading message with typewriter effect
     */
    updateLoadingMessage(message) {
        const messageElement = document.querySelector('.loading-message');
        if (!messageElement) return;
        
        messageElement.style.opacity = '0';
        
        setTimeout(() => {
            messageElement.textContent = message;
            messageElement.style.opacity = '1';
        }, 150);
    }
    
    /**
     * Activate system indicator
     */
    activateSystem(systemKey) {
        this.systems[systemKey] = true;
        const indicator = document.querySelector(`[data-system="${systemKey}"]`);
        
        if (indicator) {
            indicator.classList.add('active');
            this.playSound('system-activation', false, 0.2);
        }
    }
    
    /**
     * Complete initialization and show access button
     */
    async completeInitialization() {
        console.log('🎯 DEBUG: completeInitialization ejecutándose...');
        
        // Mostrar botón de acceso cuando llegue al 100%
        await this.showAccessButton();
        
        this.isInitialized = true;
        console.log('✅ Quantum Engine: Sistema inicializado - Botón habilitado');
    }
    
    /**
     * Enable access button after loading completes
     */
    showAccessButton() {
        return new Promise(resolve => {
            const accessButton = document.querySelector('.quantum-access-button');
            console.log('🎯 DEBUG: showAccessButton ejecutándose...', {
                button: !!accessButton,
                hasDisabledClass: accessButton ? accessButton.classList.contains('disabled') : false
            });
            
            if (accessButton) {
                // Remover clase disabled y habilitar interacción
                accessButton.classList.remove('disabled');
                accessButton.style.pointerEvents = 'auto';
                
                console.log('🎯 DEBUG: Botón habilitado, removida clase disabled');
                
                // Animación de habilitación
                setTimeout(() => {
                    accessButton.style.transition = 'all 0.6s var(--ease-power)';
                    accessButton.style.borderColor = 'rgba(79, 195, 247, 0.5)';
                    accessButton.style.color = 'rgba(255, 255, 255, 0.9)';
                    accessButton.style.cursor = 'pointer';
                    
                    console.log('🎯 DEBUG: Estilos de habilitación aplicados');
                }, 100);
                
                // Evento de click para acceder
                accessButton.addEventListener('click', () => {
                    console.log('🎯 DEBUG: Botón clickeado!');
                    this.enterSystem();
                });
            } else {
                console.error('❌ DEBUG: No se encontró el botón .quantum-access-button');
            }
            resolve();
        });
    }
    
    /**
     * Enter the main system
     */
    enterSystem() {
        console.log('🎯 Accediendo al sistema principal...');
        
        // Completar barra al 100%
        this.updateProgressBar(100, 1000);
        
        // Sonido de acceso
        this.playSound('system-access', false, 0.4);
        
        // Transición al dashboard
        setTimeout(() => {
            this.transitionToDashboard();
        }, 1200);
    }
    
    /**
     * Transition to main dashboard
     */
    transitionToDashboard() {
        const initContainer = document.querySelector('.quantum-init-container');
        const dashboard = document.querySelector('.quantum-dashboard');
        const navigation = document.getElementById('main-navigation');
        
        if (initContainer) {
            initContainer.style.opacity = '0';
            initContainer.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                initContainer.style.display = 'none';
                
                // Mostrar dashboard
                if (dashboard) {
                    dashboard.style.display = 'block';
                    setTimeout(() => {
                        dashboard.style.opacity = '1';
                        dashboard.style.transform = 'scale(1)';
                    }, 100);
                }
                
                // Mostrar navegación con animación
                if (navigation) {
                    navigation.style.display = 'block';
                    navigation.style.opacity = '0';
                    navigation.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        navigation.style.transition = 'all 0.5s ease';
                        navigation.style.opacity = '1';
                        navigation.style.transform = 'translateY(0)';
                        
                        // Notificar al router que el sistema está listo
                        if (window.cvRouter) {
                            window.cvRouter.handlePendingRoute();
                        }
                    }, 200);
                }
                
            }, 600);
        }
    }
    
    /**
     * Initialize audio system
     */
    initializeAudio() {
        // Temporalmente deshabilitado hasta tener archivos de audio
        this.audioEnabled = false;
        
        if (!this.audioEnabled) return;
        
        const audioFiles = [
            'system-boot',
            'system-activation',
            'system-access',
            'ui-hover'
        ];
        
        audioFiles.forEach(name => {
            const audio = new Audio(`./assets/audio/${name}.mp3`);
            audio.preload = 'auto';
            audio.volume = 0.3;
            this.audioElements[name] = audio;
        });
    }
    
    /**
     * Play sound effect
     */
    playSound(name, loop = false, volume = 0.3) {
        if (!this.audioEnabled || !this.audioElements[name]) return;
        
        const audio = this.audioElements[name];
        audio.volume = volume;
        audio.loop = loop;
        audio.currentTime = 0;
        
        audio.play().catch(e => {
            console.warn(`Could not play sound ${name}:`, e);
        });
    }
    
    /**
     * Activate system status indicators
     */
    activateSystemStatus() {
        const statusElements = document.querySelectorAll('.system-status');
        statusElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, index * 200);
        });
    }
    
    /**
     * Handle errors gracefully
     */
    handleError(message, error) {
        console.error(`❌ Quantum Engine Error: ${message}`, error);
        
        // Fallback: continuar con la inicialización
        setTimeout(() => {
            this.completeInitialization();
        }, 1000);
    }
    /**
     * FUNCIÓN DE TEST: Habilitar botón manualmente
     */
    testEnableButton() {
        console.log('🧪 TEST: Habilitando botón manualmente...');
        const accessButton = document.querySelector('.quantum-access-button');
        
        if (accessButton) {
            accessButton.classList.remove('disabled');
            accessButton.style.pointerEvents = 'auto';
            accessButton.style.borderColor = 'rgba(79, 195, 247, 0.5)';
            accessButton.style.color = 'rgba(255, 255, 255, 0.9)';
            accessButton.style.cursor = 'pointer';
            
            console.log('✅ TEST: Botón habilitado manualmente');
            
            // Agregar event listener si no existe
            if (!accessButton.hasAttribute('data-listener-added')) {
                accessButton.addEventListener('click', () => {
                    console.log('🎯 TEST: Botón clickeado!');
                    this.enterSystem();
                });
                accessButton.setAttribute('data-listener-added', 'true');
            }
        } else {
            console.error('❌ TEST: No se encontró el botón');
        }
    }
}

// Export para uso modular
window.QuantumEngine = QuantumEngine;

// FUNCIÓN GLOBAL DE TEST
window.testEnableButton = function() {
    if (window.quantumEngine) {
        window.quantumEngine.testEnableButton();
    } else {
        console.error('❌ TEST: QuantumEngine no inicializado');
    }
};
