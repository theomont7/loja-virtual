document.addEventListener("DOMContentLoaded", () => {


    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("loginLink");
    const profileLink = document.getElementById("profileLink");

    if (token) {
        loginLink.style.display = "none";
        profileLink.style.display = "inline-block";
    } else {
        loginLink.style.display = "inline-block";
        profileLink.style.display = "none";
    }


});
