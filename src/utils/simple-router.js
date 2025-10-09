/**
 * Simple URL Router - Maneja URLs bonitas con archivos físicos
 * Estrategia: URLs bonitas en el navegador + redirección a archivos reales
 */
class SimpleRouter {
    constructor() {
        this.routes = {
            '/': '../index.html',
            '/portfolio': './portfolio.html',
            '/experience': './experience.html', 
            '/skills': './skills.html',
            '/contact': './contact.html'
        };
        
        this.init();
    }
    
    init() {
        console.log('🧭 Simple Router inicializado');
        
        // Manejar botones de navegación del navegador
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.navigateToPage(e.state.page);
            }
        });
    }
    
    /**
     * Navegar a una página con URL bonita
     */
    navigateTo(path) {
        const targetFile = this.routes[path];
        
        if (targetFile) {
            console.log(`🚀 Navegando: ${path} → ${targetFile}`);
            
            // Actualizar URL sin recargar
            history.pushState(
                { page: this.getPageIdFromPath(path) }, 
                this.getPageTitle(path), 
                path
            );
            
            // Redirigir al archivo físico
            window.location.href = targetFile;
        } else {
            console.warn(`⚠️ Ruta no encontrada: ${path}`);
        }
    }
    
    /**
     * Obtener ID de página desde path
     */
    getPageIdFromPath(path) {
        const pathMap = {
            '/': 'landing',
            '/portfolio': 'portfolio',
            '/experience': 'experience',
            '/skills': 'skills',
            '/contact': 'contact'
        };
        
        return pathMap[path] || 'landing';
    }
    
    /**
     * Obtener título de página
     */
    getPageTitle(path) {
        const titles = {
            '/': 'Inicio - Luis Alberto Oraa García',
            '/portfolio': 'Portfolio - Luis Alberto Oraa García',
            '/experience': 'Experiencia - Luis Alberto Oraa García',
            '/skills': 'Habilidades - Luis Alberto Oraa García',
            '/contact': 'Contacto - Luis Alberto Oraa García'
        };
        
        return titles[path] || 'Luis Alberto Oraa García';
    }
    
    /**
     * Configurar navegación en página actual
     */
    setupPageNavigation() {
        // Buscar enlaces de navegación y aplicar router
        const navLinks = document.querySelectorAll('[data-route]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = link.getAttribute('data-route');
                this.navigateTo(route);
            });
        });
        
        console.log(`✅ Configurada navegación para ${navLinks.length} enlaces`);
    }
}

// Inicializar router al cargar página
document.addEventListener('DOMContentLoaded', () => {
    window.simpleRouter = new SimpleRouter();
    window.simpleRouter.setupPageNavigation();
    
    // Función global para navegación fácil
    window.navigateTo = (path) => {
        window.simpleRouter.navigateTo(path);
    };
    
    console.log('🎯 Sistema de navegación simple listo');
});
