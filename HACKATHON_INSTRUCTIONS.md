# 🎮 Hackathon Team Instructions

Welcome to the Regnology Idle Page Browser Game Hackathon! This guide will help you understand what you can modify for your game.

📋 **First time here?** Start with the **[Setup Guide](SETUP.md)** to get your environment ready!

## 📁 Project Structure

```
idle-page-browser-game/
├── 🚫 do-not-modify/           # Core infrastructure - DO NOT MODIFY
│   ├── js/
│   │   └── oru-web-components.bundle.js  # ORU components
│   ├── styles/
│   │   ├── oru-overrides.css   # ORU component styles
│   │   └── oru-web-components.styles.css  # ORU design system
│   ├── package.json            # Project dependencies
│   ├── setup.js                # Node.js setup script
│   └── jsconfig.json           # JavaScript config
├── ✅ src/                     # Your game files - MODIFY THESE
│   ├── js/
│   │   ├── app.js              # Main application logic (you can modify)
│   │   └── game.js             # Your game logic goes here
│   └── styles/
│       ├── layout.css          # Page layout (you can modify this)
│       └── game.css            # Your game styles go here
├── index.html                  # Main HTML (minimal changes only)
├── SETUP.md                    # Setup instructions
└── README.md                   # Project overview
```

## ✅ What You CAN Modify

### 🎯 Primary Game Files (Focus Here!)
- **`src/js/game.js`** - Replace the `BrowserGame` class with your game
- **`src/styles/game.css`** - Add all your game-specific styles here
- **`src/styles/layout.css`** - Modify page layout and game area styling

### 🔧 Advanced Modifications (Optional)
- **`src/js/app.js`** - Main application logic, instance simulation, event handling
- **`index.html`** - Only modify the game content inside `<div class="browser-game-placeholder">`
- Add new files in the `src/` directory if needed

## 🚫 What You CANNOT Modify

- **`do-not-modify/`** folder - Core infrastructure that ensures your game works with the ORU startup component
- **ORU web component files** - These provide the idle page framework
- **Core HTML structure** - The `<oru-web-startup>` component must remain intact

## 🚀 Quick Start

**Prerequisites**: Node.js (14+) and npm  
**Haven't set up yet?** See **[Setup Guide](SETUP.md)** for detailed instructions.

### 3-Step Setup:
```bash
npm install       # Install dependencies
npm run setup     # Extract and setup ORU components  
npm run serve     # Start development server (opens browser automatically)
```

### Then Focus On:
1. **`src/js/game.js`** - Replace the example game with your creation
2. **`src/styles/game.css`** - Style your game
3. **`src/styles/layout.css`** - Adjust page layout if needed
4. **Test frequently** - Save and refresh browser to see changes

💡 **Need help?** Check **[Setup Guide](SETUP.md)** for troubleshooting.

## 🎮 Game Development Tips

### Your Game Class
Replace the `BrowserGame` class in `src/js/game.js`:

```javascript
class BrowserGame {
    constructor() {
        this.gameArea = document.getElementById('gameArea');
        this.startBtn = document.getElementById('startGameBtn');
        // Your initialization here
    }
    
    startGame() {
        // Your game start logic
    }
    
    endGame() {
        // Your game end logic
        // Dispatch this event when game ends:
        document.dispatchEvent(new CustomEvent('gameOver', {
            detail: { score: this.score }
        }));
    }
}
```

### Game Area
Your game renders inside the `gameArea` div:
```javascript
const gameArea = document.getElementById('gameArea');
gameArea.innerHTML = '<canvas id="myGame" width="400" height="300"></canvas>';
```

### Available Events
- **Game Over**: Dispatch `gameOver` event with score
- **Instance Ready**: Listen for `instanceReady` event (happens automatically)

## 🎯 Game Ideas
- Snake, Tetris, Pong, Flappy Bird
- Memory games, quizzes, word games
- Click games, incremental games
- Canvas-based arcade games

## 🏆 Judging Criteria
- **Fun Factor** - Is it enjoyable?
- **Visual Appeal** - Does it look good?
- **User Experience** - Smooth and intuitive?
- **Innovation** - Creative mechanics?

##  Need Help?

### 📖 Documentation
- **[Setup Guide](SETUP.md)** - Installation, troubleshooting, and development tips
- **[Project Overview](README.md)** - What this template provides and game ideas

### 🔍 In This Project  
- Check the example game in `src/js/game.js`
- Review the app logic in `src/js/app.js` (handles instance simulation)
- Look at existing styles in `src/styles/game.css`
- Review the template layout in `src/styles/layout.css`

### 🤝 Get Support
- Ask your team members or hackathon organizers
- Use browser dev tools (F12) to debug JavaScript errors

## 🎉 Good Luck!

Remember: **Keep it simple, have fun, and be creative!** 

You have everything you need to build an awesome browser game. The infrastructure handles the idle page integration - you just focus on making a great game! 🚀
