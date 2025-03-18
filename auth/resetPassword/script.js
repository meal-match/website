document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reset-form");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const errorMessage = document.getElementById("error-message");
    const passwordRequirementsList = document.getElementById("password-requirements");
    const submitButton = document.getElementById("submit-button");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
        errorMessage.textContent = "Invalid or missing reset token.";
        form.style.display = "none";
        return;
    }

    passwordInput.addEventListener("input", () => {
        validatePassword(passwordInput.value);
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errors = checkPasswordRequirements(password);

        if (errors.length > 0) {
            errorMessage.textContent = "Please meet the password requirements.";
            errorMessage.style.display = "block";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            errorMessage.style.display = "block";
            return;
        }

        try {
            submitButton.textContent = "Resetting password...";
            submitButton.disabled = true;
            const response = await fetch("https://meal-match-backend.vercel.app/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                errorMessage.textContent = "Your password has been reset successfully! You should now be able to login to the app.";
                errorMessage.style.color = "green";
                errorMessage.style.display = "block";
                form.style.display = "none";
            } else {
                errorMessage.textContent = data.message || "Failed to reset password.";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.log(error);
            errorMessage.textContent = "An error occurred. Please try again later.";
            errorMessage.style.display = "block";
        } finally {
            submitButton.textContent = "Reset Password";
            submitButton.disabled = false;
        }
    });

    function checkPasswordRequirements(password) {
        const requirements = [];
        if (password.length < 8) requirements.push("At least 8 characters");
        if (!/\d/.test(password)) requirements.push("One number");
        if (!/[A-Z]/.test(password)) requirements.push("One uppercase letter");
        if (!/[a-z]/.test(password)) requirements.push("One lowercase letter");
        if (!/[!@#$%^&*]/.test(password)) requirements.push("One special character - !@#$%^&*");
        return requirements;
    }

    function validatePassword(password) {
        const errors = checkPasswordRequirements(password);
        submitButton.disabled = errors.length > 0;
        passwordRequirementsList.innerHTML = "";
        for (const error of errors) {
            const li = document.createElement("li");
            li.textContent = error;
            passwordRequirementsList.appendChild(li);
        }
    }
});
