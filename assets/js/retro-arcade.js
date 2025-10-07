// ===================================
// RETRO ARCADE WORLD JAVASCRIPT
// Diversión & Contacto Portfolio
// ===================================

class ArcadeWorld {
    constructor() {
        this.isLoaded = false;
        this.games = {};
        this.currentGame = null;
        this.score = 256000;
        this.highScores = {};
        this.musicPlaying = false;
        this.pixelParticles = [];
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.initializePixelEffects();
        this.initializeMiniGames();
        this.updateDigitalClock();
        this.initializeContactForm();
        this.setupRetroTerminal();
        this.startPixelParticles();
        
        // Hide loading after 3 seconds
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 3000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('arcadeLoading');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
            
            // Animate loading bar
            const progressBar = loadingScreen.querySelector('.loading-progress');
            if (progressBar) {
                setTimeout(() => {
                    progressBar.style.width = '100%';
                }, 500);
            }
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('arcadeLoading');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            this.isLoaded = true;
            this.startArcadeEffects();
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

        // Music toggle
        const musicToggle = document.getElementById('toggleMusic');
        if (musicToggle) {
            musicToggle.addEventListener('click', () => {
                this.toggleMusic();
            });
        }

        // Game buttons
        document.getElementById('playSnake')?.addEventListener('click', () => this.startGame('snake'));
        document.getElementById('playPong')?.addEventListener('click', () => this.startGame('pong'));
        document.getElementById('playTetris')?.addEventListener('click', () => this.startGame('tetris'));
        document.getElementById('playInvaders')?.addEventListener('click', () => this.startGame('invaders'));

        // Modal controls
        document.getElementById('modalClose')?.addEventListener('click', () => this.closeGameModal());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeGameModal();
            }
            if (e.key === 'F11') {
                e.preventDefault();
                this.toggleFullscreen();
            }
            if (e.key === 'm' || e.key === 'M') {
                this.toggleMusic();
            }
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit();
            });
            
            contactForm.addEventListener('reset', () => {
                this.resetTerminalOutput();
            });
        }

        // Terminal effects
        this.setupTerminalEffects();
    }

    initializePixelEffects() {
        // Initialize pixel canvas for background
        const canvas = document.getElementById('pixelCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            this.pixelCanvas = { canvas, ctx };
            this.resizeCanvas();
            this.startPixelBackground();
        }

        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    resizeCanvas() {
        if (!this.pixelCanvas) return;
        
        const { canvas } = this.pixelCanvas;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    startPixelBackground() {
        if (!this.pixelCanvas) return;
        
        const { canvas, ctx } = this.pixelCanvas;
        const pixels = [];
        
        // Create random pixels
        for (let i = 0; i < 100; i++) {
            pixels.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                color: this.getRandomPixelColor(),
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.3
            });
        }
        
        const animatePixels = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            pixels.forEach(pixel => {
                pixel.x += pixel.speedX;
                pixel.y += pixel.speedY;
                
                // Wrap around screen
                if (pixel.x < 0) pixel.x = canvas.width;
                if (pixel.x > canvas.width) pixel.x = 0;
                if (pixel.y < 0) pixel.y = canvas.height;
                if (pixel.y > canvas.height) pixel.y = 0;
                
                ctx.save();
                ctx.globalAlpha = pixel.alpha;
                ctx.fillStyle = pixel.color;
                ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
                ctx.restore();
            });
            
            requestAnimationFrame(animatePixels);
        };
        
        animatePixels();
    }

    getRandomPixelColor() {
        const colors = ['#00ff41', '#ff0080', '#ffff00', '#00ffff', '#ff8000', '#8040ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    initializeMiniGames() {
        // Initialize mini-game previews
        this.games = {
            snake: new SnakeGame('snakeGame'),
            pong: new PongGame('pongGame'),
            tetris: new TetrisGame('tetrisGame'),
            invaders: new InvadersGame('invadersGame')
        };

        // Start preview animations
        Object.values(this.games).forEach(game => {
            if (game.startPreview) {
                game.startPreview();
            }
        });

        this.highScores = {
            snake: { score: 420, player: 'ALBHIRO' },
            pong: { score: 99, player: 'SANTANDER' },
            tetris: { score: 999, player: 'PYTHON' },
            invaders: { score: 777, player: 'WIZARD' }
        };
    }

    startGame(gameType) {
        const game = this.games[gameType];
        if (!game) return;

        // Show game modal
        const modal = document.getElementById('gameModal');
        const gameTitle = document.getElementById('modalGameTitle');
        const gameCanvas = document.getElementById('fullGameCanvas');
        const instructions = document.getElementById('gameInstructions');

        if (modal && gameTitle && gameCanvas && instructions) {
            modal.classList.remove('hidden');
            gameTitle.textContent = this.getGameTitle(gameType);
            instructions.innerHTML = this.getGameInstructions(gameType);
            
            // Initialize full game
            this.currentGame = new (this.getGameClass(gameType))(gameCanvas.id, true);
            this.currentGame.startGame();
            
            this.playSound('game-start');
        }
    }

    getGameTitle(gameType) {
        const titles = {
            snake: 'SNAKE.EXE - PYTHON EDITION',
            pong: 'PONG.BAT - AI CHALLENGER',
            tetris: 'TETRIS.JS - BLOCK MASTER',
            invaders: 'INVADERS.C - BUG DESTROYER'
        };
        return titles[gameType] || 'RETRO GAME';
    }

    getGameInstructions(gameType) {
        const instructions = {
            snake: '<p>ARROW KEYS: Move snake</p><p>SPACE: Pause game</p><p>Goal: Eat apples, grow longer</p>',
            pong: '<p>UP/DOWN ARROWS: Move paddle</p><p>SPACE: Pause game</p><p>Goal: Beat the AI opponent</p>',
            tetris: '<p>ARROW KEYS: Move/rotate blocks</p><p>SPACE: Drop block</p><p>Goal: Clear lines, survive</p>',
            invaders: '<p>ARROW KEYS: Move ship</p><p>SPACE: Shoot</p><p>Goal: Destroy all invaders</p>'
        };
        return instructions[gameType] || '<p>Use controls to play</p>';
    }

    getGameClass(gameType) {
        const classes = {
            snake: SnakeGame,
            pong: PongGame,
            tetris: TetrisGame,
            invaders: InvadersGame
        };
        return classes[gameType] || SnakeGame;
    }

    closeGameModal() {
        const modal = document.getElementById('gameModal');
        if (modal) {
            modal.classList.add('hidden');
            
            if (this.currentGame && this.currentGame.stopGame) {
                this.currentGame.stopGame();
            }
            this.currentGame = null;
        }
    }

    initializeContactForm() {
        // Add retro typing effect to form inputs
        const inputs = document.querySelectorAll('.pixel-input, .pixel-textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.playTypingSound();
            });
            
            input.addEventListener('focus', (e) => {
                this.playSound('beep');
            });
        });
    }

    handleContactSubmit() {
        const form = document.getElementById('contactForm');
        const output = document.getElementById('terminalOutput');
        
        if (!form || !output) return;

        // Simulate processing
        this.showTerminalProcessing();
        
        setTimeout(() => {
            output.classList.remove('hidden');
            this.playSound('success');
            this.animateSuccess();
            
            // Reset form after showing success
            setTimeout(() => {
                form.reset();
                output.classList.add('hidden');
            }, 5000);
        }, 2000);
    }

    showTerminalProcessing() {
        const output = document.getElementById('terminalOutput');
        if (!output) return;

        output.innerHTML = `
            <div class="output-line">PROCESSING REQUEST...</div>
            <div class="output-line">VALIDATING DATA...</div>
            <div class="output-line">CONNECTING TO SERVER...</div>
            <div class="output-line">SENDING MESSAGE...</div>
        `;
        output.classList.remove('hidden');

        // Add typing animation
        const lines = output.querySelectorAll('.output-line');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            setTimeout(() => {
                line.style.opacity = '1';
                this.playSound('type');
            }, index * 500);
        });
    }

    animateSuccess() {
        // Create success particle effect
        const successParticles = document.createElement('div');
        successParticles.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            pointer-events: none;
            z-index: 2000;
        `;
        
        document.body.appendChild(successParticles);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00ff41;
                left: 50%;
                top: 50%;
                animation: successBurst 1s ease-out forwards;
                animation-delay: ${Math.random() * 0.5}s;
            `;
            successParticles.appendChild(particle);
        }
        
        setTimeout(() => {
            successParticles.remove();
        }, 2000);
    }

    setupRetroTerminal() {
        // Add blinking cursor effect
        const cursor = document.querySelector('.cursor-blink');
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }

        // Terminal window controls
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.playSound('beep');
                
                if (btn.classList.contains('close')) {
                    this.minimizeTerminal();
                } else if (btn.classList.contains('minimize')) {
                    this.minimizeTerminal();
                } else if (btn.classList.contains('maximize')) {
                    this.maximizeTerminal();
                }
            });
        });
    }

    setupTerminalEffects() {
        // Add terminal prompt animation
        const prompt = document.querySelector('.terminal-prompt');
        if (prompt) {
            setInterval(() => {
                const cursor = prompt.querySelector('.cursor-blink');
                if (cursor) {
                    cursor.textContent = cursor.textContent === '_' ? '|' : '_';
                }
            }, 1000);
        }
    }

    minimizeTerminal() {
        const terminal = document.querySelector('.retro-terminal');
        if (terminal) {
            terminal.style.transform = 'scale(0.8)';
            terminal.style.opacity = '0.7';
            
            setTimeout(() => {
                terminal.style.transform = '';
                terminal.style.opacity = '';
            }, 2000);
        }
    }

    maximizeTerminal() {
        const terminal = document.querySelector('.retro-terminal');
        if (terminal) {
            terminal.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                terminal.style.transform = '';
            }, 300);
        }
    }

    resetTerminalOutput() {
        const output = document.getElementById('terminalOutput');
        if (output) {
            output.classList.add('hidden');
        }
        this.playSound('beep');
    }

    startPixelParticles() {
        const container = document.getElementById('pixelParticles');
        if (!container) return;

        setInterval(() => {
            this.createPixelParticle(container);
        }, 2000);
    }

    createPixelParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'pixel';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particle.style.fontSize = (Math.random() * 4 + 2) + 'px';
        particle.style.color = this.getRandomPixelColor();
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 10000);
    }

    updateDigitalClock() {
        const clockElement = document.getElementById('digitalClock');
        if (!clockElement) return;
        
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            clockElement.textContent = timeString;
        };
        
        updateTime();
        setInterval(updateTime, 1000);

        // Update FPS counter
        this.updateFPSCounter();
    }

    updateFPSCounter() {
        const fpsElement = document.getElementById('fpsCounter');
        if (!fpsElement) return;

        let lastTime = performance.now();
        let frames = 0;
        
        const updateFPS = () => {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                fpsElement.textContent = frames;
                frames = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(updateFPS);
        };
        
        updateFPS();
    }

    toggleMusic() {
        const musicBtn = document.getElementById('toggleMusic');
        const musicIcon = musicBtn?.querySelector('i');
        
        if (this.musicPlaying) {
            // Stop music
            this.stopBackgroundMusic();
            if (musicIcon) musicIcon.className = 'fas fa-volume-mute';
            this.musicPlaying = false;
        } else {
            // Start music
            this.playBackgroundMusic();
            if (musicIcon) musicIcon.className = 'fas fa-volume-up';
            this.musicPlaying = true;
        }
    }

    playBackgroundMusic() {
        try {
            const audio = document.getElementById('arcadeMusic');
            if (audio) {
                audio.volume = 0.1;
                audio.play();
            }
        } catch (e) {
            console.log('Background music not available');
        }
    }

    stopBackgroundMusic() {
        try {
            const audio = document.getElementById('arcadeMusic');
            if (audio) {
                audio.pause();
            }
        } catch (e) {
            console.log('Background music not available');
        }
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    startArcadeEffects() {
        // Start CRT flicker
        this.startCRTFlicker();
        
        // Start scanline animation
        this.startScanlines();
        
        // Update score animation
        this.animateScore();
    }

    startCRTFlicker() {
        const flicker = document.querySelector('.crt-flicker');
        if (flicker) {
            setInterval(() => {
                const randomFlicker = Math.random();
                if (randomFlicker < 0.05) { // 5% chance
                    flicker.style.opacity = '0.03';
                    setTimeout(() => {
                        flicker.style.opacity = '0';
                    }, 50);
                }
            }, 100);
        }
    }

    startScanlines() {
        const scanlines = document.querySelector('.scanlines');
        if (scanlines) {
            let position = 0;
            setInterval(() => {
                position += 0.5;
                if (position > 4) position = 0;
                scanlines.style.transform = `translateY(${position}px)`;
            }, 50);
        }
    }

    animateScore() {
        const scoreElement = document.getElementById('totalScore');
        if (!scoreElement) return;

        let currentScore = 0;
        const targetScore = this.score;
        const increment = targetScore / 100;
        
        const updateScore = () => {
            if (currentScore < targetScore) {
                currentScore += increment;
                scoreElement.textContent = Math.floor(currentScore).toString().padStart(7, '0');
                requestAnimationFrame(updateScore);
            } else {
                scoreElement.textContent = targetScore.toString().padStart(7, '0');
            }
        };
        
        setTimeout(updateScore, 1000);
    }

    playSound(soundType) {
        try {
            const audio = document.getElementById('gameSound');
            if (audio) {
                audio.currentTime = 0;
                audio.volume = 0.3;
                audio.play();
            }
        } catch (e) {
            console.log('Sound not available:', soundType);
        }
    }

    playTypingSound() {
        // Simulate retro typing sound
        try {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjuV2+3Jaio=');
            audio.volume = 0.1;
            audio.play();
        } catch (e) {
            // Fallback - silent
        }
    }

    returnToPortal() {
        // Stop all effects and sounds
        this.stopBackgroundMusic();
        
        // Transition effect
        document.body.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
        document.body.style.opacity = '0';
        document.body.style.filter = 'blur(10px)';
        
        setTimeout(() => {
            window.location.href = './index.html';
        }, 500);
    }
}

