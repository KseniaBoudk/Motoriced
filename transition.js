document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("page-overlay");

    // Fade the black screen out when the webpage completely loads
    setTimeout(() => {
        overlay.classList.add("fade-out");
    }, 100);

    // when nav links clicked animate the transition out
    const navLinks = document.querySelectorAll(".nav-link");
     navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetUrl = link.getAttribute("href");

            // Ignore links that point to sections on the same page (like #feature)
            if (targetUrl.startsWith("#") || targetUrl.includes("#")) {
                return; 
            }

            // Stop the browser from leaving the page instantly
            event.preventDefault(); 

            // Trigger the black screen to fade back in
            overlay.classList.remove("fade-out");
            overlay.classList.add("fade-in");
            // Wait 500ms for the animation to finish, then go to the new file
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); 
        });
    });
});