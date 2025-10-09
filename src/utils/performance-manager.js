/**
 * ===================================================================
 * PERFORMANCE MANAGER - GESTOR DE RENDIMIENTO
 * Autor: Luis Alberto Oraa García
 * Descripción: Sistema de carga inteligente y optimización de performance
 * ===================================================================
 */

'use strict';

class PerformanceManager {
    constructor() {
        this.loadedPages = new Set();
        this.activeAnimations = new Map();
        this.observer = null;
        this.performanceMode = this.detectPerformanceMode();
        
        this.init();
    }
    
    /**
     * Initialize performance management
     */
    init() {
        console.log(`🚀 Performance Manager: Modo ${this.performanceMode}`);
        this.setupIntersectionObserver();
        this.setupPerformanceMonitoring();
    }
    
    /**
     * Detect device performance capabilities
     */
    detectPerformanceMode() {
        // Detectar capacidades del dispositivo
        const memory = navigator.deviceMemory || 4; // GB
        const cores = navigator.hardwareConcurrency || 4;
        const connection = navigator.connection?.effectiveType || '4g';
        
        // Determinar modo de rendimiento
        if (memory >= 8 && cores >= 8 && ['4g', '5g'].includes(connection)) {
            return 'HIGH_PERFORMANCE';
        } else if (memory >= 4 && cores >= 4) {
            return 'BALANCED';
        } else {
            return 'LOW_PERFORMANCE';
        }
    }
    