// Simple game classes for mini-games
class SnakeGame {
    constructor(canvasId, fullSize = false) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas?.getContext('2d');
        this.fullSize = fullSize;
        this.running = false;
        
        if (this.canvas && this.ctx) {
            this.setupGame();
        }
    }
    
    setupGame() {
        this.canvas.width = this.fullSize ? 400 : 120;
        this.canvas.height = this.fullSize ? 300 : 80;
        this.gridSize = this.fullSize ? 10 : 4;
        
        this.snake = [{ x: 5, y: 5 }];
        this.direction = { x: 1, y: 0 };
        this.food = { x: 10, y: 10 };
        this.score = 0;
    }
    
    startPreview() {
        if (!this.ctx) return;
        this.drawPreview();
    }
    
    drawPreview() {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw simple snake preview
        this.ctx.fillStyle = '#00ff41';
        this.ctx.fillRect(20, 20, 8, 8);
        this.ctx.fillRect(28, 20, 8, 8);
        this.ctx.fillRect(36, 20, 8, 8);
        
        // Draw food
        this.ctx.fillStyle = '#ff0080';
        this.ctx.fillRect(60, 40, 8, 8);
    }
    
    startGame() {
        if (!this.ctx) return;
        this.running = true;
        this.gameLoop();
    }
    
    stopGame() {
        this.running = false;
    }
    
    gameLoop() {
        if (!this.running) return;
        
        this.update();
        this.draw();
        
        setTimeout(() => {
            requestAnimationFrame(() => this.gameLoop());
        }, 150);
    }
    
    update() {
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Wall collision
        if (head.x < 0 || head.x >= this.canvas.width / this.gridSize ||
            head.y < 0 || head.y >= this.canvas.height / this.gridSize) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            this.generateFood();
        } else {
            this.snake.pop();
        }
    }
    
    draw() {
        if (!this.ctx) return;
        
        // Clear canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#00ff41';
        this.snake.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 1,
                this.gridSize - 1
            );
        });
        
        // Draw food
        this.ctx.fillStyle = '#ff0080';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 1,
            this.gridSize - 1
        );
    }
    
    generateFood() {
        this.food = {
            x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)),
            y: Math.floor(Math.random() * (this.canvas.height / this.gridSize))
        };
    }
    
    gameOver() {
        this.running = false;
        alert(`Game Over! Score: ${this.score}`);
    }
}

