// ===========================================
// PROJECTS MANAGEMENT - PORTFOLIO LUIS ALBERTO
// ===========================================

class ProjectsManager {
    constructor() {
        this.projects = [];
        this.initializeProjects();
    }

    async initializeProjects() {
        await this.loadProjectsData();
        this.renderProjects();
        this.setupProjectInteractions();
    }

    async loadProjectsData() {
        // Projects data with real information
        this.projects = [
            {
                id: 'fastapi-dashboard',
                icon: '📊',
                title: 'FastAPI Dashboard',
                description: 'Dashboard profesional inspirado en mi trabajo diario en Santander. Control de horas/proyecto con visualizaciones interactivas en tiempo real.',
                longDescription: 'Sistema completo de gestión de proyectos y horas desarrollado para optimizar el tracking diario en Santander Digital Services. Incluye API REST completa, base de datos SQLAlchemy, y frontend interactivo con Chart.js.',
                tech: ['FastAPI', 'Chart.js', 'SQLAlchemy', 'Docker', 'Python', 'HTML/CSS/JS'],
                category: 'full-stack',
                status: 'production',
                demoUrl: 'http://localhost:8000',
                codeUrl: './projects/fastapi-dashboard/',
                screenshots: [
                    './assets/images/fastapi-dashboard-1.png',
                    './assets/images/fastapi-dashboard-2.png'
                ],
                features: [
                    'API REST completa con FastAPI',
                    'Base de datos SQLAlchemy con migraciones',
                    'Dashboard interactivo con Chart.js',
                    'Autenticación y autorización',
                    'Despliegue con Docker',
                    'Tests automatizados'
                ],
                achievements: [
                    'Reducción 80% tiempo reporting',
                    'Automatización completa proceso',
                    'Implementado en producción'
                ]
            },
            {
                id: 'email-automation',
                demoFunction: 'EmailProcessor', // JavaScript demo available
                icon: '📧',
                title: 'Email Processor',
                description: 'Automatización real: 130+ emails diarios procesados automáticamente. Migración Access→Python implementada en producción.',
                longDescription: 'Sistema de automatización que reemplazó completamente el proceso manual de Access, procesando más de 130 emails diarios con extracción automática de datos y generación de reportes.',
                tech: ['Python', 'pandas', 'IMAP', 'Excel', 'Regex', 'Automation'],
                category: 'automation',
                status: 'production',
                demoUrl: './projects/email-automation-toolkit/demo/',
                codeUrl: './projects/email-automation-toolkit/',
                screenshots: [
                    './assets/images/email-automation-1.png'
                ],
                features: [
                    'Procesamiento automático IMAP',
                    'Extracción datos con regex',
                    'Generación reportes Excel',
                    'Logging completo de operaciones',
                    'Manejo de errores robusto',
                    'Interfaz de monitoreo'
                ],
                achievements: [
                    '130+ emails/día procesados',
                    'Migración Access→Python exitosa',
                    '0 errores en 6 meses'
                ]
            },
            {
                id: 'nlp-spanish',
                demoFunction: 'NLPProcessor', // JavaScript demo available
                icon: '🔤',
                title: 'NLP Spanish Processor',
                description: 'Motor de procesamiento de lenguaje natural para castellano. Análisis gramatical, léxico y ortográfico completo.',
                longDescription: 'Herramienta especializada en procesamiento de texto en español con capacidades avanzadas de análisis de sentimientos, corrección gramatical y análisis léxico en tiempo real.',
                tech: ['JavaScript', 'NLP', 'Machine Learning', 'Sentiment Analysis', 'Regex', 'Chart.js'],
                category: 'ai-ml',
                status: 'active',
                demoUrl: './projects/nlp-spanish-processor/demo/',
                codeUrl: './projects/nlp-spanish-processor/',
                screenshots: [
                    './assets/images/nlp-spanish-1.png'
                ],
                features: [
                    'Análisis de sentimientos en español',
                    'Corrector gramatical automático',
                    'Tokenización y análisis léxico',
                    'Procesamiento en tiempo real',
                    'Visualización de métricas',
                    'API de análisis de texto'
                ],
                achievements: [
                    'Precisión 85% sentiment analysis',
                    'Soporte completo español',
                    'Procesamiento tiempo real'
                ]
            },
            {
                id: 'data-analysis',
                demoFunction: 'DataAnalysisToolkit', // JavaScript demo available
                icon: '📈',
                title: 'Data Analysis Toolkit',
                description: 'Herramientas de análisis desarrolladas para optimizar mis tareas diarias de reporting y análisis de datos.',
                longDescription: 'Conjunto de herramientas especializadas para análisis de datos, diseñadas específicamente para automatizar tareas repetitivas de reporting y análisis estadístico en entorno corporativo.',
                tech: ['Chart.js', 'CSV Processing', 'Statistics', 'Visualization', 'JavaScript', 'Excel Integration'],
                category: 'data-science',
                status: 'active',
                demoUrl: './projects/data-analysis-toolkit/demo/',
                codeUrl: './projects/data-analysis-toolkit/',
                screenshots: [
                    './assets/images/data-analysis-1.png'
                ],
                features: [
                    'Procesador Excel integrado',
                    'Limpieza automática de datos',
                    'Generador de gráficos dinámico',
                    'Calculadora estadística avanzada',
                    'Exportación de resultados',
                    'Análisis en tiempo real'
                ],
                achievements: [
                    'Reducción 70% tiempo análisis',
                    'Automatización reportes mensuales',
                    'Integración Excel completa'
                ]
            },
            {
                id: 'neural-networks',
                icon: '🤖',
                title: 'Neural Networks Lab',
                description: 'Playground de redes neuronales desde básicas hasta complejas. Investigación personal en arquitecturas interconectadas.',
                longDescription: 'Laboratorio experimental para investigación en redes neuronales, incluyendo visualización de arquitecturas, entrenamiento interactivo y experimentación con modelos avanzados.',
                tech: ['TensorFlow.js', 'WebGL', 'Neural Networks', 'Visualization', 'JavaScript', 'Canvas'],
                category: 'ai-ml',
                status: 'development',
                demoUrl: './projects/neural-network-playground/demo/',
                codeUrl: './projects/neural-network-playground/',
                screenshots: [
                    './assets/images/neural-networks-1.png'
                ],
                features: [
                    'Visualización arquitecturas de red',
                    'Entrenamiento interactivo',
                    'Playground de parámetros',
                    'Análisis de convergencia',
                    'Exportación de modelos',
                    'Comparación de algoritmos'
                ],
                achievements: [
                    'Investigación arquitecturas avanzadas',
                    'Sistema de memoria 6 capas',
                    'Motor conversacional prototipo'
                ]
            },
            {
                id: 'docker-templates',
                icon: '🐳',
                title: 'Docker Templates',
                description: 'Templates de despliegue basados en mi experiencia con RHEL8, nginx y Openshift en infraestructura Santander.',
                longDescription: 'Colección de templates y configuraciones Docker optimizadas para entornos empresariales, basadas en experiencia real con infraestructura Santander.',
                tech: ['Docker', 'nginx', 'RHEL8', 'Openshift', 'Kubernetes', 'DevOps'],
                category: 'devops',
                status: 'active',
                demoUrl: './projects/docker-deployment-template/demo/',
                codeUrl: './projects/docker-deployment-template/',
                screenshots: [
                    './assets/images/docker-templates-1.png'
                ],
                features: [
                    'Templates multi-stage builds',
                    'Configuraciones nginx optimizadas',
                    'Scripts de despliegue automatizado',
                    'Monitoreo y logging integrado',
                    'Seguridad empresarial',
                    'Documentación completa'
                ],
                achievements: [
                    'Templates en producción Santander',
                    'Reducción 60% tiempo despliegue',
                    'Estándares seguridad corporativa'
                ]
            }
        ];
    }

    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = this.projects.map(project => `
            <div class="project-card fade-in" data-project-id="${project.id}">
                <div class="project-header">
                    <span class="project-icon">${project.icon}</span>
                    <div class="project-status ${project.status}">
                        ${this.getStatusLabel(project.status)}
                    </div>
                </div>
                
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                
                <div class="project-tech">
                    ${project.tech.slice(0, 4).map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                    ${project.tech.length > 4 ? 
                        `<span class="tech-tag more">+${project.tech.length - 4}</span>` : ''
                    }
                </div>
                
                <div class="project-achievements">
                    ${project.achievements.slice(0, 2).map(achievement => 
                        `<div class="achievement-item">✓ ${achievement}</div>`
                    ).join('')}
                </div>
                
                <div class="project-links">
                    ${project.demoFunction ? 
                        `<button class="project-link primary" onclick="projectsManager.runJSDemo('${project.demoFunction}', '${project.title}')">
                            <i class="fas fa-play"></i>
                            <span>Demo JS</span>
                        </button>` :
                        `<a href="${project.demoUrl}" class="project-link primary" target="_blank">
                            <i class="fas fa-play"></i>
                            <span>Demo Live</span>
                        </a>`
                    }
                    <a href="${project.codeUrl}" class="project-link secondary">
                        <i class="fab fa-github"></i>
                        <span>Código</span>
                    </a>
                    <button class="project-link info" onclick="projectsManager.showProjectDetails('${project.id}')">
                        <i class="fas fa-info-circle"></i>
                        <span>Detalles</span>
                    </button>
                </div>
            </div>
        `).join('');

