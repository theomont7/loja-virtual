document.addEventListener("DOMContentLoaded", () => {


    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("loginLink");
    const profileLink = document.getElementById("profileLink");

    if (loginLink && profileLink) {
        if (token) {
            loginLink.style.display = "none";
            profileLink.style.display = "inline-block";
        } else {
            loginLink.style.display = "inline-block";
            profileLink.style.display = "none";
        }
    }


    const cartCounter = document.getElementById("cartCount");
    if (cartCounter) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart.reduce((sum, p) => sum + p.quantity, 0);
        cartCounter.textContent = count;
    }


    fetch("../data/categories.xml")
        .then(res => res.text())
        .then(data => {
            const xml = new DOMParser().parseFromString(data, "text/xml");
            const categories = xml.getElementsByTagName("category");

            const navContainer = document.getElementById("categoryNavLinks");
            const footerList = document.getElementById("footer-categories");

            Array.from(categories).forEach(cat => {
                const name = cat.querySelector("name").textContent;

                if (navContainer) {
                    const link = document.createElement("a");
                    link.href = `/htmls/search.html?type=category&q=${encodeURIComponent(name)}`;
                    link.textContent = name;
                    navContainer.appendChild(link);
                }

 
                if (footerList) {
                    const li = document.createElement("li");
                    li.innerHTML = `<a href="search.html?type=category&q=${encodeURIComponent(name)}">${name}</a>`;
                    footerList.appendChild(li);
                }
            });
        });


    const searchBar = document.getElementById("searchBar");
    const searchBtn = document.getElementById("searchBtn");

    if (searchBtn && searchBar) {
        searchBtn.addEventListener("click", () => {
            const q = searchBar.value.trim();
            if (q.length > 0) {
                window.location.href = `/htmls/search.html?q=${encodeURIComponent(q)}`;
            }
        });

        searchBar.addEventListener("keypress", e => {
            if (e.key === "Enter") searchBtn.click();
        });
    }

});
