// ===========================================
// SIMPLE NEURAL MINDSCAPE - WORKING VERSION
// ===========================================

class NeuralMindscape3D {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.activeNode = 'hero';
        this.isInitialized = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.centerX = 0;
        this.centerY = 0;
        this.rotationX = 0;
        this.rotationY = 0;
        this.zoom = 1;
        
        // Posiciones de nodos en pantalla
        this.nodeData = {
            hero: { x: 0, y: 0, color: '#00D4FF', icon: '🧠', title: 'NEURAL CORE', size: 60 },
            about: { x: -200, y: -150, color: '#EF4444', icon: '👤', title: 'IDENTITY', size: 40 },
            experience: { x: 200, y: -100, color: '#10B981', icon: '💼', title: 'MEMORY', size: 45 },
            projects: { x: -150, y: 150, color: '#FF6B35', icon: '🚀', title: 'CREATIONS', size: 50 },
            research: { x: 180, y: 120, color: '#8B5CF6', icon: '🔬', title: 'RESEARCH', size: 40 },
            contact: { x: 0, y: 200, color: '#F59E0B', icon: '📡', title: 'CONNECT', size: 35 }
        };
        
        this.initialize();
    }

    initialize() {
        this.setupCanvas();
        this.setupEventListeners();
        this.startAnimation();
        this.isInitialized = true;
    }

    setupCanvas() {
        // Crear canvas 2D más simple
        this.canvas = document.getElementById('heroCanvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'mindscapeCanvas';
        }
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'auto';
        
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        
        // Reemplazar si existe heroCanvas
        const heroCanvas = document.getElementById('heroCanvas');
        if (heroCanvas && heroCanvas.parentNode) {
            heroCanvas.parentNode.replaceChild(this.canvas, heroCanvas);
        } else {
            document.body.appendChild(this.canvas);
        }
    }

    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        this.canvas.addEventListener('click', (e) => {
            this.handleCanvasClick(e);
        });
        
        // Wheel for zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.zoom += e.deltaY * -0.001;
            this.zoom = Math.max(0.5, Math.min(2, this.zoom));
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.centerX = this.canvas.width / 2;
            this.centerY = this.canvas.height / 2;
        });
    }

    handleCanvasClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        // Verificar click en nodos
        for (const [nodeId, nodeData] of Object.entries(this.nodeData)) {
            const nodeX = this.centerX + nodeData.x * this.zoom + Math.sin(this.rotationY) * 50;
            const nodeY = this.centerY + nodeData.y * this.zoom + Math.sin(this.rotationX) * 30;
            const distance = Math.sqrt((clickX - nodeX) ** 2 + (clickY - nodeY) ** 2);
            
            if (distance < nodeData.size * this.zoom) {
                this.navigateToNode(nodeId);
                break;
            }
        }
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0B0D17';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar conexiones
        this.drawConnections();
        
        // Dibujar nodos
        this.drawNodes();
        
        // Dibujar partículas de datos
        this.drawDataParticles();
    }

    drawConnections() {
        const heroData = this.nodeData.hero;
        const heroX = this.centerX + heroData.x * this.zoom;
        const heroY = this.centerY + heroData.y * this.zoom;
        
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
        this.ctx.lineWidth = 2;
        
        Object.entries(this.nodeData).forEach(([nodeId, nodeData]) => {
            if (nodeId === 'hero') return;
            
            const nodeX = this.centerX + nodeData.x * this.zoom + Math.sin(this.rotationY) * 20;
            const nodeY = this.centerY + nodeData.y * this.zoom + Math.sin(this.rotationX) * 15;
            
            this.ctx.beginPath();
            this.ctx.moveTo(heroX, heroY);
            this.ctx.lineTo(nodeX, nodeY);
            this.ctx.stroke();
        });
    }

    drawNodes() {
        Object.entries(this.nodeData).forEach(([nodeId, nodeData]) => {
            const nodeX = this.centerX + nodeData.x * this.zoom + Math.sin(this.rotationY + nodeId.length) * 30;
            const nodeY = this.centerY + nodeData.y * this.zoom + Math.sin(this.rotationX + nodeId.length) * 20;
            const size = nodeData.size * this.zoom;
            
            // Glow effect
            const gradient = this.ctx.createRadialGradient(nodeX, nodeY, 0, nodeX, nodeY, size);
            gradient.addColorStop(0, nodeData.color + '80');
            gradient.addColorStop(0.7, nodeData.color + '40');
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(nodeX, nodeY, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Node border
            this.ctx.strokeStyle = nodeData.color;
            this.ctx.lineWidth = this.activeNode === nodeId ? 4 : 2;
            this.ctx.beginPath();
            this.ctx.arc(nodeX, nodeY, size * 0.6, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Icon
            this.ctx.font = `${size * 0.4}px Arial`;
            this.ctx.fillStyle = nodeData.color;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(nodeData.icon, nodeX, nodeY);
            
            // Label
            this.ctx.font = `${12 * this.zoom}px Courier New`;
            this.ctx.fillStyle = nodeData.color;
            this.ctx.fillText(nodeData.title, nodeX, nodeY + size + 20);
        });
    }

    drawDataParticles() {
        const time = Date.now() * 0.001;
        const heroData = this.nodeData.hero;
        const heroX = this.centerX + heroData.x * this.zoom;
        const heroY = this.centerY + heroData.y * this.zoom;
        
        Object.entries(this.nodeData).forEach(([nodeId, nodeData], index) => {
            if (nodeId === 'hero') return;
            
            const nodeX = this.centerX + nodeData.x * this.zoom;
            const nodeY = this.centerY + nodeData.y * this.zoom;
            
            // Partículas viajando
            for (let i = 0; i < 3; i++) {
                const progress = (Math.sin(time + index + i * 0.5) + 1) * 0.5;
                const particleX = heroX + (nodeX - heroX) * progress;
                const particleY = heroY + (nodeY - heroY) * progress;
                
                this.ctx.fillStyle = '#FFB800';
                this.ctx.beginPath();
                this.ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
    }

    navigateToNode(nodeId) {
        if (this.activeNode === nodeId) return;
        
        console.log(`🎯 Navigating to: ${nodeId}`);
        this.activeNode = nodeId;
        
        // Notificar al controlador
        if (window.mindscapeController) {
            window.mindscapeController.handleNodeNavigation(nodeId);
        }
        
        // Actualizar indicador de foco
        this.updateFocusIndicator(nodeId);
        
        // Zoom hacia el nodo
        this.zoomToNode(nodeId);
    }

    updateFocusIndicator(nodeId) {
        const indicator = document.getElementById('focusIndicator');
        const focusText = document.getElementById('focusText');
        
        if (indicator && focusText) {
            const nodeData = this.nodeData[nodeId];
            if (nodeData) {
                focusText.textContent = `${nodeData.icon} ${nodeData.title} ACTIVE`;
                indicator.classList.add('active');
                
                setTimeout(() => {
                    indicator.classList.remove('active');
                }, 3000);
            }
        }
    }

    zoomToNode(nodeId) {
        const nodeData = this.nodeData[nodeId];
        if (!nodeData) return;
        
        // Animación suave hacia el nodo
        const targetZoom = nodeId === 'hero' ? 1 : 1.5;
        const startZoom = this.zoom;
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            this.zoom = startZoom + (targetZoom - startZoom) * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    startAnimation() {
        const animate = () => {
            if (!this.isInitialized) return;
            
            requestAnimationFrame(animate);
            
            // Actualizar rotación suave
            this.rotationX += 0.005;
            this.rotationY += 0.003;
            
            // Dibujar frame
            this.draw();
        };
        animate();
    }

    // Métodos públicos para el controlador
    navigateToSection(sectionId) {
        this.navigateToNode(sectionId);
    }

    resetView() {
        this.activeNode = 'hero';
        this.zoom = 1;
        this.rotationX = 0;
        this.rotationY = 0;
    }

    onWindowResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    getCurrentSection() {
        return this.activeNode;
    }
}

// Initialize 3D Mindscape
let neuralMindscape3D;
document.addEventListener('DOMContentLoaded', () => {
    // Wait for dependencies
    const initMindscape = () => {
        if (document.readyState === 'complete') {
            neuralMindscape3D = new NeuralMindscape3D();
            console.log('🧠 Simple Neural Mindscape initialized');
            
            // Handle window resize
            window.addEventListener('resize', () => {
                if (neuralMindscape3D) {
                    neuralMindscape3D.onWindowResize();
                }
            });
        } else {
            setTimeout(initMindscape, 100);
        }
    };
    initMindscape();
});

// Export for global access
window.NeuralMindscape3D = NeuralMindscape3D;
