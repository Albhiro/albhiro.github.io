// ===================================
// ZELDA HYRULE WORLD JAVASCRIPT
// Aventuras & Proyectos Portfolio
// ===================================

class HyruleWorld {
    constructor() {
        this.isLoaded = false;
        this.currentTooltip = null;
        this.inventory = [];
        this.quests = [];
        this.achievements = [];
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.initializeWindEffect();
        this.loadGameData();
        this.setupInteractiveMap();
        this.initializeInventory();
        this.setupTooltips();
        
        // Hide loading after 3 seconds
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 3000);
    }

    showLoadingScreen() {
        const loadingOverlay = document.getElementById('hyruleLoading');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
            loadingOverlay.style.opacity = '1';
            
            // Animate triforce
            const triforce = loadingOverlay.querySelector('.loading-triforce');
            if (triforce) {
                triforce.style.animation = 'spin 2s linear infinite';
            }
        }
    }

    hideLoadingScreen() {
        const loadingOverlay = document.getElementById('hyruleLoading');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                this.isLoaded = true;
                this.startGameSounds();
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
            if (e.key === 'i' || e.key === 'I') {
                this.toggleInventory();
            }
            if (e.key === 'm' || e.key === 'M') {
                this.focusOnMap();
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.adjustLayout();
        });

        // Modal close button
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }
    }

    initializeWindEffect() {
        const windContainer = document.querySelector('.wind-particles');
        if (!windContainer) return;

        // Initialize wind canvas
        this.initializeWindCanvas();

        // Create wind particles (reduced for better performance)
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createWindParticle();
            }, i * 300);
        }

        // Reduced wind particle creation for performance
        setInterval(() => {
            this.createWindParticle();
        }, 2000);

        // Initialize magic orbs
        this.initializeMagicOrbs();

        // Initialize grass field
        this.initializeGrassField();

        // Initialize mystical particles
        this.initializeMysticalParticles();
    }

    initializeWindCanvas() {
        const canvas = document.getElementById('windCanvas');
        if (!canvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const ctx = canvas.getContext('2d');
        this.windParticles = [];

        // Create wind particles for canvas
        for (let i = 0; i < 50; i++) {
            this.windParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                opacity: Math.random() * 0.5 + 0.2,
                size: Math.random() * 2 + 1
            });
        }

        this.animateWindCanvas(ctx, canvas);

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    animateWindCanvas(ctx, canvas) {
        // Limit animation to 30fps instead of 60fps for performance
        if (!this.lastCanvasUpdate) this.lastCanvasUpdate = 0;
        const now = Date.now();
        if (now - this.lastCanvasUpdate < 33) { // ~30fps
            requestAnimationFrame(() => this.animateWindCanvas(ctx, canvas));
            return;
        }
        this.lastCanvasUpdate = now;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.windParticles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
            
            // Add some sparkle lines
            ctx.beginPath();
            ctx.moveTo(particle.x - particle.size * 2, particle.y);
            ctx.lineTo(particle.x + particle.size * 2, particle.y);
            ctx.strokeStyle = `rgba(255, 215, 0, ${particle.opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });
        
        requestAnimationFrame(() => this.animateWindCanvas(ctx, canvas));
    }

    initializeMagicOrbs() {
        const magicOrbs = document.createElement('div');
        magicOrbs.className = 'magic-orbs';
        document.body.appendChild(magicOrbs);

        // Create floating orbs
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                this.createMagicOrb(magicOrbs);
            }, i * 1000);
        }

        // Reduced orb creation for performance
        setInterval(() => {
            this.createMagicOrb(magicOrbs);
        }, 8000);
    }

    createMagicOrb(container) {
        const orb = document.createElement('div');
        orb.className = 'magic-orb';
        orb.style.left = Math.random() * 100 + '%';
        orb.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(orb);
        
        // Remove orb after animation
        setTimeout(() => {
            if (orb.parentNode) {
                orb.parentNode.removeChild(orb);
            }
        }, 20000);
    }

    initializeGrassField() {
        const grassField = document.createElement('div');
        grassField.className = 'grass-field';
        document.body.appendChild(grassField);

        // Create grass blades
        for (let i = 0; i < 100; i++) {
            const blade = document.createElement('div');
            blade.className = 'grass-blade';
            blade.style.left = Math.random() * 100 + '%';
            blade.style.animationDelay = Math.random() * 3 + 's';
            grassField.appendChild(blade);
        }
    }

    initializeMysticalParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'mystical-particles';
        document.body.appendChild(particleContainer);

        // Create mystical particles (reduced for better performance)
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createMysticalParticle(particleContainer);
            }, i * 800);
        }

        // Reduced particle creation for performance
        setInterval(() => {
            this.createMysticalParticle(particleContainer);
        }, 6000);
    }

    createMysticalParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'mystical-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 6) + 's';
        
        // Random colors
        const colors = ['#FFD700', '#4CAF50', '#87CEEB', '#98FB98'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }

    createWindParticle() {
        const windContainer = document.querySelector('.wind-effects');
        if (!windContainer) return;

        const particle = document.createElement('div');
        particle.className = 'wind-particle';
        
        // Random position and properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 8) + 's';
        particle.style.opacity = Math.random() * 0.8 + 0.4;
        
        // Random particle size
        const size = Math.random() * 4 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        windContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 12000);
    }

    loadGameData() {
        // Portfolio específico de Luis Alberto - Proyectos Épicos
        this.projects = [
            {
                id: 'fastapi-migration',
                name: 'Santuario de la Velocidad',
                type: 'shrine',
                description: 'Migración completa del sistema legacy a FastAPI con incremento del 300% en velocidad de respuesta',
                technology: 'Python, FastAPI, Docker, PostgreSQL, Redis',
                status: 'completed',
                difficulty: 'Maestro', 
                reward: 'Orbe de la Velocidad Suprema',
                impact: 'Reducción de tiempo de respuesta de 2.5s a 0.8s',
                team: '4 desarrolladores + 1 QA'
            },
            {
                id: 'ai-engine',
                name: 'Santuario de la Sabiduría IA',
                type: 'shrine',
                description: 'Motor conversacional avanzado con IA para automatización de consultas bancarias',
                technology: 'Python, Transformers, OpenAI GPT-4, LangChain, RAG',
                status: 'in-progress',
                difficulty: 'Leyenda',
                reward: 'Cristal del Conocimiento Infinito',
                impact: 'Automatización del 85% de consultas rutinarias',
                team: '3 AI specialists + 2 backend devs'
            },
            {
                id: 'banking-automation',
                name: 'Santuario del Oro Digital',
                type: 'shrine',
                description: 'Automatización completa de procesos bancarios críticos y compliance',
                technology: 'C#, .NET Core, SQL Server, RPA, PowerBI',
                status: 'completed',
                difficulty: 'Experto',
                reward: 'Medallón del Compliance Dorado',
                impact: 'Ahorro de 240 horas/mes en procesos manuales',
                team: '5 developers + 2 business analysts'
            },
            {
                id: 'analytics-dashboard',
                name: 'Santuario de la Visión',
                type: 'shrine',
                description: 'Dashboard de analytics en tiempo real para decisiones ejecutivas',
                technology: 'React, D3.js, Node.js, Apache Kafka, InfluxDB',
                status: 'completed',
                difficulty: 'Maestro',
                reward: 'Lente de la Claridad Empresarial',
                impact: 'Visibilidad real-time de 50+ KPIs críticos',
                team: '3 frontend + 2 backend + 1 data engineer'
            },
            {
                id: 'cloud-platform',
                name: 'Santuario de las Nubes',
                type: 'shrine',
                description: 'Plataforma cloud empresarial con alta disponibilidad y escalabilidad',
                technology: 'Azure, Kubernetes, Terraform, Docker, DevOps',
                status: 'completed',
                difficulty: 'Leyenda',
                reward: 'Corona de las Nubes Infinitas',
                impact: '99.9% uptime, escalado automático 24/7',
                team: '6 cloud engineers + 2 DevOps specialists'
            },
            {
                id: 'microservices-arch',
                name: 'Santuario de la Arquitectura',
                type: 'shrine',
                description: 'Arquitectura de microservicios distribuida para sistemas críticos',
                technology: 'Spring Boot, Docker, API Gateway, Service Mesh',
                status: 'completed',
                difficulty: 'Maestro',
                reward: 'Planos del Arquitecto Supremo',
                impact: 'Modularización de monolito de 500K+ líneas',
                team: '8 developers + 3 architects'
            }
        ];

        this.towers = [
            {
                id: 'central-tower',
                name: 'Torre Central de Hyrule',
                description: 'Arquitecto Técnico Senior en Santander',
                year: '2024',
                achievement: 'Liderazgo técnico y visión estratégica',
                company: 'Santander',
                responsibilities: ['Diseño de arquitecturas enterprise', 'Liderazgo técnico de equipos', 'Estrategia de transformación digital'],
                technologies: ['Azure', 'Microservices', 'AI/ML', 'DevOps']
            },
            {
                id: 'north-tower',
                name: 'Torre del Conocimiento',
                description: 'AI Research Specialist - Innovation Lab',
                year: '2023',
                achievement: 'Especialización en Inteligencia Artificial',
                company: 'Innovation Lab',
                responsibilities: ['Investigación en IA conversacional', 'Desarrollo de modelos ML', 'Prototipado de soluciones innovadoras'],
                technologies: ['Python', 'TensorFlow', 'PyTorch', 'LangChain', 'OpenAI']
            },
            {
                id: 'west-tower',
                name: 'Torre del Liderazgo',
                description: 'Full Stack Lead Developer - Team Leadership',
                year: '2022',
                achievement: 'Liderazgo de equipos de desarrollo',
                company: 'Team Leadership',
                responsibilities: ['Gestión de equipos técnicos', 'Arquitectura de soluciones', 'Mentoring y formación'],
                technologies: ['React', 'Node.js', 'Python', 'Docker', 'Kubernetes']
            }
        ];

        this.questLog = [
            {
                title: 'La Leyenda del Analista Dorado',
                description: 'Convertirse en el mejor analista de datos de Hyrule',
                progress: 85,
                status: 'active'
            },
            {
                title: 'El Despertar de la Automatización',
                description: 'Automatizar todos los procesos manuales del reino',
                progress: 70,
                status: 'active'
            },
            {
                title: 'Los Cuatro Templos del Conocimiento',
                description: 'Dominar Power BI, Python, Azure y JavaScript',
                progress: 60,
                status: 'active'
            }
        ];
    }

    setupInteractiveMap() {
        // Setup shrine interactions
        document.querySelectorAll('.shrine').forEach(shrine => {
            shrine.addEventListener('click', (e) => {
                const projectId = shrine.getAttribute('data-project');
                this.openShrineDetails(projectId);
            });

            shrine.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, shrine);
            });

            shrine.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });

        // Setup tower interactions
        document.querySelectorAll('.tower').forEach(tower => {
            tower.addEventListener('click', (e) => {
                const locationId = tower.getAttribute('data-location');
                this.openTowerDetails(locationId);
            });

            tower.addEventListener('mouseenter', (e) => {
                this.showTooltip(e, tower);
            });

            tower.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });

        // Setup region interactions
        document.querySelectorAll('.map-region').forEach(region => {
            region.addEventListener('click', (e) => {
                this.exploreRegion(region);
            });
        });
    }

    showTooltip(event, element) {
        this.hideTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip show';
        
        let content = '';
        
        if (element.classList.contains('shrine')) {
            const shrineId = element.classList[1];
            const project = this.projects.find(p => p.id === shrineId);
            if (project) {
                content = `
                    <strong>${project.name}</strong><br>
                    ${project.description}<br>
                    <em>Tecnología: ${project.technology}</em><br>
                    <span style="color: #FFD700">Estado: ${project.status}</span>
                `;
            }
        } else if (element.classList.contains('tower')) {
            const towerId = element.classList[1];
            const tower = this.towers.find(t => t.id === towerId);
            if (tower) {
                content = `
                    <strong>${tower.name}</strong><br>
                    ${tower.description}<br>
                    <em>${tower.year} - ${tower.achievement}</em>
                `;
            }
        }
        
        tooltip.innerHTML = content;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
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

    openShrineDetails(shrineId) {
        const project = this.projects.find(p => p.id === shrineId);
        if (!project) return;

        this.showModal(`
            <div class="modal-title">🏛️ ${project.name}</div>
            <div style="text-align: left; margin-top: 20px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div>
                        <p><strong>🎯 Estado:</strong> <span style="color: ${project.status === 'completed' ? '#4CAF50' : '#FF9800'}">${project.status === 'completed' ? 'Completado' : 'En Progreso'}</span></p>
                        <p><strong>⚔️ Dificultad:</strong> ${project.difficulty}</p>
                        <p><strong>👥 Equipo:</strong> ${project.team || 'Solo'}</p>
                    </div>
                    <div>
                        <p><strong>🏆 Recompensa:</strong> ${project.reward}</p>
                        <p><strong>📈 Impacto:</strong> ${project.impact || 'Alto impacto técnico'}</p>
                    </div>
                </div>
                
                <div style="margin-bottom: 15px;">
                    <p><strong>📋 Descripción:</strong></p>
                    <p style="margin-left: 15px; font-style: italic;">${project.description}</p>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <p><strong>⚡ Stack Tecnológico:</strong></p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                        ${project.technology.split(', ').map(tech => 
                            `<span style="background: rgba(76, 175, 80, 0.2); padding: 4px 8px; border-radius: 12px; font-size: 0.8em; border: 1px solid #4CAF50;">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(76, 175, 80, 0.1)); border-left: 4px solid #FFD700; border-radius: 8px;">
                    <h4 style="color: #FFD700; margin-bottom: 10px;">🗡️ Logros del Santuario</h4>
                    <p>Este santuario representa uno de los proyectos más estratégicos de mi carrera. Cada desafío técnico superado ha fortalecido mis habilidades y contribuido al crecimiento del equipo y la organización.</p>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button class="pixel-btn" onclick="hyruleWorld.completeShrine('${shrineId}')" style="background: linear-gradient(45deg, #4CAF50, #45a049); color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        ${project.status === 'completed' ? '🏛️ Revisitar Santuario' : '⚔️ Completar Desafío'}
                    </button>
                </div>
            </div>
        `);
    }

    openTowerDetails(towerId) {
        const tower = this.towers.find(t => t.id === towerId);
        if (!tower) return;

        this.showModal(`
            <div class="modal-title">🗼 ${tower.name}</div>
            <div style="text-align: left; margin-top: 20px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                    <div>
                        <p><strong>📅 Año:</strong> ${tower.year}</p>
                        <p><strong>🏢 Empresa:</strong> ${tower.company}</p>
                        <p><strong>🎯 Posición:</strong> ${tower.description}</p>
                    </div>
                    <div>
                        <p><strong>🏆 Logro Principal:</strong></p>
                        <p style="margin-left: 15px; font-style: italic; color: #FFD700;">${tower.achievement}</p>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <p><strong>🚀 Responsabilidades Clave:</strong></p>
                    <ul style="margin-left: 20px; margin-top: 8px;">
                        ${tower.responsibilities.map(resp => `<li style="margin-bottom: 5px;">${resp}</li>`).join('')}
                    </ul>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <p><strong>⚡ Stack Tecnológico:</strong></p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                        ${tower.technologies.map(tech => 
                            `<span style="background: rgba(255, 215, 0, 0.2); padding: 4px 8px; border-radius: 12px; font-size: 0.8em; border: 1px solid #FFD700; color: #B8860B;">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.1)); border-left: 4px solid #FFD700; border-radius: 8px;">
                    <h4 style="color: #FFD700; margin-bottom: 10px;">👑 Significado del Hito</h4>
                    <p>Esta torre representa un pilar fundamental en mi evolución profesional. Cada conquista ha ampliado mi visión estratégica y fortalecido mi capacidad de liderazgo técnico, contribuyendo significativamente al crecimiento de los equipos y la transformación digital organizacional.</p>
                </div>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button class="pixel-btn" onclick="hyruleWorld.closeModal()" style="background: linear-gradient(45deg, #FFD700, #FFA500); color: #8B4513; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold;">
                        🗺️ Continuar Aventura
                    </button>
                </div>
            </div>
        `);
    }

    exploreRegion(region) {
        const regionName = region.textContent;
        const regionClass = region.className.split(' ')[1]; // Get second class
        
        let description = '';
        let projects = [];
        
        switch(regionClass) {
            case 'region-central':
                description = 'El corazón de Hyrule, donde comenzó toda la aventura profesional.';
                projects = ['Proyectos iniciales', 'Formación básica', 'Primeros desafíos'];
                break;
            case 'region-eldin':
                description = 'Región volcánica donde se forjaron las habilidades técnicas más ardientes.';
                projects = ['Automatización avanzada', 'Desarrollo VBA', 'Optimización de procesos'];
                break;
            case 'region-hebra':
                description = 'Tierras heladas donde se desarrolló la paciencia y precisión analítica.';
                projects = ['Análisis de datos', 'Reportes complejos', 'Business Intelligence'];
                break;
            case 'region-necluda':
                description = 'Región oriental rica en recursos de conocimiento tecnológico.';
                projects = ['Desarrollo web', 'Bases de datos', 'Integración de sistemas'];
                break;
            case 'region-faron':
                description = 'Selva exuberante donde crecieron las habilidades de liderazgo.';
                projects = ['Gestión de equipos', 'Proyectos estratégicos', 'Mentoring'];
                break;
            case 'region-gerudo':
                description = 'Desierto donde se conquistaron los desafíos más difíciles.';
                projects = ['Arquitectura de soluciones', 'Innovación tecnológica', 'Transformación digital'];
                break;
        }
        
        this.showModal(`
            <div class="modal-title">Región: ${regionName}</div>
            <div style="text-align: left; margin-top: 20px;">
                <p>${description}</p>
                
                <h4 style="margin-top: 20px; color: #4CAF50;">Proyectos Destacados:</h4>
                <ul style="margin-left: 20px; margin-top: 10px;">
                    ${projects.map(project => `<li>${project}</li>`).join('')}
                </ul>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button class="pixel-btn" onclick="hyruleWorld.closeModal()">
                        Explorar Más
                    </button>
                </div>
            </div>
        `);
    }

    initializeInventory() {
        // Initialize with some sample items
        this.inventory = [
            { id: 1, name: 'Espada Maestra VBA', icon: '⚔️', count: 1, type: 'weapon' },
            { id: 2, name: 'Escudo Power BI', icon: '🛡️', count: 1, type: 'shield' },
            { id: 3, name: 'Arco de SQL', icon: '🏹', count: 1, type: 'weapon' },
            { id: 4, name: 'Botas de Velocidad Python', icon: '👢', count: 1, type: 'armor' },
            { id: 5, name: 'Poción de Café Fuerte', icon: '🧪', count: 99, type: 'consumable' },
            { id: 6, name: 'Mapa de Azure', icon: '🗺️', count: 1, type: 'key' },
            { id: 7, name: 'Gema de JavaScript', icon: '💎', count: 3, type: 'material' },
            { id: 8, name: 'Pergamino de Documentación', icon: '📜', count: 15, type: 'consumable' }
        ];
        
        this.updateInventoryDisplay();
        this.updateQuestLog();
    }

    updateInventoryDisplay() {
        const slots = document.querySelectorAll('.inventory-slot');
        
        slots.forEach((slot, index) => {
            if (this.inventory[index]) {
                const item = this.inventory[index];
                slot.classList.add('filled');
                slot.innerHTML = `
                    <div class="inventory-item">${item.icon}</div>
                    ${item.count > 1 ? `<div class="item-count">${item.count}</div>` : ''}
                `;
                
                slot.addEventListener('click', () => {
                    this.showItemDetails(item);
                });
            } else {
                slot.classList.remove('filled');
                slot.innerHTML = '';
            }
        });
    }

    updateQuestLog() {
        const questList = document.querySelector('.quest-list');
        if (!questList) return;
        
        questList.innerHTML = this.questLog.map(quest => `
            <div class="quest-item">
                <div class="quest-title">${quest.title}</div>
                <div class="quest-description">${quest.description}</div>
                <div class="quest-progress">
                    <div class="quest-progress-bar" style="width: ${quest.progress}%"></div>
                </div>
            </div>
        `).join('');
    }

    showItemDetails(item) {
        let description = '';
        
        switch(item.name) {
            case 'Espada Maestra VBA':
                description = 'Arma legendaria forjada con años de experiencia en automatización. Capaz de cortar cualquier proceso manual.';
                break;
            case 'Escudo Power BI':
                description = 'Escudo mágico que protege contra la confusión de datos. Refleja cualquier pregunta con dashboards cristalinos.';
                break;
            case 'Arco de SQL':
                description = 'Arco élfico que nunca falla su objetivo. Sus flechas atraviesan las bases de datos más complejas.';
                break;
            case 'Poción de Café Fuerte':
                description = 'Poción mágica que restaura energía y concentración. Efecto: +100% productividad durante 4 horas.';
                break;
            default:
                description = 'Un objeto valioso en tu aventura profesional.';
        }
        
        this.showModal(`
            <div class="modal-title">${item.icon} ${item.name}</div>
            <div style="text-align: left; margin-top: 20px;">
                <p><strong>Tipo:</strong> ${item.type}</p>
                <p><strong>Cantidad:</strong> ${item.count}</p>
                <p><strong>Descripción:</strong> ${description}</p>
                
                <div style="text-align: center; margin-top: 20px;">
                    <button class="pixel-btn" onclick="hyruleWorld.closeModal()">
                        Cerrar
                    </button>
                </div>
            </div>
        `);
    }

    showModal(content) {
        const modal = document.getElementById('projectModal');
        const modalBody = document.getElementById('modalBody');
        
        if (modal && modalBody) {
            modalBody.innerHTML = content;
            modal.classList.remove('hidden');
            modal.classList.add('show');
            
            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }
    }

    closeModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('show');
            modal.classList.add('hidden');
        }
    }

    completeShrine(shrineId) {
        const project = this.projects.find(p => p.id === shrineId);
        if (project) {
            project.status = 'completed';
            
            // Add item to inventory
            this.inventory.push({
                id: Date.now(),
                name: project.reward,
                icon: '✨',
                count: 1,
                type: 'reward'
            });
            
            this.updateInventoryDisplay();
            
            // Visual feedback
            const shrineElement = document.querySelector(`.${shrineId}`);
            if (shrineElement) {
                shrineElement.classList.add('completed');
                this.createPowerUpEffect(shrineElement);
            }
            
            this.closeModal();
            this.showSuccessMessage(`¡Has completado ${project.name}! Recompensa obtenida: ${project.reward}`);
            this.playSound('shrine-complete');
        }
    }

    createPowerUpEffect(element) {
        const rect = element.getBoundingClientRect();
        
        // Create multiple power-up particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'power-up-effect';
            particle.innerHTML = '✨';
            particle.style.cssText = `
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                font-size: 20px;
                color: #FFD700;
                text-shadow: 0 0 10px #FFD700;
                animation-delay: ${i * 0.1}s;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            document.body.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
        
        // Screen flash effect
        this.createScreenFlash();
    }

    createScreenFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent 70%);
            pointer-events: none;
            z-index: 2000;
            animation: flashEffect 0.5s ease-out;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 500);
    }

    showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #4CAF50, #8BC34A);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            z-index: 3000;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: successPulse 0.5s ease-in-out;
        `;
        
        successDiv.textContent = message;
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    setupTooltips() {
        // Additional tooltip setup for other elements
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showCustomTooltip(e, element.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showCustomTooltip(event, text) {
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip show';
        tooltip.textContent = text;
        
        document.body.appendChild(tooltip);
        
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 + 'px';
        tooltip.style.top = rect.top - 10 + 'px';
        
        this.currentTooltip = tooltip;
    }

    toggleInventory() {
        const inventoryPanel = document.querySelector('.inventory-panel');
        if (inventoryPanel) {
            inventoryPanel.scrollIntoView({ behavior: 'smooth' });
        }
    }

    focusOnMap() {
        const mapContainer = document.querySelector('.interactive-map');
        if (mapContainer) {
            mapContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    adjustLayout() {
        // Adjust layout for different screen sizes
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Adjust mobile-specific layout
            document.querySelectorAll('.shrine').forEach(shrine => {
                shrine.style.transform = 'scale(0.8)';
            });
            
            document.querySelectorAll('.tower').forEach(tower => {
                tower.style.transform = 'scale(0.8)';
            });
        } else {
            // Reset desktop layout
            document.querySelectorAll('.shrine, .tower').forEach(element => {
                element.style.transform = '';
            });
        }
    }

    returnToPortal() {
        // Add transition effect
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = './index.html';
        }, 500);
    }

    startGameSounds() {
        // Initialize ambient sounds (optional)
        try {
            const ambientAudio = new Audio('./assets/audio/hyrule-ambient.mp3');
            ambientAudio.loop = true;
            ambientAudio.volume = 0.1;
            // ambientAudio.play(); // Commented out to avoid autoplay issues
        } catch (e) {
            console.log('Audio not available');
        }
    }

    // Utility methods
    playSound(soundName) {
        try {
            const audio = new Audio(`./assets/audio/${soundName}.mp3`);
            audio.volume = 0.3;
            audio.play();
        } catch (e) {
            console.log('Sound not available:', soundName);
        }
    }

    updateStats() {
        // Update header stats
        const completedShrines = this.projects.filter(p => p.status === 'completed').length;
        const totalShrines = this.projects.length;
        const completionRate = Math.round((completedShrines / totalShrines) * 100);
        
        const statsElements = {
            shrines: document.querySelector('#shrineCount'),
            towers: document.querySelector('#towerCount'),
            completion: document.querySelector('#completionRate')
        };
        
        if (statsElements.shrines) statsElements.shrines.textContent = `${completedShrines}/${totalShrines}`;
        if (statsElements.towers) statsElements.towers.textContent = this.towers.length;
        if (statsElements.completion) statsElements.completion.textContent = `${completionRate}%`;
    }
}

// Initialize Hyrule World when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.hyruleWorld = new HyruleWorld();
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes successPulse {
        0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
