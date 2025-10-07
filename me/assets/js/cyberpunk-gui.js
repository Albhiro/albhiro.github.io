// ===============================================
// CYBERPUNK GUI MAIN CONTROLLER
// ALBHIRO.SYSTEM - Night City Portfolio
// ===============================================

class CyberpunkGUI {
    constructor() {
        this.currentDistrict = 'overview';
        this.isLoaded = false;
        this.audioEnabled = true;
        this.glitchTimer = null;
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        console.log('🌃 Initializing ALBHIRO.SYSTEM - Night City Portfolio');
        
        this.setupEventListeners();
        this.startLoadingSequence();
        this.initializeEffects();
        
        console.log('✅ Cyberpunk GUI initialized successfully');
    }

    // ==========================================
    // LOADING SEQUENCE
    // ==========================================

    startLoadingSequence() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainHUD = document.getElementById('mainHUD');
        const progressBar = document.getElementById('loadingProgress');
        const percentage = document.querySelector('.loading-percentage');
        
        let progress = 0;
        const loadingSteps = [
            { text: "Connecting to Night City...", progress: 25 },
            { text: "Loading neural implants...", progress: 50 },
            { text: "Synchronizing with corporate mainframe...", progress: 75 },
            { text: "Establishing encrypted connection...", progress: 100 }
        ];
        
