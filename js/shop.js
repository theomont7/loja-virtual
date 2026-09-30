document.addEventListener("DOMContentLoaded", () => {

    const productList = document.getElementById("shopProductList");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortSelect = document.getElementById("sortSelect");

    let allProducts = [];

    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("loginLink");
    const profileLink = document.getElementById("profileLink");

    if (token) {
        loginLink.style.display = "none";
        profileLink.style.display = "inline-block";
    }

    fetch("../data/categories.xml")
        .then(res => res.text())
        .then(data => {
            const xml = new DOMParser().parseFromString(data, "text/xml");
            const categories = xml.getElementsByTagName("category");

            const categoryNav = document.getElementById("categoryNavLinks");
            const footerList = document.getElementById("footer-categories");

            Array.from(categories).forEach(cat => {
                const name = cat.querySelector("name").textContent;
                const option = document.createElement("option");
                option.value = name;
                option.textContent = name;
                categoryFilter.appendChild(option);
            });
        });

    fetch("../data/products.json")
        .then(res => res.json())
        .then(products => {
            allProducts = products;
            renderProducts(products);
        });

    function renderProducts(products) {
        productList.innerHTML = "";

        products.forEach(product => {
            const imageURL = `https://picsum.photos/seed/${product.id}/300/300`;

            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${imageURL}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="window.location.href='product.html?id=${product.id}'">
                    View Product
                </button>
            `;

            productList.appendChild(card);
        });
    }

    categoryFilter.addEventListener("change", () => {
        let filtered = allProducts;

        if (categoryFilter.value !== "all") {
            filtered = filtered.filter(p => p.category === categoryFilter.value);
        }

        applySort(filtered);
    });

    sortSelect.addEventListener("change", () => {
        applySort(allProducts);
    });

    function applySort(products) {
        let sorted = [...products];

        if (sortSelect.value === "low-high") {
            sorted.sort((a, b) => a.price - b.price);
        }
        if (sortSelect.value === "high-low") {
            sorted.sort((a, b) => b.price - a.price);
        }

        renderProducts(sorted);
    }

});

