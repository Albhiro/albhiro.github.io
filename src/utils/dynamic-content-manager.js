/**
 * ===================================================================
 * DYNAMIC CONTENT MANAGER - GESTOR DE CONTENIDO DINÁMICO
 * Autor: Luis Alberto Oraa García
 * Descripción: Sistema de templating dinámico que itera sobre JSON
 * ===================================================================
 */

'use strict';

class DynamicContentManager {
    constructor() {
        this.data = null;
        this.templates = new Map();
        this.initialized = false;
        
        this.init();
    }
    
    /**
     * Initialize the content manager
     */
    async init() {
        try {
            await this.loadData();
            this.setupTemplates();
            this.initialized = true;
            console.log('✅ Dynamic Content Manager inicializado');
        } catch (error) {
            console.error('❌ Error inicializando Dynamic Content Manager:', error);
        }
    }
    
    /**
     * Load JSON data
     */
    async loadData() {
        try {
            const response = await fetch('./src/data/cv-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.data = await response.json();
            console.log('📄 Datos JSON cargados correctamente');
        } catch (error) {
            console.error('❌ Error cargando datos JSON:', error);
            throw error;
        }
    }
    
    /**
     * Setup HTML templates for dynamic generation
     */
    setupTemplates() {
        // Template para botones de filtro
        this.templates.set('filter-button', (filter) => `
            <button class="filter-btn ${filter.active ? 'active' : ''}" data-filter="${filter.id}">
                ${filter.label}
            </button>
        `);
        
        // Template para proyectos
        this.templates.set('project-card', (project) => `
            <article class="project-card ${project.featured ? 'featured' : ''}" data-project="${project.id}" data-categories="${project.categories.join(' ')}">
                <div class="project-visual">
                    <div class="project-icon">${project.icon}</div>
                    <div class="visual-effects">
                        <div class="pulse-ring"></div>
                        ${project.featured ? '<div class="energy-particles"></div>' : ''}
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    ${project.metrics ? `
                        <div class="project-metrics">
                            ${project.metrics.map(metric => `
                                <div class="metric">
                                    <span class="metric-value">${metric.value}</span>
                                    <span class="metric-label">${metric.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </article>
        `);
        
        // Template para indicadores de sistema
        this.templates.set('system-indicator', (indicator) => `
            <div class="indicator-item" data-system="${indicator.key}">
                <div class="indicator-dot"></div>
                <span class="indicator-label">${indicator.label}</span>
            </div>
        `);
        
        // Template para elementos flotantes
        this.templates.set('floating-element', (element, index) => `
            <div class="float-item" style="--delay: ${element.delay}; --index: ${index};">
                ${element.emoji}
            </div>
        `);
        
        // Template para navegación
        this.templates.set('nav-item', (page, index) => `
            <div class="nav-item ${index === 0 ? 'active' : ''}" data-page="${page.id}">
                <span class="nav-icon">${page.icon}</span>
                <span class="nav-text">${page.title}</span>
            </div>
        `);
        
        // Template para experiencia timeline
        this.templates.set('timeline-item', (experience, index) => `
            <div class="timeline-item ${experience.type}" data-year="${experience.year}" style="--index: ${index};">
                <div class="timeline-marker">
                    <div class="marker-dot"></div>
                    <div class="marker-year">${experience.year}</div>
                </div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h3 class="position-title">${experience.position}</h3>
                        <div class="company-name">${experience.company}</div>
                    </div>
                    <p class="experience-description">${experience.description}</p>
                    <div class="achievements-list">
                        ${experience.achievements.map(achievement => `
                            <div class="achievement-item">
                                <span class="achievement-bullet">▶</span>
                                <span class="achievement-text">${achievement}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="tech-used">
                        ${experience.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        `);
        
        // Template para categorías de skills
        this.templates.set('skill-category', (category) => `
            <div class="skill-category" data-category="${category.id}">
                <div class="category-header">
                    <div class="category-icon">${category.icon}</div>
                    <div class="category-info">
                        <h3 class="category-name">${category.name}</h3>
                        <p class="category-description">${category.description}</p>
                    </div>
                </div>
                <div class="skills-list">
                    ${category.skills.map(skill => `
                        <div class="skill-item">
                            <div class="skill-header">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-years">${skill.years} años</span>
                            </div>
                            <div class="skill-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${skill.level}%"></div>
                                </div>
                                <span class="skill-level">${skill.level}%</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `);
        
        // Template para información de contacto
        this.templates.set('contact-info', (contact) => `
            <div class="contact-item" data-type="${contact.type}">
                <div class="contact-icon">${contact.icon}</div>
                <div class="contact-details">
                    <div class="contact-label">${contact.label}</div>
                    <div class="contact-value">${contact.value}</div>
                </div>
            </div>
        `);
        
        // Template para campos de formulario
        this.templates.set('form-field', (field) => {
            if (field.type === 'select') {
                return `
                    <div class="form-field">
                        <label for="${field.id}" class="field-label">${field.label}</label>
                        <select id="${field.id}" name="${field.id}" class="field-input" ${field.required ? 'required' : ''}>
                            ${field.options.map(option => `
                                <option value="${option.value}">${option.text}</option>
                            `).join('')}
                        </select>
                    </div>
                `;
            } else if (field.type === 'textarea') {
                return `
                    <div class="form-field">
                        <label for="${field.id}" class="field-label">${field.label}</label>
                        <textarea id="${field.id}" name="${field.id}" class="field-input" 
                                  placeholder="${field.placeholder}" rows="${field.rows}" 
                                  ${field.required ? 'required' : ''}></textarea>
                    </div>
                `;
            } else {
                return `
                    <div class="form-field">
                        <label for="${field.id}" class="field-label">${field.label}</label>
                        <input type="${field.type}" id="${field.id}" name="${field.id}" 
                               class="field-input" placeholder="${field.placeholder}" 
                               ${field.required ? 'required' : ''}>
                    </div>
                `;
            }
        });
        
        console.log('🎨 Templates configurados correctamente');
    }
    
    /**
     * Generate HTML for a specific section
     */
    generateSection(sectionName, containerSelector) {
        if (!this.initialized) {
            console.error('❌ Dynamic Content Manager no inicializado');
            return;
        }
        
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error(`❌ Container no encontrado: ${containerSelector}`);
            return;
        }
        
        switch (sectionName) {
            case 'landing-indicators':
                this.generateSystemIndicators(container);
                break;
                
            case 'portfolio-filters':
                this.generatePortfolioFilters(container);
                break;
                
            case 'portfolio-projects':
                this.generatePortfolioProjects(container);
                break;
                
            case 'portfolio-floating':
                this.generateFloatingElements(container);
                break;
                
            case 'experience-timeline':
                this.generateExperienceTimeline(container);
                break;
                
            case 'skills-categories':
                this.generateSkillsCategories(container);
                break;
                
            case 'contact-info':
                this.generateContactInfo(container);
                break;
                
            case 'contact-form':
                this.generateContactForm(container);
                break;
                
            case 'navigation-menu':
                this.generateNavigationMenu(container);
                break;
                
            default:
                console.warn(`⚠️ Sección no reconocida: ${sectionName}`);
        }
    }
    
    /**
     * Generate system indicators for landing page
     */
    generateSystemIndicators(container) {
        const indicators = this.data.landing.system_indicators;
        const html = indicators.map(indicator => 
            this.templates.get('system-indicator')(indicator)
        ).join('');
        
        container.innerHTML = html;
        console.log('✅ Indicadores de sistema generados');
    }
    
    /**
     * Generate portfolio filters
     */
    generatePortfolioFilters(container) {
        const filters = this.data.portfolio.filters;
        const html = filters.map(filter => 
            this.templates.get('filter-button')(filter)
        ).join('');
        
        container.innerHTML = html;
        console.log('✅ Filtros de portfolio generados');
    }
    
    /**
     * Generate portfolio projects
     */
    generatePortfolioProjects(container) {
        const projects = this.data.portfolio.projects;
        const html = projects.map(project => 
            this.templates.get('project-card')(project)
        ).join('');
        
        container.innerHTML = html;
        console.log('✅ Proyectos de portfolio generados');
    }
    
    /**
     * Generate floating elements
     */
    generateFloatingElements(container) {
        const elements = this.data.portfolio.floating_elements;
        const html = elements.map((element, index) => 
            this.templates.get('floating-element')(element, index)
        ).join('');
        
        container.innerHTML = html;
        console.log('✅ Elementos flotantes generados');
    }
    
    /**
     * Generate experience timeline
     */
    generateExperienceTimeline(container) {
        const timeline = this.data.experience.timeline;
        const html = timeline.map((experience, index) => 
            this.templates.get('timeline-item')(experience, index)
        ).join('');
        
        container.innerHTML = html;
        console.log('✅ Timeline de experiencia generado');
    }
    
    /**
     * Generate skills categories
     */
    generateSkillsCategories(container) {
        const categories = this.data.skills.categories;
        const html = categories.map(category => 
            this.templates.get('skill-category')(category)
        ).join('');
        
        container.innerHTML = html;
        console.log('✅ Categorías de skills generadas');
    }
    
    /**
     * Generate contact information
     */
    generateContactInfo(container) {
        const contacts = this.data.contact.contact_info;
        const html = contacts.map(contact => 
            this.templates.get('contact-info')(contact)
        ).join('');
        
        container.innerHTML = html;
        console.log('✅ Información de contacto generada');
    }
    
    /**
     * Generate contact form
     */
    generateContactForm(container) {
        const fields = this.data.contact.form_fields;
        const html = fields.map(field => 
            this.templates.get('form-field')(field)
        ).join('');
        
        container.innerHTML = html;
        console.log('✅ Formulario de contacto generado');
    }
    
    /**
     * Get data for specific section
     */
    getData(section) {
        return this.data ? this.data[section] : null;
    }
    
    /**
     * Update specific data and regenerate section
     */
    updateData(section, newData) {
        if (this.data && this.data[section]) {
            this.data[section] = { ...this.data[section], ...newData };
            console.log(`🔄 Datos actualizados para: ${section}`);
        }
    }
    
    /**
     * Replace text content dynamically
     */
    replaceTextContent() {
        if (!this.data) return;
        
        // Reemplazar textos en elementos con data attributes
        document.querySelectorAll('[data-text]').forEach(element => {
            const textPath = element.getAttribute('data-text');
            const value = this.getNestedValue(this.data, textPath);
            
            if (value) {
                element.textContent = value;
            }
        });
        
        console.log('✅ Contenido de texto reemplazado');
    }
    
    /**
     * Generate navigation menu
     */
    generateNavigationMenu(container) {
        const pages = this.data.navigation.pages;
        const html = pages.map((page, index) => 
            this.templates.get('nav-item')(page, index)
        ).join('');
        
        container.innerHTML = html;
        
        // Agregar event listeners para navegación
        container.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const pageId = item.getAttribute('data-page');
                this.navigateToPage(pageId);
            });
        });
        
        console.log('✅ Menú de navegación generado');
    }
    
    /**
     * Navigate to a specific page
     */
    navigateToPage(pageId) {
        console.log(`🔄 Navegando a: ${pageId}`);
        
        // Mapeo directo a archivos físicos
        const pageRoutes = {
            'landing': '../index.html',
            'portfolio': './portfolio.html',
            'experience': './experience.html', 
            'skills': './skills.html',
            'contact': './contact.html'
        };
        
        const targetUrl = pageRoutes[pageId];
        
        if (targetUrl) {
            console.log(`🚀 Redirigiendo a: ${targetUrl}`);
            
            // Actualizar URL del navegador para que se vea bonita
            const prettyRoutes = {
                'landing': '/',
                'portfolio': '/portfolio',
                'experience': '/experience',
                'skills': '/skills', 
                'contact': '/contact'
            };
            
            const prettyUrl = prettyRoutes[pageId];
            if (prettyUrl && window.history) {
                window.history.pushState({page: pageId}, '', prettyUrl);
            }
            
            // Redirigir a la página física
            window.location.href = targetUrl;
        } else {
            console.error(`❌ Página no encontrada: ${pageId}`);
        }
    }
    
    /**
     * Get nested value from object using dot notation
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }
}

// Export para uso global
window.DynamicContentManager = DynamicContentManager;
