/*
===========================================
QUANTUM SUPER-GRID CONTROLLER
===========================================
Sistema de navegación para el super-grid 3x3
Maneja transiciones, navegación por portales y dock
*/

class QuantumSuperGrid {
    constructor() {
        this.gridUniverse = null;
        this.dockNavigator = null;
        this.currentCell = 'home';
        this.isTransitioning = false;
        
        // Grid positions map
        this.gridPositions = {
            'projects': { x: 0, y: 0, transform: 'translate(0vw, 0vh)' },
            'about': { x: 1, y: 0, transform: 'translate(-100vw, 0vh)' },
            'skills': { x: 2, y: 0, transform: 'translate(-200vw, 0vh)' },
            'experience': { x: 0, y: 1, transform: 'translate(0vw, -100vh)' },
            'home': { x: 1, y: 1, transform: 'translate(-100vw, -100vh)' },
            'contact': { x: 2, y: 1, transform: 'translate(-200vw, -100vh)' },
            'hyrule': { x: 0, y: 2, transform: 'translate(0vw, -200vh)' },
            'tamriel': { x: 1, y: 2, transform: 'translate(-100vw, -200vh)' },
            'night-city': { x: 2, y: 2, transform: 'translate(-200vw, -200vh)' }
        };
        
        // Adjacent cells map for portal navigation
        this.adjacentCells = {
            'projects': { right: 'about', bottom: 'experience' },
            'about': { left: 'projects', right: 'skills', bottom: 'home' },
            'skills': { left: 'about', bottom: 'contact' },
            'experience': { top: 'projects', right: 'home', bottom: 'hyrule' },
            'home': { top: 'about', left: 'experience', right: 'contact', bottom: 'tamriel' },
            'contact': { top: 'skills', left: 'home', bottom: 'night-city' },
            'hyrule': { top: 'experience', right: 'tamriel' },
            'tamriel': { top: 'home', left: 'hyrule', right: 'night-city' },
            'night-city': { top: 'contact', left: 'tamriel' }
        };
        
        this.init();
    }
    
    init() {
        this.gridUniverse = document.querySelector('.grid-universe');
        this.dockNavigator = document.querySelector('.dock-navigator');
        
        if (!this.gridUniverse) {
            console.error('Grid universe not found');
            return;
        }
        
        // Initialize grid system after initialization sequence
        this.waitForInitialization();
    }
    
    waitForInitialization() {
        // Wait for the quantum initialization to complete
        const initContainer = document.getElementById('quantum-initialization');
        
        if (initContainer) {
            // Monitor initialization completion
            const observer = new MutationObserver(() => {
                if (initContainer.style.display === 'none' || 
                    initContainer.classList.contains('completed')) {
                    this.activateGrid();
                    observer.disconnect();
                }
            });
            
            observer.observe(initContainer, {
                attributes: true,
                attributeFilter: ['style', 'class']
            });
            
            // Fallback: activate grid after 5 seconds
            setTimeout(() => {
                this.activateGrid();
                observer.disconnect();
            }, 5000);
        } else {
            // If no initialization container, activate immediately
            this.activateGrid();
        }
    }
    
    activateGrid() {
        console.log('🌌 Activating Quantum Super-Grid System');
        
        // Hide original main content
        const mainContent = document.getElementById('arrival-experience');
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        
        // Activate grid universe
        this.gridUniverse.classList.add('active');
        this.gridUniverse.setAttribute('data-current', this.currentCell);
        
        // Activate dock navigator
        if (this.dockNavigator) {
            this.dockNavigator.classList.add('active');
        }
        
        // Set initial active states
        this.updateActiveStates();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Setup world portal redirects
        this.setupWorldPortals();
        
        // Show navigation hints briefly
        this.showNavigationHints();
        
        console.log('✅ Super-Grid System Online');
    }
    
