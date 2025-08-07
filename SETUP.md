# 🚀 Setup Guide - Regnology Idle Page Browser Game

Welcome to the Regnology Hackathon! Follow these simple steps to get your game development environment ready.

📖 **After setup**: Read **[Hackathon Instructions](HACKATHON_INSTRUCTIONS.md)** for game development guidance.

## 📋 Prerequisites

### Required Software
- **Node.js** (version 14 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`
- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

### Verify Prerequisites
Open your terminal/command prompt and run:
```bash
node --version
npm --version
```
You should see version numbers for both commands.

## 🛠 Quick Setup (3 steps!)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Setup Script
```bash
npm run setup
```

### 3. Start Development Server
```bash
npm run serve
```

That's it! Your browser should automatically open to `http://localhost:8080`

## 🎮 Start Building Your Game

Once the server is running:

1. **Open your code editor** to the project folder
2. **Edit `src/js/game.js`** - Replace the example game with your awesome creation
3. **Style in `src/styles/game.css`** - Make it look amazing
4. **Test frequently** - Save and refresh your browser to see changes

## 🔧 Available Commands

```bash
npm run serve    # Start development server (with auto-open browser)
npm start        # Same as npm run serve
npm run setup    # Run setup script (only needed once)
```

## 📁 What You'll Be Working With

```
src/
├── js/
│   └── game.js        # 👈 YOUR GAME LOGIC GOES HERE
└── styles/
    ├── game.css       # 👈 YOUR GAME STYLES GO HERE
    └── layout.css     # 👈 PAGE LAYOUT (also editable)
```

## 🆘 Troubleshooting

### Port 8080 Already in Use?
```bash
# Use a different port
npx http-server -p 3000 -c-1 -o
```

### ORU Components Missing?
If you see component-related errors:
1. Ensure `oru-web-components-3.6.0.tgz` is in the `do-not-modify/` folder
2. Re-run: `npm run setup`

### Browser Doesn't Auto-Open?
Manually navigate to: `http://localhost:8080`

### Cache Issues?
The server runs with cache disabled (`-c-1`), but you can also:
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Open browser dev tools and disable cache

## 🎯 Development Tips

### Live Development
- Save your files and refresh the browser to see changes
- Keep browser dev tools open to catch any JavaScript errors
- Test on different screen sizes (mobile/desktop)

### Game Structure
Your game should follow this pattern:
```javascript
class BrowserGame {
    constructor() {
        this.gameArea = document.getElementById('gameArea');
        // Initialize your game
    }
    
    startGame() {
        // Game start logic
    }
    
    endGame() {
        // Clean up and show results
    }
}
```

## 📖 Need More Help?

### 📚 Documentation
- **[Hackathon Instructions](HACKATHON_INSTRUCTIONS.md)** - What to modify and game development tips
- **[Project Overview](README.md)** - Template features and game ideas

### 🤝 Get Support  
- **Ask**: Your team members or hackathon organizers
- **Debug**: Use browser dev tools (F12) to see console errors
- **Check**: The example game in `src/js/game.js` for reference

## 🏆 Ready to Build Something Awesome?

You're all set! Focus on:
- **Fun gameplay** - Keep it simple but engaging
- **Visual appeal** - Use CSS to make it look great  
- **User experience** - Smooth controls and clear feedback

**Good luck and have fun building! 🎮✨**
