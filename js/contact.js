document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("loginLink");
    const profileLink = document.getElementById("profileLink");

    if (token) {
        loginLink.style.display = "none";
        profileLink.style.display = "inline-block";
    }


    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");
    const messageInput = document.getElementById("messageInput");

    const nameErr = document.getElementById("nameError");
    const emailErr = document.getElementById("emailError");
    const messageErr = document.getElementById("messageError");
    const successMsg = document.getElementById("successMessage");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let valid = true;
        successMsg.textContent = "";

 
        if (nameInput.value.trim().length < 3) {
            nameErr.textContent = "Please enter a valid name.";
            valid = false;
        } else {
            nameErr.textContent = "";
        }

        if (!emailInput.value.includes("@")) {
            emailErr.textContent = "Please enter a valid email.";
            valid = false;
        } else {
            emailErr.textContent = "";
        }

        if (messageInput.value.trim().length < 10) {
            messageErr.textContent = "Message is too short.";
            valid = false;
        } else {
            messageErr.textContent = "";
        }

        if (valid) {
            successMsg.textContent = "Your message has been sent!";
            form.reset();
        }
    });

 
});
