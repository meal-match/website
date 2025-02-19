document.addEventListener("DOMContentLoaded", async () => {
    const message = document.getElementById("message");
    const setupParagraph = document.getElementById("setup");
    const setupButton = document.getElementById("setup-button");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
        message.textContent = "Invalid or missing verification token.";
        return;
    }

    try {
        const response = await fetch("https://mealmatchbama.vercel.app/payout/account-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.status === 201) {
            message.textContent = "Account link generated successfully!";
            setupButton.href = data.accountLink;
            if (data.setupIsComplete) {
                setupButton.textContent = "View Stripe Dashboard";
            }
            setupParagraph.style.display = "block";
        } else {
            message.textContent = data.message ? `An error occured: ${data.message}.` : "Failed to generate a new Stripe account setup link.";
        }
    } catch (error) {
        message.textContent = "An error occurred. Please try again later.";
    }
});
