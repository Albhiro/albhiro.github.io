// ===============================================
// SYNAPTIC PORTFOLIO - BRAIN-LIKE NAVIGATION
// ===============================================

class SynapticPortfolio {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.currentSection = 'hero';
        this.brainCenter = { x: 0, y: 0 };
        this.neurons = [];
        this.synapses = [];
        this.thoughts = [];
        this.brainWaves = [];
        this.isThinking = false;
        
        // Configuración de secciones como "pensamientos"
        this.thoughtMap = {
            hero: { 
                position: { x: 0, y: 0 }, 
                color: '#00D4FF', 
                title: 'CORE CONSCIOUSNESS',
                frequency: 0.05,
                neurons: 12
            },
            about: { 
                position: { x: -300, y: -200 }, 
                color: '#FF6B6B', 
                title: 'IDENTITY MATRIX',
                frequency: 0.03,
                neurons: 8
            },
            experience: { 
                position: { x: 300, y: -100 }, 
                color: '#4ECDC4', 
                title: 'MEMORY BANK',
                frequency: 0.04,
                neurons: 10
            },
            projects: { 
                position: { x: -250, y: 200 }, 
                color: '#45B7D1', 
                title: 'CREATIVE CORTEX',
                frequency: 0.06,
                neurons: 15
            },
            research: { 
                position: { x: 250, y: 150 }, 
                color: '#9B59B6', 
                title: 'INNOVATION LOBE',
                frequency: 0.025,
                neurons: 6
            },
            contact: { 
                position: { x: 0, y: 300 }, 
                color: '#F39C12', 
                title: 'COMMUNICATION HUB',
                frequency: 0.035,
                neurons: 7
            }
        };
        
