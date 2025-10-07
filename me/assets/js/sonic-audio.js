// ===========================================
// SONIC RINGS AUDIO EFFECTS
// ===========================================

class SonicAudio {
    constructor() {
        this.audioContext = null;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio context not supported');
        }
    }

    // Ring collection sound (classic Sonic ring sound)
    playRingCollect() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Ring sound frequency progression
        const now = this.audioContext.currentTime;
        
        // Create the characteristic "ding" sound
        oscillator.frequency.setValueAtTime(523, now);  // C5
        oscillator.frequency.exponentialRampToValueAtTime(1047, now + 0.1); // C6
        oscillator.frequency.exponentialRampToValueAtTime(784, now + 0.3);  // G5
        
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        
        oscillator.type = 'sine';
        oscillator.start(now);
        oscillator.stop(now + 0.4);
    }

    // Ring hover sound (subtle chime)
    playRingHover() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        
        oscillator.frequency.setValueAtTime(880, now);  // A5
        oscillator.frequency.exponentialRampToValueAtTime(1100, now + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        
        oscillator.type = 'triangle';
        oscillator.start(now);
        oscillator.stop(now + 0.2);
    }

    // Speed boost sound
    playSpeedBoost() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        
        oscillator.frequency.setValueAtTime(220, now);  // A3
        oscillator.frequency.exponentialRampToValueAtTime(440, now + 0.5);
        
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        
        oscillator.type = 'sawtooth';
        oscillator.start(now);
        oscillator.stop(now + 0.5);
    }

    // World transition sound
    playWorldTransition() {
        if (!this.audioContext) return;

        // Create a sweep effect
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        
        // Sweep up
        oscillator1.frequency.setValueAtTime(200, now);
        oscillator1.frequency.exponentialRampToValueAtTime(800, now + 1);
        
        // Harmony
        oscillator2.frequency.setValueAtTime(300, now + 0.2);
        oscillator2.frequency.exponentialRampToValueAtTime(1200, now + 1.2);
        
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.linearRampToValueAtTime(0.25, now + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
        
        oscillator1.type = 'sine';
        oscillator2.type = 'triangle';
        
        oscillator1.start(now);
        oscillator2.start(now + 0.2);
        
        oscillator1.stop(now + 1.5);
        oscillator2.stop(now + 1.5);
    }

    // Power up sound (when hovering over rings)
    playPowerUp() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();
        
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        
        oscillator.frequency.setValueAtTime(130, now);  // C3
        oscillator.frequency.exponentialRampToValueAtTime(260, now + 0.3);  // C4
        
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(800, now);
        filterNode.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
        
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        oscillator.type = 'square';
        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    // Background ambient loop
    playAmbientLoop() {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filterNode = this.audioContext.createBiquadFilter();
        
        oscillator.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        const now = this.audioContext.currentTime;
        
        oscillator.frequency.setValueAtTime(55, now);  // A1
        
        filterNode.type = 'lowpass';
        filterNode.frequency.setValueAtTime(200, now);
        
        gainNode.gain.setValueAtTime(0.05, now);
        
        oscillator.type = 'sine';
        oscillator.start(now);
        
        // Loop for 10 seconds
        setTimeout(() => {
            if (oscillator) {
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 1);
                oscillator.stop(this.audioContext.currentTime + 1);
            }
        }, 9000);
    }
}

// Create global audio instance
const sonicAudio = new SonicAudio();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SonicAudio;
}
