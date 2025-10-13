/**
 * CONTROLADOR CENTRAL DE APLICACIÓN
 * Sistema robusto de estados para manejar navegación y animaciones
 */

class AppController {
    constructor() {
        this.state = {
            isLandingPage: document.body.classList.contains('landing-page'),
            navigationVisible: false,
            animationCompleted: false,
            pageReady: false
        };
        
        this.config = {
            NAVIGATION_DELAY: 3000,    // 3 segundos para mostrar navegación
            FAILSAFE_DELAY: 5000,      // 5 segundos máximo como failsafe
            CHECK_INTERVAL: 1000       // Verificar cada segundo
        };
        
        this.timers = {
            navigation: null,
            failsafe: null,
            checker: null
        };
        
        console.log('🎮 AppController inicializado', this.state);
        this.init();
    }
    
    init() {
        // 1. Configuración inicial
        this.setupInitialState();
        
        // 2. Eventos del DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
        
        // 3. Eventos de visibilidad
        this.setupVisibilityHandlers();
        
        // 4. Sistema failsafe
        this.setupFailsafe();
    }
    
    setupInitialState() {
        if (this.state.isLandingPage) {
            // En landing page, ocultar navegación inicialmente
            this.hideNavigation();
        } else {
            // En otras páginas, mostrar navegación inmediatamente
            this.showNavigation();
        }
    }
    
    onDOMReady() {
        console.log('📄 DOM Ready');
        this.state.pageReady = true;
        
        if (this.state.isLandingPage) {
            this.startLandingSequence();
        } else {
            this.ensureNavigationVisible();
        }
    }
    
    startLandingSequence() {
        console.log('🚀 Iniciando secuencia de landing');
        
        // Limpiar timers anteriores
        this.clearAllTimers();
        
        // Timer principal para mostrar navegación
        this.timers.navigation = setTimeout(() => {
            this.activateNavigation();
        }, this.config.NAVIGATION_DELAY);
        
        // Timer failsafe como respaldo
        this.timers.failsafe = setTimeout(() => {
            console.log('⚠️ Failsafe activado - forzando navegación');
            this.forceNavigation();
        }, this.config.FAILSAFE_DELAY);
        
        // Checker periódico
        this.startPeriodicCheck();
    }
    
    activateNavigation() {
        console.log('✅ Activando navegación normal');
        this.state.navigationVisible = true;
        this.state.animationCompleted = true;
        
        document.body.classList.add('landing-loaded');
        document.body.classList.remove('nav-hidden');
        
        this.clearTimer('navigation');
        this.clearTimer('failsafe');
    }
    
    forceNavigation() {
        console.log('🔧 Forzando navegación visible');
        this.state.navigationVisible = true;
        this.state.animationCompleted = true;
        
        document.body.classList.add('landing-loaded', 'nav-force-visible');
        document.body.classList.remove('nav-hidden');
        
        this.clearAllTimers();
    }
    
    hideNavigation() {
        document.body.classList.add('nav-hidden');
        document.body.classList.remove('landing-loaded', 'nav-force-visible');
        this.state.navigationVisible = false;
    }
    
    showNavigation() {
        document.body.classList.add('landing-loaded');
        document.body.classList.remove('nav-hidden');
        this.state.navigationVisible = true;
    }
    
    ensureNavigationVisible() {
        if (!this.state.navigationVisible) {
            console.log('🔍 Asegurando navegación visible');
            this.showNavigation();
        }
    }
    
    setupVisibilityHandlers() {
        // Visibilidad de página
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('👁️ Página oculta');
                this.pauseTimers();
            } else {
                console.log('👁️ Página visible');
                this.resumeOrRestart();
            }
        });
        
        // Focus de ventana
        window.addEventListener('focus', () => {
            console.log('🔍 Ventana enfocada');
            setTimeout(() => this.checkAndFix(), 100);
        });
        
        window.addEventListener('blur', () => {
            console.log('😶‍🌫️ Ventana desenfocada');
        });
    }
    
    pauseTimers() {
        // No pausamos realmente, solo verificamos estado después
        if (this.state.isLandingPage) {
            setTimeout(() => {
                if (!document.hidden) {
                    this.checkAndFix();
                }
            }, 100);
        }
    }
    
    resumeOrRestart() {
        setTimeout(() => {
            if (this.state.isLandingPage && !this.state.animationCompleted) {
                // Si estamos en landing y no se completó, reiniciar
                console.log('🔄 Reiniciando secuencia de landing');
                this.startLandingSequence();
            } else {
                // Asegurar que navegación esté visible
                this.checkAndFix();
            }
        }, 200);
    }
    
    checkAndFix() {
        const nav = document.querySelector('.quantum-nav');
        if (!nav) return;
        
        const computedStyle = window.getComputedStyle(nav);
        const shouldBeVisible = this.state.navigationVisible || 
                               this.state.animationCompleted || 
                               !this.state.isLandingPage;
        
        if (shouldBeVisible && (computedStyle.opacity === '0' || computedStyle.visibility === 'hidden')) {
            console.log('🛠️ Reparando navegación invisible');
            this.forceNavigation();
        }
    }
    
    startPeriodicCheck() {
        this.timers.checker = setInterval(() => {
            if (this.state.animationCompleted) {
                clearInterval(this.timers.checker);
                return;
            }
            
            this.checkAndFix();
        }, this.config.CHECK_INTERVAL);
    }
    
    setupFailsafe() {
        // Failsafe global que se ejecuta sin importar el estado
        setTimeout(() => {
            if (this.state.isLandingPage && !this.state.navigationVisible) {
                console.log('🚨 Failsafe global - forzando navegación');
                this.forceNavigation();
            }
        }, this.config.FAILSAFE_DELAY + 1000);
    }
    
    clearTimer(name) {
        if (this.timers[name]) {
            clearTimeout(this.timers[name]);
            this.timers[name] = null;
        }
    }
    
    clearAllTimers() {
        Object.keys(this.timers).forEach(name => {
            this.clearTimer(name);
        });
        
        if (this.timers.checker) {
            clearInterval(this.timers.checker);
            this.timers.checker = null;
        }
    }
    
    // Método público para forzar navegación desde consola
    forceShowNavigation() {
        console.log('🎯 Forzar navegación desde API pública');
        this.forceNavigation();
    }
    
    // Debug info
    getState() {
        return {
            ...this.state,
            timers: Object.keys(this.timers).reduce((acc, key) => {
                acc[key] = this.timers[key] !== null;
                return acc;
            }, {})
        };
    }
}

// Instancia global
window.AppController = AppController;

// Auto-inicialización
let appController;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        appController = new AppController();
        window.app = appController; // Para debug
    });
} else {
    appController = new AppController();
    window.app = appController; // Para debug
}