class PongGame {
    constructor(canvasId, fullSize = false) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas?.getContext('2d');
        this.fullSize = fullSize;
        
        if (this.canvas && this.ctx) this.setupGame();
    }
    
    setupGame() {
        this.canvas.width = this.fullSize ? 400 : 120;
        this.canvas.height = this.fullSize ? 300 : 80;
    }
    
    startPreview() {
        if (!this.ctx) return;
        this.drawPreview();
    }
    
    drawPreview() {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw paddles
        this.ctx.fillStyle = '#00ff41';
        this.ctx.fillRect(10, 20, 4, 20);
        this.ctx.fillRect(this.canvas.width - 14, 30, 4, 20);
        
        // Draw ball
        this.ctx.fillRect(this.canvas.width / 2, this.canvas.height / 2, 4, 4);
        
        // Draw center line
        for (let i = 0; i < this.canvas.height; i += 8) {
            this.ctx.fillRect(this.canvas.width / 2 - 1, i, 2, 4);
        }
    }
    
    startGame() {
        // Implement full Pong game logic here
        console.log('Pong game started');
    }
    
    stopGame() {
        console.log('Pong game stopped');
    }
}

class TetrisGame {
    constructor(canvasId, fullSize = false) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas?.getContext('2d');
        this.fullSize = fullSize;
        