        // Add status indicator styles
        this.addStatusStyles();
    }

    getStatusLabel(status) {
        const labels = {
            'production': 'En Producción',
            'active': 'Activo',
            'development': 'En Desarrollo',
            'archived': 'Archivado'
        };
        return labels[status] || status;
    }

    addStatusStyles() {
        if (document.querySelector('#project-status-styles')) return;

        const style = document.createElement('style');
        style.id = 'project-status-styles';
        style.textContent = `
            .project-status {
                position: absolute;
                top: 1rem;
                right: 1rem;
                padding: 0.3rem 0.8rem;
                border-radius: 12px;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .project-status.production {
                background: rgba(0, 212, 170, 0.2);
                color: #00d4aa;
                border: 1px solid rgba(0, 212, 170, 0.3);
            }
            
            .project-status.active {
                background: rgba(52, 152, 219, 0.2);
                color: #3498db;
                border: 1px solid rgba(52, 152, 219, 0.3);
            }
            
            .project-status.development {
                background: rgba(255, 185, 70, 0.2);
                color: #ffb946;
                border: 1px solid rgba(255, 185, 70, 0.3);
            }
            
            .project-header {
                position: relative;
                margin-bottom: 1rem;
            }
            
            .project-achievements {
                margin: 1rem 0;
            }
            
            .achievement-item {
                font-size: 0.9rem;
                color: var(--success-color);
                margin-bottom: 0.3rem;
            }
            
            .tech-tag.more {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-secondary);
            }
            
            .project-link.info {
                background: rgba(118, 75, 162, 0.2);
                color: var(--secondary-color);
                border: 1px solid rgba(118, 75, 162, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    setupProjectInteractions() {
        // Add hover effects for project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateProjectCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateProjectCard(card, false);
            });
        });

        // Setup filter functionality
        this.setupProjectFilters();
    }

    animateProjectCard(card, isHover) {
        const icon = card.querySelector('.project-icon');
        const links = card.querySelectorAll('.project-link');
        
        if (isHover) {
            gsap.to(icon, { 
                scale: 1.2, 
                rotation: 10, 
                duration: 0.3, 
                ease: "back.out(1.7)" 
            });
            gsap.to(links, { 
                y: -2, 
                duration: 0.2, 
                stagger: 0.05 
            });
        } else {
            gsap.to(icon, { 
                scale: 1, 
                rotation: 0, 
                duration: 0.3, 
                ease: "back.out(1.7)" 
            });
            gsap.to(links, { 
                y: 0, 
                duration: 0.2, 
                stagger: 0.05 
            });
        }
    }

    setupProjectFilters() {
        // Create filter buttons
        const projectsSection = document.getElementById('projects');
        const sectionHeader = projectsSection.querySelector('.section-header');
        
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        filterContainer.innerHTML = `
            <button class="filter-btn active" data-filter="all">Todos</button>
            <button class="filter-btn" data-filter="full-stack">Full-Stack</button>
            <button class="filter-btn" data-filter="automation">Automatización</button>
            <button class="filter-btn" data-filter="ai-ml">IA & ML</button>
            <button class="filter-btn" data-filter="data-science">Data Science</button>
            <button class="filter-btn" data-filter="devops">DevOps</button>
        `;
        
        sectionHeader.appendChild(filterContainer);
        
        // Add filter styles
        this.addFilterStyles();
        
        // Setup filter functionality
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.filterProjects(e.target.dataset.filter);
                
                // Update active filter
                filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }

    addFilterStyles() {
        if (document.querySelector('#project-filter-styles')) return;

        const style = document.createElement('style');
        style.id = 'project-filter-styles';
        style.textContent = `
            .project-filters {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 2rem;
                flex-wrap: wrap;
            }
            
            .filter-btn {
                padding: 0.5rem 1.5rem;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 25px;
                color: var(--text-secondary);
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .filter-btn:hover,
            .filter-btn.active {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
                border-color: transparent;
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .project-filters {
                    gap: 0.5rem;
                }
                
                .filter-btn {
                    padding: 0.4rem 1rem;
                    font-size: 0.8rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const projectId = card.dataset.projectId;
            const project = this.projects.find(p => p.id === projectId);
            
            if (category === 'all' || project.category === category) {
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
                card.style.display = 'block';
            } else {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    showProjectDetails(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h2><span class="project-icon">${project.icon}</span> ${project.title}</h2>
                    <button class="modal-close" onclick="this.closest('.project-modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="project-overview">
                        <p class="project-long-description">${project.longDescription}</p>
                        
                        <div class="project-meta">
                            <div class="meta-item">
                                <strong>Estado:</strong> 
                                <span class="status-badge ${project.status}">${this.getStatusLabel(project.status)}</span>
                            </div>
                            <div class="meta-item">
                                <strong>Categoría:</strong> ${project.category}
                            </div>
                        </div>
                    </div>
                    
                    <div class="project-details-grid">
                        <div class="details-section">
                            <h4>🛠️ Tecnologías</h4>
                            <div class="tech-list">
                                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="details-section">
                            <h4>✨ Características</h4>
                            <ul class="features-list">
                                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="details-section">
                            <h4>🏆 Logros</h4>
                            <ul class="achievements-list">
                                ${project.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <a href="${project.demoUrl}" class="btn btn-primary" target="_blank">
                            <i class="fas fa-play"></i> Ver Demo Live
                        </a>
                        <a href="${project.codeUrl}" class="btn btn-secondary">
                            <i class="fab fa-github"></i> Ver Código
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.addModalStyles();
        
        // Animate modal
        gsap.fromTo(modal.querySelector('.modal-content'), 
            { opacity: 0, scale: 0.8, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
        );
    }

    addModalStyles() {
        if (document.querySelector('#project-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'project-modal-styles';
        style.textContent = `
            .project-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }
            
            .modal-content {
                position: relative;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-xl);
                max-width: 800px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-header h2 {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0;
                color: var(--primary-color);
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
            
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--text-primary);
            }
            
            .modal-body {
                padding: 2rem;
            }
            
            .project-long-description {
                font-size: 1.1rem;
                line-height: 1.6;
                margin-bottom: 2rem;
                color: var(--text-secondary);
            }
            
            .project-meta {
                display: flex;
                gap: 2rem;
                margin-bottom: 2rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: var(--radius-md);
            }
            
            .meta-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .status-badge {
                padding: 0.2rem 0.6rem;
                border-radius: 12px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .project-details-grid {
                display: grid;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            .details-section h4 {
                margin-bottom: 1rem;
                color: var(--primary-color);
            }
            
            .tech-list {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .features-list,
            .achievements-list {
                list-style: none;
            }
            
            .features-list li,
            .achievements-list li {
                padding: 0.5rem 0;
                padding-left: 1.5rem;
                position: relative;
            }
            
            .features-list li::before {
                content: '✓';
                position: absolute;
                left: 0;
                color: var(--success-color);
                font-weight: bold;
            }
            
            .achievements-list li::before {
                content: '🏆';
                position: absolute;
                left: 0;
            }
            
            .modal-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                padding-top: 2rem;
                border-top: 1px solid var(--border-color);
            }
            
            @media (max-width: 768px) {
                .project-modal {
                    padding: 1rem;
                }
                
                .modal-content {
                    max-height: 95vh;
                }
                
                .modal-header,
                .modal-body {
                    padding: 1.5rem;
                }
                
                .project-meta {
                    flex-direction: column;
                    gap: 1rem;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Run JavaScript demos
    runJSDemo(demoName, projectTitle) {
        console.log(`🚀 Ejecutando demo: ${projectTitle}`);
        
        try {
            let results;
            switch(demoName) {
                case 'EmailProcessor':
                    results = JavaScriptDemos.runEmailDemo();
                    this.showDemoResults('Email Processor', results, 'email');
                    break;
                case 'DataAnalysisToolkit':
                    results = JavaScriptDemos.runDataAnalysisDemo();
                    this.showDemoResults('Data Analysis Toolkit', results, 'data');
                    break;
                case 'NLPProcessor':
                    const sampleText = "Este proyecto de análisis de datos con JavaScript es increíble. La implementación está muy bien hecha y funciona perfectamente en GitHub Pages. Estoy muy satisfecho con los resultados.";
                    results = JavaScriptDemos.runNLPDemo(sampleText);
                    this.showDemoResults('NLP Spanish Processor', results, 'nlp');
                    break;
                default:
                    console.error('Demo no encontrado:', demoName);
            }
        } catch (error) {
            console.error('Error ejecutando demo:', error);
            alert(`Error ejecutando ${projectTitle}: ${error.message}`);
        }
    }

    // Show demo results in modal
    showDemoResults(title, results, type) {
        const modal = document.createElement('div');
        modal.className = 'demo-results-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 2rem;
        `;

        const content = this.generateDemoContent(title, results, type);
        
        modal.innerHTML = `
            <div class="demo-modal-content" style="
                background: var(--surface-color);
                border-radius: 12px;
                padding: 2rem;
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
                border: 1px solid var(--primary-color);
                box-shadow: 0 20px 40px rgba(0, 255, 0, 0.2);
            ">
                <div class="demo-modal-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid var(--border-color);
                ">
                    <h2 style="margin: 0; color: var(--primary-color);">
                        🚀 ${title} - Demo Results
                    </h2>
                    <button onclick="this.closest('.demo-results-modal').remove()" style="
                        background: none;
                        border: none;
                        color: var(--text-secondary);
                        font-size: 1.5rem;
                        cursor: pointer;
                        padding: 0.5rem;
                    ">×</button>
                </div>
                
                <div class="demo-results-content">
                    ${content}
                </div>
                
                <div class="demo-modal-actions" style="
                    margin-top: 2rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--border-color);
                    text-align: center;
                ">
                    <button onclick="this.closest('.demo-results-modal').remove()" style="
                        background: var(--primary-color);
                        color: #000;
                        border: none;
                        padding: 0.75rem 2rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                    ">Cerrar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    generateDemoContent(title, results, type) {
        switch(type) {
            case 'email':
                return `
                    <div class="email-demo-results">
                        <h3>📧 Procesamiento de Emails</h3>
                        <div class="demo-stats">
                            <div class="stat-item">
                                <strong>Total Emails:</strong> ${results.total}
                            </div>
                            <div class="stat-item">
                                <strong>Alta Prioridad:</strong> ${results.highPriority}
                            </div>
                            <div class="stat-item">
                                <strong>Acción Requerida:</strong> ${results.actionRequired}
                            </div>
                        </div>
                        
                        <h4>Categorías:</h4>
                        <div class="categories-grid">
                            ${Object.entries(results.categories).map(([cat, count]) => 
                                `<div class="category-item">${cat}: ${count}</div>`
                            ).join('')}
                        </div>
                        
                        <h4>Emails Procesados:</h4>
                        <div class="emails-table">
                            ${results.processed.slice(0, 3).map(email => `
                                <div class="email-item">
                                    <strong>${email.subject}</strong><br>
                                    <small>Categoría: ${email.category} | Sentimiento: ${email.sentiment}</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            case 'data':
                return `
                    <div class="data-demo-results">
                        <h3>📊 Análisis de Datos</h3>
                        <div class="demo-stats">
                            <div class="stat-item">
                                <strong>Total Registros:</strong> ${results.totalRecords}
                            </div>
                            <div class="stat-item">
                                <strong>Total Horas:</strong> ${results.totalHours}
                            </div>
                            <div class="stat-item">
                                <strong>Promedio Horas:</strong> ${results.averageHours.toFixed(2)}
                            </div>
                        </div>
                        
                        <h4>Top Proyectos:</h4>
                        <div class="projects-table">
                            ${results.projectStats.slice(0, 3).map(project => `
                                <div class="project-item">
                                    <strong>${project.project}</strong><br>
                                    <small>Horas: ${project.totalHours} | Promedio: ${project.averageHours.toFixed(2)}</small>
                                </div>
                            `).join('')}
                        </div>
                        
                        <h4>Desarrolladores:</h4>
                        <div class="developers-table">
                            ${results.developerStats.slice(0, 3).map(dev => `
                                <div class="developer-item">
                                    <strong>${dev.developer}</strong><br>
                                    <small>Productividad: ${(dev.productivity * 100).toFixed(1)}%</small>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            
            case 'nlp':
                return `
                    <div class="nlp-demo-results">
                        <h3>🔤 Análisis NLP</h3>
                        <div class="demo-stats">
                            <div class="stat-item">
                                <strong>Palabras:</strong> ${results.wordCount}
                            </div>
                            <div class="stat-item">
                                <strong>Caracteres:</strong> ${results.characterCount}
                            </div>
                            <div class="stat-item">
                                <strong>Tokens:</strong> ${results.tokens.length}
                            </div>
                        </div>
                        
                        <div class="nlp-section">
                            <h4>Análisis de Sentimientos:</h4>
                            <div class="sentiment-result">
                                <strong>Sentimiento:</strong> ${results.sentiment.sentiment}<br>
                                <strong>Confianza:</strong> ${(results.sentiment.confidence * 100).toFixed(1)}%<br>
                                <small>Positivo: ${results.sentiment.scores.positive} | 
                                      Negativo: ${results.sentiment.scores.negative} | 
                                      Neutral: ${results.sentiment.scores.neutral}</small>
                            </div>
                        </div>
                        
                        <div class="nlp-section">
                            <h4>Clasificación de Texto:</h4>
                            <div class="classification-result">
                                <strong>Categoría:</strong> ${results.classification.category}<br>
                                <strong>Confianza:</strong> ${(results.classification.confidence * 100).toFixed(1)}%
                            </div>
                        </div>
                        
                        <div class="nlp-section">
                            <h4>Resumen Automático:</h4>
                            <div class="summary-result">
                                <em>"${results.summary}"</em>
                            </div>
                        </div>
                        
                        <div class="nlp-section">
                            <h4>Legibilidad:</h4>
                            <div class="readability-result">
                                <strong>Puntuación:</strong> ${results.readabilityScore.score.toFixed(1)}<br>
                                <strong>Nivel:</strong> ${results.readabilityScore.level}
                            </div>
                        </div>
                    </div>
                `;
        }
    }
}

// Initialize projects manager
let projectsManager;

document.addEventListener('DOMContentLoaded', () => {
    projectsManager = new ProjectsManager();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectsManager };
}
