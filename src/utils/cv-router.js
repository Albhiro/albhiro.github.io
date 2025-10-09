/**
 * CV Router - Manejo de URLs amigables y navegación SPA
 * Transforma URLs como: /portfolio, /experience, /skills, /contact
 */
class CVRouter {
    constructor() {
        this.routes = {
            '/': 'landing',
            '/home': 'landing', 
            '/portfolio': 'portfolio',
            '/experience': 'experience',
            '/skills': 'skills', 
            '/contact': 'contact'
        };
        
        this.currentRoute = '/';
        this.quantumApp = null;
        this.pendingRoute = null;
        
        this.init();
    }
    
    /**
     * Initialize router
     */
    init() {
        console.log('🧭 Inicializando CV Router...');
        
        // Bind popstate for browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handleRouteChange(e.state?.route || window.location.pathname);
        });
        
        // Handle initial route
        this.handleInitialRoute();
    }
    
    /**
     * Set QuantumApp reference
     */
    setQuantumApp(app) {
        this.quantumApp = app;
        console.log('🔗 Router conectado con QuantumApp');
    }
    
    /**
     * Handle initial route on page load
     */
    handleInitialRoute() {
        const currentPath = window.location.pathname;
        const route = this.routes[currentPath];
        
        if (route) {
            this.currentRoute = currentPath;
            console.log(`🎯 Ruta inicial detectada: ${currentPath} → ${route}`);
            
            // Si no es la landing, esperamos a que QuantumEngine termine la secuencia
            if (route !== 'landing') {
                this.pendingRoute = currentPath;
            }
        } else {
            // Redirect to home if route not found
            this.navigateTo('/');
        }
    }
    
    /**
     * Handle pending route after system initialization
     */
    handlePendingRoute() {
        if (this.pendingRoute) {
            console.log(`🔄 Procesando ruta pendiente: ${this.pendingRoute}`);
            setTimeout(() => {
                this.navigateTo(this.pendingRoute, false);
                this.pendingRoute = null;
            }, 100);
        }
    }
    
    /**
     * Navigate to a specific route
     */
    navigateTo(path, updateBrowser = true) {
        const pageId = this.routes[path];
        
        if (!pageId) {
            console.warn(`⚠️ Ruta no encontrada: ${path}`);
            return false;
        }
        
        console.log(`🚀 Navegando: ${path} → ${pageId}`);
        
        // Si es landing, ir al index.html
        if (pageId === 'landing') {
            if (updateBrowser) {
                const title = this.getPageTitle(pageId);
                history.pushState(
                    { route: path, pageId: pageId }, 
                    title, 
                    path
                );
                document.title = title;
            }
            
            // Redirigir al index.html si no estamos ahí
            if (!window.location.pathname.includes('index.html') && !window.location.pathname === '/') {
                window.location.href = '../index.html';
                return true;
            }
            
            // Mostrar landing si ya estamos en index
            if (this.quantumApp) {
                this.quantumApp.loadPage(pageId);
            }
        } else {
            // Para otras páginas, redirigir a archivo físico
            const physicalPath = this.getPhysicalPath(pageId);
            
            if (updateBrowser) {
                const title = this.getPageTitle(pageId);
                history.pushState(
                    { route: path, pageId: pageId }, 
                    title, 
                    path
                );
                document.title = title;
            }
            
            // Redirigir a la página física
            window.location.href = physicalPath;
        }
        
        // Update current route
        this.currentRoute = path;
        
        return true;
    }
    
    /**
     * Get physical path for page
     */
    getPhysicalPath(pageId) {
        const physicalPaths = {
            'portfolio': './src/pages/portfolio.html',
            'experience': './src/pages/experience.html',
            'skills': './src/pages/skills.html',
            'contact': './src/pages/contact.html'
        };
        
        return physicalPaths[pageId] || './index.html';
    }
    
    /**
     * Handle route changes (back/forward)
     */
    handleRouteChange(path) {
        console.log(`🔄 Cambio de ruta detectado: ${path}`);
        this.navigateTo(path, false);
    }
    
    /**
     * Get page title for browser tab
     */
    getPageTitle(pageId) {
        const titles = {
            'landing': 'Inicio - Diseñador de Soluciones Imposibles',
            'portfolio': 'Portfolio - Proyectos y Creaciones',
            'experience': 'Experiencia - Trayectoria Profesional', 
            'skills': 'Habilidades - Competencias Técnicas',
            'contact': 'Contacto - Conectemos'
        };
        
        return titles[pageId] || 'CV - Diseñador de Soluciones Imposibles';
    }
    
    /**
     * Get current route
     */
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    /**
     * Get page ID from route
     */
    getPageFromRoute(path) {
        return this.routes[path] || null;
    }
    
    /**
     * Get route from page ID
     */
    getRouteFromPage(pageId) {
        return Object.keys(this.routes).find(route => this.routes[route] === pageId) || '/';
    }
    
    /**
     * Update navigation active state
     */
    updateNavigationState(pageId) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to current page nav item
        const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
    }
    
    /**
     * Generate SEO-friendly URLs
     */
    generateBreadcrumb(pageId) {
        const breadcrumbs = {
            'landing': [{ name: 'Inicio', url: '/' }],
            'portfolio': [
                { name: 'Inicio', url: '/' },
                { name: 'Portfolio', url: '/portfolio' }
            ],
            'experience': [
                { name: 'Inicio', url: '/' },
                { name: 'Experiencia', url: '/experience' }
            ],
            'skills': [
                { name: 'Inicio', url: '/' },
                { name: 'Habilidades', url: '/skills' }
            ],
            'contact': [
                { name: 'Inicio', url: '/' },
                { name: 'Contacto', url: '/contact' }
            ]
        };
        
        return breadcrumbs[pageId] || [];
    }
}

// Export global
window.CVRouter = CVRouter;