    setupEventListeners() {
        // Portal edges navigation
        document.querySelectorAll('.portal-edge').forEach(edge => {
            edge.addEventListener('click', (e) => {
                const targetCell = e.target.getAttribute('data-target');
                if (targetCell) {
                    this.navigateToCell(targetCell, 'portal');
                }
            });
        });
        
        // Dock navigator
        document.querySelectorAll('.dock-cell').forEach(dockCell => {
            dockCell.addEventListener('click', (e) => {
                const targetCell = e.currentTarget.getAttribute('data-target');
                if (targetCell) {
                    this.navigateToCell(targetCell, 'dock');
                }
            });
        });
        
        // Navigation indicators
        document.querySelectorAll('.nav-indicator').forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const targetCell = e.currentTarget.getAttribute('data-target');
                if (targetCell) {
                    this.navigateToCell(targetCell, 'nav-indicator');
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            const adjacents = this.adjacentCells[this.currentCell];
            let targetCell = null;
            
            switch(e.key) {
                case 'ArrowUp':
                    targetCell = adjacents?.top;
                    break;
                case 'ArrowDown':
                    targetCell = adjacents?.bottom;
                    break;
                case 'ArrowLeft':
                    targetCell = adjacents?.left;
                    break;
                case 'ArrowRight':
                    targetCell = adjacents?.right;
                    break;
                case 'Home':
                    targetCell = 'home';
                    break;
                case 'Escape':
                    targetCell = 'home';
                    break;
            }
            
            if (targetCell) {
                e.preventDefault();
                this.navigateToCell(targetCell, 'keyboard');
            }
        });
    }
    
    setupWorldPortals() {
        // World portal clicks navigate to world cells
        document.querySelectorAll('.world-portal').forEach(portal => {
            portal.addEventListener('click', (e) => {
                e.preventDefault();
                const worldName = portal.getAttribute('data-world');
                
                // Map world names to cell names
                const worldCellMap = {
                    'hyrule': 'hyrule',
                    'tamriel': 'tamriel',
                    'night-city': 'night-city'
                };
                
                const targetCell = worldCellMap[worldName];
                if (targetCell) {
                    this.navigateToCell(targetCell, 'world-portal');
                }
            });
        });
    }
    
    navigateToCell(targetCell, method = 'unknown') {
        if (this.isTransitioning || targetCell === this.currentCell) {
            return;
        }
        
        console.log(`🚀 Navigating to ${targetCell} via ${method}`);
        
        this.isTransitioning = true;
        
        // Update current cell
        const previousCell = this.currentCell;
        this.currentCell = targetCell;
        
        // Apply transform
        const position = this.gridPositions[targetCell];
        if (position) {
            this.gridUniverse.style.transform = position.transform;
            this.gridUniverse.setAttribute('data-current', targetCell);
        }
        
        // Update active states
        this.updateActiveStates();
        
        // Play transition sound if available
        this.playTransitionSound(method);
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
            console.log(`✅ Navigation to ${targetCell} completed`);
        }, 800);
        
        // Trigger cell-specific actions
        this.onCellEnter(targetCell, previousCell, method);
    }
    
    updateActiveStates() {
        // Update grid cells
        document.querySelectorAll('.grid-cell').forEach(cell => {
            const cellName = cell.getAttribute('data-cell');
            cell.classList.toggle('active', cellName === this.currentCell);
            
            // Add adjacent class for performance optimization
            const isAdjacent = this.isAdjacentCell(cellName);
            cell.classList.toggle('adjacent', isAdjacent);
        });
        
        // Update dock cells
        document.querySelectorAll('.dock-cell').forEach(dockCell => {
            const targetCell = dockCell.getAttribute('data-target');
            dockCell.classList.toggle('active', targetCell === this.currentCell);
        });
    }
    
    isAdjacentCell(cellName) {
        if (cellName === this.currentCell) return false;
        
        const adjacents = this.adjacentCells[this.currentCell];
        return Object.values(adjacents || {}).includes(cellName);
    }
    
    onCellEnter(cellName, previousCell, method) {
        // Cell-specific enter actions
        const cellActions = {
            'home': () => {
                console.log('🏠 Welcome home, ALBHIRO');
                // Trigger home animations if needed
            },
            'projects': () => {
                console.log('🚀 Entering Projects realm');
                // Load project data if needed
            },
            'about': () => {
                console.log('👤 Entering About section');
                // Trigger about animations
            },
            'skills': () => {
                console.log('⚡ Entering Skills matrix');
                // Animate skill bars
                this.animateSkillBars();
            },
            'experience': () => {
                console.log('💼 Entering Experience timeline');
                // Animate timeline
            },
            'contact': () => {
                console.log('📡 Entering Contact hub');
                // Initialize contact form if needed
            },
            'hyrule': () => {
                console.log('🛡️ Welcome to Hyrule - Frontend Realm');
                // World-specific animations
            },
            'tamriel': () => {
                console.log('🏰 Welcome to Tamriel - Backend Empire');
                // World-specific animations
            },
            'night-city': () => {
                console.log('🤖 Welcome to Night City - AI District');
                // World-specific animations
            }
        };
        
        const action = cellActions[cellName];
        if (action) {
            setTimeout(action, 400); // Delay for smooth transition
        }
        
        // Update page title
        this.updatePageTitle(cellName);
        
        // Analytics tracking
        this.trackNavigation(cellName, previousCell, method);
    }
    
    animateSkillBars() {
        // Animate skill level bars in skills section
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 100);
        });
    }
    
    updatePageTitle(cellName) {
        const titles = {
            'home': 'ALBHIRO ARCHITECT | Portfolio Cuántico',
            'projects': 'Proyectos | ALBHIRO ARCHITECT',
            'about': 'Sobre Mí | ALBHIRO ARCHITECT',
            'skills': 'Skills | ALBHIRO ARCHITECT',
            'experience': 'Experiencia | ALBHIRO ARCHITECT',
            'contact': 'Contacto | ALBHIRO ARCHITECT',
            'hyrule': 'Hyrule - Frontend Realm | ALBHIRO ARCHITECT',
            'tamriel': 'Tamriel - Backend Empire | ALBHIRO ARCHITECT',
            'night-city': 'Night City - AI District | ALBHIRO ARCHITECT'
        };
        
        document.title = titles[cellName] || 'ALBHIRO ARCHITECT';
    }
    
    playTransitionSound(method) {
        // Play different sounds based on navigation method
        const soundMap = {
            'portal': 'ui-portal',
            'dock': 'ui-click',
            'keyboard': 'ui-beep',
            'world-portal': 'ui-warp'
        };
        
        const soundId = soundMap[method] || 'ui-hover';
        
        // Try to play sound if audio system is available
        try {
            const audio = document.getElementById(soundId);
            if (audio) {
                audio.currentTime = 0;
                audio.play().catch(() => {}); // Ignore play errors
            }
        } catch(e) {
            // Silent fail for audio errors
        }
    }
    
    trackNavigation(cellName, previousCell, method) {
        // Analytics tracking
        if (window.gtag) {
            window.gtag('event', 'navigate', {
                'event_category': 'super_grid',
                'event_label': `${previousCell}_to_${cellName}`,
                'method': method
            });
        }
        
        console.log(`📊 Navigation tracked: ${previousCell} → ${cellName} (${method})`);
    }
    
    // Public API methods
    getCurrentCell() {
        return this.currentCell;
    }
    
    navigateTo(cellName) {
        this.navigateToCell(cellName, 'api');
    }
    
    getAdjacentCells() {
        return this.adjacentCells[this.currentCell] || {};
    }
    
    isGridActive() {
        return this.gridUniverse?.classList.contains('active') || false;
    }
    
    showNavigationHints() {
        const hints = document.getElementById('nav-hints');
        if (hints) {
            hints.classList.add('show');
            
            // Hide hints after 5 seconds
            setTimeout(() => {
                hints.classList.remove('show');
            }, 5000);
            
            // Hide on first user interaction
            const hideOnInteraction = () => {
                hints.classList.remove('show');
                document.removeEventListener('keydown', hideOnInteraction);
                document.removeEventListener('click', hideOnInteraction);
            };
            
            document.addEventListener('keydown', hideOnInteraction);
            document.addEventListener('click', hideOnInteraction);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌌 Initializing Quantum Super-Grid System...');
    window.quantumGrid = new QuantumSuperGrid();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumSuperGrid;
}
