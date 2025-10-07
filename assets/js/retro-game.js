// ===============================================
// RETRO SNAKE GAME - LUIS.RETRO v1983
// ===============================================

class RetroSnakeGame {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameRunning = false;
        this.gamePaused = false;
        
        // Game state
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('luis-snake-highscore') || '0');
        this.level = 1;
        this.speed = 200;
        
        // Game grid
        this.gridSize = 20;
        this.gridWidth = 40;
        this.gridHeight = 30;
        
        // Snake
        this.snake = [
            { x: 10, y: 10 }
        ];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        
        // Food
        this.food = { x: 15, y: 15 };
        
        // Colors
        this.colors = {
            snake: '#00ff00',
            snakeHead: '#00ffff',
            food: '#ff00ff',
            background: '#000000',
            grid: '#003300'
        };
        
        this.lastTime = 0;
        this.gameLoop = null;
    }

    initialize() {
        this.canvas = document.getElementById('retroGameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size to match grid
        this.canvas.width = this.gridWidth * this.gridSize;
        this.canvas.height = this.gridHeight * this.gridSize;
        
        this.setupEventListeners();
        this.updateUI();
        this.draw();
        
        console.log('🐍 Snake Neural v2.025 initialized');
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.canvas || document.getElementById('retro-game-container').classList.contains('hidden')) return;
            
            switch(e.key) {
                case 'ArrowUp':
                    if (this.direction.y === 0) this.nextDirection = { x: 0, y: -1 };
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    if (this.direction.y === 0) this.nextDirection = { x: 0, y: 1 };
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    if (this.direction.x === 0) this.nextDirection = { x: -1, y: 0 };
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    if (this.direction.x === 0) this.nextDirection = { x: 1, y: 0 };
                    e.preventDefault();
                    break;
                case ' ':
                    this.togglePause();
                    e.preventDefault();
                    break;
                case 'r':
                case 'R':
                    this.resetGame();
                    e.preventDefault();
                    break;
            }
        });
    }

    start() {
        if (this.gameRunning) return;
        
        this.gameRunning = true;
        this.gamePaused = false;
        this.updateGameStatus('Jugando');
        
        this.gameLoop = setInterval(() => {
            if (!this.gamePaused) {
                this.update();
                this.draw();
            }
        }, this.speed);
    }

    stop() {
        this.gameRunning = false;
        this.gamePaused = false;
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        this.updateGameStatus('Detenido');
    }

    togglePause() {
        if (!this.gameRunning) {
            this.start();
            return;
        }
        
        this.gamePaused = !this.gamePaused;
        this.updateGameStatus(this.gamePaused ? 'Pausado' : 'Jugando');
    }

    resetGame() {
        this.stop();
        
        this.score = 0;
        this.level = 1;
        this.speed = 200;
        this.snake = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.generateFood();
        
        this.updateUI();
        this.updateGameStatus('Listo');
        this.draw();
    }

    update() {
        // Update direction
        this.direction = { ...this.nextDirection };
        
        // Move snake
        const head = { ...this.snake[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;
        
        // Check wall collision
        if (head.x < 0 || head.x >= this.gridWidth || head.y < 0 || head.y >= this.gridHeight) {
            this.gameOver();
            return;
        }
        
        // Check self collision
        if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameOver();
            return;
        }
        
        this.snake.unshift(head);
        
        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.generateFood();
            this.checkLevelUp();
        } else {
            this.snake.pop();
        }
        
        this.updateUI();
    }

    generateFood() {
        do {
            this.food = {
                x: Math.floor(Math.random() * this.gridWidth),
                y: Math.floor(Math.random() * this.gridHeight)
            };
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }

    checkLevelUp() {
        const newLevel = Math.floor(this.score / 100) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.speed = Math.max(50, 200 - (this.level - 1) * 20);
            
            // Restart game loop with new speed
            if (this.gameLoop) {
                clearInterval(this.gameLoop);
                this.gameLoop = setInterval(() => {
                    if (!this.gamePaused) {
                        this.update();
                        this.draw();
                    }
                }, this.speed);
            }
        }
    }

    gameOver() {
        this.stop();
        this.updateGameStatus('Game Over');
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('luis-snake-highscore', this.highScore.toString());
            this.showMessage('🏆 ¡NUEVO RÉCORD! 🏆');
        } else {
            this.showMessage('💀 GAME OVER 💀');
        }
        
        this.updateUI();
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = this.colors.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();
        
        // Draw food
        this.drawFood();
        
        // Draw snake
        this.drawSnake();
        
        // Draw game info if paused or game over
        if (this.gamePaused && this.gameRunning) {
            this.drawMessage('⏸️ PAUSA ⏸️\nESPACIO para continuar');
        } else if (!this.gameRunning && this.snake.length > 1) {
            this.drawMessage('💀 GAME OVER 💀\nR para reiniciar\nESPACIO para jugar');
        } else if (!this.gameRunning) {
            this.drawMessage('🎮 SNAKE NEURAL 🎮\nESPACIO para empezar\nFlechas para mover');
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = this.colors.grid;
        this.ctx.lineWidth = 0.5;
        
        for (let x = 0; x <= this.gridWidth; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.gridSize, 0);
            this.ctx.lineTo(x * this.gridSize, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.gridHeight; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.gridSize);
            this.ctx.lineTo(this.canvas.width, y * this.gridSize);
            this.ctx.stroke();
        }
    }

    drawSnake() {
        this.snake.forEach((segment, index) => {
            const x = segment.x * this.gridSize;
            const y = segment.y * this.gridSize;
            
            // Snake head
            if (index === 0) {
                this.ctx.fillStyle = this.colors.snakeHead;
                this.ctx.fillRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2);
                
                // Add glow effect
                this.ctx.shadowColor = this.colors.snakeHead;
                this.ctx.shadowBlur = 10;
                this.ctx.fillRect(x + 3, y + 3, this.gridSize - 6, this.gridSize - 6);
                this.ctx.shadowBlur = 0;
            } else {
                // Snake body
                this.ctx.fillStyle = this.colors.snake;
                this.ctx.fillRect(x + 2, y + 2, this.gridSize - 4, this.gridSize - 4);
            }
        });
    }

    drawFood() {
        const x = this.food.x * this.gridSize;
        const y = this.food.y * this.gridSize;
        
        this.ctx.fillStyle = this.colors.food;
        this.ctx.shadowColor = this.colors.food;
        this.ctx.shadowBlur = 15;
        
        // Draw pulsing food
        const pulse = Math.sin(Date.now() * 0.01) * 0.2 + 0.8;
        const size = this.gridSize * pulse;
        const offset = (this.gridSize - size) / 2;
        
        this.ctx.fillRect(x + offset, y + offset, size, size);
        this.ctx.shadowBlur = 0;
    }

    drawMessage(message) {
        const lines = message.split('\n');
        const lineHeight = 30;
        const totalHeight = lines.length * lineHeight;
        const startY = (this.canvas.height - totalHeight) / 2;
        
        // Background
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, startY - 20, this.canvas.width, totalHeight + 40);
        
        // Border
        this.ctx.strokeStyle = '#00ffff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(10, startY - 15, this.canvas.width - 20, totalHeight + 30);
        
        // Text
        this.ctx.fillStyle = '#00ffff';
        this.ctx.font = 'bold 20px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 5;
        
        lines.forEach((line, index) => {
            this.ctx.fillText(line, this.canvas.width / 2, startY + index * lineHeight + 20);
        });
        
        this.ctx.shadowBlur = 0;
        this.ctx.textAlign = 'left';
    }

    showMessage(text) {
        // Could add temporary message overlay here
        console.log('🎮 Game Message:', text);
    }

    updateUI() {
        document.getElementById('game-score').textContent = this.score;
        document.getElementById('game-highscore').textContent = this.highScore;
        document.getElementById('game-level').textContent = this.level;
    }

    updateGameStatus(status) {
        document.getElementById('game-status').textContent = status;
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.retroGame = new RetroSnakeGame();
    console.log('🕹️ Retro Game System initialized');
});
