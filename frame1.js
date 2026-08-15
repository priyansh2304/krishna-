function checkAccess() {
    const userInput = document.getElementById("answerInput").value;
    const errorMsg = document.getElementById("error-msg");
    const successMsg = document.getElementById("success-msg");
    const glassBox = document.querySelector(".glass-box");

    // SET YOUR SECRET ANSWER HERE
    // can be changed - just put the answer inside the quotes
    const correctSecret = "tu chaiye";
    
    
    if (userInput.toLowerCase().trim() === correctSecret.toLowerCase()) {
        // SUCCESS
        errorMsg.style.display = "none";
        glassBox.style.display = "none"; // Hide the input box
        successMsg.style.display = "block"; // Show the success message

    setTimeout (() => {
        document.body.classList.add("fade-out");

        setTimeout (() => {
            window.location.href = "frame2.html";
        }, 1000);
    }, 1500);

    } else {
        // FAIL
        errorMsg.style.display = "block";
        // Shake animation for error
        document.querySelector(".glass-box").animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(0px)' }
        ], { duration: 300 });
    }
}

// Allow pressing "Enter" key to submit
document.getElementById("answerInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkAccess();
    }
});