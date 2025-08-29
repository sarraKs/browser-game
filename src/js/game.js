/**
 * Rcloud Sweeper - Space Fighter Game
 * Guide your fighter through airspace, neutralizing all hostile contacts.
 * Avoid direct contact while clearing each wave of threats from the skies above.
 */

class BrowserGame {
    constructor() {
        this.gameArea = document.getElementById('gameArea');
        this.startBtn = document.getElementById('startGameBtn');
        this.isPlaying = false;
        this.score = 0;
        this.lives = 3;
        
        // Game objects
        this.canvas = null;
        this.ctx = null;
        this.fighter = null;
        this.missiles = [];
        this.enemies = [];
        this.explosions = [];
        
        // Game timing
        this.lastMissileTime = 0;
        this.lastEnemyTime = 0;
        this.gameTime = 0;
        this.animationId = null;
        
        // Mouse position
        this.mouseX = 0;
        
        this.init();
    }

    init() {
        console.log('🎮 Initializing Rcloud Sweeper...');
        
        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => this.startGame());
        }
        
        // Simplified game menu - just show start game
        this.gameArea.innerHTML = '';
    }

    startGame() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.score = 0;
        this.lives = 3;
        this.missiles = [];
        this.enemies = [];
        this.explosions = [];
        this.gameTime = 0;
        this.lastMissileTime = 0;
        this.lastEnemyTime = 0;
        
        console.log('🎯 Starting Rcloud Sweeper...');
        
        // Setup game canvas with responsive sizing
        this.gameArea.innerHTML = `
            <div class="game-active">
                <div class="game-hud">
                    <div class="game-score">Score: <span id="scoreDisplay">0</span></div>
                    <div class="game-lives">Lives: <span id="livesDisplay">3</span></div>
                </div>
                <canvas id="gameCanvas"></canvas>
                <button id="endGameBtn" class="game-button game-end-btn">End Game</button>
            </div>
        `;
        
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size based on available space
        this.resizeCanvas();
        
        // Initialize fighter
        this.fighter = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 40,
            width: 40,
            height: 30,
            speed: 5
        };
        
        // Setup event listeners
        this.setupGameControls();
        
        // Hide start button
        if (this.startBtn) {
            this.startBtn.style.display = 'none';
        }
        
        // Start game loop
        this.gameLoop();
    }

    setupGameControls() {
        const endGameBtn = document.getElementById('endGameBtn');
        
        // Mouse control
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
        });
        
        // Touch control for mobile
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouseX = touch.clientX - rect.left;
        });
        
        if (endGameBtn) {
            endGameBtn.addEventListener('click', () => this.endGame());
        }
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        // Calculate available space - ensure button is visible and no scrolling
        const container = this.gameArea;
        const containerRect = container.getBoundingClientRect();
        
        // Account for HUD (40px) and End Game button (35px) and margins
        const totalUIHeight = 75;
        
        // Calculate max dimensions to fit in container without scrolling
        const maxWidth = Math.min(500, containerRect.width - 20);
        const maxHeight = Math.min(250, containerRect.height - totalUIHeight, window.innerHeight * 0.3);
        
        this.canvas.width = maxWidth;
        this.canvas.height = maxHeight;
        
        // Update fighter position if needed
        if (this.fighter) {
            this.fighter.y = this.canvas.height - 40;
            if (this.fighter.x > this.canvas.width) {
                this.fighter.x = this.canvas.width / 2;
            }
        }
    }

    gameLoop() {
        if (!this.isPlaying) return;
        
        this.gameTime += 16; // Approximately 60 FPS
        
        // Clear canvas
        this.ctx.fillStyle = '#0a0a2e';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw stars background
        this.drawStars();
        
        // Update and draw game objects
        this.updateFighter();
        this.updateMissiles();
        this.updateEnemies();
        this.updateExplosions();
        
        // Check collisions
        this.checkCollisions();
        
        // Spawn new objects
        this.spawnMissile();
        this.spawnEnemy();
        
        // Draw everything
        this.drawFighter();
        this.drawMissiles();
        this.drawEnemies();
        this.drawExplosions();
        
        // Update HUD
        document.getElementById('scoreDisplay').textContent = this.score;
        document.getElementById('livesDisplay').textContent = this.lives;
        
        // Check game over
        if (this.lives <= 0) {
            this.endGame();
            return;
        }
        
        // Continue game loop
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    drawStars() {
        this.ctx.fillStyle = 'white';
        for (let i = 0; i < 50; i++) {
            const x = (i * 73 + this.gameTime / 50) % this.canvas.width;
            const y = (i * 37) % this.canvas.height;
            this.ctx.fillRect(x, y, 1, 1);
        }
    }

    updateFighter() {
        // Smooth movement towards mouse position
        const targetX = this.mouseX || this.canvas.width / 2;
        const diff = targetX - this.fighter.x;
        
        if (Math.abs(diff) > 3) {
            this.fighter.x += diff * 0.1;
        }
        
        // Keep fighter within bounds
        this.fighter.x = Math.max(this.fighter.width / 2, 
                                  Math.min(this.canvas.width - this.fighter.width / 2, 
                                          this.fighter.x));
    }

    drawFighter() {
        const x = this.fighter.x;
        const y = this.fighter.y;
        const w = this.fighter.width;
        const h = this.fighter.height;
        
        // Add glow effect to make spaceship more visible
        this.ctx.shadowColor = '#4ecdc4';
        this.ctx.shadowBlur = 10;
        
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.strokeStyle = '#45b7d1';
        this.ctx.lineWidth = 3;
        
        // Draw fighter body (triangle)
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - h/2);
        this.ctx.lineTo(x - w/2, y + h/2);
        this.ctx.lineTo(x + w/2, y + h/2);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
        // Draw cockpit
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 6, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Reset shadow
        this.ctx.shadowBlur = 0;
    }

    spawnMissile() {
        // Auto-fire missile continuously - rapid fire!
        if (this.gameTime - this.lastMissileTime > 100) {  // Fire every 100ms
            this.missiles.push({
                x: this.fighter.x,
                y: this.fighter.y - 15,
                width: 3,
                height: 10,
                speed: 7
            });
            this.lastMissileTime = this.gameTime;
        }
    }

    updateMissiles() {
        this.missiles = this.missiles.filter(missile => {
            missile.y -= missile.speed;
            return missile.y > -10;
        });
    }

    drawMissiles() {
        this.ctx.fillStyle = '#ffd93d';
        this.ctx.shadowColor = '#ffd93d';
        this.ctx.shadowBlur = 5;
        
        this.missiles.forEach(missile => {
            this.ctx.fillRect(missile.x - missile.width/2, 
                            missile.y - missile.height/2, 
                            missile.width, 
                            missile.height);
        });
        
        this.ctx.shadowBlur = 0;
    }

    spawnEnemy() {
        // Spawn enemies with increasing frequency
        const spawnDelay = Math.max(500, 2000 - this.gameTime / 30);
        
        if (this.gameTime - this.lastEnemyTime > spawnDelay) {
            this.enemies.push({
                x: Math.random() * (this.canvas.width - 40) + 20,
                y: -20,
                width: 25,
                height: 25,
                speed: 2 + Math.random() * 2 + Math.min(this.gameTime / 10000, 3),
                wobble: Math.random() * Math.PI
            });
            this.lastEnemyTime = this.gameTime;
        }
    }

    updateEnemies() {
        this.enemies = this.enemies.filter(enemy => {
            // Move directly towards the player's spaceship
            const dx = this.fighter.x - enemy.x;
            const dy = this.fighter.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 5) {
                // Strong movement towards player
                const moveX = (dx / distance) * enemy.speed * 0.8;
                const moveY = (dy / distance) * enemy.speed;
                
                enemy.x += moveX;
                enemy.y += moveY;
            } else {
                enemy.y += enemy.speed;
            }
            
            return enemy.y < this.canvas.height + 20;
        });
    }

    drawEnemies() {
        this.enemies.forEach(enemy => {
            const x = enemy.x;
            const y = enemy.y;
            const w = enemy.width;
            const h = enemy.height;
            
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.strokeStyle = '#ff5252';
            this.ctx.lineWidth = 2;
            
            // Draw enemy ship (inverted triangle)
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + h/2);
            this.ctx.lineTo(x - w/2, y - h/2);
            this.ctx.lineTo(x + w/2, y - h/2);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.stroke();
            
            // Draw enemy cockpit
            this.ctx.fillStyle = '#c92a2a';
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    checkCollisions() {
        // Check missile-enemy collisions
        this.missiles.forEach((missile, mIndex) => {
            this.enemies.forEach((enemy, eIndex) => {
                if (this.checkCollision(missile, enemy)) {
                    // Create explosion
                    this.explosions.push({
                        x: enemy.x,
                        y: enemy.y,
                        radius: 0,
                        maxRadius: 30,
                        alpha: 1
                    });
                    
                    // Remove missile and enemy
                    this.missiles.splice(mIndex, 1);
                    this.enemies.splice(eIndex, 1);
                    
                    // Increase score
                    this.score += 10;
                }
            });
        });
        
        // Check fighter-enemy collisions
        this.enemies.forEach((enemy, index) => {
            if (this.checkCollision(this.fighter, enemy)) {
                // Create explosion
                this.explosions.push({
                    x: enemy.x,
                    y: enemy.y,
                    radius: 0,
                    maxRadius: 40,
                    alpha: 1,
                    color: '#ff6b6b'
                });
                
                // Remove enemy
                this.enemies.splice(index, 1);
                
                // Lose a life
                this.lives--;
                
                // Flash effect
                this.canvas.style.animation = 'flash 0.3s';
                setTimeout(() => {
                    this.canvas.style.animation = '';
                }, 300);
            }
        });
    }

    checkCollision(obj1, obj2) {
        return Math.abs(obj1.x - obj2.x) < (obj1.width + obj2.width) / 2 &&
               Math.abs(obj1.y - obj2.y) < (obj1.height + obj2.height) / 2;
    }

    updateExplosions() {
        this.explosions = this.explosions.filter(explosion => {
            explosion.radius += 2;
            explosion.alpha -= 0.05;
            return explosion.alpha > 0;
        });
    }

    drawExplosions() {
        this.explosions.forEach(explosion => {
            this.ctx.strokeStyle = explosion.color || '#ffd93d';
            this.ctx.globalAlpha = explosion.alpha;
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Inner circle
            this.ctx.beginPath();
            this.ctx.arc(explosion.x, explosion.y, explosion.radius * 0.6, 0, Math.PI * 2);
            this.ctx.stroke();
        });
        
        this.ctx.globalAlpha = 1;
    }

    endGame() {
        this.isPlaying = false;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        console.log('🏁 Game ended! Final score:', this.score);
        
        // Show final score and restart option
        this.gameArea.innerHTML = `
            <div class="game-over">
                <div class="game-title">🎮 Game Over!</div>
                <div class="final-score">Final Score: ${this.score}</div>
                <div class="game-stats">
                    <p>You survived for ${Math.floor(this.gameTime / 1000)} seconds!</p>
                </div>
                <button id="restartBtn" class="game-button">Play Again</button>
            </div>
        `;
        
        // Setup restart functionality
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => this.restartGame());
        }
        
        // Dispatch game over event
        document.dispatchEvent(new CustomEvent('gameOver', {
            detail: { score: this.score }
        }));
    }

    restartGame() {
        // Reset game area to initial state - simplified
        this.gameArea.innerHTML = '';
        
        // Show start button again
        if (this.startBtn) {
            this.startBtn.style.display = 'block';
        }
    }
}