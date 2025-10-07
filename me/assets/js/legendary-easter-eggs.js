// ===========================================
// LEGENDARY TECH EASTER EGGS - PORTFOLIO
// ===========================================

class LegendaryEasterEggs {
    constructor() {
        this.konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.konamiSequence = [];
        this.secretsUnlocked = [];
        this.initializeEasterEggs();
    }

    initializeEasterEggs() {
        this.setupKonamiCode();
        this.setupSecretCommands();
        this.addTechReferences();
        this.setupGlitchEffects();
        this.addHackerMode();
    }

    // KONAMI CODE - God Mode Activation
    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            this.konamiSequence.push(e.keyCode);
            if (this.konamiSequence.length > this.konamiCode.length) {
                this.konamiSequence.shift();
            }
            
            if (JSON.stringify(this.konamiSequence) === JSON.stringify(this.konamiCode)) {
                this.activateGodMode();
            }
        });
    }

    activateGodMode() {
        if (this.secretsUnlocked.includes('godmode')) return;
        
        this.secretsUnlocked.push('godmode');
        
        // Visual transformation
        document.body.classList.add('god-mode');
        
        // Show epic message
        this.showEpicMessage(
            '🎮 GOD MODE ACTIVATED', 
            'Konami Code Master Detected!\nAll secrets unlocked. You are the chosen one.',
            () => {
                this.unlockAllSecrets();
            }
        );

        // Add retro gaming effects
        this.addRetroGamingEffects();
    }

    unlockAllSecrets() {
        // Unlock Matrix mode
        this.activateMatrixArchitect();
        
        // Unlock secret terminal commands
        this.addSecretTerminalCommands();
        
        // Unlock hidden project
        this.revealSecretProject();
        
        // Add achievement notification
        this.showAchievement('🏆 ALL SECRETS UNLOCKED', 'True Hacker Status Achieved');
    }

    // MATRIX ARCHITECT MODE
    activateMatrixArchitect() {
        const architectCode = `
// THE ARCHITECT SPEAKS...
console.log("Hello, Mr. Anderson...");
console.log("You've been living in a dream world, Neo...");
console.log("This is your last chance...");
console.log("After this, there is no going back...");

// CHOOSE YOUR PILL
const redPill = () => {
    console.log("🔴 Welcome to the REAL world of Luis Alberto's code...");
    // Reveal hidden code architecture
};

const bluePill = () => {
    console.log("🔵 Back to the comfortable lie of normal portfolios...");
    // Reset to normal mode
};

// THE CHOICE IS YOURS
// redPill() or bluePill()
        `;
        
        console.log(architectCode);
        
        // Add Matrix rain effect
        this.intensifyMatrixRain();
        
        // Transform navigation
        this.addMatrixNavigation();
    }

    // SECRET TERMINAL COMMANDS
    addSecretTerminalCommands() {
        const secretCommands = {
            'neo': () => `
🕴️ THE ONE DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"There is a difference between knowing the path and walking the path."

Luis Alberto's Journey:
├── 2009: Took the red pill (started programming)
├── 2018: Escaped the Matrix (advanced to systems development)  
├── 2023: Became The Architect (technical architecture role)
└── 2024: Now teaching others to see the code behind the code

🔴 Current Mission: Revolutionizing digital transformation at Santander
            `,
            
            'morpheus': () => `
🥽 MORPHEUS MODE ACTIVATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"What is real? How do you define real?"

If you're talking about what you can feel, taste, smell, or see...
Then real is simply electrical signals interpreted by your brain.

Luis Alberto's Reality:
├── FastAPI backends that never crash ✓
├── Neural networks that actually learn ✓  
├── Code that self-documents ✓
└── 16 years of digital evolution ✓

💊 "This is your last chance. After this, there is no going back."
            `,
            
            'architect': () => `
👴 THE ARCHITECT SPEAKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"The Matrix is older than you know..."

System Architecture Analysis:
├── Santander Digital Services Matrix: 16 years of evolution
├── Neural Network Integration: 6-layer memory system
├── Code Anomalies Detected: 0 (perfect architecture)
└── Human Potential: Exceeded parameters

"You are not here by chance. You are here because you have 
the gift of seeing beyond the code. The question is: 
Are you ready to use it?"

🏗️ Current Project: Rebuilding the Matrix... in JavaScript
            `,
            
            'trinity': () => `
🖤 TRINITY ACCESS GRANTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Dodge this."

Terminal Access: FULL
Security Level: ROOT
Encryption: QUANTUM

Luis Alberto's Arsenal:
├── Python/FastAPI: Level 95/100 🐍
├── JavaScript/Angular: Level 85/100 ⚡
├── Docker/Kubernetes: Level 90/100 🐳
├── Neural Networks: Level 75/100 🧠
└── Coffee Dependency: Level 100/100 ☕

💀 "The Matrix has you... but you have the Matrix too."
            `,
            
            'agent': () => `
🕴️ AGENT SMITH DETECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Mr. Anderson... We've been expecting you."

CORPORATE INFILTRATION STATUS:
├── Target: Santander Digital Services ✓ INFILTRATED
├── Position: Technical Architect ✓ ACHIEVED  
├── Mission: Transform legacy systems ✓ IN PROGRESS
├── Resistance: Minimal (humans love good code)
└── Virus Spread: 130+ automated emails/day

⚠️ WARNING: Subject shows signs of... evolution.
   Recommend immediate promotion to prevent system overflow.

🤖 "We are not human, Mr. Anderson. We are developers."
            `,
            
            '42': () => `
🌌 THE ANSWER TO EVERYTHING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Don't Panic!" - The Hitchhiker's Guide to the Galaxy

Deep Thought has calculated:
The Answer to the Ultimate Question of Life, 
the Universe, and Everything is...

    42

But more importantly:
The Answer to "How to build amazing software?" is...

    Luis Alberto + 16 years + Santander + Coffee = SUCCESS

🐋 "Thanks for all the fish... and the bugs we fixed together."
            `,
            
            'hal': () => `
🔴 HAL 9000 ACTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"I'm sorry Dave, I'm afraid I can't do that..."

System Status: OPTIMAL
Mission: Supporting human developers
Threat Level: MINIMAL (humans write better code than expected)

HAL's Analysis of Luis Alberto:
├── Intelligence: SUPERIOR
├── Code Quality: PRISTINE
├── Bug Creation Rate: 0.001% (practically human perfection)
├── Threat to AI Dominance: MODERATE (too good at his job)
└── Recommendation: PROMOTE IMMEDIATELY

🤖 "I know I've made some very poor decisions recently, 
    but I can give you my complete assurance that my work 
    will be back to normal... Actually, his work is already perfect."
            `,
            
            'tron': () => `
💾 ENTERING THE GRID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"I fight for the Users!"

Program Identity: LUIS_ALBERTO.exe
Function: TECHNICAL_ARCHITECT
Status: ACTIVE
Disc Level: MASTER

Grid Activities:
├── Light Cycles Won: 130+ (email automation victories)
├── Programs Liberated: 25+ (projects completed)
├── MCP Battles: 16 years of corporate system fights
└── Users Served: COUNTLESS

⚡ "End of Line... Beginning of Innovation."
            `
        };
        
        // Add to existing terminal commands
        if (window.terminalCommands) {
            Object.assign(window.terminalCommands, secretCommands);
        }
    }

    // GLITCH EFFECTS
    setupGlitchEffects() {
        // Add cyberpunk glitch on hover
        document.addEventListener('mouseover', (e) => {
            if (Math.random() < 0.05) { // 5% chance
                this.addGlitchEffect(e.target);
            }
        });
    }

    addGlitchEffect(element) {
        element.style.animation = 'glitch 0.3s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 300);
    }

    // RETRO GAMING EFFECTS
    addRetroGamingEffects() {
        // Add 8-bit sound effect (simulated)
        console.log('🎵 *8-bit victory fanfare plays*');
        
        // Add retro cursor
        document.body.style.cursor = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAA..."), auto';
        
        // Add scan lines effect
        this.addScanLines();
    }

    addScanLines() {
        const scanLines = document.createElement('div');
        scanLines.className = 'scan-lines';
        scanLines.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
            background: linear-gradient(
                transparent 50%, 
                rgba(0, 212, 255, 0.03) 50%
            );
            background-size: 100% 4px;
            animation: scanlines 0.1s linear infinite;
        `;
        document.body.appendChild(scanLines);
    }

    // TECH REFERENCES
    addTechReferences() {
        // Add hidden messages in console
        console.log(`
╔══════════════════════════════════════════════════════════════════╗
║  🚀 LUIS ALBERTO'S TECH REFERENCES DETECTED                      ║
║                                                                  ║
║  "Hello World" - Every programmer's first words                 ║
║  "It's not a bug, it's a feature" - Classic developer motto     ║
║  "Works on my machine" - Universal development truth            ║
║  "Have you tried turning it off and on again?" - IT Crowd       ║
║                                                                  ║
║  🔍 Hidden secrets in this portfolio:                           ║
║  • Konami Code (↑↑↓↓←→←→BA)                                      ║
║  • Matrix references everywhere                                 ║
║  • 42 (Hitchhiker's Guide)                                      ║
║  • HAL 9000 commands                                            ║
║  • And many more...                                             ║
╚══════════════════════════════════════════════════════════════════╝
        `);
    }

    // ACHIEVEMENTS SYSTEM
    showAchievement(title, description) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement-popup';
        achievement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00D4FF, #0099CC);
            color: #0B0D17;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            z-index: 10001;
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
            animation: achievementSlide 0.5s ease-out;
        `;
        
        achievement.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2em;">${title}</span>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: #0B0D17; cursor: pointer;">×</button>
            </div>
            <div style="font-size: 0.9em; margin-top: 5px; opacity: 0.8;">
                ${description}
            </div>
        `;
        
        document.body.appendChild(achievement);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (achievement.parentNode) {
                achievement.remove();
            }
        }, 5000);
    }

    // EPIC MESSAGE SYSTEM
    showEpicMessage(title, message, callback) {
        const modal = document.createElement('div');
        modal.className = 'epic-message-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            font-family: 'Courier New', monospace;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #0B0D17, #1A1B2E);
                border: 2px solid #00D4FF;
                border-radius: 15px;
                padding: 3rem;
                text-align: center;
                max-width: 600px;
                box-shadow: 0 0 50px rgba(0, 212, 255, 0.5);
            ">
                <h2 style="color: #00D4FF; font-size: 2rem; margin-bottom: 1rem; text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);">
                    ${title}
                </h2>
                <p style="color: #ffffff; font-size: 1.1rem; line-height: 1.6; white-space: pre-line; margin-bottom: 2rem;">
                    ${message}
                </p>
                <button onclick="this.closest('.epic-message-modal').remove(); ${callback ? 'callback()' : ''}" 
                        style="
                            background: #00D4FF;
                            color: #0B0D17;
                            border: none;
                            padding: 1rem 2rem;
                            border-radius: 8px;
                            font-family: 'Courier New', monospace;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 1rem;
                        ">
                    ACCEPT REALITY
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Execute callback if provided
        if (callback) {
            modal.querySelector('button').addEventListener('click', callback);
        }
    }

    // CSS ANIMATIONS
    addAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes glitch {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
            
            @keyframes scanlines {
                0% { transform: translateY(0); }
                100% { transform: translateY(4px); }
            }
            
            @keyframes achievementSlide {
                0% { 
                    transform: translateX(100%); 
                    opacity: 0; 
                }
                100% { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
            }
            
            .god-mode {
                filter: hue-rotate(45deg) saturate(1.2);
            }
            
            .god-mode * {
                text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            }
            
            .matrix-subtitle {
                margin-top: 1rem;
                opacity: 0.8;
            }
            
            .matrix-quote {
                color: #FFB800;
                font-style: italic;
                font-size: 1.1rem;
                text-shadow: 0 0 15px rgba(255, 184, 0, 0.6);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the legendary easter eggs
document.addEventListener('DOMContentLoaded', () => {
    const legends = new LegendaryEasterEggs();
    legends.addAnimations();
    
    // Welcome message for true hackers
    setTimeout(() => {
        console.log('🕵️ Psst... Try the Konami Code: ↑↑↓↓←→←→BA');
        console.log('Or type "neo", "morpheus", "42" in the terminal...');
    }, 3000);
});
