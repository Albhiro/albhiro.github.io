/**
 * Router para manejar URLs tanto en desarrollo (Live Server) como en producción
 */

class SmartRouter {
    constructor() {
        this.isLiveServer = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        this.isLandingPage = document.body.classList.contains('landing-page');
        this.init();
    }

    init() {
        // Actualizar todos los enlaces de navegación al cargar la página
        this.updateNavigationLinks();
        
        // Interceptar clicks en navegación
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-route]');
            if (link) {
                e.preventDefault();
                this.navigate(link.getAttribute('data-route'));
            }
        });
        
        // Verificar y corregir navegación en landing si es necesario
        if (this.isLandingPage) {
            this.setupLandingPageSupport();
        }
    }
    
    setupLandingPageSupport() {
        // Función de verificación para landing page
        window.addEventListener('focus', () => {
            setTimeout(() => {
                this.checkNavigationVisibility();
            }, 200);
        });
        
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(() => {
                    this.checkNavigationVisibility();
                }, 200);
            }
        });
    }
    
    checkNavigationVisibility() {
        const nav = document.querySelector('.quantum-nav');
        const hasLandingLoaded = document.body.classList.contains('landing-loaded');
        
        if (nav && hasLandingLoaded) {
            const computedStyle = window.getComputedStyle(nav);
            if (computedStyle.opacity === '0') {
                console.log('🔧 SmartRouter: Corrigiendo visibilidad de navegación');
                document.body.classList.add('force-nav-visible');
                setTimeout(() => {
                    document.body.classList.remove('force-nav-visible');
                }, 100);
            }
        }
    }

    updateNavigationLinks() {
        const navLinks = document.querySelectorAll('[data-route]');
        navLinks.forEach(link => {
            const route = link.getAttribute('data-route');
            const url = this.getUrl(route);
            link.setAttribute('href', url);
        });
    }

    getUrl(route) {
        if (this.isLiveServer) {
            // En desarrollo con Live Server, usar URLs directas a archivos
            const routeMap = {
                'home': './home.html',
                'portfolio': './portfolio.html',
                'experience': './experience.html',
                'skills': './skills.html',
                'contact': './contact.html',
                'landing': './landing.html'
            };
            return routeMap[route] || './home.html';
        } else {
            // En producción, usar URLs limpias
            const routeMap = {
                'home': '/home',
                'portfolio': '/portfolio',
                'experience': '/experience',
                'skills': '/skills',
                'contact': '/contact',
                'landing': '/'
            };
            return routeMap[route] || '/home';
        }
    }

    navigate(route) {
        const url = this.getUrl(route);
        console.log(`🚀 Navegando a: ${route} -> ${url}`);
        window.location.href = url;
    }
}

// Inicializar el router cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SmartRouter();
});
