#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Regnology Idle Page Browser Game...\n');

// Check if we're in the right directory
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ Error: package.json not found. Please run this script from the project root directory.');
    process.exit(1);
}

// Check if ORU components tar file exists
const oruTarPath = path.join(__dirname, 'do-not-modify', 'oru-web-components-3.6.0.tgz');
if (!fs.existsSync(oruTarPath)) {
    console.log('⚠️  ORU components tar file not found. Checking for extracted files...');
    
    // Check if files are already extracted
    const bundlePath = path.join(__dirname, 'do-not-modify', 'js', 'oru-web-components.bundle.js');
    const stylesPath = path.join(__dirname, 'do-not-modify', 'styles', 'oru-web-components.styles.css');
    
    if (fs.existsSync(bundlePath) && fs.existsSync(stylesPath)) {
        console.log('✅ ORU components already extracted and in place.');
    } else {
        console.log('❌ ORU components not found. Please ensure oru-web-components-3.6.0.tgz is in the do-not-modify folder.');
        process.exit(1);
    }
} else {
    console.log('📦 Extracting ORU components...');
    try {
        // Extract tar file (using tar command which is available on Windows 10+ and Unix systems)
        execSync(`tar -xzf "${oruTarPath}" -C "${path.join(__dirname, 'do-not-modify')}"`, { stdio: 'inherit' });
        
        // Move files to correct locations if needed
        const extractedPath = path.join(__dirname, 'do-not-modify', 'package');
        if (fs.existsSync(extractedPath)) {
            // Move files from extracted package to correct locations
            console.log('📁 Organizing extracted files...');
            
            // Create directories if they don't exist
            const jsDir = path.join(__dirname, 'do-not-modify', 'js');
            const stylesDir = path.join(__dirname, 'do-not-modify', 'styles');
            
            if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir, { recursive: true });
            if (!fs.existsSync(stylesDir)) fs.mkdirSync(stylesDir, { recursive: true });
            
            // Move files (this would need to be adjusted based on actual package structure)
            console.log('ℹ️  Please manually organize the extracted files into js/ and styles/ folders as needed.');
        }
        
        console.log('✅ ORU components extracted successfully.');
    } catch (error) {
        console.error('❌ Error extracting ORU components:', error.message);
        console.log('ℹ️  You may need to manually extract the files.');
    }
}

console.log('\n🎮 Setup complete! Next steps:');
console.log('1. Run: npm run serve');
console.log('2. Open your browser to: http://localhost:8080');
console.log('3. Start building your awesome game in src/js/game.js');
console.log('\n📖 Check HACKATHON_INSTRUCTIONS.md for detailed guidance.');
console.log('\nHappy hacking! 🚀');
