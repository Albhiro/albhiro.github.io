// ===============================================
// CYBERPUNK TERMINAL SYSTEM - ALBHIRO.SYSTEM
// ===============================================

class CyberpunkTerminal {
    constructor() {
        this.currentUser = null;
        this.currentDirectory = '/home/albhiro';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isLoggedIn = false;
        this.bootComplete = false;
        
        // Sistema de archivos virtual
        this.filesystem = {
            '/': {
                type: 'directory',
                children: {
                    'home': {
                        type: 'directory',
                        children: {
                            'albhiro': {
                                type: 'directory',
                                children: {
                                    'README.md': {
                                        type: 'file',
                                        content: `# ALBHIRO.SYSTEM - Personal Portfolio Terminal
                                        
Welcome to my digital world!

This is my personal system where you can explore my:
- Professional experience (16 years at Santander)
- Technical projects and demos
- Research in AI and neural networks
- Skills and achievements

Available commands:
- ls: List directory contents
- cat <file>: Display file contents
- cd <directory>: Change directory
- whoami: Display current user
- ps: Show running processes
- startx / gui: Launch graphical interface
- clear: Clear terminal
- help: Show all commands
- exit: Logout

For GUI interface: startx
For interactive portfolio: gui
For AI chat: ai
For dashboard: monitor

Enjoy exploring my digital mind!`
                                    },
                                    'experience.txt': {
                                        type: 'file',
                                        content: `PROFESSIONAL EXPERIENCE - Luis Alberto Oraa García

🏢 SANTANDER DIGITAL SERVICES (2009 - Present)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 Data Analyst (2009-2018)
   • Excel/VBA automation and analysis
   • Monthly reporting and dashboards
   • Project/hours data analysis
   • 130+ daily automated emails

💻 Systems Developer (2018-2023)
   • SSIS Portal maintenance
   • Django MVT migration
   • RHEL8 administration
   • DB2/Mainframe scripting

🏗️ Technical Architect (2023-Present)
   • FastAPI + Angular19 architecture
   • Access→Python migration (130+ emails/day)
   • Openshift + Docker deployment
   • Full-stack development leadership

🧠 AI Researcher (2024-Present) [SECRET PROJECT]
   • Conversational engine with interconnected neural networks
   • 6-layer memory system
   • Spanish NLP processing
   • Anti-viralism social network

TOTAL EXPERIENCE: 16 years of continuous growth
IMPACT: Automated 130+ daily processes, led digital transformation`
                                    },
                                    'projects': {
                                        type: 'directory',
                                        children: {
                                            'fastapi-dashboard': {
                                                type: 'directory',
                                                children: {
                                                    'README.md': {
                                                        type: 'file',
                                                        content: 'FastAPI Dashboard - Modern web application for data visualization and management.'
                                                    }
                                                }
                                            },
                                            'email-automation': {
                                                type: 'directory',
                                                children: {
                                                    'demo.py': {
                                                        type: 'file',
                                                        content: '# Email Automation Demo\n# Processes 130+ emails daily automatically'
                                                    }
                                                }
                                            },
                                            'neural-network': {
                                                type: 'directory',
                                                children: {
                                                    'brain.py': {
                                                        type: 'file',
                                                        content: '# AI Conversational Engine\n# 6-layer memory system\n# Spanish NLP processing'
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    'skills.json': {
                                        type: 'file',
                                        content: `{
  "programming": {
    "python": 95,
    "javascript": 88,
    "sql": 92,
    "html_css": 85
  },
  "frameworks": {
    "fastapi": 90,
    "angular": 87,
    "django": 85,
    "flask": 80
  },
  "tools": {
    "docker": 88,
    "openshift": 85,
    "git": 90,
    "linux": 87
  },
  "databases": {
    "postgresql": 88,
    "db2": 85,
    "sqlite": 90
  },
  "ai_ml": {
    "neural_networks": 85,
    "nlp": 88,
    "machine_learning": 82
  },
  "years_experience": 16,
  "projects_completed": 25,
  "daily_automation": 130
}`
                                    },
                                    'contact.txt': {
                                        type: 'file',
                                        content: `CONTACT INFORMATION - Luis Alberto Oraa García

📧 Email: luaoraa@gmail.com
🏢 Company: Santander Digital Services
📍 Location: Madrid, Spain
💼 Position: Technical Architect & AI Researcher
🔗 LinkedIn: [Available on request]
🐙 GitHub: https://github.com/Albhiro

📱 SOCIAL LINKS:
   • LinkedIn: Professional network and updates
   • GitHub: Open source projects and code samples
   • Email: Direct professional communication

🕐 AVAILABILITY:
   • Monday-Friday: 9:00-18:00 CET
   • Response time: Within 24 hours
   • Preferred contact: Email or LinkedIn

🤝 COLLABORATION:
   • Open to technical discussions
   • Available for consulting projects
   • Interested in AI/ML collaborations
   • Always learning and sharing knowledge`
                                    }
                                }
                            }
                        }
                    },
                    'var': {
                        type: 'directory',
                        children: {
                            'log': {
                                type: 'directory',
                                children: {
                                    'system.log': {
                                        type: 'file',
                                        content: 'System log entries...'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        
        // Comandos disponibles
        this.commands = {
            help: this.showHelp.bind(this),
            ls: this.listDirectory.bind(this),
            cd: this.changeDirectory.bind(this),
            cat: this.displayFile.bind(this),
            pwd: this.printWorkingDirectory.bind(this),
            whoami: this.whoAmI.bind(this),
            clear: this.clearTerminal.bind(this),
            ps: this.showProcesses.bind(this),
            top: this.showSystemMonitor.bind(this),
            startx: this.startGUI.bind(this),
            gui: this.startGUI.bind(this),
            ai: this.startAI.bind(this),
            chat: this.startAI.bind(this),
            monitor: this.showDashboard.bind(this),
            dashboard: this.showDashboard.bind(this),
            neofetch: this.showSystemInfo.bind(this),
            tree: this.showDirectoryTree.bind(this),
            history: this.showHistory.bind(this),
            exit: this.logout.bind(this),
            logout: this.logout.bind(this),
            reboot: this.reboot.bind(this),
            shutdown: this.shutdown.bind(this)
        };
        
        this.initialize();
    }

    initialize() {
        console.log('🔥 Initializing ALBHIRO.SYSTEM Terminal...');
        
        // Referencias DOM
        this.terminalContent = document.getElementById('terminalContent');
        this.bootSequence = document.getElementById('bootSequence');
        this.loginPrompt = document.getElementById('loginPrompt');
        this.mainTerminal = document.getElementById('mainTerminal');
        this.terminalOutput = document.getElementById('terminalOutput');
        this.commandInput = document.getElementById('commandInput');
        this.systemStats = document.getElementById('systemStats');
        
        // Iniciar secuencia de boot
        this.startBootSequence();
        
        // Event listeners
        this.setupEventListeners();
        this.setupControlButtons();
    }

    startBootSequence() {
        // Esperar a que termine la animación de boot
        setTimeout(() => {
            this.bootComplete = true;
            this.showLoginPrompt();
        }, 4000);
    }

    showLoginPrompt() {
        this.bootSequence.classList.add('hidden');
        this.loginPrompt.classList.remove('hidden');
        
        // Auto-login después de 2 segundos
        setTimeout(() => {
            this.performLogin();
        }, 2000);
    }

    performLogin() {
        this.loginPrompt.classList.add('hidden');
        this.mainTerminal.classList.remove('hidden');
        this.systemStats.classList.remove('hidden');
        
        this.currentUser = 'albhiro';
        this.isLoggedIn = true;
        
        // Focus en input
        this.commandInput.focus();
        
        // Mensaje de bienvenida
        this.addOutput('Login successful. Welcome to LUIS.SYSTEM!', 'success-text');
        this.addOutput('Type "help" for available commands or "startx" for GUI interface.', 'info-text');
    }

    setupEventListeners() {
        // Enter para ejecutar comandos
        this.commandInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory(1);
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete();
            }
        });

        // Mantener focus en input
        document.addEventListener('click', () => {
            if (this.isLoggedIn) {
                this.commandInput.focus();
            }
        });
    }

    executeCommand() {
        const command = this.commandInput.value.trim();
        if (!command) return;
        
        // Mostrar comando ejecutado
        this.addOutput(`luis@santander:~$ ${command}`, 'prompt');
        
        // Agregar a historial
        this.commandHistory.push(command);
        this.historyIndex = -1;
        
        // Parsear comando
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        // Ejecutar comando
        if (this.commands[cmd]) {
            this.commands[cmd](args);
        } else {
            this.addOutput(`bash: ${cmd}: command not found`, 'error-text');
            this.addOutput('Type "help" for available commands.', 'info-text');
        }
        
        // Limpiar input
        this.commandInput.value = '';
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    addOutput(text, className = '') {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.textContent = text;
        this.terminalOutput.appendChild(line);
    }

    addHTMLOutput(html, className = '') {
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.innerHTML = html;
        this.terminalOutput.appendChild(line);
    }

    scrollToBottom() {
        this.terminalContent.scrollTop = this.terminalContent.scrollHeight;
    }

    navigateHistory(direction) {
        if (this.commandHistory.length === 0) return;
        
        if (direction === -1) {
            if (this.historyIndex === -1) {
                this.historyIndex = this.commandHistory.length - 1;
            } else if (this.historyIndex > 0) {
                this.historyIndex--;
            }
        } else {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
            } else {
                this.historyIndex = -1;
                this.commandInput.value = '';
                return;
            }
        }
        
        this.commandInput.value = this.commandHistory[this.historyIndex];
    }

    // ==========================================
    // COMANDOS DEL TERMINAL
    // ==========================================

    showHelp() {
        const helpText = `
LUIS.SYSTEM v2.025 - Available Commands

📁 FILE SYSTEM:
   ls [path]         - List directory contents
   cd <directory>    - Change directory  
   cat <file>        - Display file contents
   pwd               - Print working directory
   tree              - Show directory structure

👤 SYSTEM:
   whoami            - Display current user
   ps                - Show running processes
   top               - System monitor
   neofetch          - System information
   history           - Command history

🎮 INTERFACES:
   startx / gui      - Launch graphical portfolio
   ai / chat         - Start AI conversation
   monitor           - System dashboard
   
🔧 UTILITIES:
   clear             - Clear terminal
   help              - Show this help
   exit / logout     - Logout
   reboot            - Restart system
   shutdown          - Power off

💡 TIPS:
   • Use Tab for auto-completion
   • Use ↑↓ arrows for command history
   • Type 'startx' to access the full portfolio GUI
   • Type 'ai' to chat with my AI system
        `;
        
        this.addOutput(helpText.trim(), 'info-text');
    }

    showSystemInfo() {
        const sysInfo = `
                    ..                    luis@santander-workstation
                 .PLTJ.                   ------------------------------
                <><><><>                  OS: LUIS.SYSTEM v2.025 Neural Architecture
       KKSSV' 4KKK LJ KKKL.'VSSKK        Host: Santander Digital Services
       KKV' 4KKKKK LJ KKKKAL 'VKK        Kernel: Neural-6.2.0-experience
       V' ' 'VKKKK LJ KKKKV' ' 'V         Uptime: 16 years, 247 days
       .4MA.' 'VKK LJ KKV' '.4Mb.         Packages: 25 (projects)
     . KKKKKA.' 'V LJ V' '.4KKKKK .       Shell: luis-bash v5.1.16
   .4D KKKKKKKA.'' LJ ''.4KKKKKKK FA.     Resolution: 1920x1080
  <QDD ++++++++++++  ++++++++++++ GFD>   DE: CustomX11 (Portfolio GUI)
   'VD KKKKKKKK'..'' ''.4KKKKKKK FV       WM: PortfolioManager
     ' VKKKKK'. .4 .4. .'KKKKKV '         Terminal: luis-terminal
        'VK'. .4KK LJ KKA. .'KV'          CPU: Brain i9-Experience (16Y) @ 5.0GHz
     A. . .4KKKK LJ KKKKA. . .4           GPU: Neural Processing Unit v2025
     KKA. 'KKKKK LJ KKKKK' .4KK           Memory: 130+ projects loaded
     KKKKA. 'VKK LJ KKV' .4KKKK           Disk (/): ∞B / ∞B (experience)
     KKKKKA. 'VK LJ KV' .4KKKKK           
     KKKKKKA. 'V LJ V' .4KKKKKK           ████████████████████████ Neural Activity
        `;
        
        this.addOutput(sysInfo.trim(), 'neon-cyan');
    }

    listDirectory(args) {
        const path = args[0] || this.currentDirectory;
        const dir = this.getDirectoryContents(path);
        
        if (!dir) {
            this.addOutput(`ls: cannot access '${path}': No such file or directory`, 'error-text');
            return;
        }
        
        if (dir.type !== 'directory') {
            this.addOutput(`ls: ${path}: Not a directory`, 'error-text');
            return;
        }
        
        const contents = Object.keys(dir.children);
        if (contents.length === 0) {
            this.addOutput('Directory is empty');
            return;
        }
        
        contents.forEach(name => {
            const item = dir.children[name];
            const color = item.type === 'directory' ? 'neon-cyan' : 'text-primary';
            const icon = item.type === 'directory' ? '📁' : '📄';
            this.addHTMLOutput(`<span class="${color}">${icon} ${name}</span>`);
        });
    }

    changeDirectory(args) {
        if (args.length === 0) {
            this.currentDirectory = '/home/albhiro';
            return;
        }
        
        let newPath = args[0];
        if (!newPath.startsWith('/')) {
            newPath = this.resolvePath(this.currentDirectory, newPath);
        }
        
        const dir = this.getDirectoryContents(newPath);
        if (!dir || dir.type !== 'directory') {
            this.addOutput(`cd: ${args[0]}: No such file or directory`, 'error-text');
            return;
        }
        
        this.currentDirectory = newPath;
        this.updatePrompt();
    }

    displayFile(args) {
        if (args.length === 0) {
            this.addOutput('cat: missing file operand', 'error-text');
            return;
        }
        
        let filePath = args[0];
        if (!filePath.startsWith('/')) {
            filePath = this.resolvePath(this.currentDirectory, filePath);
        }
        
        const file = this.getDirectoryContents(filePath);
        if (!file) {
            this.addOutput(`cat: ${args[0]}: No such file or directory`, 'error-text');
            return;
        }
        
        if (file.type !== 'file') {
            this.addOutput(`cat: ${args[0]}: Is a directory`, 'error-text');
            return;
        }
        
        this.addOutput(file.content);
    }

    printWorkingDirectory() {
        this.addOutput(this.currentDirectory, 'neon-green');
    }

    whoAmI() {
        this.addOutput('luis', 'neon-green');
        this.addOutput('Luis Alberto Oraa García - Technical Architect', 'info-text');
        this.addOutput('16 years at Santander Digital Services', 'text-secondary');
    }

    clearTerminal() {
        this.terminalOutput.innerHTML = '';
    }

    showProcesses() {
        const processes = `
  PID TTY          TIME CMD
    1 ?        00:00:01 systemd
   42 ?        00:16:47 neural-engine
  130 ?        00:24:18 email-automation
  255 ?        00:08:32 project-monitor
  512 ?        00:12:15 skill-tracker
  777 ?        00:03:45 portfolio-server
 1024 ?        00:01:23 ai-researcher
 2048 pts/0    00:00:00 luis-bash
 4096 pts/0    00:00:00 ps
        `;
        this.addOutput(processes.trim());
    }

    startGUI() {
        this.addOutput('🖥️  Initializing X11 server...', 'warning-text');
        this.addOutput('📦 Loading portfolio GUI components...', 'warning-text');
        this.addOutput('🪟 Starting window manager...', 'warning-text');
        this.addOutput('🎨 Rendering neural interface...', 'warning-text');
        
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 25;
            this.addOutput(`[${progress}%] Loading assets...`, 'neon-cyan');
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    this.addOutput('✅ GUI launched successfully!', 'success-text');
                    this.addOutput('🚀 Opening full portfolio interface...', 'success-text');
                    this.addOutput('', '');
                    this.addOutput('Redirecting to index.html in 2 seconds...', 'info-text');
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                }, 500);
            }
        }, 400);
    }

    startAI() {
        this.addOutput('� Initializing AI conversation system...', 'neon-purple');
        this.addOutput('🔗 Connecting to neural networks...', 'warning-text');
        this.addOutput('⚡ Loading 6-layer memory system...', 'warning-text');
        this.addOutput('🤖 Activating conversational engine...', 'warning-text');
        this.addOutput('🔄 Calibrating natural language processing...', 'warning-text');
        
        setTimeout(() => {
            this.addOutput('✅ AI system ONLINE!', 'success-text');
            this.addOutput('═══════════════════════════════════════', 'neon-purple');
            this.addOutput('🤖 [LUIS_AI]: ¡Hola! Soy el sistema de IA de Luis Alberto.', 'neon-purple');
            this.addOutput('', '');
            this.addOutput('💼 Puedo contarte sobre:', 'neon-cyan');
            this.addOutput('   • 16 años de experiencia en Santander', 'text-primary');
            this.addOutput('   • Proyectos de FastAPI + Angular', 'text-primary');
            this.addOutput('   • Investigación en redes neuronales', 'text-primary');
            this.addOutput('   • Automatización de 130+ emails/día', 'text-primary');
            this.addOutput('   • Arquitectura técnica y diseño', 'text-primary');
            this.addOutput('', '');
            this.addOutput('🎯 Pregúntame lo que quieras sobre Luis y su trabajo!', 'neon-green');
            this.addOutput('', '');
            this.addOutput('💡 Próximamente: Chat interactivo completo con GPT integration', 'info-text');
        }, 3000);
    }

    showDashboard() {
        this.addOutput('📊 LUIS.SYSTEM - Real-time Dashboard', 'neon-cyan');
        this.addOutput('═══════════════════════════════════════', 'neon-cyan');
        this.addOutput('', '');
        this.addOutput('🎯 Current Projects: 3 active, 22 completed', 'success-text');
        this.addOutput('📧 Email Automation: 130+ daily processes running', 'success-text');
        this.addOutput('🧠 Neural Network: Training in progress...', 'warning-text');
        this.addOutput('🔬 Research Status: 2 papers in development', 'info-text');
        this.addOutput('📈 System Performance: 94% efficiency', 'success-text');
        this.addOutput('', '');
        this.addOutput('Last update: ' + new Date().toLocaleString(), 'text-secondary');
    }

    // ==========================================
    // UTILIDADES
    // ==========================================

    getDirectoryContents(path) {
        const parts = path === '/' ? [''] : path.split('/').filter(p => p);
        let current = this.filesystem['/'];
        
        for (const part of parts) {
            if (!current.children || !current.children[part]) {
                return null;
            }
            current = current.children[part];
        }
        
        return current;
    }

    resolvePath(currentPath, relativePath) {
        if (relativePath === '..') {
            const parts = currentPath.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }
        
        if (currentPath === '/') {
            return '/' + relativePath;
        }
        
        return currentPath + '/' + relativePath;
    }

    updatePrompt() {
        const promptElement = document.querySelector('.prompt');
        if (promptElement) {
            const shortPath = this.currentDirectory.replace('/home/luis', '~');
            promptElement.textContent = `luis@santander:${shortPath}$`;
        }
    }

    showHistory() {
        this.commandHistory.forEach((cmd, index) => {
            this.addOutput(`${index + 1}  ${cmd}`);
        });
    }

    logout() {
        this.addOutput('Logging out...', 'warning-text');
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    reboot() {
        this.addOutput('System reboot initiated...', 'warning-text');
        setTimeout(() => {
            location.reload();
        }, 2000);
    }

    shutdown() {
        this.addOutput('System shutdown initiated...', 'error-text');
        setTimeout(() => {
            document.body.innerHTML = '<div style="background: black; color: #00ff00; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: monospace;">System halted.</div>';
        }, 2000);
    }

    showSystemMonitor() {
        const sysMonitor = `
📊 LUIS.SYSTEM - System Monitor
═══════════════════════════════════════

🖥️  SYSTEM RESOURCES:
   CPU Usage:     [████████░░] 82% (Neural Processing)
   Memory:        [██████████] 100% (Experience Loaded)
   Disk I/O:      [████░░░░░░] 45% (Knowledge Access)
   Network:       [███████░░░] 73% (Santander VPN)

🧠 NEURAL PROCESSES:
   PID    NAME                    CPU%   MEM%
   42     neural-engine          25.3   15.2
   130    email-automation       18.7   12.8
   255    project-monitor        12.1   08.4
   512    skill-tracker          09.8   06.7
   777    portfolio-server       08.2   05.3
   1024   ai-researcher          06.9   04.8

📈 PERFORMANCE METRICS:
   Uptime:               16 years, 247 days, 8 hours
   Projects Completed:   25/25 (100% success rate)
   Bugs Fixed:          1,337+ (daily average: 0.23)
   Coffee Consumed:     ∞ cups (fuel for innovation)
   Lines of Code:       250,000+ (and counting...)

🔄 SYSTEM STATUS: All systems operational
        `;
        
        this.addOutput(sysMonitor.trim(), 'info-text');
    }

    showDirectoryTree() {
        const tree = `
🌳 LUIS.SYSTEM - Directory Tree
═══════════════════════════════════════

/home/luis/
├── 📁 projects/
│   ├── 📁 fastapi-demos/
│   │   ├── 📄 email-automation.py
│   │   ├── 📄 portfolio-api.py
│   │   └── 📄 requirements.txt
│   ├── 📁 angular-portfolio/
│   │   ├── 📁 src/
│   │   ├── 📄 package.json
│   │   └── 📄 angular.json
│   └── 📁 neural-research/
│       ├── 📄 conversation-engine.py
│       ├── 📄 memory-layers.py  
│       └── 📄 anti-viral-social.py
├── 📁 experience/
│   ├── 📄 santander-16-years.md
│   ├── 📄 technical-architect.md
│   └── 📄 systems-developer.md
├── 📁 skills/
│   ├── 📄 python-fastapi.md
│   ├── 📄 angular-frontend.md
│   ├── 📄 docker-containers.md
│   └── 📄 ai-research.md
└── 📁 achievements/
    ├── 📄 email-automation-130-daily.md
    ├── 📄 portfolio-transformation.md
    └── 📄 continuous-learning.md

📊 Total: 4 directories, 16 files
🎯 All systems: OPERATIONAL
        `;
        
        this.addOutput(tree.trim(), 'neon-green');
    }

    // ==========================================
    // CONTROL BUTTONS FUNCTIONALITY
    // ==========================================

    setupControlButtons() {
        // Minimize button
        const minimizeBtn = document.getElementById('minimize-btn');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => this.minimizeTerminal());
        }

        // Maximize button (restore terminal)
        const maximizeBtn = document.getElementById('maximize-btn');
        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => this.maximizeTerminal());
        }

        // Restore terminal button (from game)
        const restoreBtn = document.getElementById('restore-terminal-btn');
        if (restoreBtn) {
            restoreBtn.addEventListener('click', () => this.maximizeTerminal());
        }

        // Close button
        const closeBtn = document.getElementById('close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeTerminal());
        }
    }

    minimizeTerminal() {
        const terminal = document.getElementById('terminal-container');
        const gameContainer = document.getElementById('retro-game-container');
        const maximizeBtn = document.getElementById('maximize-btn');
        
        // Hide terminal with animation
        terminal.classList.add('minimized');
        
        // Show maximize button
        if (maximizeBtn) {
            maximizeBtn.style.display = 'inline-block';
        }
        
        // Show retro game after animation
        setTimeout(() => {
            gameContainer.classList.remove('hidden');
            
            // Initialize and start the game
            if (window.retroGame) {
                window.retroGame.initialize();
                // Auto-start game after 1 second
                setTimeout(() => {
                    if (!window.retroGame.gameRunning) {
                        window.retroGame.start();
                    }
                }, 1000);
            }
        }, 500);
        
        console.log('🎮 Terminal minimized - Retro game activated');
    }

    maximizeTerminal() {
        const terminal = document.getElementById('terminal-container');
        const gameContainer = document.getElementById('retro-game-container');
        const maximizeBtn = document.getElementById('maximize-btn');
        
        // Hide game
        gameContainer.classList.add('hidden');
        
        // Stop game if running
        if (window.retroGame && window.retroGame.gameRunning) {
            window.retroGame.stop();
        }
        
        // Hide maximize button
        if (maximizeBtn) {
            maximizeBtn.style.display = 'none';
        }
        
        // Show terminal after animation
        setTimeout(() => {
            terminal.classList.remove('minimized');
            
            // Focus back on command input
            if (this.commandInput) {
                this.commandInput.focus();
            }
        }, 300);
        
        console.log('💻 Terminal restored - Back to command line');
    }

    closeTerminal() {
        const techSites = [
            'https://www.nature.com/subjects/computer-science',
            'https://www.technologyreview.com/',
            'https://techcrunch.com/',
            'https://www.wired.com/category/science/',
            'https://spectrum.ieee.org/',
            'https://www.sciencedaily.com/news/computers_math/',
            'https://arstechnica.com/',
            'https://www.newscientist.com/subject/technology/',
            'https://www.zdnet.com/',
            'https://venturebeat.com/'
        ];
        
        // Random tech site
        const randomSite = techSites[Math.floor(Math.random() * techSites.length)];
        
        this.addOutput('🌐 Cerrando terminal...', 'warning-text');
        this.addOutput('🔗 Abriendo portal tecnológico internacional...', 'neon-cyan');
        this.addOutput(`📰 Destino: ${randomSite}`, 'info-text');
        this.addOutput('', '');
        this.addOutput('¡Explora las últimas innovaciones tecnológicas!', 'success-text');
        
        setTimeout(() => {
            window.open(randomSite, '_blank');
            
            // Show closing animation
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="
                        background: linear-gradient(45deg, #000011, #001122);
                        color: #00ffff;
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        font-family: 'Fira Code', monospace;
                        text-align: center;
                    ">
                        <h1 style="font-size: 3rem; margin-bottom: 20px; text-shadow: 0 0 20px #00ffff;">
                            LUIS.SYSTEM
                        </h1>
                        <p style="font-size: 1.5rem; margin-bottom: 40px;">
                            Terminal cerrado - Explorando nuevas fronteras tecnológicas
                        </p>
                        <div style="font-size: 1rem; opacity: 0.7;">
                            Gracias por visitar mi mundo digital
                        </div>
                        <div style="margin-top: 40px;">
                            <a href="terminal.html" style="
                                color: #00ff00;
                                text-decoration: none;
                                padding: 10px 20px;
                                border: 1px solid #00ff00;
                                border-radius: 5px;
                                transition: all 0.3s ease;
                            ">🔄 Reiniciar Terminal</a>
                        </div>
                    </div>
                `;
            }, 2000);
        }, 2000);
        
        console.log('🌍 Terminal closed - Tech exploration activated');
    }
}

// Inicializar terminal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.luisTerminal = new CyberpunkTerminal();
    console.log('🚀 LUIS.SYSTEM Terminal initialized');
});
