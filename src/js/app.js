/**
 * Regnology Idle Page Browser Game
 * Main Application Entry Point
 */

class IdlePageApp {
    constructor() {
        this.game = null;
        this.instanceStatus = 'starting'; // starting, ready, error
        this.init();
    }

    init() {
        console.log('🚀 Regnology Idle Page Game - Initializing...');
        
        // Initialize the game when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        // Initialize game
        this.game = new BrowserGame();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Simulate instance startup process
        this.simulateInstanceStartup();
        
        console.log('✅ Idle Page App initialized successfully!');
    }

    setupEventListeners() {
        // Listen for game events
        document.addEventListener('gameOver', (event) => {
            console.log('Game Over! Score:', event.detail.score);
        });

        // Listen for instance ready events (simulate)
        document.addEventListener('instanceReady', () => {
            this.handleInstanceReady();
        });
    }

    simulateInstanceStartup() {
        console.log('⏳ Simulating instance startup...');
        
        // Simulate 2-4 minute startup time (reduced for demo)
        const startupTime = Math.random() * 30000 + 10000; // 10-40 seconds for demo
        
        setTimeout(() => {
            this.instanceStatus = 'ready';
            document.dispatchEvent(new CustomEvent('instanceReady'));
        }, startupTime);
    }

    handleInstanceReady() {
        console.log('✅ Instance is ready!');
        
        // Update UI to show instance is ready
        const statusMessage = document.querySelector('.status-message h1');
        if (statusMessage) {
            statusMessage.textContent = '✅ Your instance is ready!';
        }
        

    }

    redirectToInstance() {
        console.log('🔄 Redirecting to instance...');
        // In production, this would redirect to the actual instance
        alert('In production, this would redirect you to your ready instance!');
    }
}

// Initialize the app when script loads
new IdlePageApp();
