// ===========================================
// NEURAL INTERFACE - LUIS ALBERTO'S MIND
// ===========================================

class NeuralInterface {
    constructor() {
        this.isConnected = false;
        this.brainModules = {
            memory: { status: 'active', load: 85 },
            creativity: { status: 'overclocked', load: 95 },
            logic: { status: 'stable', load: 90 },
            experience: { status: 'optimized', load: 100 }
        };
        this.initializeNeuralInterface();
    }

    initializeNeuralInterface() {
        this.addNeuralHUD();
        this.addBrainVisualization();
        this.addDataStreams();
        this.addConnectionAnimation();
        this.startNeuralActivity();
    }

    // Add Neural HUD Overlay
    addNeuralHUD() {
        const hud = document.createElement('div');
        hud.id = 'neural-hud';
        hud.className = 'neural-hud';
        hud.innerHTML = `
            <div class="hud-top-left">
                <div class="hud-module">
                    <span class="hud-label">NEURAL STATUS</span>
                    <span class="hud-value" id="neural-status">CONNECTING...</span>
                </div>
                <div class="hud-module">
                    <span class="hud-label">UPTIME</span>
                    <span class="hud-value" id="uptime">16 YEARS</span>
                </div>
                <div class="hud-module">
                    <span class="hud-label">PROJECTS ACTIVE</span>
                    <span class="hud-value" id="active-projects">25</span>
                </div>
            </div>
            
            <div class="hud-top-right">
                <div class="brain-activity">
                    <span class="hud-label">BRAIN ACTIVITY</span>
                    <div class="activity-bars">
                        <div class="activity-bar" data-module="memory"></div>
                        <div class="activity-bar" data-module="creativity"></div>
                        <div class="activity-bar" data-module="logic"></div>
                        <div class="activity-bar" data-module="experience"></div>
                    </div>
                </div>
            </div>
            
            <div class="hud-bottom-left">
                <div class="connection-status">
                    <span class="connection-dot"></span>
                    <span class="hud-label">CONNECTED TO: LUIS_ALBERTO.NEURAL_NET</span>
                </div>
            </div>
            
            <div class="hud-bottom-right">
                <div class="scan-info">
                    <span class="hud-label">SCAN MODE: PORTFOLIO_REVIEW</span>
                    <span class="scan-progress">█████████░ 90%</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(hud);
        
        // Simulate connection
        setTimeout(() => {
            document.getElementById('neural-status').textContent = 'CONNECTED';
            this.isConnected = true;
            this.startDataFlow();
        }, 3000);
    }

    // Add Brain Visualization
    addBrainVisualization() {
        const brainViz = document.createElement('div');
        brainViz.className = 'brain-visualization';
        brainViz.innerHTML = `
            <div class="brain-container">
                <svg class="brain-svg" viewBox="0 0 400 300">
                    <!-- Neural Network Nodes -->
                    <circle cx="100" cy="80" r="8" class="neural-node" data-module="memory" />
                    <circle cx="300" cy="80" r="8" class="neural-node" data-module="creativity" />
                    <circle cx="100" cy="220" r="8" class="neural-node" data-module="logic" />
                    <circle cx="300" cy="220" r="8" class="neural-node" data-module="experience" />
                    <circle cx="200" cy="150" r="12" class="neural-node central" data-module="core" />
                    
                    <!-- Neural Connections -->
                    <line x1="100" y1="80" x2="200" y2="150" class="neural-connection" />
                    <line x1="300" y1="80" x2="200" y2="150" class="neural-connection" />
                    <line x1="100" y1="220" x2="200" y2="150" class="neural-connection" />
                    <line x1="300" y1="220" x2="200" y2="150" class="neural-connection" />
                    <line x1="100" y1="80" x2="300" y2="80" class="neural-connection" />
                    <line x1="100" y1="220" x2="300" y2="220" class="neural-connection" />
                    
                    <!-- Data Pulses -->
                    <circle r="3" class="data-pulse">
                        <animateMotion dur="2s" repeatCount="indefinite">
                            <path d="M100,80 L200,150" />
                        </animateMotion>
                    </circle>
                    <circle r="3" class="data-pulse">
                        <animateMotion dur="2.5s" repeatCount="indefinite">
                            <path d="M300,80 L200,150" />
                        </animateMotion>
                    </circle>
                </svg>
                
                <div class="module-labels">
                    <div class="module-label" style="top: 60px; left: 60px;">
                        <span>MEMORY</span>
                        <span>16 años exp</span>
                    </div>
                    <div class="module-label" style="top: 60px; right: 60px;">
                        <span>CREATIVITY</span>
                        <span>IA Research</span>
                    </div>
                    <div class="module-label" style="bottom: 60px; left: 60px;">
                        <span>LOGIC</span>
                        <span>Architecture</span>
                    </div>
                    <div class="module-label" style="bottom: 60px; right: 60px;">
                        <span>EXPERIENCE</span>
                        <span>Santander</span>
                    </div>
                </div>
            </div>
        `;
        
        // Insert in hero section
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.appendChild(brainViz);
        }
    }

    // Add Data Streams
    addDataStreams() {
        const streams = [
            'FastAPI optimization complete...',
            'Neural network training: 89% accuracy...',
            'Docker containers deployed successfully...',
            'Email automation: 130 processed...',
            'Angular components rendered...',
            'Database queries optimized...',
            'Machine learning model updated...',
            'Code review passed: 0 issues...',
            'System architecture validated...',
            'Coffee level: CRITICAL - refill required...'
        ];

        const dataStream = document.createElement('div');
        dataStream.className = 'data-stream';
        dataStream.innerHTML = `
            <div class="stream-header">
                <span>THOUGHT_STREAM.log</span>
                <span class="stream-controls">━ ▢ ✕</span>
            </div>
            <div class="stream-content" id="stream-content"></div>
        `;
        
        document.body.appendChild(dataStream);

        // Animate data stream
        let streamIndex = 0;
        setInterval(() => {
            if (this.isConnected) {
                const content = document.getElementById('stream-content');
                const line = document.createElement('div');
                line.className = 'stream-line';
                line.innerHTML = `
                    <span class="timestamp">[${new Date().toLocaleTimeString()}]</span>
                    <span class="stream-text">${streams[streamIndex]}</span>
                `;
                content.appendChild(line);
                
                // Keep only last 6 lines
                while (content.children.length > 6) {
                    content.removeChild(content.firstChild);
                }
                
                streamIndex = (streamIndex + 1) % streams.length;
            }
        }, 2000);
    }

    // Start Neural Activity Animation
    startNeuralActivity() {
        setInterval(() => {
            if (!this.isConnected) return;
            
            // Update activity bars
            Object.keys(this.brainModules).forEach(module => {
                const bar = document.querySelector(`[data-module="${module}"]`);
                if (bar) {
                    const load = this.brainModules[module].load + (Math.random() - 0.5) * 10;
                    bar.style.height = Math.max(10, Math.min(100, load)) + '%';
                }
            });
            
            // Pulse neural nodes
            document.querySelectorAll('.neural-node').forEach(node => {
                if (Math.random() < 0.3) {
                    node.classList.add('pulsing');
                    setTimeout(() => node.classList.remove('pulsing'), 500);
                }
            });
        }, 1000);
    }

    // Connection Animation
    addConnectionAnimation() {
        const connectScreen = document.createElement('div');
        connectScreen.className = 'connection-screen';
        connectScreen.innerHTML = `
            <div class="connection-content">
                <div class="connection-logo">
                    <div class="neural-symbol">🧠</div>
                    <h2>NEURAL INTERFACE</h2>
                    <p>Establishing connection to Luis Alberto's mind...</p>
                </div>
                
                <div class="connection-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="connection-steps">
                        <div class="step active">Scanning neural pathways...</div>
                        <div class="step">Analyzing memory engrams...</div>
                        <div class="step">Decrypting thought patterns...</div>
                        <div class="step">Establishing secure connection...</div>
                        <div class="step">Interface ready</div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(connectScreen);
        
        // Animate connection sequence
        this.animateConnection(connectScreen);
    }

