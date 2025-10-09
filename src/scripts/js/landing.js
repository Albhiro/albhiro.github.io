/**
 * ===================================================================
 * LANDING PAGE - CRYSTAL MOUSE TRACKER
 * Descripción: Sistema de seguimiento del ratón para cristales
 * ===================================================================
 */

'use strict';

// Sistema de seguimiento de mouse para cristales
const CrystalMouseTracker = {
    crystalField: null,
    crystals: [],
    leftSection: null,
    isActive: false,
    
    init() {
        console.log('🔮 Inicializando Crystal Mouse Tracker...');
        
        this.leftSection = document.querySelector('.init-left-section');
        this.crystalField = document.querySelector('.chaos-crystal-field');
        this.crystals = Array.from(document.querySelectorAll('.crystal-container'));
        
        if (!this.leftSection || !this.crystalField || this.crystals.length === 0) {
            console.warn('❌ No se encontraron elementos necesarios para el mouse tracker');
            return;
        }
        
        console.log(`✅ Encontrados ${this.crystals.length} cristales para tracking`);
        
        this.bindEvents();
        this.isActive = true;
    },
    
    bindEvents() {
        // Eventos de mouse en la sección izquierda
        this.leftSection.addEventListener('mouseenter', () => {
            this.crystalField.style.transition = 'transform 0.3s ease-out';
            // Las animaciones originales seguirán corriendo en segundo plano
        });
        
        this.leftSection.addEventListener('mousemove', (e) => {
            if (this.isActive) {
                this.handleMouseMove(e);
            }
        });
        
        this.leftSection.addEventListener('mouseleave', () => {
            this.resetPerspective();
            // Las animaciones originales se restauran automáticamente
        });
        
        // Debug: mostrar información en consola
        console.log('🎮 Mouse events vinculados correctamente');
    },
    
    handleMouseMove(e) {
        const rect = this.leftSection.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Posición del mouse relativa al centro (normalizada -1 a 1)
        const mouseX = (e.clientX - rect.left - centerX) / centerX;
        const mouseY = (e.clientY - rect.top - centerY) / centerY;
        
        // Perspectiva global del campo
        const fieldRotateY = mouseX * 15; // ±15 grados
        const fieldRotateX = mouseY * -10; // ±10 grados
        
        this.crystalField.style.transform = `
            rotateX(${fieldRotateX}deg) 
            rotateY(${fieldRotateY}deg)
        `;
        
        // Perspectiva individual de cada cristal
        this.crystals.forEach((crystal, index) => {
            const crystalRect = crystal.getBoundingClientRect();
            const crystalCenterX = crystalRect.left + crystalRect.width / 2 - rect.left;
            const crystalCenterY = crystalRect.top + crystalRect.height / 2 - rect.top;
            
            // Distancia del mouse al cristal (normalizada)
            const distanceX = (e.clientX - rect.left - crystalCenterX) / rect.width;
            const distanceY = (e.clientY - rect.top - crystalCenterY) / rect.height;
            
            // Intensidad basada en la distancia (más cerca = más reacción)
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            const intensity = Math.max(0, 1 - distance * 2); // 0 a 1
            
            // Rotación individual del cristal
            const crystalRotateY = distanceX * intensity * 30; // ±30 grados
            const crystalRotateX = distanceY * intensity * -20; // ±20 grados
            const crystalScale = 1 + intensity * 0.3; // Escala 1.0 a 1.3
            
            // Aplicar transformación del mouse SIN sobrescribir las animaciones CSS
            // Usamos CSS custom properties para que coexistan con las animaciones
            crystal.style.setProperty('--mouse-rotate-x', `${crystalRotateX}deg`);
            crystal.style.setProperty('--mouse-rotate-y', `${crystalRotateY}deg`);
            crystal.style.setProperty('--mouse-scale', crystalScale);
            
            // Activar clase que combina mouse + animaciones originales
            crystal.classList.add('mouse-active');
            
            // Efecto de brillo dinámico
            const brightness = 1 + intensity * 0.5; // 1.0 a 1.5
            const hueShift = intensity * 60; // 0 a 60 grados
            crystal.style.filter = `
                brightness(${brightness}) 
                hue-rotate(${hueShift}deg)
                drop-shadow(0 0 ${intensity * 20}px rgba(156, 39, 176, ${intensity * 0.8}))
            `;
        });
    },
    
    resetPerspective() {
        // Resetear perspectiva del campo
        this.crystalField.style.transform = '';
        
        // Resetear cristales a sus animaciones originales
        this.crystals.forEach(crystal => {
            crystal.classList.remove('mouse-active');
            crystal.style.removeProperty('--mouse-rotate-x');
            crystal.style.removeProperty('--mouse-rotate-y');
            crystal.style.removeProperty('--mouse-scale');
            crystal.style.filter = '';
        });
    },
    
    destroy() {
        this.isActive = false;
        this.resetPerspective();
        console.log('🔮 Crystal Mouse Tracker desactivado');
    }
};

// Export para uso modular (auto-inicialización controlada desde index.html)
window.CrystalMouseTracker = CrystalMouseTracker;
