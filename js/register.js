document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");
    const errorMsg = document.getElementById("errorMsg");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("nameInput").value.trim();
        const email = document.getElementById("emailInput").value.trim();
        const password = document.getElementById("passwordInput").value;
        const confirm = document.getElementById("confirmInput").value;

        if (!name || !email || !password || !confirm) {
            return showError("All fields are required.");
        }

        if (!email.includes("@") || !email.includes(".")) {
            return showError("Enter a valid email address.");
        }

        if (password.length < 6) {
            return showError("Password must be at least 6 characters.");
        }

        if (password !== confirm) {
            return showError("Passwords do not match.");
        }


        const fakeToken = "token_" + Math.random().toString(36).substring(2, 12);

        localStorage.setItem("token", fakeToken);
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);

        window.location.href = "profile.html";
    });

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.style.display = "block";
    }

});
