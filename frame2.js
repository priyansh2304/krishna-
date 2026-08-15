/**
 * Frame 2: The Launchpad Logic
 * Handles music initialization, UI changes, and the cinematic transition to Frame 3.
 */

function launchExperience() {
    // 1. Grab our elements
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("launchBtn");

    // 2. Music Initialization
    // We play the music here because the user has finally clicked/interacted.
    if (audio) {
        audio.play().then(() => {
            // Success! Store the state so Frame 3 knows to keep the vibe going
            localStorage.setItem("isMusicPlaying", "true");
            
            // Sync the timestamp every 100ms so Frame 3 can pick up exactly where we left off
            setInterval(() => {
                localStorage.setItem("musicCurrentTime", audio.currentTime);
            }, 100);
        }).catch(error => {
            // This usually happens if the audio file path is wrong or the file is missing
            console.error("Music playback failed. Check your file path!", error);
        });
    }

    // 3. UI Feedback
    // Make the button look like it's processing the request
    btn.innerHTML = "Opening... 🎁";
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none"; // Prevents multiple clicks

    // 4. The Cinematic Exit
    // We wait 500ms so the user sees the button change, then we trigger the blur/fade
    setTimeout(() => {
        document.body.classList.add("fade-out");
        
        // 5. Final Redirect
        // We wait for the CSS transition (1.2s) to finish before actually changing the page
        setTimeout(() => {
            window.location.href = "frame3.html";
        }, 1200);
        
    }, 500); 
}

// Optional: A small "fail-safe" to ensure the button is clickable as soon as the page loads
window.onload = () => {
    console.log("Frame 2 Ready. Waiting for user to unwrap the surprise...");
};