    animateConnection(screen) {
        const steps = screen.querySelectorAll('.step');
        const progressFill = screen.querySelector('.progress-fill');
        
        let currentStep = 0;
        const stepInterval = setInterval(() => {
            if (currentStep > 0) {
                steps[currentStep - 1].classList.remove('active');
                steps[currentStep - 1].classList.add('completed');
            }
            
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                progressFill.style.width = ((currentStep + 1) / steps.length * 100) + '%';
                currentStep++;
            } else {
                clearInterval(stepInterval);
                setTimeout(() => {
                    screen.style.opacity = '0';
                    setTimeout(() => screen.remove(), 1000);
                }, 1000);
            }
        }, 800);
    }

    // Start Data Flow
    startDataFlow() {
        // Add flowing particles
        this.createDataParticles();
        
        // Update HUD status
        document.getElementById('neural-status').textContent = 'OPTIMAL';
        document.querySelector('.connection-dot').style.background = '#00D4FF';
    }

    createDataParticles() {
        setInterval(() => {
            if (!this.isConnected) return;
            
            const particle = document.createElement('div');
            particle.className = 'data-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #00D4FF;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                animation: dataFloat 3s linear forwards;
                box-shadow: 0 0 10px #00D4FF;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 3000);
        }, 200);
    }
}

// Initialize Neural Interface
document.addEventListener('DOMContentLoaded', () => {
    new NeuralInterface();
});
