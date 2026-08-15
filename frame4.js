/*
window.onload = () => {
    localStorage.setItem("isMusicPlaying", "false");
    const globalAudio = document.getElementById("bgMusic");
    if (globalAudio) { globalAudio.pause(); globalAudio.remove(); }

    const container = document.getElementById('canvas-container');
    const particleCount = 100;
    const particles = [];
    const colors = ['#b085ff', '#00f0ff'];
    window.viewedScrolls = new Set();

    // Generate Stardust Background
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = colors[i % colors.length];
        particle.style.opacity = (Math.random() * 0.25 + 0.1).toString();
        container.appendChild(particle);
        particles.push({ element: particle, baseX: x, baseY: y });
    }

    // Interactive Touch/Mouse Tracker
    const handleInteraction = (inputX, inputY) => {
        particles.forEach(p => {
            const dx = inputX - p.baseX;
            const dy = inputY - p.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxInfluenceRange = 180;

            if (distance < maxInfluenceRange) {
                const force = (maxInfluenceRange - distance) / maxInfluenceRange;
                const pullX = (inputX - p.baseX) * force * 0.45;
                const pullY = (inputY - p.baseY) * force * 0.45;
                p.element.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.5)`;
                p.element.style.opacity = '0.9';
            } else {
                p.element.style.transform = 'translate3d(0, 0, 0) scale(1)';
                p.element.style.opacity = (Math.random() * 0.25 + 0.1).toString();
            }
        });
    };

    window.addEventListener('mousemove', (e) => handleInteraction(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
};

function toggleScroll(id) {
    const target = document.getElementById(`scroll-wrapper-${id}`);
    const allScrolls = document.querySelectorAll('.scroll-wrapper');
    const tracker = window.viewedScrolls;

    if (target.classList.contains('scroll-open')) {
        target.classList.remove('scroll-open');
        return;
    }

    // Clean close on previous scroll
    allScrolls.forEach(scroll => scroll.classList.remove('scroll-open'));

    // Open the targeted scroll
    target.classList.add('scroll-open');
    tracker.add(id);

    if (tracker.size === 3) {
        setTimeout(() => {
            const outro = document.getElementById('final-outro');
            if (outro) outro.className = 'visible-outro';
        }, 2000); // Deliberate delay matching the slower animations
    }
}

function closeTheNight() {
    const stage = document.querySelector('.stage-container');
    const bgCanvas = document.getElementById('canvas-container');
    stage.style.transition = 'opacity 2.5s ease-in-out';
    bgCanvas.style.transition = 'opacity 2.5s ease-in-out';
    stage.style.opacity = '0';
    bgCanvas.style.opacity = '0';
    setTimeout(() => { window.location.href = 'frame5.html'; }, 3500);
}
*/

                                                                //DIFFERENT PATTERN IF WANT//

window.onload = () => {
    localStorage.setItem("isMusicPlaying", "false");
    const globalAudio = document.getElementById("bgMusic");
    if (globalAudio) { globalAudio.pause(); globalAudio.remove(); }

    const container = document.getElementById('canvas-container');
    const particleCount = 100;
    const particles = [];
    const colors = ['#b085ff', '#00f0ff'];
    window.viewedScrolls = new Set();

    // Active audio reference for voice notes/songs
    window.currentVoiceAudio = null;

    // Generate Stardust Background
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.background = colors[i % colors.length];
        particle.style.opacity = (Math.random() * 0.25 + 0.1).toString();
        container.appendChild(particle);
        particles.push({ element: particle, baseX: x, baseY: y });
    }

    // Interactive Touch/Mouse Tracker
    const handleInteraction = (inputX, inputY) => {
        particles.forEach(p => {
            const dx = inputX - p.baseX;
            const dy = inputY - p.baseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxInfluenceRange = 180;

            if (distance < maxInfluenceRange) {
                const force = (maxInfluenceRange - distance) / maxInfluenceRange;
                const pullX = (inputX - p.baseX) * force * 0.45;
                const pullY = (inputY - p.baseY) * force * 0.45;
                p.element.style.transform = `translate3d(${pullX}px, ${pullY}px, 0) scale(1.5)`;
                p.element.style.opacity = '0.9';
            } else {
                p.element.style.transform = 'translate3d(0, 0, 0) scale(1)';
                p.element.style.opacity = (Math.random() * 0.25 + 0.1).toString();
            }
        });
    };

    window.addEventListener('mousemove', (e) => handleInteraction(e.clientX, e.clientY));
    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    // GLOBAL CLICK-OUTSIDE-TO-CLOSE LISTENER
    document.addEventListener('click', (e) => {
        // If click was inside any scroll wrapper or the outro button, do nothing
        if (e.target.closest('.scroll-wrapper') || e.target.closest('#final-outro')) {
            return;
        }

        // Tap was outside -> Close open scroll and reset audio
        const openScroll = document.querySelector('.scroll-wrapper.scroll-open');
        if (openScroll) {
            openScroll.classList.remove('scroll-open');
            
            if (window.currentVoiceAudio) {
                window.currentVoiceAudio.pause();
                window.currentVoiceAudio.currentTime = 0;
                window.currentVoiceAudio = null;
            }

            const txt = openScroll.querySelector('.scroll-text');
            if (txt) txt.innerText = "";
        }
    });
};