        if (this.canvas && this.ctx) this.setupGame();
    }
    
    setupGame() {
        this.canvas.width = this.fullSize ? 400 : 120;
        this.canvas.height = this.fullSize ? 300 : 80;
    }
    
    startPreview() {
        if (!this.ctx) return;
        this.drawPreview();
    }
    
    drawPreview() {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw tetris blocks
        const colors = ['#ff0080', '#00ffff', '#ffff00', '#00ff41'];
        for (let i = 0; i < 8; i++) {
            this.ctx.fillStyle = colors[i % colors.length];
            this.ctx.fillRect(10 + (i * 12), 60, 10, 10);
        }
        
        // Draw falling piece
        this.ctx.fillStyle = '#ff8000';
        this.ctx.fillRect(40, 20, 10, 10);
        this.ctx.fillRect(50, 20, 10, 10);
        this.ctx.fillRect(40, 30, 10, 10);
        this.ctx.fillRect(30, 30, 10, 10);
    }
    
    startGame() {
        console.log('Tetris game started');
    }
    
    stopGame() {
        console.log('Tetris game stopped');
    }
}

class InvadersGame {
    constructor(canvasId, fullSize = false) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas?.getContext('2d');
        this.fullSize = fullSize;
        
        if (this.canvas && this.ctx) this.setupGame();
    }
    
    setupGame() {
        this.canvas.width = this.fullSize ? 400 : 120;
        this.canvas.height = this.fullSize ? 300 : 80;
    }
    
    startPreview() {
        if (!this.ctx) return;
        this.drawPreview();
    }
    
    drawPreview() {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw invaders
        this.ctx.fillStyle = '#00ff41';
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 6; col++) {
                this.ctx.fillRect(15 + col * 12, 10 + row * 12, 8, 8);
            }
        }
        
        // Draw player ship
        this.ctx.fillStyle = '#00ffff';
        this.ctx.fillRect(50, this.canvas.height - 15, 12, 8);
        
        // Draw bullets
        this.ctx.fillStyle = '#ffff00';
        this.ctx.fillRect(55, this.canvas.height - 25, 2, 6);
    }
    
    startGame() {
        console.log('Space Invaders game started');
    }
    
    stopGame() {
        console.log('Space Invaders game stopped');
    }
}

// Initialize Arcade World when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.arcadeWorld = new ArcadeWorld();
});

// Add dynamic CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes successBurst {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes pixelGlow {
        0%, 100% { box-shadow: 0 0 5px currentColor; }
        50% { box-shadow: 0 0 15px currentColor, 0 0 25px currentColor; }
    }
    
    .pixel-btn:hover {
        animation: pixelGlow 0.5s ease-in-out;
    }
`;
document.head.appendChild(style);