        const progressInterval = setInterval(() => {
            if (progress < 100) {
                progress += Math.random() * 15 + 5;
                progress = Math.min(progress, 100);
                
                progressBar.style.width = progress + '%';
                percentage.textContent = Math.floor(progress) + '%';
                
                // Add glitch effect occasionally
                if (Math.random() < 0.1) {
                    this.triggerGlitchEffect();
                }
            } else {
                clearInterval(progressInterval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        mainHUD.classList.remove('hidden');
                        this.isLoaded = true;
                        this.playSound('systemReady');
                        this.initializeStats();
                    }, 1000);
                }, 500);
            }
        }, 100);
    }

    // ==========================================
    // EVENT LISTENERS
    // ==========================================

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const district = e.currentTarget.getAttribute('data-district');
                this.navigateToDistrict(district);
            });
            
            item.addEventListener('mouseenter', () => {
                this.playSound('hover');
                this.addHoverGlow(item);
            });
        });

        // Control buttons
        document.getElementById('audioToggle')?.addEventListener('click', () => {
            this.toggleAudio();
        });

        document.getElementById('fullscreenToggle')?.addEventListener('click', () => {
            this.toggleFullscreen();
        });

        document.getElementById('terminalToggle')?.addEventListener('click', () => {
            this.returnToTerminal();
        });

        // Quick actions
        document.getElementById('downloadCV')?.addEventListener('click', () => {
            this.downloadCV();
        });

        document.getElementById('viewProjects')?.addEventListener('click', () => {
            this.navigateToDistrict('projects');
        });

        document.getElementById('contactForm')?.addEventListener('click', () => {
            this.navigateToDistrict('contact');
        });

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // Random glitch effects
        setInterval(() => {
            if (Math.random() < 0.05 && this.isLoaded) {
                this.triggerGlitchEffect();
            }
        }, 5000);
    }

    // ==========================================
    // NAVIGATION SYSTEM
    // ==========================================

    navigateToDistrict(districtName) {
        if (this.currentDistrict === districtName) return;
        
        this.playSound('click');
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelector(`[data-district="${districtName}"]`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.district').forEach(district => {
            district.classList.remove('active');
            district.classList.add('hidden');
        });
        
        const targetDistrict = document.getElementById(districtName);
        if (targetDistrict) {
            targetDistrict.classList.remove('hidden');
            targetDistrict.classList.add('active');
        }
        
        this.currentDistrict = districtName;
        
        // Load district content if needed
        this.loadDistrictContent(districtName);
        
        console.log(`🏙️ Navigated to ${districtName} district`);
    }

    loadDistrictContent(districtName) {
        // This will load content dynamically based on the district
        switch(districtName) {
            case 'experience':
                this.loadExperienceContent();
                break;
            case 'skills':
                this.loadSkillsContent();
                break;
            case 'projects':
                this.loadProjectsContent();
                break;
            case 'research':
                this.loadResearchContent();
                break;
            case 'contact':
                this.loadContactContent();
                break;
        }
    }

    // ==========================================
    // CONTENT LOADERS
    // ==========================================

    loadExperienceContent() {
        const experienceDistrict = document.getElementById('experience');
        if (experienceDistrict.querySelector('.timeline-container')) return; // Already loaded
        
        const content = `
            <div class="timeline-container">
                <div class="timeline-item cyber-card">
                    <div class="timeline-year">2024-2025</div>
                    <div class="timeline-content">
                        <h3 class="text-glow-pink">🧠 AI Researcher (Proyecto Secreto)</h3>
                        <p>Desarrollo de motor conversacional con redes neuronales interconectadas, 
                        sistema de memoria multicapa y red social anti-viralismo.</p>
                        <div class="tech-tags">
                            <span class="tech-tag">Neural Networks</span>
                            <span class="tech-tag">NLP</span>
                            <span class="tech-tag">Memory Systems</span>
                        </div>
                    </div>
                </div>
                
                <div class="timeline-item cyber-card">
                    <div class="timeline-year">2023-2024</div>
                    <div class="timeline-content">
                        <h3 class="text-glow-cyan">🏗️ Technical Architect</h3>
                        <p>Arquitectura FastAPI + Angular19, migración Access→Python (130+ emails/día), 
                        despliegue en Openshift + Docker.</p>
                        <div class="tech-tags">
                            <span class="tech-tag">FastAPI</span>
                            <span class="tech-tag">Angular</span>
                            <span class="tech-tag">Docker</span>
                            <span class="tech-tag">Openshift</span>
                        </div>
                    </div>
                </div>
                
                <div class="timeline-item cyber-card">
                    <div class="timeline-year">2018-2023</div>
                    <div class="timeline-content">
                        <h3 class="text-glow-yellow">💻 Systems Developer</h3>
                        <p>Mantenimiento SSIS Portal, migración Django MVT, administración RHEL8, 
                        scripts DB2/Mainframe.</p>
                        <div class="tech-tags">
                            <span class="tech-tag">Python</span>
                            <span class="tech-tag">Django</span>
                            <span class="tech-tag">RHEL8</span>
                            <span class="tech-tag">DB2</span>
                        </div>
                    </div>
                </div>
                
                <div class="timeline-item cyber-card">
                    <div class="timeline-year">2009-2018</div>
                    <div class="timeline-content">
                        <h3 class="text-glow-green">📊 Data Analyst</h3>
                        <p>Informes mensuales Office Suite, automatización VBA, análisis datos 
                        proyecto/horas, dashboards Excel.</p>
                        <div class="tech-tags">
                            <span class="tech-tag">Excel</span>
                            <span class="tech-tag">VBA</span>
                            <span class="tech-tag">SQL</span>
                            <span class="tech-tag">Access</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        experienceDistrict.innerHTML += content;
        this.animateTimelineItems();
    }

    loadSkillsContent() {
        const skillsDistrict = document.getElementById('skills');
        if (skillsDistrict.querySelector('.skills-grid')) return; // Already loaded
        
        const content = `
            <div class="skills-grid">
                <div class="skill-category">
                    <h3 class="category-title text-glow-cyan">🖥️ BACKEND SYSTEMS</h3>
                    <div class="skills-list">
                        <div class="skill-item" data-level="95">
                            <span class="skill-name">Python</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 95%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="90">
                            <span class="skill-name">FastAPI</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="85">
                            <span class="skill-name">Django</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="80">
                            <span class="skill-name">Docker</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="skill-category">
                    <h3 class="category-title text-glow-pink">🎨 FRONTEND TECH</h3>
                    <div class="skills-list">
                        <div class="skill-item" data-level="88">
                            <span class="skill-name">Angular</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 88%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="85">
                            <span class="skill-name">JavaScript</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="90">
                            <span class="skill-name">HTML/CSS</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 90%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="75">
                            <span class="skill-name">TypeScript</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 75%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="skill-category">
                    <h3 class="category-title text-glow-yellow">🧠 AI & DATA</h3>
                    <div class="skills-list">
                        <div class="skill-item" data-level="82">
                            <span class="skill-name">Machine Learning</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 82%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="78">
                            <span class="skill-name">Neural Networks</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 78%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="85">
                            <span class="skill-name">Data Analysis</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="80">
                            <span class="skill-name">SQL Databases</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="skill-category">
                    <h3 class="category-title text-glow-green">☁️ DEVOPS & CLOUD</h3>
                    <div class="skills-list">
                        <div class="skill-item" data-level="75">
                            <span class="skill-name">OpenShift</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 75%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="70">
                            <span class="skill-name">Kubernetes</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 70%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="85">
                            <span class="skill-name">Linux (RHEL8)</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 85%"></div>
                            </div>
                        </div>
                        <div class="skill-item" data-level="80">
                            <span class="skill-name">CI/CD</span>
                            <div class="skill-bar">
                                <div class="skill-fill" style="width: 80%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        skillsDistrict.innerHTML += content;
        this.animateSkillBars();
    }

    // ==========================================
    // EFFECTS AND ANIMATIONS
    // ==========================================

    initializeEffects() {
        this.createMatrixRain();
        this.createParticles();
        this.startAmbientEffects();
    }

    initializeStats() {
        // Animate stat bars
        document.querySelectorAll('.stat-fill').forEach(bar => {
            const value = bar.getAttribute('data-value');
            setTimeout(() => {
                bar.style.width = '100%';
            }, Math.random() * 1000 + 500);
        });
    }

    createMatrixRain() {
        const canvas = document.getElementById('matrixRain');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        setInterval(draw, 35);
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 10px currentColor`;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 10 + 's';
            
            particlesContainer.appendChild(particle);
        }
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) translateX(0px); }
                25% { transform: translateY(-20px) translateX(10px); }
                50% { transform: translateY(-10px) translateX(-10px); }
                75% { transform: translateY(-30px) translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }

    triggerGlitchEffect() {
        const overlay = document.getElementById('glitchOverlay');
        if (!overlay) return;
        
        overlay.style.opacity = '1';
        setTimeout(() => {
            overlay.style.opacity = '0';
        }, 200);
        
        // Glitch some text elements
        document.querySelectorAll('.glitch').forEach(element => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = '';
            }, 10);
        });
    }

    addHoverGlow(element) {
        element.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.6)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 300);
    }

    animateTimelineItems() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        skillBars.forEach((bar, index) => {
            bar.style.width = '0%';
            setTimeout(() => {
                const level = bar.parentElement.parentElement.getAttribute('data-level');
                bar.style.width = level + '%';
            }, index * 100 + 500);
        });
    }

    startAmbientEffects() {
        // Periodic screen flickers
        setInterval(() => {
            if (Math.random() < 0.02) {
                document.body.style.filter = 'brightness(1.2) contrast(1.1)';
                setTimeout(() => {
                    document.body.style.filter = '';
                }, 100);
            }
        }, 1000);
    }

    // ==========================================
    // AUDIO SYSTEM
    // ==========================================

    playSound(soundName) {
        if (!this.audioEnabled) return;
        
        const sounds = {
            hover: () => {
                const audio = document.getElementById('hoverSound');
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(() => {}); // Ignore play errors
                }
            },
            click: () => {
                const audio = document.getElementById('clickSound');
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(() => {});
                }
            },
            systemReady: () => {
                console.log('🔊 System ready sound');
            }
        };
        
        if (sounds[soundName]) {
            sounds[soundName]();
        }
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        const audioBtn = document.getElementById('audioToggle');
        const icon = audioBtn.querySelector('i');
        
        if (this.audioEnabled) {
            icon.className = 'fas fa-volume-up';
            audioBtn.title = 'Disable Audio';
        } else {
            icon.className = 'fas fa-volume-mute';
            audioBtn.title = 'Enable Audio';
        }
        
        console.log(`🔊 Audio ${this.audioEnabled ? 'enabled' : 'disabled'}`);
    }

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {
                console.log('Fullscreen not supported');
            });
        } else {
            document.exitFullscreen();
        }
    }

    returnToTerminal() {
        console.log('🔄 Returning to portal...');
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = './index.html';
        }, 500);
    }

    downloadCV() {
        console.log('📄 Downloading neural profile...');
        const link = document.createElement('a');
        link.href = './docs/cv-albhiro.md';
        link.download = 'ALBHIRO_Neural_Profile_2025.md';
        link.click();
    }

    handleKeyboardShortcuts(e) {
        // ESC - Return to terminal
        if (e.key === 'Escape') {
            this.returnToTerminal();
        }
        
        // F11 - Toggle fullscreen
        if (e.key === 'F11') {
            e.preventDefault();
            this.toggleFullscreen();
        }
        
        // Number keys - Navigate to districts
        const districtKeys = {
            '1': 'overview',
            '2': 'experience', 
            '3': 'skills',
            '4': 'projects',
            '5': 'research',
            '6': 'contact'
        };
        
        if (districtKeys[e.key]) {
            this.navigateToDistrict(districtKeys[e.key]);
        }
    }
}

// Initialize the Cyberpunk GUI
window.cyberpunkGUI = new CyberpunkGUI();

console.log('🚀 ALBHIRO.SYSTEM - Night City Portfolio loaded');
console.log('⚡ Welcome to the future of digital portfolios');
console.log('🌃 Night City awaits your exploration...');
