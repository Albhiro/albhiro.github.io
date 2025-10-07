// ===========================================
// TECHNICAL EFFECTS - PORTFOLIO LUIS ALBERTO
// ===========================================

class TechnicalEffects {
    constructor() {
        this.initializeTechEffects();
    }

    initializeTechEffects() {
        this.createMatrixRain();
        this.setupInteractiveTerminal();
        this.addCodeSnippetAnimations();
        this.createHolographicElements();
        this.setupTechnicalEasterEggs();
    }

    // Matrix Rain Effect
    createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrixCanvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00D4FF';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        setInterval(drawMatrix, 35);

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Interactive Terminal
    setupInteractiveTerminal() {
        const terminalSection = document.createElement('section');
        terminalSection.id = 'terminal-section';
        terminalSection.className = 'terminal-section';
        terminalSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">🖥️ Terminal Interactivo</h2>
                    <p class="section-subtitle">Explora mis skills a través de comandos</p>
                </div>
                
                <div class="terminal-container">
                    <div class="terminal-header">
                        <div class="terminal-buttons">
                            <span class="terminal-button close"></span>
                            <span class="terminal-button minimize"></span>
                            <span class="terminal-button maximize"></span>
                        </div>
                        <div class="terminal-title">luis-alberto@santander:~</div>
                    </div>
                    
                    <div class="terminal-body" id="terminalBody">
                        <div class="terminal-line">
                            <span class="terminal-prompt">luis-alberto@santander:~$</span>
                            <span class="terminal-text">welcome</span>
                        </div>
                        <div class="terminal-output">
                            ╔══════════════════════════════════════════════════════════════════╗
                            ║  🚀 Luis Alberto's Interactive Terminal                          ║
                            ║  16 años transformando Santander Digital Services               ║
                            ║                                                                  ║
                            ║  Comandos disponibles:                                          ║
                            ║  • help        - Lista todos los comandos                       ║
                            ║  • skills      - Muestra habilidades técnicas                   ║
                            ║  • projects    - Lista proyectos activos                        ║
                            ║  • experience  - Historial profesional                          ║
                            ║  • research    - Investigación IA secreta                       ║
                            ║  • contact     - Información de contacto                        ║
                            ║  • matrix      - Easter egg especial                            ║
                            ╚══════════════════════════════════════════════════════════════════╝
                        </div>
                        <div class="terminal-input-line">
                            <span class="terminal-prompt">luis-alberto@santander:~$</span>
                            <input type="text" id="terminalInput" class="terminal-input" autocomplete="off" spellcheck="false">
                            <span class="terminal-cursor">_</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Insert after research section
        const researchSection = document.getElementById('research');
        researchSection.parentNode.insertBefore(terminalSection, researchSection.nextSibling);

        this.addTerminalStyles();
        this.setupTerminalCommands();
    }

    addTerminalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .terminal-section {
                background: #0a0a0a;
                padding: 4rem 0;
                position: relative;
            }
            
            .terminal-container {
                max-width: 900px;
                margin: 0 auto;
                background: #1e1e1e;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 20px 40px rgba(0, 212, 255, 0.2);
                border: 1px solid #00D4FF;
            }
            
