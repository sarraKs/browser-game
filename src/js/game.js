/**
 * Browser Game Template
 * A simple example game that teams can replace with their own implementation
 */

class BrowserGame {
    constructor() {
        this.gameArea = document.getElementById('gameArea');
        this.startBtn = document.getElementById('startGameBtn');
        this.isPlaying = false;
        this.score = 0;
        
        this.init();
    }

    init() {
        console.log('🎮 Initializing Browser Game...');
        
        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => this.startGame());
        }
        
        // Example: Simple click game
        this.setupClickGame();
    }

    setupClickGame() {
        // This is a simple example - replace with your own game logic!
        console.log('Setting up example click game...');
    }

    startGame() {
        if (this.isPlaying) return;
        
        this.isPlaying = true;
        this.score = 0;
        
        console.log('🎯 Starting game...');
        
        // Clear game area and setup your game
        this.gameArea.innerHTML = `
            <div class="game-active">
                <div class="game-score">Score: <span id="scoreDisplay">0</span></div>
                <div class="game-board" id="gameBoard">
                    <div class="click-target" id="clickTarget">Click me!</div>
                </div>
                <button id="endGameBtn" class="game-button">End Game</button>
            </div>
        `;
        
        // Setup game logic
        this.setupGameLogic();
        
        // Hide start button
        if (this.startBtn) {
            this.startBtn.style.display = 'none';
        }
    }

    setupGameLogic() {
        const clickTarget = document.getElementById('clickTarget');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const endGameBtn = document.getElementById('endGameBtn');
        
        // Simple click game example
        if (clickTarget) {
            clickTarget.addEventListener('click', () => {
                this.score += 10;
                scoreDisplay.textContent = this.score;
                
                // Move target to random position
                this.moveTarget(clickTarget);
                
                // Add some visual feedback
                clickTarget.style.background = this.getRandomColor();
            });
        }
        
        if (endGameBtn) {
            endGameBtn.addEventListener('click', () => this.endGame());
        }
        
        // Auto-end game after 60 seconds
        setTimeout(() => {
            if (this.isPlaying) {
                this.endGame();
            }
        }, 60000);
    }

    moveTarget(target) {
        const gameBoard = document.getElementById('gameBoard');
        const boardRect = gameBoard.getBoundingClientRect();
        
        const maxX = boardRect.width - 100;
        const maxY = boardRect.height - 40;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        target.style.position = 'absolute';
        target.style.left = newX + 'px';
        target.style.top = newY + 'px';
    }

    getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#fecca7', '#ff9ff3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    endGame() {
        this.isPlaying = false;
        
        console.log('🏁 Game ended! Final score:', this.score);
        
        // Show final score and restart option
        this.gameArea.innerHTML = `
            <div class="game-over">
                <div class="game-title">🎉 Game Over!</div>
                <div class="final-score">Final Score: ${this.score}</div>
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
        // Reset game area to initial state
        this.gameArea.innerHTML = '<div>Your game goes here! 🎲</div>';
        
        // Show start button again
        if (this.startBtn) {
            this.startBtn.style.display = 'block';
        }
    }
}