/*              ========================================================================== 
                VOICE NOTE & SYNCED LYRICS DATA FOR ALL 3 SCROLLS 
                --------------------------------------------------------------------------
                Adjust audio file names, timestamps (in seconds), and lines for each scroll.
                =========================================================================== */
const scrollVoiceData = {
    1: {
        audioSrc: 'voice1.mp3',
        lines: [
            { startTime: 0.5, endTime: 2.0, text: "Hii deevli happy bday" },
            { startTime: 2.0, endTime: 4.0, text: "tera 18 bday haii or me" },
            { startTime: 4.0, endTime: 6.0, text: "puri koshish karunga ki yeh tera" },
            { startTime: 6.0, endTime: 7.0, text: "jo bday ho wo best bday ho." }
        ]
    },
    2: {
        audioSrc: 'voice2.mp3',
        lines: [
            { startTime: 0.0, endTime: 1.7, text: "and deevu me hamesha YHI hu" },
            { startTime: 1.7, endTime: 2.8, text: "tere sath, kahi nhi jaunga" },
            { startTime: 3.0, endTime: 4.0, text: "chaye kuch hojaye trust me !" },
        ]
    },
    3: {
        audioSrc: 'voice3.mp3',
        lines: [
            { startTime: 0.7, endTime: 2.0, text: "Deevu yha tak aya hai toh" },
            { startTime: 2.0, endTime: 3.8, text: "end Tak chlenge chahe kuch hojaye" },
            { startTime: 3.8, endTime: 5.0, text: "I love you ❤️" },
        ]
    }
};


function toggleScroll(id) {
    const target = document.getElementById(`scroll-wrapper-${id}`);
    const allScrolls = document.querySelectorAll('.scroll-wrapper');
    const tracker = window.viewedScrolls;

    // 1. IF SCROLL IS ALREADY OPEN -> TAP ON ITSELF TO TOGGLE PLAY / PAUSE
    if (target.classList.contains('scroll-open')) {
        if (window.currentVoiceAudio) {
            if (window.currentVoiceAudio.paused) {
                window.currentVoiceAudio.play();
            } else {
                window.currentVoiceAudio.pause();
            }
        }
        return;
    }

    // 2. STOP & RESET AUDIO FROM PREVIOUSLY OPEN SCROLL
    if (window.currentVoiceAudio) {
        window.currentVoiceAudio.pause();
        window.currentVoiceAudio.currentTime = 0;
        window.currentVoiceAudio = null;
    }

    // 3. CLOSE ALL OTHER OPEN SCROLLS & CLEAR THEIR TEXT
    allScrolls.forEach(scroll => {
        scroll.classList.remove('scroll-open');
        const txt = scroll.querySelector('.scroll-text');
        if (txt) txt.innerText = "";
    });

    // 4. OPEN TARGETED SCROLL & REGISTER PROGRESS
    target.classList.add('scroll-open');
    tracker.add(id);

    // 5. START AUDIO & WORD-BY-WORD LYRIC REVEAL
    const data = scrollVoiceData[id];
    if (data) {
        const textTarget = target.querySelector('.scroll-text');
        if (textTarget) textTarget.innerText = "";

        const audio = new Audio(data.audioSrc);
        window.currentVoiceAudio = audio;

        audio.addEventListener('timeupdate', () => {
            if (!target.classList.contains('scroll-open')) return;

            const currentTime = audio.currentTime;
            let accumulatedText = "";

            for (let line of data.lines) {
                if (currentTime >= line.startTime) {
                    const words = line.text.split(" ");
                    
                    if (currentTime >= line.endTime) {
                        // Line finished -> Keep fully visible
                        accumulatedText += line.text + "\n";
                    } else {
                        // Line playing -> Reveal word by word
                        const lineDuration = line.endTime - line.startTime;
                        const elapsedInLine = currentTime - line.startTime;
                        const progress = elapsedInLine / lineDuration;
                        
                        const wordsToShow = Math.min(
                            Math.floor(progress * words.length) + 1,
                            words.length
                        );
                        
                        accumulatedText += words.slice(0, wordsToShow).join(" ");
                        break; // Wait for upcoming line
                    }
                }
            }

            if (textTarget) textTarget.innerText = accumulatedText;
        });

        audio.play().catch(e => console.log("Audio play deferred:", e));
    }

    // 6. SHOW [ CLOSE THE NIGHT ] OUTRO WHEN ALL 3 SCROLLS HAVE BEEN TAPPED
    if (tracker.size === 3) {
        setTimeout(() => {
            const outro = document.getElementById('final-outro');
            if (outro) outro.className = 'visible-outro';
        }, 2000);
    }
}

function closeTheNight() {
    // Stop active audio on transition to Frame 5
    if (window.currentVoiceAudio) {
        window.currentVoiceAudio.pause();
        window.currentVoiceAudio = null;
    }

    const stage = document.querySelector('.stage-container');
    const bgCanvas = document.getElementById('canvas-container');
    stage.style.transition = 'opacity 2.5s ease-in-out';
    bgCanvas.style.transition = 'opacity 2.5s ease-in-out';
    stage.style.opacity = '0';
    bgCanvas.style.opacity = '0';
    setTimeout(() => { window.location.href = 'frame5.html'; }, 3500);
}
