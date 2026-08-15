/**
 * Frame 2: The Launchpad Logic
 * Handles music initialization, audio sync, and the cinematic transition to Frame 3.
 */

window.onload = () => {
    const audio = document.getElementById("bgMusic");
    
    // Check if music was started in Frame 1 (or previously)
    const isPlaying = localStorage.getItem("isMusicPlaying");
    if (isPlaying === "true" && audio) {
        const savedTime = parseFloat(localStorage.getItem("musicCurrentTime")) || 0;
        audio.currentTime = savedTime;
        audio.play().catch(e => console.log("Waiting for user tap to play audio:", e));
    }

    // Continuously sync timestamp to localStorage so Frame 3 picks up seamlessly
    if (audio) {
        audio.addEventListener("timeupdate", () => {
            localStorage.setItem("musicCurrentTime", audio.currentTime);
        });
    }
};

function launchExperience() {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("launchBtn");

    // 1. Play audio immediately on button click
    if (audio) {
        // Force audio to play from current position
        audio.play().then(() => {
            localStorage.setItem("isMusicPlaying", "true");
            localStorage.setItem("musicCurrentTime", audio.currentTime);
        }).catch(error => {
            console.error("Music playback failed:", error);
        });
    }

    // 2. Button UI Feedback
    btn.innerHTML = "Opening... 🎁";
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none";

    // 3. Cinematic Exit & Transition to Frame 3
    setTimeout(() => {
        document.body.classList.add("fade-out");
        
        // Final Redirect to Frame 3
        setTimeout(() => {
            if (audio) {
                localStorage.setItem("musicCurrentTime", audio.currentTime);
            }
            window.location.href = "frame3.html";
        }, 1200);
        
    }, 500); 
}
