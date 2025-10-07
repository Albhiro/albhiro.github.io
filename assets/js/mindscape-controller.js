// ================================================
// NEURAL MINDSCAPE 3D CONTROLLER
// ================================================

class MindscapeController {
    constructor() {
        this.mindscape = null;
        this.currentSection = 'hero';
        this.autoRotation = false;
        this.connectionsVisible = true;
        this.isLoading = true;
        
        this.initialize();
    }

    async initialize() {
        console.log('🧠 Initializing Neural Mindscape Controller...');
        
        // Show loading progress
        this.updateLoadingProgress(0);
        
        // Wait for dependencies
        await this.waitForDependencies();
        this.updateLoadingProgress(25);
        
        // Initialize 3D mindscape
        await this.initializeMindscape();
        this.updateLoadingProgress(50);
        
        // Setup event listeners
        this.setupEventListeners();
        this.updateLoadingProgress(75);
        
        // Setup navigation integration
        this.setupNavigationIntegration();
        this.updateLoadingProgress(90);
        
        // Final setup
        this.setupFinalConfiguration();
        this.updateLoadingProgress(100);
        
        // Hide loading screen
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showWelcomeHint();
        }, 500);
        
        console.log('✅ Neural Mindscape Controller initialized');
    }

    async waitForDependencies() {
        return new Promise((resolve) => {
            const checkDependencies = () => {
                if (typeof THREE !== 'undefined' && 
                    typeof NeuralMindscape3D !== 'undefined' &&
                    document.readyState === 'complete') {
                    resolve();
                } else {
                    setTimeout(checkDependencies, 100);
                }
            };
            checkDependencies();
        });
    }

    async initializeMindscape() {
        try {
            // Esperar a que el portfolio sináptico se inicialice
            const waitForSynaptic = () => {
                if (window.synapticPortfolio) {
                    this.mindscape = window.synapticPortfolio;
                    console.log('🧠 Synaptic Portfolio connected successfully');
                } else {
                    setTimeout(waitForSynaptic, 100);
                }
            };
            waitForSynaptic();
        } catch (error) {
            console.error('❌ Error connecting to Synaptic Portfolio:', error);
            this.fallbackTo2D();
        }
    }

    updateLoadingProgress(percentage) {
        const progressBar = document.getElementById('loadingProgress');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }
        this.isLoading = false;
    }

    setupEventListeners() {
        // 3D Controls
        const resetViewBtn = document.getElementById('resetView');
        const toggleRotationBtn = document.getElementById('toggleRotation');
        const toggleConnectionsBtn = document.getElementById('toggleConnections');

        if (resetViewBtn) {
            resetViewBtn.addEventListener('click', () => {
                this.resetView();
            });
        }

        if (toggleRotationBtn) {
            toggleRotationBtn.addEventListener('click', () => {
                this.toggleAutoRotation();
            });
        }

        if (toggleConnectionsBtn) {
            toggleConnectionsBtn.addEventListener('click', () => {
                this.toggleConnections();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Window resize
        window.addEventListener('resize', () => {
            if (this.mindscape) {
                this.mindscape.onWindowResize();
            }
        });

        // Mouse cursor tracking for 3D effects
        this.setupCursorTracking();
    }

    setupNavigationIntegration() {
        // Override navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.navigateToSection(sectionId);
            });
        });

        // Override scroll behavior
        document.addEventListener('wheel', (e) => {
            if (!this.isLoading && this.mindscape) {
                // Let 3D handle scrolling
                e.preventDefault();
            }
        });
    }

    setupFinalConfiguration() {
        // Hide traditional scroll indicators
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.display = 'none';
        }

        // Set initial section visibility
        this.showOnlySection('hero');
    }

    setupCursorTracking() {
        const cursor = document.createElement('div');
        cursor.className = 'mindscape-cursor';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Activate cursor on 3D canvas
        const canvas = document.getElementById('mindscape3D');
        if (canvas) {
            canvas.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            canvas.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        }
    }

    navigateToSection(sectionId) {
        if (this.isLoading) return;

        console.log(`🎯 Navigating to section: ${sectionId}`);
        
        // Update current section
        this.currentSection = sectionId;
        
        // Use mindscape navigation if available
        if (this.mindscape) {
            this.mindscape.navigateToSection(sectionId);
        }
        
        // Update nav links
        this.updateNavigation(sectionId);
        
        // Show appropriate section
        this.showOnlySection(sectionId);
    }

    // Método para manejar navegación desde el canvas
    handleNodeNavigation(nodeId) {
        this.currentSection = nodeId;
        this.updateNavigation(nodeId);
        this.showOnlySection(nodeId);
    }

    updateFocusIndicator(sectionId) {
        const indicator = document.getElementById('focusIndicator');
        const focusText = document.getElementById('focusText');
        
        if (indicator && focusText) {
            const sectionNames = {
                'hero': 'NEURAL CORE ACTIVE',
                'about': 'IDENTITY NODE FOCUSED',
                'experience': 'MEMORY BANK ACCESSED',
                'projects': 'CREATION MATRIX LOADED',
                'research': 'DEEP MIND PROTOCOLS',
                'contact': 'COMMUNICATION HUB OPEN'
            };
            
            focusText.textContent = sectionNames[sectionId] || 'UNKNOWN NODE';
            indicator.classList.add('active');
            
            setTimeout(() => {
                indicator.classList.remove('active');
            }, 3000);
        }
    }

    updateNavigation(sectionId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    showOnlySection(sectionId) {
        const sections = ['hero', 'about', 'experience', 'projects', 'research', 'contact'];
        
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                if (id === sectionId) {
                    element.classList.add('active');
                    element.style.display = 'block';
                } else if (id === 'hero') {
                    // Keep hero visible as background
                    element.classList.remove('active');
                    element.style.display = 'block';
                } else {
                    element.classList.remove('active');
                    element.style.display = 'none';
                }
            }
        });
    }

    resetView() {
        if (!this.mindscape) return;
        
        console.log('🏠 Resetting to home view');
        this.mindscape.resetView();
        this.navigateToSection('hero');
    }

    toggleAutoRotation() {
        this.autoRotation = !this.autoRotation;
        const btn = document.getElementById('toggleRotation');
        
        if (btn) {
            if (this.autoRotation) {
                btn.classList.add('active');
                btn.style.color = '#FFB800';
            } else {
                btn.classList.remove('active');
                btn.style.color = '';
            }
        }
        
        console.log(`🔄 Auto rotation: ${this.autoRotation ? 'ON' : 'OFF'}`);
    }

    toggleConnections() {
        this.connectionsVisible = !this.connectionsVisible;
        const btn = document.getElementById('toggleConnections');
        
        if (btn) {
            if (this.connectionsVisible) {
                btn.classList.add('active');
                btn.style.color = '#10B981';
            } else {
                btn.classList.remove('active');
                btn.style.color = '';
            }
        }
        
        // Toggle connections in 3D scene
        if (this.mindscape && this.mindscape.connections) {
            this.mindscape.connections.forEach(connection => {
                connection.visible = this.connectionsVisible;
            });
        }
        
        console.log(`🔗 Connections: ${this.connectionsVisible ? 'VISIBLE' : 'HIDDEN'}`);
    }

    handleKeyboardShortcuts(e) {
        if (this.isLoading) return;

        const shortcuts = {
            'KeyH': 'hero',
            'KeyA': 'about', 
            'KeyE': 'experience',
            'KeyP': 'projects',
            'KeyR': 'research',
            'KeyC': 'contact',
            'KeyG': () => this.resetView(),
            'Space': () => this.toggleAutoRotation(),
            'KeyN': () => this.toggleConnections()
        };

        if (e.code in shortcuts) {
            e.preventDefault();
            const action = shortcuts[e.code];
            
            if (typeof action === 'function') {
                action();
            } else {
                this.navigateToSection(action);
            }
        }
    }

    showWelcomeHint() {
        const hint = document.getElementById('connectionHint');
        if (hint) {
            hint.classList.add('visible');
            
            setTimeout(() => {
                hint.classList.remove('visible');
            }, 5000);
        }
    }

    fallbackTo2D() {
        console.log('⚠️ Falling back to 2D mode');
        
        // Hide 3D controls
        const controls = document.querySelector('.mindscape-controls');
        if (controls) {
            controls.style.display = 'none';
        }
        
        // Use traditional navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.showOnlySection(sectionId);
                this.updateNavigation(sectionId);
            });
        });
    }

    // Public API methods
    getCurrentSection() {
        return this.currentSection;
    }

    isAutoRotationEnabled() {
        return this.autoRotation;
    }

    areConnectionsVisible() {
        return this.connectionsVisible;
    }
}

// Initialize controller when DOM is ready
let mindscapeController;
document.addEventListener('DOMContentLoaded', () => {
    mindscapeController = new MindscapeController();
});

// Global access
window.MindscapeController = MindscapeController;
window.mindscapeController = mindscapeController;
