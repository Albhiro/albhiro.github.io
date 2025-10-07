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

    addNodeLabel(node, text) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw label background
        ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.fillRect(0, 0, 256, 64);
        
        // Draw border
        ctx.strokeStyle = '#00D4FF';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 256, 64);
        
        // Draw text
        ctx.fillStyle = '#00D4FF';
        ctx.font = '16px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(text, 128, 40);
        
        const texture = new THREE.CanvasTexture(canvas);
        const labelGeometry = new THREE.PlaneGeometry(64, 16);
        const labelMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.8
        });
        
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(0, 25, 0);
        node.add(label);
    }

    createConnections() {
        const corePosition = this.nodePositions.core;
        
        Object.entries(this.nodePositions).forEach(([sectionId, position]) => {
            if (sectionId === 'core') return;
            
            // Create connection line
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array([
                corePosition.x, corePosition.y, corePosition.z,
                position.x, position.y, position.z
            ]);
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const material = new THREE.LineBasicMaterial({
                color: 0x00D4FF,
                transparent: true,
                opacity: 0.3
            });
            
            const line = new THREE.Line(geometry, material);
            line.userData = { type: 'connection', from: 'core', to: sectionId };
            
            this.scene.add(line);
            this.connections.push(line);
        });
        
        // Add data flow particles
        this.createDataFlowParticles();
    }

    createDataFlowParticles() {
        this.connections.forEach((connection, index) => {
            const particleCount = 5;
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount; i++) {
                const progress = i / particleCount;
                const startPos = new THREE.Vector3(0, 0, 0);
                const endPos = new THREE.Vector3().copy(
                    this.neuralNodes[connection.userData.to].position
                );
                
                positions[i * 3] = startPos.x + (endPos.x - startPos.x) * progress;
                positions[i * 3 + 1] = startPos.y + (endPos.y - startPos.y) * progress;
                positions[i * 3 + 2] = startPos.z + (endPos.z - startPos.z) * progress;
            }
            
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const material = new THREE.PointsMaterial({
                color: 0xFFB800,
                size: 2,
                transparent: true,
                opacity: 0.8
            });
            
            const particles = new THREE.Points(geometry, material);
            particles.userData = { 
                type: 'particles', 
                connectionIndex: index,
                animationOffset: index * 0.2
            };
            
            this.scene.add(particles);
        });
    }

    setupNavigation() {
        // Mouse/touch controls for 3D navigation
        let isMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let currentRotationX = 0;
        let currentRotationY = 0;
        
        const container = this.renderer.domElement;
        
        // Mouse events
        container.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            
            const deltaX = e.clientX - mouseX;
            const deltaY = e.clientY - mouseY;
            
            targetRotationY += deltaX * 0.01;
            targetRotationX += deltaY * 0.01;
            
            // Limit vertical rotation
            targetRotationX = Math.max(-Math.PI/3, Math.min(Math.PI/3, targetRotationX));
            
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        container.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        
        // Wheel zoom
        container.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomSpeed = 10;
            this.camera.position.z += e.deltaY * zoomSpeed * 0.01;
            this.camera.position.z = Math.max(100, Math.min(800, this.camera.position.z));
        });
        
        // Animation loop for smooth rotation
        const updateRotation = () => {
            currentRotationX += (targetRotationX - currentRotationX) * 0.05;
            currentRotationY += (targetRotationY - currentRotationY) * 0.05;
            
            // Orbit camera around center
            const radius = this.camera.position.z;
            this.camera.position.x = Math.sin(currentRotationY) * radius * Math.cos(currentRotationX);
            this.camera.position.y = Math.sin(currentRotationX) * radius;
            this.camera.position.z = Math.cos(currentRotationY) * radius * Math.cos(currentRotationX);
            
            this.camera.lookAt(0, 0, 0);
            requestAnimationFrame(updateRotation);
        };
        updateRotation();
        
        // Click to focus on nodes
        this.setupNodeInteraction();
    }

    setupNodeInteraction() {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        this.renderer.domElement.addEventListener('click', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.camera);
            
            const nodeObjects = Object.values(this.neuralNodes);
            const intersects = raycaster.intersectObjects(nodeObjects);
            
            if (intersects.length > 0) {
                const clickedNode = intersects[0].object;
                this.focusOnNode(clickedNode.userData.id);
            }
        });
    }

    focusOnNode(nodeId) {
        if (nodeId === 'core') {
            this.showSection('hero');
        } else {
            this.showSection(nodeId);
        }
        
        // Animate camera to node
        const node = this.neuralNodes[nodeId];
        if (node) {
            const targetPosition = node.position.clone();
            targetPosition.z += 100; // Move camera closer
            
            this.animateCameraTo(targetPosition);
            this.highlightNode(nodeId);
        }
    }

    animateCameraTo(position) {
        const startPosition = this.camera.position.clone();
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            this.camera.position.lerpVectors(startPosition, position, easeProgress);
            this.camera.lookAt(0, 0, 0);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    }

    highlightNode(nodeId) {
        // Reset all nodes
        Object.values(this.neuralNodes).forEach(node => {
            if (node.userData.id !== nodeId) {
                node.material.emissiveIntensity = 0.2;
                node.scale.set(1, 1, 1);
            }
        });
        
        // Highlight selected node
        const selectedNode = this.neuralNodes[nodeId];
        if (selectedNode) {
            selectedNode.material.emissiveIntensity = 0.5;
            selectedNode.scale.set(1.2, 1.2, 1.2);
            this.activeNode = nodeId;
        }
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = ['hero', 'about', 'experience', 'projects', 'research', 'contact'];
        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeNavLink = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
    }

    startAnimation() {
        const animate = () => {
            if (!this.isInitialized) return;
            
            requestAnimationFrame(animate);
            
            // Animate nodes
            Object.values(this.neuralNodes).forEach(node => {
                if (node.userData.type === 'core') {
                    // Pulse core node
                    node.userData.pulse += 0.02;
                    const scale = 1 + Math.sin(node.userData.pulse) * 0.1;
                    node.scale.set(scale, scale, scale);
                } else {
                    // Gentle rotation for section nodes
                    node.rotation.y += 0.005;
                    node.rotation.x += 0.003;
                }
            });
            
            // Animate data flow particles
            this.scene.children.forEach(child => {
                if (child.userData.type === 'particles') {
                    const positions = child.geometry.attributes.position.array;
                    const connection = this.connections[child.userData.connectionIndex];
                    const time = Date.now() * 0.001 + child.userData.animationOffset;
                    
                    for (let i = 0; i < positions.length; i += 3) {
                        const progress = (Math.sin(time + i * 0.1) + 1) * 0.5;
                        const startPos = new THREE.Vector3(0, 0, 0);
                        const endPos = this.neuralNodes[connection.userData.to].position;
                        
                        positions[i] = startPos.x + (endPos.x - startPos.x) * progress;
                        positions[i + 1] = startPos.y + (endPos.y - startPos.y) * progress;
                        positions[i + 2] = startPos.z + (endPos.z - startPos.z) * progress;
                    }
                    child.geometry.attributes.position.needsUpdate = true;
                }
            });
            
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    setupWindowManager() {
        // Prevent window overlap by managing z-indexes
        this.windowZIndex = 1000;
        
        // Override existing modals/windows
        const style = document.createElement('style');
        style.textContent = `
            .neural-hud { z-index: 9999; }
            .data-stream { z-index: 9998; }
            .terminal-section { z-index: 9997; }
            .project-modal, .demo-results-modal { z-index: 10000; }
            .epic-message-modal { z-index: 10001; }
        `;
        document.head.appendChild(style);
    }

    // Public methods for external control
    navigateToSection(sectionId) {
        this.focusOnNode(sectionId);
    }

    resetView() {
        this.camera.position.set(0, 0, 300);
        this.camera.lookAt(0, 0, 0);
        this.showSection('hero');
        
        // Reset all node highlights
        Object.values(this.neuralNodes).forEach(node => {
            node.material.emissiveIntensity = 0.2;
            node.scale.set(1, 1, 1);
        });
        this.activeNode = null;
    }

    // Handle window resize
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize 3D Mindscape
let neuralMindscape3D;
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to load
    if (typeof THREE !== 'undefined') {
        neuralMindscape3D = new NeuralMindscape3D();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (neuralMindscape3D) {
                neuralMindscape3D.onWindowResize();
            }
        });
        
    } else {
        console.error('Three.js not loaded');
    }
});

// Export for global access
window.NeuralMindscape3D = NeuralMindscape3D;