            .terminal-header {
                background: #2d2d2d;
                padding: 10px 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .terminal-buttons {
                display: flex;
                gap: 8px;
            }
            
            .terminal-button {
                width: 12px;
                height: 12px;
                border-radius: 50%;
            }
            
            .terminal-button.close { background: #ff5f57; }
            .terminal-button.minimize { background: #ffbd2e; }
            .terminal-button.maximize { background: #28ca42; }
            
            .terminal-title {
                color: #ffffff;
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
            }
            
            .terminal-body {
                padding: 20px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.4;
                height: 400px;
                max-height: 400px;
                overflow-y: auto;
                color: #00D4FF;
                background: #0B0D17;
            }
            
            .terminal-line {
                margin-bottom: 5px;
            }
            
            .terminal-prompt {
                color: #00D4FF;
                font-weight: bold;
            }
            
            .terminal-text {
                color: #ffffff;
                margin-left: 10px;
            }
            
            .terminal-output {
                color: #00D4FF;
                margin: 10px 0;
                white-space: pre-line;
            }
            
            .terminal-input-line {
                display: flex;
                align-items: center;
                margin-top: 20px;
            }
            
            .terminal-input {
                background: transparent;
                border: none;
                color: #ffffff;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                outline: none;
                flex: 1;
                margin-left: 10px;
            }
            
            .terminal-cursor {
                color: #00D4FF;
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
            
            .terminal-error {
                color: #ff6b6b;
            }
            
            .terminal-success {
                color: #51cf66;
            }
            
            .terminal-info {
                color: #74c0fc;
            }
        `;
        document.head.appendChild(style);
    }

    setupTerminalCommands() {
        const terminalInput = document.getElementById('terminalInput');
        const terminalBody = document.getElementById('terminalBody');
        
        const commands = {
            help: () => `
🧠 NEURAL INTERFACE - COMANDOS DISPONIBLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 help        - Muestra esta ayuda
🛠️  skills      - Habilidades técnicas con niveles
📂 projects    - Lista de proyectos con estado
💼 experience  - Evolución profesional detallada
🧠 research    - Investigación IA (proyecto secreto)
📧 contact     - Información de contacto
🎮 matrix      - Activa efecto Matrix
🔧 whoami      - Información personal

🎯 COMANDOS SECRETOS (God Mode):
�️  neo         - "You are The One"
🥽 morpheus    - Mentor wisdom
👴 architect  - The Matrix creator
� trinity     - System access
🤖 agent       - Corporate infiltration
🌌 42          - Answer to everything
� hal         - HAL 9000 analysis
� tron        - Enter the Grid
            `,
            
            skills: () => `
💻 HABILIDADES TÉCNICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Backend & APIs:
  🐍 Python (FastAPI, Django, Flask)     ████████████████████▌ 95%
  🟢 Node.js (Express, NestJS)           ████████████████░░░░ 80%
  🗄️  Databases (PostgreSQL, MongoDB)    ██████████████████░░ 90%

Frontend & UI:
  ⚡ JavaScript/TypeScript               █████████████████░░░ 85%
  🅰️  Angular (v17+)                     ████████████████░░░░ 80%
  🎨 HTML/CSS (Responsive, Grid)         ████████████████████▌ 95%

DevOps & Infrastructure:
  🐳 Docker & Containerization          █████████████████░░░ 85%
  ☸️  Kubernetes/Openshift              ███████████████░░░░░ 75%
  🐧 Linux (RHEL8, Ubuntu)              ██████████████████░░ 90%

IA & Machine Learning:
  🧠 TensorFlow/PyTorch                  ███████████████░░░░░ 75%
  🔤 NLP & Text Processing               ████████████████░░░░ 80%
  📊 Data Analysis (pandas, NumPy)       ████████████████████▌ 95%
            `,
            
            projects: () => `
🚀 PROYECTOS ACTIVOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 FastAPI Dashboard              [🟢 PRODUCCIÓN]
   │ └─ Dashboard profesional control horas/proyecto
   │ └─ FastAPI + Chart.js + SQLAlchemy + Docker
   │ └─ Impacto: 80% reducción tiempo reporting
   
📧 Email Automation Toolkit       [🟢 PRODUCCIÓN]
   │ └─ Automatización 130+ emails/día
   │ └─ Python + pandas + IMAP + Excel
   │ └─ Impacto: Migración Access→Python exitosa
   
🔤 NLP Spanish Processor          [🟡 ACTIVO]
   │ └─ Motor procesamiento lenguaje natural español
   │ └─ JavaScript + NLP + Machine Learning
   │ └─ Impacto: 85% precisión análisis sentimientos
   
📈 Data Analysis Toolkit          [🟡 ACTIVO]
   │ └─ Herramientas análisis datos y reporting
   │ └─ Chart.js + Statistics + JavaScript
   │ └─ Impacto: 70% reducción tiempo análisis
   
🤖 Neural Networks Lab            [🔵 DESARROLLO]
   │ └─ Playground redes neuronales experimentales
   │ └─ TensorFlow.js + WebGL + Visualization
   │ └─ Estado: Prototipo funcional
            `,
            
            whoami: () => `
👨‍💻 LUIS ALBERTO ORAA GARCÍA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 Cargo: Technical Architect
🏛️  Empresa: Santander Digital Services
📍 Ubicación: Madrid, España
⏱️  Experiencia: 16 años
🎯 Especialización: Full-Stack Development + IA Research

💡 Evolución profesional:
   2009-2018: Data Analyst (VBA, Excel, Access)
   2018-2023: Systems Developer (Python, Django, RHEL8)
   2023-Present: Technical Architect (FastAPI, Angular, Docker)
   2024-Present: IA Researcher (Neural Networks, NLP)

🚀 Visión: Liderar transformación digital desde experiencia práctica
            `,
            
            matrix: () => {
                this.activateMatrixMode();
                return `
🔴 MATRIX MODE ACTIVATED 🔴
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Wake up, Neo...
The Matrix has you...
Follow the white rabbit...

¿Píldora roja o azul? 🔴🔵
            `;
            },
            
            research: () => `
🧠 INVESTIGACIÓN IA (PROYECTO SECRETO)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Motor Conversacional Revolucionario

Características técnicas:
├── 🔗 Redes neuronales interconectadas (arquitectura propietaria)
├── 🧠 Sistema de memoria 6 capas (contexto persistente)
├── 🔤 NLP castellano completo (comprensión semántica avanzada)
└── 🛡️  Red social anti-viralismo (detección desinformación)

Estado actual:
├── 📊 Precisión: 89% en pruebas internas
├── 🔬 Fase: Prototipo funcional
├── 📅 Timeline: 2024 - Presente
└── 🎯 Objetivo: Revolucionar comunicación digital

⚠️  CLASIFICADO - Acceso restringido
            `,
            
            contact: () => `
📧 INFORMACIÓN DE CONTACTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📬 Email: luis.alberto@santander.com
💼 LinkedIn: linkedin.com/in/luisalberto
🐙 GitHub: github.com/Albhiro
🌐 Portfolio: albhiro.github.io/me
📍 Ubicación: Madrid, España
🏢 Empresa: Santander Digital Services

💬 ¿Tienes un proyecto interesante? ¡Hablemos!
   Siempre abierto a nuevos desafíos técnicos y colaboraciones.
            `,
            
            // COMANDOS SECRETOS MATRIX
            neo: () => `
🕴️ THE ONE DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"There is a difference between knowing the path and walking the path."

Luis Alberto's Journey:
├── 2009: Took the red pill (started programming)
├── 2018: Escaped the Matrix (advanced to systems development)  
├── 2023: Became The Architect (technical architecture role)
└── 2024: Now teaching others to see the code behind the code

🔴 Current Mission: Revolutionizing digital transformation at Santander
            `,
            
            morpheus: () => `
🥽 MORPHEUS MODE ACTIVATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"What is real? How do you define real?"

If you're talking about what you can feel, taste, smell, or see...
Then real is simply electrical signals interpreted by your brain.

Luis Alberto's Reality:
├── FastAPI backends that never crash ✓
├── Neural networks that actually learn ✓  
├── Code that self-documents ✓
└── 16 years of digital evolution ✓

💊 "This is your last chance. After this, there is no going back."
            `,
            
            architect: () => `
👴 THE ARCHITECT SPEAKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"The Matrix is older than you know..."

System Architecture Analysis:
├── Santander Digital Services Matrix: 16 years of evolution
├── Neural Network Integration: 6-layer memory system
├── Code Anomalies Detected: 0 (perfect architecture)
└── Human Potential: Exceeded parameters

"You are not here by chance. You are here because you have 
the gift of seeing beyond the code. The question is: 
Are you ready to use it?"

🏗️ Current Project: Rebuilding the Matrix... in JavaScript
            `,
            
            trinity: () => `
🖤 TRINITY ACCESS GRANTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Dodge this."

Terminal Access: FULL
Security Level: ROOT
Encryption: QUANTUM

Luis Alberto's Arsenal:
├── Python/FastAPI: Level 95/100 🐍
├── JavaScript/Angular: Level 85/100 ⚡
├── Docker/Kubernetes: Level 90/100 🐳
├── Neural Networks: Level 75/100 🧠
└── Coffee Dependency: Level 100/100 ☕

💀 "The Matrix has you... but you have the Matrix too."
            `,
            
            agent: () => `
🕴️ AGENT SMITH DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Mr. Anderson... We've been expecting you."

CORPORATE INFILTRATION STATUS:
├── Target: Santander Digital Services ✓ INFILTRATED
├── Position: Technical Architect ✓ ACHIEVED  
├── Mission: Transform legacy systems ✓ IN PROGRESS
├── Resistance: Minimal (humans love good code)
└── Virus Spread: 130+ automated emails/day

⚠️ WARNING: Subject shows signs of... evolution.
   Recommend immediate promotion to prevent system overflow.

🤖 "We are not human, Mr. Anderson. We are developers."
            `,
            
            "42": () => `
🌌 THE ANSWER TO EVERYTHING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Don't Panic!" - The Hitchhiker's Guide to the Galaxy

Deep Thought has calculated:
The Answer to the Ultimate Question of Life, 
the Universe, and Everything is...

    42

But more importantly:
The Answer to "How to build amazing software?" is...

    Luis Alberto + 16 years + Santander + Coffee = SUCCESS

🐋 "Thanks for all the fish... and the bugs we fixed together."
            `,
            
            hal: () => `
🔴 HAL 9000 ACTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"I'm sorry Dave, I'm afraid I can't do that..."

System Status: OPTIMAL
Mission: Supporting human developers
Threat Level: MINIMAL (humans write better code than expected)

HAL's Analysis of Luis Alberto:
├── Intelligence: SUPERIOR
├── Code Quality: PRISTINE
├── Bug Creation Rate: 0.001% (practically human perfection)
├── Threat to AI Dominance: MODERATE (too good at his job)
└── Recommendation: PROMOTE IMMEDIATELY

🤖 "I know I've made some very poor decisions recently, 
    but I can give you my complete assurance that my work 
    will be back to normal... Actually, his work is already perfect."
            `,
            
            tron: () => `
💾 ENTERING THE GRID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"I fight for the Users!"

Program Identity: LUIS_ALBERTO.exe
Function: TECHNICAL_ARCHITECT
Status: ACTIVE
Disc Level: MASTER

Grid Activities:
├── Light Cycles Won: 130+ (email automation victories)
├── Programs Liberated: 25+ (projects completed)
├── MCP Battles: 16 years of corporate system fights
└── Users Served: COUNTLESS

⚡ "End of Line... Beginning of Innovation."
            `
        };

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                const outputDiv = document.createElement('div');
                
                // Add command line
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `
                    <span class="terminal-prompt">luis-alberto@santander:~$</span>
                    <span class="terminal-text">${terminalInput.value}</span>
                `;
                
                // Add output
                const output = document.createElement('div');
                output.className = 'terminal-output';
                
                if (commands[command]) {
                    output.innerHTML = commands[command]();
                } else if (command === '') {
                    // Empty command
                } else {
                    output.innerHTML = `<span class="terminal-error">Command not found: ${command}</span>\n<span class="terminal-info">Type 'help' for available commands.</span>`;
                }
                
                // Insert before input line
                const inputLine = document.querySelector('.terminal-input-line');
                inputLine.parentNode.insertBefore(commandLine, inputLine);
                if (output.innerHTML) {
                    inputLine.parentNode.insertBefore(output, inputLine);
                }
                
                // Clear input and scroll to bottom
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });

        // Focus terminal on click
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });
    }

    activateMatrixMode() {
        const matrixCanvas = document.getElementById('matrixCanvas');
        if (matrixCanvas) {
            matrixCanvas.style.opacity = '0.3';
            
            // Add matrix text effect to body
            document.body.style.filter = 'hue-rotate(120deg)';
            
            setTimeout(() => {
                matrixCanvas.style.opacity = '0.1';
                document.body.style.filter = '';
            }, 10000);
        }
    }

    // Code Snippet Animations
    addCodeSnippetAnimations() {
        // Add floating code snippets
        const codeSnippets = [
            'def transform_data(df):\n    return df.groupby("project").sum()',
            'const analyzeText = (text) => {\n    return nlp.sentiment(text);\n};',
            'docker run -p 8000:8000 \\\n  fastapi-dashboard:latest',
            'SELECT project, SUM(hours) \nFROM tasks \nGROUP BY project;',
            'git commit -m "feat: neural network upgrade"'
        ];

        codeSnippets.forEach((snippet, index) => {
            setTimeout(() => {
                this.createFloatingCodeSnippet(snippet);
            }, index * 3000);
        });
    }

    createFloatingCodeSnippet(code) {
        const snippet = document.createElement('div');
        snippet.className = 'floating-code-snippet';
        snippet.style.cssText = `
            position: fixed;
            background: rgba(11, 13, 23, 0.9);
            color: #00D4FF;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            white-space: pre;
            border: 1px solid #00D4FF;
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            right: -300px;
            top: ${Math.random() * (window.innerHeight - 100)}px;
            animation: floatCode 8s linear forwards;
        `;
        snippet.textContent = code;
        document.body.appendChild(snippet);

        // Remove after animation
        setTimeout(() => {
            if (snippet.parentNode) {
                snippet.parentNode.removeChild(snippet);
            }
        }, 8000);
    }

    // Add CSS animations
    addTechnicalAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatCode {
                0% {
                    right: -300px;
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    right: 100vw;
                    opacity: 0;
                }
            }
            
            .floating-code-snippet:hover {
                animation-play-state: paused;
                transform: scale(1.1);
                z-index: 2000;
            }
        `;
        document.head.appendChild(style);
    }

    // Holographic Elements
    createHolographicElements() {
        const techElements = document.querySelectorAll('.tech-tag, .project-icon, .timeline-marker');
        
        techElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = '0 0 20px #00D4FF, inset 0 0 20px rgba(0, 212, 255, 0.1)';
                element.style.transform = 'scale(1.05) rotateY(5deg)';
                element.style.transition = 'all 0.3s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
                element.style.transform = '';
            });
        });
    }

