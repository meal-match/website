document.addEventListener("DOMContentLoaded", async () => {
    const message = document.getElementById("message");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
        message.textContent = "Invalid or missing verification token.";
        return;
    }

    try {
        const response = await fetch("https://meal-match-backend.vercel.app/auth/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.status === 200) {
            message.textContent = "Your email has been successfully verified! You may now close this tab.";
        } else {
            message.textContent = data.message || "Failed to verify email.";
        }
    } catch (error) {
        message.textContent = "An error occurred. Please try again later.";
    }
});
