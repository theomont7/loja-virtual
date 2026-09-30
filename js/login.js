document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const errorMsg = document.getElementById("errorMsg");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("emailInput").value.trim();
        const password = document.getElementById("passwordInput").value.trim();

        if (email === "" || password === "") {
            showError("Please fill all fields.");
            return;
        }

        if (!email.includes("@")) {
            showError("Please enter a valid email.");
            return;
        }

        if (password.length < 6) {
            showError("Password must be at least 6 characters.");
            return;
        }

        const fakeToken = "token_" + Date.now();

        localStorage.setItem("token", fakeToken);
        localStorage.setItem("userEmail", email);

        window.location.href = "profile.html";
    });

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.style.display = "block";
    }

});
