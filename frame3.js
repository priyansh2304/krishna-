let openTileId = null;
const clickedTilesSet = new Set();

window.onload = () => {
    const canvas = document.getElementById('confetti-canvas');
    const wishText = document.getElementById('birthday-wish');
    const cards = document.querySelectorAll('.mystery-card');
    const colors = ['#ff69b4', '#ff1493', '#b085ff', '#00f0ff', '#ffd700'];
    
    // 1. RUN CELEBRATORY CONFETTI BURST IMMEDIATELY
    for (let i = 0; i < 80; i++) {
        spawnConfetti(canvas, colors);
    }

    // 2. TIMED SEQUENCE STEP A: Clear confetti away after 4 seconds
    setTimeout(() => {
        canvas.style.opacity = "0";
    }, 4000);

    // 3. TIMED SEQUENCE STEP B: Cards arrive and central wish text beautifully softens down
    setTimeout(() => {
        // Let the beautiful neon typography fade to a quiet background accent
        wishText.classList.add('dimmed-glow');
        
        // Glide the 4 tilted mystery cards into their corner stations smoothly
        cards.forEach(card => {
            card.classList.add('visible-resting');
        });
    }, 4500); // Happens right as the confetti finishes clearing
};

function spawnConfetti(canvas, colors) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    const duration = Math.random() * 2.5 + 2.5; 
    piece.style.animationDuration = `${duration}s`;
    piece.style.top = `-${Math.random() * 50}px`;
    
    canvas.appendChild(piece);
}

// 4. CORE INTERACTIVE NAVIGATION MECHANICS
function handleTileClick(id) {
    const card = document.getElementById(`tile-${id}`);
    const allCards = document.querySelectorAll('.mystery-card');
    const overlay = document.getElementById('focus-overlay');
    const bgText = document.getElementById('bg-text-wrapper');

    if (openTileId === id) {
        closeActiveTile();
        return;
    }

    if (openTileId !== null) {
        closeActiveTile();
    }

    openTileId = id;
    clickedTilesSet.add(id);

    // Apply Center Spotlight (Straightens the rotation, centers it)
    card.classList.add('active-spotlight');
    overlay.classList.add('show-overlay');
    bgText.classList.add('bg-blur-active');

    // Dim out remaining cards
    allCards.forEach(c => {
        if (c.id !== `tile-${id}`) {
            c.classList.add('dimmed-out');
        }
    });
}

function closeActiveTile() {
    if (openTileId === null) return;

    const card = document.getElementById(`tile-${openTileId}`);
    const allCards = document.querySelectorAll('.mystery-card');
    const overlay = document.getElementById('focus-overlay');
    const bgText = document.getElementById('bg-text-wrapper');

    card.classList.remove('active-spotlight');
    
    // Apply unlocked class state so it keeps its glowing custom pink tint in its corner
    card.classList.add('unlocked-state');

    overlay.classList.remove('show-overlay');
    bgText.classList.remove('bg-blur-active');

    allCards.forEach(c => {
        c.classList.remove('dimmed-out');
    });

    openTileId = null;
    checkMilestoneUnlock();
}

function checkMilestoneUnlock() {
    if (clickedTilesSet.size === 4) {
        setTimeout(() => {
            const btn = document.getElementById('next-frame-btn');
            if (btn) btn.classList.add('visible');
        }, 600);
    }
}

function goToFrame4() {
    document.body.style.transition = "opacity 1.5s ease";
    document.body.style.opacity = "0";
    setTimeout(() => {
        window.location.href = "frame4.html";
    }, 1500);
}