        this.initialize();
    }

    initialize() {
        console.log('🧠 Initializing Synaptic Portfolio...');
        this.setupCanvas();
        this.createBrainStructure();
        this.setupInteractions();
        this.startNeuralActivity();
    }

    setupCanvas() {
        // Reemplazar o crear canvas
        const existingCanvas = document.getElementById('heroCanvas');
        if (existingCanvas) {
            this.canvas = existingCanvas;
        } else {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'synapticCanvas';
            document.body.appendChild(this.canvas);
        }
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.background = 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)';
        
        this.ctx = this.canvas.getContext('2d');
        this.brainCenter.x = this.canvas.width / 2;
        this.brainCenter.y = this.canvas.height / 2;
    }

    createBrainStructure() {
        this.neurons = [];
        this.synapses = [];
        
        // Crear red neuronal para cada pensamiento
        Object.entries(this.thoughtMap).forEach(([sectionId, thoughtData]) => {
            const baseX = this.brainCenter.x + thoughtData.position.x;
            const baseY = this.brainCenter.y + thoughtData.position.y;
            
            // Crear neuronas para esta sección
            for (let i = 0; i < thoughtData.neurons; i++) {
                const angle = (i / thoughtData.neurons) * Math.PI * 2;
                const radius = 50 + Math.random() * 100;
                
                const neuron = {
                    id: `${sectionId}_${i}`,
                    section: sectionId,
                    x: baseX + Math.cos(angle) * radius,
                    y: baseY + Math.sin(angle) * radius,
                    originalX: baseX + Math.cos(angle) * radius,
                    originalY: baseY + Math.sin(angle) * radius,
                    size: 3 + Math.random() * 5,
                    activity: 0,
                    color: thoughtData.color,
                    connections: []
                };
                
                this.neurons.push(neuron);
            }
        });
        
        // Crear sinapsis (conexiones entre neuronas)
        this.createSynapses();
    }

    createSynapses() {
        this.neurons.forEach(neuron => {
            // Conectar con neuronas cercanas
            this.neurons.forEach(otherNeuron => {
                if (neuron.id !== otherNeuron.id) {
                    const distance = Math.sqrt(
                        (neuron.x - otherNeuron.x) ** 2 + 
                        (neuron.y - otherNeuron.y) ** 2
                    );
                    
                    if (distance < 150 && Math.random() > 0.7) {
                        const synapse = {
                            from: neuron,
                            to: otherNeuron,
                            strength: Math.random(),
                            activity: 0,
                            lastPulse: 0
                        };
                        
                        this.synapses.push(synapse);
                        neuron.connections.push(synapse);
                    }
                }
            });
        });
    }

    setupInteractions() {
        // Click para activar pensamientos
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            this.activateNearestThought(clickX, clickY);
        });
        
        // Hover para ondas cerebrales
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            this.createBrainWave(mouseX, mouseY);
        });
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.brainCenter.x = this.canvas.width / 2;
            this.brainCenter.y = this.canvas.height / 2;
            this.repositionNeurons();
        });
    }

    activateNearestThought(x, y) {
        let nearestSection = null;
        let minDistance = Infinity;
        
        // Encontrar la sección más cercana
        Object.entries(this.thoughtMap).forEach(([sectionId, thoughtData]) => {
            const sectionX = this.brainCenter.x + thoughtData.position.x;
            const sectionY = this.brainCenter.y + thoughtData.position.y;
            const distance = Math.sqrt((x - sectionX) ** 2 + (y - sectionY) ** 2);
            
            if (distance < minDistance && distance < 200) {
                minDistance = distance;
                nearestSection = sectionId;
            }
        });
        
        if (nearestSection && nearestSection !== this.currentSection) {
            this.activateThought(nearestSection);
        }
    }

    activateThought(sectionId) {
        console.log(`🧠 Activating thought: ${sectionId}`);
        
        this.currentSection = sectionId;
        this.isThinking = true;
        
        // Crear cascada neuronal
        this.createNeuralCascade(sectionId);
        
        // Notificar al sistema de navegación
        this.notifyNavigation(sectionId);
        
        // Crear mensaje de pensamiento
        this.createThoughtBubble(sectionId);
        
        setTimeout(() => {
            this.isThinking = false;
        }, 2000);
    }

    createNeuralCascade(sectionId) {
        const sectionNeurons = this.neurons.filter(n => n.section === sectionId);
        
        // Activar neuronas de la sección gradualmente
        sectionNeurons.forEach((neuron, index) => {
            setTimeout(() => {
                neuron.activity = 1;
                
                // Propagar actividad a conexiones
                neuron.connections.forEach(synapse => {
                    setTimeout(() => {
                        synapse.activity = 1;
                        synapse.lastPulse = Date.now();
                        synapse.to.activity = Math.min(1, synapse.to.activity + 0.3);
                    }, Math.random() * 500);
                });
            }, index * 100);
        });
    }

    createBrainWave(x, y) {
        this.brainWaves.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 100 + Math.random() * 100,
            opacity: 0.8,
            color: '#00D4FF',
            speed: 2 + Math.random() * 3,
            created: Date.now()
        });
    }

    createThoughtBubble(sectionId) {
        const thoughtData = this.thoughtMap[sectionId];
        const x = this.brainCenter.x + thoughtData.position.x;
        const y = this.brainCenter.y + thoughtData.position.y;
        
        this.thoughts.push({
            x: x,
            y: y,
            text: thoughtData.title,
            color: thoughtData.color,
            opacity: 1,
            size: 0,
            maxSize: 20,
            created: Date.now(),
            duration: 3000
        });
    }

    startNeuralActivity() {
        const animate = () => {
            this.update();
            this.draw();
            requestAnimationFrame(animate);
        };
        animate();
    }

    update() {
        const now = Date.now();
        
        // Actualizar actividad neuronal
        this.neurons.forEach(neuron => {
            // Decaimiento natural de actividad
            neuron.activity *= 0.95;
            
            // Actividad espontánea ocasional
            if (Math.random() < 0.001) {
                neuron.activity = Math.min(1, neuron.activity + 0.3);
            }
        });
        
        // Actualizar sinapsis
        this.synapses.forEach(synapse => {
            synapse.activity *= 0.90;
        });
        
        // Actualizar ondas cerebrales
        this.brainWaves = this.brainWaves.filter(wave => {
            wave.radius += wave.speed;
            wave.opacity *= 0.95;
            return wave.radius < wave.maxRadius && wave.opacity > 0.01;
        });
        
        // Actualizar burbujas de pensamiento
        this.thoughts = this.thoughts.filter(thought => {
            const age = now - thought.created;
            const progress = age / thought.duration;
            
            if (progress < 0.3) {
                thought.size = thought.maxSize * (progress / 0.3);
            } else if (progress > 0.7) {
                thought.opacity = 1 - ((progress - 0.7) / 0.3);
            }
            
            return age < thought.duration;
        });
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar ondas cerebrales
        this.drawBrainWaves();
        
        // Dibujar sinapsis
        this.drawSynapses();
        
        // Dibujar neuronas
        this.drawNeurons();
        
        // Dibujar pensamientos
        this.drawThoughts();
        
        // Dibujar centro cerebral (tu foto)
        this.drawBrainCore();
    }

    drawBrainWaves() {
        this.brainWaves.forEach(wave => {
            this.ctx.strokeStyle = `${wave.color}${Math.floor(wave.opacity * 255).toString(16).padStart(2, '0')}`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        });
    }

    drawSynapses() {
        this.synapses.forEach(synapse => {
            if (synapse.activity > 0.1) {
                const intensity = Math.floor(synapse.activity * 255);
                this.ctx.strokeStyle = `rgba(0, 212, 255, ${synapse.activity})`;
                this.ctx.lineWidth = 1 + synapse.activity * 2;
                
                this.ctx.beginPath();
                this.ctx.moveTo(synapse.from.x, synapse.from.y);
                this.ctx.lineTo(synapse.to.x, synapse.to.y);
                this.ctx.stroke();
                
                // Pulso de datos
                if (Date.now() - synapse.lastPulse < 1000) {
                    const progress = (Date.now() - synapse.lastPulse) / 1000;
                    const pulseX = synapse.from.x + (synapse.to.x - synapse.from.x) * progress;
                    const pulseY = synapse.from.y + (synapse.to.y - synapse.from.y) * progress;
                    
                    this.ctx.fillStyle = '#FFB800';
                    this.ctx.beginPath();
                    this.ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                    this.ctx.fill();
                }
            }
        });
    }

    drawNeurons() {
        this.neurons.forEach(neuron => {
            const intensity = neuron.activity;
            const size = neuron.size * (1 + intensity * 0.5);
            
            // Glow effect
            if (intensity > 0.1) {
                this.ctx.shadowColor = neuron.color;
                this.ctx.shadowBlur = 10 + intensity * 20;
            }
            
            this.ctx.fillStyle = `${neuron.color}${Math.floor((0.3 + intensity * 0.7) * 255).toString(16).padStart(2, '0')}`;
            this.ctx.beginPath();
            this.ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.shadowBlur = 0;
        });
    }

    drawThoughts() {
        this.thoughts.forEach(thought => {
            if (thought.size > 0) {
                this.ctx.fillStyle = `${thought.color}${Math.floor(thought.opacity * 255).toString(16).padStart(2, '0')}`;
                this.ctx.font = `${thought.size}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(thought.text, thought.x, thought.y);
            }
        });
    }

    drawBrainCore() {
        // Centro cerebral pulsante
        const pulse = Math.sin(Date.now() * 0.003) * 0.3 + 0.7;
        const coreSize = 30 * pulse;
        
        // Glow del centro
        this.ctx.shadowColor = '#00D4FF';
        this.ctx.shadowBlur = 30;
        
        this.ctx.fillStyle = `rgba(0, 212, 255, ${pulse})`;
        this.ctx.beginPath();
        this.ctx.arc(this.brainCenter.x, this.brainCenter.y, coreSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Texto central
        this.ctx.shadowBlur = 0;
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = '14px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('LUIS ALBERTO', this.brainCenter.x, this.brainCenter.y - 5);
        this.ctx.fillText('NEURAL CORE', this.brainCenter.x, this.brainCenter.y + 10);
    }

    notifyNavigation(sectionId) {
        // Integración con el sistema de navegación
        if (window.mindscapeController) {
            window.mindscapeController.handleNodeNavigation(sectionId);
        }
        
        // Actualizar indicador
        const indicator = document.getElementById('focusIndicator');
        const focusText = document.getElementById('focusText');
        
        if (indicator && focusText) {
            const thoughtData = this.thoughtMap[sectionId];
            focusText.textContent = `🧠 ${thoughtData.title} ACTIVATED`;
            indicator.classList.add('active');
            
            setTimeout(() => {
                indicator.classList.remove('active');
            }, 3000);
        }
    }

    repositionNeurons() {
        // Reposicionar neuronas después de resize
        this.neurons.forEach(neuron => {
            const thoughtData = this.thoughtMap[neuron.section];
            const baseX = this.brainCenter.x + thoughtData.position.x;
            const baseY = this.brainCenter.y + thoughtData.position.y;
            
            const offsetX = neuron.originalX - (this.canvas.width / 2 + thoughtData.position.x);
            const offsetY = neuron.originalY - (this.canvas.height / 2 + thoughtData.position.y);
            
            neuron.x = baseX + offsetX;
            neuron.y = baseY + offsetY;
            neuron.originalX = neuron.x;
            neuron.originalY = neuron.y;
        });
    }

    // Métodos públicos
    navigateToSection(sectionId) {
        this.activateThought(sectionId);
    }

    getCurrentSection() {
        return this.currentSection;
    }
}

// Inicialización
let synapticPortfolio;
document.addEventListener('DOMContentLoaded', () => {
    synapticPortfolio = new SynapticPortfolio();
    window.synapticPortfolio = synapticPortfolio;
    console.log('🧠 Synaptic Portfolio initialized - Ready to think!');
});

window.SynapticPortfolio = SynapticPortfolio;
