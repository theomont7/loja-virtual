document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const nameInput = document.getElementById("profileName");
    const emailInput = document.getElementById("profileEmail");
    const phoneInput = document.getElementById("profilePhone");
    const addressInput = document.getElementById("profileAddress");
    const saveMsg = document.getElementById("saveMessage");

    nameInput.value = localStorage.getItem("username") || "";
    emailInput.value = localStorage.getItem("email") || "";
    phoneInput.value = localStorage.getItem("phone") || "";
    addressInput.value = localStorage.getItem("address") || "";

    document.getElementById("saveProfileBtn").addEventListener("click", () => {
        localStorage.setItem("username", nameInput.value.trim());
        localStorage.setItem("email", emailInput.value.trim());
        localStorage.setItem("phone", phoneInput.value.trim());
        localStorage.setItem("address", addressInput.value.trim());

        saveMsg.textContent = "Profile updated successfully!";
        saveMsg.style.display = "block";

        setTimeout(() => saveMsg.style.display = "none", 2000);
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    });

});