    /**
     * Setup intersection observer for lazy loading
     */
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.activatePageAnimations(entry.target.id);
                } else {
                    this.deactivatePageAnimations(entry.target.id);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
    }
    
    /**
     * Load page resources on demand
     */
    async loadPageResources(pageName) {
        if (this.loadedPages.has(pageName)) {
            return true;
        }
        
        try {
            console.log(`📦 Loading resources for: ${pageName}`);
            
            // Cargar CSS específico de la página
            if (await this.resourceExists(`./src/css/${pageName}.css`)) {
                await this.loadCSS(`./src/css/${pageName}.css`);
            } else if (await this.resourceExists(`./src/assets/css/${pageName}.css`)) {
                await this.loadCSS(`./src/assets/css/${pageName}.css`);
            }
            
            // Cargar JS específico de la página (si existe)
            if (await this.resourceExists(`./src/js/${pageName}.js`)) {
                await this.loadJS(`./src/js/${pageName}.js`);
            }
            
            this.loadedPages.add(pageName);
            console.log(`✅ Resources loaded for: ${pageName}`);
            return true;
            
        } catch (error) {
            console.error(`❌ Error loading resources for ${pageName}:`, error);
            return false;
        }
    }
    
    /**
     * Load CSS file dynamically
     */
    loadCSS(href) {
        return new Promise((resolve, reject) => {
            // Verificar si ya está cargado
            if (document.querySelector(`link[href="${href}"]`)) {
                resolve();
                return;
            }
            
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
            
            document.head.appendChild(link);
        });
    }
    
    /**
     * Load JS file dynamically
     */
    loadJS(src) {
        return new Promise((resolve, reject) => {
            // Verificar si ya está cargado
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load JS: ${src}`));
            
            document.head.appendChild(script);
        });
    }
    
    /**
     * Check if resource exists
     */
    async resourceExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }
    
    /**
     * Activate animations for visible page
     */
    activatePageAnimations(pageId) {
        const pageElement = document.getElementById(pageId);
        if (!pageElement) return;
        
        // Activar animaciones según el modo de rendimiento
        if (this.performanceMode === 'HIGH_PERFORMANCE') {
            pageElement.classList.add('animations-full');
        } else if (this.performanceMode === 'BALANCED') {
            pageElement.classList.add('animations-reduced');
        } else {
            pageElement.classList.add('animations-minimal');
        }
        
        this.activeAnimations.set(pageId, true);
        console.log(`🎬 Animaciones activadas para: ${pageId}`);
    }
    
    /**
     * Deactivate animations for hidden page
     */
    deactivatePageAnimations(pageId) {
        const pageElement = document.getElementById(pageId);
        if (!pageElement) return;
        
        // Pausar animaciones para ahorrar recursos
        pageElement.classList.remove('animations-full', 'animations-reduced', 'animations-minimal');
        pageElement.classList.add('animations-paused');
        
        this.activeAnimations.set(pageId, false);
        console.log(`⏸️ Animaciones pausadas para: ${pageId}`);
    }
    
    /**
     * Monitor performance metrics
     */
    setupPerformanceMonitoring() {
        // Deshabilitar temporalmente para evitar spam en consola
        return;
        
        // Monitorear FPS (reducido)
        let lastTime = performance.now();
        let frames = 0;
        let warningCount = 0;
        const maxWarnings = 2;
        
        const measureFPS = (currentTime) => {
            frames++;
            
            if (currentTime >= lastTime + 3000) { // Cada 3 segundos
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                
                // Ajustar rendimiento si FPS es bajo
                if (fps < 25 && this.performanceMode !== 'LOW_PERFORMANCE' && warningCount < maxWarnings) {
                    console.warn(`⚠️ FPS bajo detectado: ${fps}. Reduciendo animaciones.`);
                    this.reduceAnimationComplexity();
                    warningCount++;
                }
                
                lastTime = currentTime;
                frames = 0;
            }
            
            if (warningCount < maxWarnings) {
                requestAnimationFrame(measureFPS);
            }
        };
        
        requestAnimationFrame(measureFPS);
    }
    
    /**
     * Reduce animation complexity on performance issues
     */
    reduceAnimationComplexity() {
        // Reducir número de cristales animados
        const crystals = document.querySelectorAll('.crystal-container');
        crystals.forEach((crystal, index) => {
            if (index % 2 === 0) { // Desactivar 50% de los cristales
                crystal.style.animationPlayState = 'paused';
            }
        });
        
        // Reducir frecuencia de actualizaciones
        document.documentElement.style.setProperty('--animation-duration-multiplier', '2');
    }
    
    /**
     * Observe page for visibility changes
     */
    observePage(pageElement) {
        if (this.observer && pageElement) {
            this.observer.observe(pageElement);
        }
    }
    
    /**
     * Get current performance stats
     */
    getPerformanceStats() {
        return {
            mode: this.performanceMode,
            loadedPages: Array.from(this.loadedPages),
            activeAnimations: Object.fromEntries(this.activeAnimations),
            memory: navigator.deviceMemory || 'unknown',
            cores: navigator.hardwareConcurrency || 'unknown'
        };
    }
    
    /**
     * Get optimal settings based on device performance
     */
    getOptimalSettings() {
        console.log('🔧 Configuración óptima:', this.performanceMode);
        
        return {
            animations: this.performanceMode !== 'LOW_PERFORMANCE',
            particles: this.performanceMode === 'HIGH_PERFORMANCE',
            transitions: this.performanceMode !== 'LOW_PERFORMANCE',
            heavyEffects: this.performanceMode === 'HIGH_PERFORMANCE',
            lazyLoading: true,
            resourceOptimization: this.performanceMode !== 'HIGH_PERFORMANCE'
        };
    }
    
    /**
     * Activate page animations
     */
    activatePageAnimations(pageSelector) {
        const page = document.querySelector(`#${pageSelector}`);
        if (!page) return;
        
        const settings = this.getOptimalSettings();
        
        if (settings.animations) {
            // Activar animaciones de entrada
            page.classList.add('animate-in');
            
            // Animar elementos con retraso
            const elements = page.querySelectorAll('[data-animate]');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animate-in');
                }, index * 100);
            });
        }
    }
}

// Export para uso global
window.PerformanceManager = PerformanceManager;
