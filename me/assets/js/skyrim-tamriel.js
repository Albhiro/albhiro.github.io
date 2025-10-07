// ===================================
// SKYRIM TAMRIEL WORLD JAVASCRIPT
// Habilidades & Experiencia Portfolio
// ===================================

class TamrielWorld {
    constructor() {
        this.isLoaded = false;
        this.currentTooltip = null;
        this.characterData = {};
        this.skillTrees = {};
        this.achievements = [];
        this.dragonShouts = [];
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.initializeNorthernLights();
        this.initializeSnowEffect();
        this.loadCharacterData();
        this.setupConstellations();
        this.initializeSkillTrees();
        this.setupTimeline();
        this.updateDigitalClock();
        
        // Hide loading after 4 seconds
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 4000);
    }

    showLoadingScreen() {
        const loadingOverlay = document.getElementById('tamrielLoading');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
            loadingOverlay.style.display = 'flex';
            loadingOverlay.style.opacity = '1';
        }
    }

    hideLoadingScreen() {
        const loadingOverlay = document.getElementById('tamrielLoading');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                loadingOverlay.classList.add('hidden');
                this.isLoaded = true;
                this.startAmbientEffects();
            }, 500);
        }
    }

    setupEventListeners() {
        // Portal return button
        const portalReturn = document.getElementById('portalReturn');
        if (portalReturn) {
            portalReturn.addEventListener('click', () => {
                this.returnToPortal();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
            if (e.key === 's' || e.key === 'S') {
                this.openSkillMenu();
            }
            if (e.key === 'c' || e.key === 'C') {
                this.openCharacterSheet();
            }
            if (e.key === 't' || e.key === 'T') {
                this.focusOnTimeline();
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.adjustLayout();
        });
    }

    initializeNorthernLights() {
        const northernLights = document.querySelector('.northern-lights');
        if (!northernLights) return;

        // Create multiple aurora layers
        for (let i = 0; i < 3; i++) {
            const aurora = document.createElement('div');
            aurora.className = 'aurora';
            aurora.style.animationDelay = `${i * 7}s`;
            aurora.style.opacity = 0.3 + (i * 0.1);
            aurora.style.animationDuration = `${20 + (i * 5)}s`;
            northernLights.appendChild(aurora);
        }
    }

    initializeSnowEffect() {
        const snowContainer = document.querySelector('.snow-effect');
        if (!snowContainer) return;

        // Create snowflakes
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createSnowflake();
            }, i * 100);
        }

        // Continuous snowfall
        setInterval(() => {
            this.createSnowflake();
        }, 2000);
    }

    createSnowflake() {
        const snowContainer = document.querySelector('.snow-effect');
        if (!snowContainer) return;

        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        
        // Random properties
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 2 + 's';
        
        snowContainer.appendChild(snowflake);
        
        // Remove snowflake after animation
        setTimeout(() => {
            if (snowflake.parentNode) {
                snowflake.parentNode.removeChild(snowflake);
            }
        }, 5000);
    }

    loadCharacterData() {
        this.characterData = {
            name: 'Luis Alberto el Arquitecto',
            class: 'Tech Wizard',
            level: 16,
            guild: 'Santander Corporation',
            location: 'Tamriel Corporativo',
            
            primaryStats: {
                programming: { level: 85, experience: 2100, maxExp: 2500 },
                automation: { level: 95, experience: 2300, maxExp: 2500 },
                leadership: { level: 78, experience: 1950, maxExp: 2500 },
                analysis: { level: 90, experience: 2250, maxExp: 2500 },
                innovation: { level: 72, experience: 1800, maxExp: 2500 },
                communication: { level: 88, experience: 2200, maxExp: 2500 }
            }
        };

        this.skillTrees = {
            destruction: {
                name: 'Destrucción de Procesos',
                icon: '🔥',
                mastery: 'Maestro del Caos Controlado',
                skills: [
                    { name: 'VBA', icon: '⚡', unlocked: true, level: 'Experto' },
                    { name: 'Python', icon: '🐍', unlocked: true, level: 'Avanzado' },
                    { name: 'SQL', icon: '💥', unlocked: true, level: 'Maestro' },
                    { name: 'PowerShell', icon: '🌟', unlocked: true, level: 'Intermedio' },
                    { name: 'JavaScript', icon: '⭐', unlocked: false, level: 'Aprendiz' },
                    { name: 'C#', icon: '🔮', unlocked: false, level: 'Novato' }
                ]
            },
            restoration: {
                name: 'Restauración de Datos',
                icon: '💚',
                mastery: 'Sanador de Información',
                skills: [
                    { name: 'Power BI', icon: '📊', unlocked: true, level: 'Maestro' },
                    { name: 'Excel', icon: '📈', unlocked: true, level: 'Leyenda' },
                    { name: 'Power Query', icon: '🔄', unlocked: true, level: 'Experto' },
                    { name: 'DAX', icon: '🧮', unlocked: true, level: 'Avanzado' },
                    { name: 'Tableau', icon: '📉', unlocked: false, level: 'Novato' },
                    { name: 'Qlik', icon: '🎯', unlocked: false, level: 'Novato' }
                ]
            },
            illusion: {
                name: 'Ilusión Tecnológica',
                icon: '🔮',
                mastery: 'Maestro de la Automatización',
                skills: [
                    { name: 'RPA', icon: '🤖', unlocked: true, level: 'Experto' },
                    { name: 'Selenium', icon: '🕷️', unlocked: true, level: 'Avanzado' },
                    { name: 'Power Automate', icon: '⚙️', unlocked: true, level: 'Intermedio' },
                    { name: 'Azure Logic Apps', icon: '☁️', unlocked: false, level: 'Aprendiz' },
                    { name: 'AI Integration', icon: '🧠', unlocked: false, level: 'Novato' },
                    { name: 'Machine Learning', icon: '🎲', unlocked: false, level: 'Novato' }
                ]
            },
            conjuration: {
                name: 'Conjuración de Soluciones',
                icon: '🌀',
                mastery: 'Invocador de Arquitecturas',
                skills: [
                    { name: 'Azure', icon: '☁️', unlocked: true, level: 'Intermedio' },
                    { name: 'SQL Server', icon: '🏛️', unlocked: true, level: 'Experto' },
                    { name: 'SharePoint', icon: '🔗', unlocked: true, level: 'Avanzado' },
                    { name: 'Docker', icon: '📦', unlocked: false, level: 'Aprendiz' },
                    { name: 'Kubernetes', icon: '⚓', unlocked: false, level: 'Novato' },
                    { name: 'Microservices', icon: '🔧', unlocked: false, level: 'Novato' }
                ]
            }
        };

        this.experienceTimeline = [
            {
                year: '2008',
                title: 'El Despertar del Dragonborn',
                description: 'Ingreso a Santander como Analista Junior. Primer contacto con VBA y el mundo de la automatización.',
                type: 'career'
            },
            {
                year: '2010',
                title: 'La Forja de las Primeras Runas',
                description: 'Dominio de Excel avanzado y desarrollo de los primeros macros complejos.',
                type: 'skill'
            },
            {
                year: '2012',
                title: 'Ascensión a Thane de los Datos',
                description: 'Promoción a Analista Senior. Especialización en análisis de datos financieros.',
                type: 'career'
            },
            {
                year: '2015',
                title: 'El Descubrimiento de Power BI',
                description: 'Introducción a Business Intelligence. Creación de los primeros dashboards interactivos.',
                type: 'skill'
            },
            {
                year: '2018',
                title: 'Liderazgo de la Hermandad',
                description: 'Promoción a Team Leader. Gestión de equipos y proyectos estratégicos.',
                type: 'career'
            },
            {
                year: '2020',
                title: 'La Gran Migración a la Nube',
                description: 'Migración de sistemas locales a Azure. Arquitectura de soluciones en la nube.',
                type: 'project'
            },
            {
                year: '2022',
                title: 'Maestría en Arquitectura Dracónica',
                description: 'Promoción a Arquitecto de Soluciones. Diseño de arquitecturas empresariales.',
                type: 'career'
            },
            {
                year: '2024',
                title: 'La Profecía del Multiverso',
                description: 'Desarrollo de este portfolio multiversal. Integración de todas las habilidades.',
                type: 'project'
            }
        ];

        this.dragonShouts = [
            {
                name: 'FUS RO DAH',
                words: 'FORCE BALANCE PUSH',
                effect: 'Elimina procesos manuales ineficientes con automatización poderosa',
                unlocked: true
            },
            {
                name: 'YOL TOOR SHUL',
                words: 'FIRE SUN POWER',
                effect: 'Ilumina datos oscuros con dashboards brillantes de Power BI',
                unlocked: true
            },
            {
                name: 'TIID KLO UL',
                words: 'TIME SAND ETERNITY',
                effect: 'Acelera procesos que normalmente tomarían eternidad',
                unlocked: true
            },
            {
                name: 'ZUL MEY GUT',
                words: 'VOICE COME WITHIN',
                effect: 'Invoca soluciones desde la experiencia interna acumulada',
                unlocked: false
            }
        ];

        this.updateCharacterDisplay();
        this.updateSkillProgress();
    }

    setupConstellations() {
        document.querySelectorAll('.constellation').forEach(constellation => {
            constellation.addEventListener('click', (e) => {
                const constellationName = constellation.querySelector('.constellation-name').textContent;
                this.openConstellationDetails(constellationName.toLowerCase().replace(' ', '-'));
            });

            constellation.addEventListener('mouseenter', (e) => {
                this.addConstellationGlow(constellation);
            });

            constellation.addEventListener('mouseleave', (e) => {
                this.removeConstellationGlow(constellation);
            });
        });
    }

    initializeSkillTrees() {
        document.querySelectorAll('.skill-node').forEach(node => {
            node.addEventListener('click', (e) => {
                const skillName = node.querySelector('.skill-name')?.textContent || node.textContent.trim();
                const proficiencyElement = node.querySelector('.skill-proficiency');
                const proficiency = proficiencyElement ? proficiencyElement.textContent : '';
                const starsElement = node.querySelector('.skill-stars');
                const stars = starsElement ? starsElement.textContent : '';
                
                this.showSkillDetails(skillName, proficiency, stars);
            });

            node.addEventListener('mouseenter', (e) => {
                this.showSkillTooltip(e, node);
            });

            node.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });

        // Animate skill node unlocking
        this.animateSkillUnlocking();
    }

    setupTimeline() {
        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.showTimelineDetails(index);
            });

            // Animate timeline items on scroll
            this.observeTimelineItem(item);
        });
    }

    updateCharacterDisplay() {
        // Update primary stats
        Object.keys(this.characterData.primaryStats).forEach(statName => {
            const stat = this.characterData.primaryStats[statName];
            const progressBar = document.querySelector(`[data-stat="${statName}"] .stat-progress-bar`);
            const levelElement = document.querySelector(`[data-stat="${statName}"] .stat-level`);
            
            if (progressBar) {
                const percentage = (stat.experience / stat.maxExp) * 100;
                progressBar.style.width = `${percentage}%`;
            }
            
            if (levelElement) {
                levelElement.textContent = stat.level;
            }
        });

        // Update character info
        const nameElement = document.querySelector('.character-title');
        if (nameElement) nameElement.textContent = this.characterData.name;
        
        const classElement = document.querySelector('.character-class');
        if (classElement) classElement.textContent = this.characterData.class;
    }

    updateSkillProgress() {
        // Animate skill progress bars
        document.querySelectorAll('.stat-progress-bar').forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transition = 'width 2s ease-in-out';
                bar.style.width = bar.style.width || '0%';
            }, index * 200);
        });
    }

    animateSkillUnlocking() {
        document.querySelectorAll('.skill-node.unlocked').forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = 'skillUnlock 0.5s ease-in-out';
            }, index * 100);
        });
    }

    addConstellationGlow(constellation) {
        constellation.style.boxShadow = '0 0 30px rgba(255, 193, 7, 0.6)';
        constellation.style.transform = 'scale(1.02)';
    }

    removeConstellationGlow(constellation) {
        constellation.style.boxShadow = '';
        constellation.style.transform = '';
    }

    openConstellationDetails(constellationId) {
        const skillTree = this.skillTrees[constellationId];
        if (!skillTree) return;

        const skillsHtml = skillTree.skills.map(skill => `
            <div class="skill-detail ${skill.unlocked ? 'unlocked' : 'locked'}">
                <span class="skill-icon">${skill.icon}</span>
                <span class="skill-name">${skill.name}</span>
                <span class="skill-level">${skill.level}</span>
                ${skill.unlocked ? '<span class="skill-status">✓</span>' : '<span class="skill-status">🔒</span>'}
            </div>
        `).join('');

        this.showModal(`
            <div class="modal-title">${skillTree.icon} ${skillTree.name}</div>
            <div style="text-align: left; margin-top: 20px;">
                <p><strong>Maestría:</strong> ${skillTree.mastery}</p>
                
                <h4 style="margin: 20px 0 15px 0; color: #FFC107;">Habilidades Dominadas:</h4>
                <div class="skills-grid" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
                    ${skillsHtml}
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(26, 35, 126, 0.2); border-left: 4px solid #3F51B5; border-radius: 5px;">
                    <h4>Filosofía de la Constelación</h4>
                    <p>Cada estrella en esta constelación representa años de dedicación y práctica. 
                    La maestría se alcanza no solo dominando las herramientas, sino comprendiendo cuándo y cómo aplicarlas.</p>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button class="pixel-btn" onclick="tamrielWorld.closeModal()">
                        Continuar Entrenamiento
                    </button>
                </div>
            </div>
        `);
    }

    showSkillDetails(skillName, proficiency = '', stars = '') {
        // Find skill in all trees or use provided parameters
        let skillInfo = null;
        let treeName = '';
        
        if (this.skillTrees) {
            Object.keys(this.skillTrees).forEach(treeKey => {
                const tree = this.skillTrees[treeKey];
                const skill = tree.skills.find(s => s.name === skillName);
                if (skill) {
                    skillInfo = skill;
                    treeName = tree.name;
                }
            });
        }
        
        // If no skill found in trees, create basic info from parameters
        if (!skillInfo && skillName) {
            skillInfo = { 
                name: skillName,
                level: proficiency || 'Unknown',
                mastery: stars || ''
            };
        }
        
        if (!skillInfo) return;

        let description = '';
        let projects = [];
        
        switch(skillName) {
            case 'Python':
                description = 'Master of automation and data analysis. From simple scripts to complex AI systems.';
                projects = ['Financial data processing', 'Machine learning models', 'API integrations', 'Process automation'];
                break;
            case 'JavaScript':
                description = 'The language of the web. Creating interactive experiences and modern applications.';
                projects = ['Single-page applications', 'React components', 'Node.js backends', 'Real-time dashboards'];
                break;
            case 'C#':
                description = 'Enterprise-grade development with robust architecture and performance.';
                projects = ['Web APIs', 'Desktop applications', 'Database integrations', 'Enterprise solutions'];
                break;
            case 'SQL':
                description = 'Data mastery through structured queries and database optimization.';
                projects = ['Complex data analysis', 'Performance optimization', 'Data warehouse design', 'Reporting systems'];
                break;
            case 'Microservices':
                description = 'Distributed architecture patterns for scalable, maintainable systems.';
                projects = ['Service decomposition', 'API gateways', 'Container orchestration', 'Event-driven architecture'];
                break;
            case 'Cloud Architecture':
                description = 'Designing resilient, scalable cloud-native solutions.';
                projects = ['AWS deployments', 'Serverless architectures', 'Infrastructure as Code', 'Auto-scaling systems'];
                break;
            case 'Natural Language Processing':
                description = 'Teaching machines to understand and process human language.';
                projects = ['Text classification', 'Sentiment analysis', 'Language models', 'Conversational AI'];
                break;
            case 'TensorFlow':
                description = 'Deep learning framework for building intelligent systems.';
                projects = ['Neural networks', 'Computer vision', 'Predictive models', 'AI applications'];
                break;
            case 'Team Leadership':
                description = 'Guiding teams to success through collaboration and strategic vision.';
                projects = ['Agile transformation', 'Cross-functional teams', 'Mentoring programs', 'Strategic planning'];
                break;
            case 'Strategic Planning':
                description = 'Long-term vision and roadmap development for technology initiatives.';
                projects = ['Digital transformation', 'Technology roadmaps', 'Architecture decisions', 'Innovation strategies'];
                break;
            default:
                description = 'A valuable skill in the technology architect\'s arsenal.';
                projects = ['Various implementations', 'Successful projects', 'Continuous improvement'];
        }

        const displayProficiency = proficiency || skillInfo.level || 'Advanced';
        const displayStars = stars || skillInfo.mastery || '★★★★★';
        
        this.showModal(`
            <div class="modal-title">⭐ ${skillName}</div>
            <div style="text-align: left; margin-top: 20px;">
                <p><strong>Skill Tree:</strong> ${treeName || 'Professional Skills'}</p>
                <p><strong>Proficiency:</strong> ${displayProficiency} ${displayStars}</p>
                <p><strong>Status:</strong> ${skillInfo.unlocked !== false ? 'Mastered' : 'In Development'}</p>
                <p><strong>Description:</strong> ${description}</p>
                
                <h4 style="margin: 20px 0 10px 0; color: #FFC107;">Key Projects & Applications:</h4>
                <ul style="margin-left: 20px;">
                    ${projects.map(project => `<li>${project}</li>`).join('')}
                </ul>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button class="pixel-btn" onclick="tamrielWorld.closeModal()">
                        Close Skill Details
                    </button>
                </div>
            </div>
        `);
    }

    showTimelineDetails(index) {
        const event = this.experienceTimeline[index];
        if (!event) return;

        let typeIcon = '';
        let typeColor = '';
        
        switch(event.type) {
            case 'career':
                typeIcon = '👑';
                typeColor = '#FFC107';
                break;
            case 'skill':
                typeIcon = '⚔️';
                typeColor = '#4CAF50';
                break;
            case 'project':
                typeIcon = '🏰';
                typeColor = '#2196F3';
                break;
        }

        this.showModal(`
            <div class="modal-title">${typeIcon} ${event.title}</div>
            <div style="text-align: left; margin-top: 20px;">
                <p><strong>Año:</strong> ${event.year}</p>
                <p><strong>Tipo:</strong> <span style="color: ${typeColor}">${event.type.toUpperCase()}</span></p>
                <p><strong>Descripción:</strong> ${event.description}</p>
                
                <div style="margin-top: 20px; padding: 15px; background: rgba(26, 35, 126, 0.2); border-left: 4px solid ${typeColor}; border-radius: 5px;">
                    <h4>Impacto en la Aventura</h4>
                    <p>Este momento marcó un antes y un después en mi desarrollo profesional. 
                    Cada experiencia ha sido una pieza fundamental en la construcción del arquitecto de soluciones que soy hoy.</p>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button class="pixel-btn" onclick="tamrielWorld.closeModal()">
                        Continuar Leyenda
                    </button>
                </div>
            </div>
        `);
    }

    showSkillTooltip(event, node) {
        const skillName = node.querySelector('.skill-name').textContent;
        const isUnlocked = node.classList.contains('unlocked');
        
        this.showTooltip(event, `
            <strong>${skillName}</strong><br>
            Estado: ${isUnlocked ? '<span style="color: #4CAF50">Dominada</span>' : '<span style="color: #FF9800">En desarrollo</span>'}<br>
            Click para más detalles
        `);
    }

    showTooltip(event, content) {
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip show';
        tooltip.innerHTML = content;
        
        document.body.appendChild(tooltip);
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 10 + 'px';
        
        this.currentTooltip = tooltip;
    }

    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    }

    observeTimelineItem(item) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideIn 0.6s ease-out forwards';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    }

    updateDigitalClock() {
        const clockElement = document.getElementById('digitalClock');
        if (!clockElement) return;
        
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            clockElement.textContent = timeString;
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    showModal(content) {
        this.closeModal();
        
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.id = 'gameModal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" onclick="tamrielWorld.closeModal()">×</button>
                ${content}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('gameModal');
        if (modal) {
            modal.remove();
        }
    }

    openSkillMenu() {
        const skillTrees = document.querySelector('.skill-trees');
        if (skillTrees) {
            skillTrees.scrollIntoView({ behavior: 'smooth' });
        }
    }

    openCharacterSheet() {
        const characterSheet = document.querySelector('.character-sheet');
        if (characterSheet) {
            characterSheet.scrollIntoView({ behavior: 'smooth' });
        }
    }

    focusOnTimeline() {
        const timeline = document.querySelector('.experience-timeline');
        if (timeline) {
            timeline.scrollIntoView({ behavior: 'smooth' });
        }
    }

    adjustLayout() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Mobile adjustments
            document.querySelectorAll('.constellation').forEach(constellation => {
                constellation.style.padding = '20px';
            });
        } else {
            // Desktop reset
            document.querySelectorAll('.constellation').forEach(constellation => {
                constellation.style.padding = '';
            });
        }
    }

    returnToPortal() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = './index.html';
        }, 500);
    }

    startAmbientEffects() {
        // Start Nordic wind sound effect
        try {
            const ambientAudio = new Audio('./assets/audio/nordic-wind.mp3');
            ambientAudio.loop = true;
            ambientAudio.volume = 0.1;
            // ambientAudio.play(); // Commented out for autoplay policy
        } catch (e) {
            console.log('Audio not available');
        }

        // Start constellation twinkling effect
        this.startConstellationTwinkling();
    }

    startConstellationTwinkling() {
        document.querySelectorAll('.skill-node.unlocked').forEach(node => {
            setInterval(() => {
                const randomDelay = Math.random() * 3000 + 1000;
                setTimeout(() => {
                    node.style.animation = 'twinkle 0.5s ease-in-out';
                    setTimeout(() => {
                        node.style.animation = '';
                    }, 500);
                }, randomDelay);
            }, 5000);
        });
    }

    // Dragon Shout system
    performDragonShout(shoutName) {
        const shout = this.dragonShouts.find(s => s.name === shoutName);
        if (!shout || !shout.unlocked) return;

        this.showShoutEffect(shout);
        this.playSound('dragon-shout');
    }

    showShoutEffect(shout) {
        const shoutOverlay = document.createElement('div');
        shoutOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(211, 47, 47, 0.3), rgba(255, 193, 7, 0.3));
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            animation: shoutPulse 2s ease-in-out;
            pointer-events: none;
        `;
        
        shoutOverlay.innerHTML = `
            <div style="text-align: center; color: white; font-size: 48px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
                ${shout.words}
            </div>
        `;
        
        document.body.appendChild(shoutOverlay);
        
        setTimeout(() => {
            shoutOverlay.remove();
        }, 2000);
    }

    playSound(soundName) {
        try {
            const audio = new Audio(`./assets/audio/${soundName}.mp3`);
            audio.volume = 0.3;
            audio.play();
        } catch (e) {
            console.log('Sound not available:', soundName);
        }
    }
}

// Initialize Tamriel World when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tamrielWorld = new TamrielWorld();
});

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes skillUnlock {
        0% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
    }
    
    @keyframes slideIn {
        0% { transform: translateX(-50px); opacity: 0; }
        100% { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; transform: scale(1.1); }
    }
    
    @keyframes shoutPulse {
        0% { opacity: 0; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 0; transform: scale(1); }
    }
    
    .skill-detail {
        display: grid;
        grid-template-columns: 30px 1fr 80px 30px;
        gap: 10px;
        align-items: center;
        padding: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        margin-bottom: 5px;
    }
    
    .skill-detail.locked {
        opacity: 0.5;
    }
    
    .skill-detail .skill-icon {
        font-size: 18px;
    }
    
    .skill-detail .skill-level {
        font-size: 12px;
        color: #FFC107;
        font-weight: bold;
    }
    
    .skill-detail .skill-status {
        font-size: 16px;
    }
`;
document.head.appendChild(style);