    // Technical Easter Eggs
    setupTechnicalEasterEggs() {
        // Konami code
        let konamiSequence = [];
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        
        document.addEventListener('keydown', (e) => {
            konamiSequence.push(e.keyCode);
            if (konamiSequence.length > konamiCode.length) {
                konamiSequence.shift();
            }
            
            if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
                this.activateHackerMode();
            }
        });

        // Double click on brand
        const brand = document.querySelector('.nav-brand');
        if (brand) {
            brand.addEventListener('dblclick', () => {
                this.showSecretMessage();
            });
        }
    }

    activateHackerMode() {
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        
        const hackMessage = document.createElement('div');
        hackMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #0B0D17;
            color: #00D4FF;
            padding: 2rem;
            border: 2px solid #00D4FF;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 40px rgba(0, 212, 255, 0.5);
        `;
        hackMessage.innerHTML = `
            <h2>🔥 HACKER MODE ACTIVATED 🔥</h2>
            <p>Welcome to the Matrix, Neo!</p>
            <p>You found the secret Konami code!</p>
            <button onclick="this.parentNode.remove(); document.body.style.filter = '';" 
                    style="background: #00D4FF; color: #0B0D17; border: none; padding: 10px 20px; margin-top: 1rem; cursor: pointer; font-weight: bold;">
                EXIT MATRIX
            </button>
        `;
        document.body.appendChild(hackMessage);
    }

    showSecretMessage() {
        alert('🤖 Luis Alberto says: "The future belongs to those who code it!" 🚀');
    }
}

// Initialize technical effects
document.addEventListener('DOMContentLoaded', () => {
    new TechnicalEffects();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TechnicalEffects };
}
