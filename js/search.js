document.addEventListener("DOMContentLoaded", () => {

    const resultsDiv = document.getElementById("searchResults");
    const resultCount = document.getElementById("resultCount");
    const sortSelect = document.getElementById("sortSelect");
    const categoryFilter = document.getElementById("categoryFilter");

    let allResults = [];

    
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q")?.toLowerCase() || "";
    const type = params.get("type") || "search";  

    fetch("../data/categories.xml")
        .then(res => res.text())
        .then(data => {
            const xml = new DOMParser().parseFromString(data, "text/xml");
            const cats = xml.getElementsByTagName("category");

            Array.from(cats).forEach(c => {
                const name = c.querySelector("name").textContent;
                const opt = document.createElement("option");
                opt.value = name;
                opt.textContent = name;
                categoryFilter.appendChild(opt);
            });
        });


    
    fetch("../data/products.json")
        .then(res => res.json())
        .then(products => {

            if (type === "category") {
                
                allResults = products.filter(p =>
                    p.category.toLowerCase() === q
                );

                categoryFilter.value = q.charAt(0).toUpperCase() + q.slice(1);

            } else {
               
                allResults = products.filter(p =>
                    p.name.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
                );
            }

            resultCount.textContent = `${allResults.length} products found for "${q}"`;

            renderProducts(allResults);
        });


    function renderProducts(list) {
        resultsDiv.innerHTML = "";

        list.forEach(p => {
            const img = `https://picsum.photos/seed/${p.id}/300/300`;

            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${img}">
                <h3>${p.name}</h3>
                <p>$${p.price.toFixed(2)}</p>
            `;

            card.addEventListener("click", () => {
                window.location.href = `/htmls/product.html?id=${p.id}`;
            });

            resultsDiv.appendChild(card);
        });
    }


    sortSelect.addEventListener("change", applyFilters);
    categoryFilter.addEventListener("change", applyFilters);

    function applyFilters() {

        let list = [...allResults];

        if (categoryFilter.value !== "all") {
            list = list.filter(p => p.category === categoryFilter.value);
        }

        if (sortSelect.value === "low-high") {
            list.sort((a, b) => a.price - b.price);
        }
        if (sortSelect.value === "high-low") {
            list.sort((a, b) => b.price - a.price);
        }

        renderProducts(list);
    }

});
