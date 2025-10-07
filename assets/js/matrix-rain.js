// ===============================================
// MATRIX RAIN EFFECT - Background Animation
// ===============================================

class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrixRain');
        this.ctx = this.canvas.getContext('2d');
        this.drops = [];
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.fontSize = 12;
        
        this.initialize();
    }

    initialize() {
        this.resizeCanvas();
        this.initDrops();
        this.startAnimation();
        
        // Resize handler
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.initDrops();
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.font = `${this.fontSize}px monospace`;
    }

    initDrops() {
        this.drops = [];
        const columns = Math.floor(this.canvas.width / this.fontSize);
        
        for (let i = 0; i < columns; i++) {
            this.drops[i] = {
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 1,
                chars: [],
                opacity: Math.random() * 0.5 + 0.1
            };
            
            // Inicializar caracteres para esta columna
            const numChars = Math.floor(Math.random() * 20) + 5;
            for (let j = 0; j < numChars; j++) {
                this.drops[i].chars.push({
                    char: this.chars[Math.floor(Math.random() * this.chars.length)],
                    opacity: Math.max(0, 1 - (j * 0.1))
                });
            }
        }
    }

    draw() {
        // Fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drops.forEach((drop, i) => {
            const x = i * this.fontSize;
            
            drop.chars.forEach((charObj, j) => {
                const y = drop.y - (j * this.fontSize);
                
                if (y > 0 && y < this.canvas.height) {
                    // Glow effect for the first character
                    if (j === 0) {
                        this.ctx.shadowColor = '#00ff41';
                        this.ctx.shadowBlur = 5;
                        this.ctx.fillStyle = '#ffffff';
                    } else {
                        this.ctx.shadowBlur = 0;
                        const opacity = charObj.opacity * drop.opacity;
                        this.ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
                    }
                    
                    this.ctx.fillText(charObj.char, x, y);
                }
            });
            
            // Reset shadow
            this.ctx.shadowBlur = 0;
            
            // Move drop
            drop.y += drop.speed;
            
            // Reset drop if it goes off screen
            if (drop.y > this.canvas.height + drop.chars.length * this.fontSize) {
                drop.y = -drop.chars.length * this.fontSize;
                drop.speed = Math.random() * 3 + 1;
                drop.opacity = Math.random() * 0.5 + 0.1;
                
                // Randomize characters
                drop.chars.forEach(charObj => {
                    if (Math.random() > 0.98) {
                        charObj.char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    }
                });
            }
            
            // Occasionally change characters
            if (Math.random() > 0.995) {
                const randomIndex = Math.floor(Math.random() * drop.chars.length);
                drop.chars[randomIndex].char = this.chars[Math.floor(Math.random() * this.chars.length)];
            }
        });
    }

    startAnimation() {
        const animate = () => {
            this.draw();
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Initialize Matrix Rain when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const matrixRain = new MatrixRain();
    console.log('🌧️ Matrix Rain initialized');
});
