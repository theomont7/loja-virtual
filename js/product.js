document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    const productContainer = document.getElementById("productContainer");
    const relatedContainer = document.getElementById("relatedProducts");
    const reviewsContainer = document.getElementById("reviewsContainer");

    let productData = null;

    const token = localStorage.getItem("token");
    if (token) {
        const loginLink = document.getElementById("loginLink");
        const profileLink = document.getElementById("profileLink");
        if (loginLink && profileLink) {
            loginLink.style.display = "none";
            profileLink.style.display = "inline-block";
        }
    }

   
    fetch("../data/products.json")
        .then(res => res.json())
        .then(products => {

            productData = products.find(p => p.id === productId);

            if (!productData) {
                productContainer.innerHTML = "<h2>Product not found</h2>";
                return;
            }

            renderProduct(productData);

            const related = products
                .filter(p => p.category === productData.category && p.id !== productId)
                .slice(0, 4);

            renderRelated(related);
        });

    fetch("../data/reviews.json")
        .then(res => res.json())
        .then(data => {
            const productReviews = data.find(r => parseInt(r.product_id) === productId);
            if (productReviews) renderReviews(productReviews.reviews);
        });

    function renderProduct(p) {
        const img = `https://picsum.photos/seed/${p.id}/500/500`;

        productContainer.innerHTML = `
            <div class="product-image">
                <img src="${img}" alt="${p.name}">
            </div>

            <div class="product-details">
                <h1>${p.name}</h1>
                <p class="price">$${p.price.toFixed(2)}</p>
                <p class="sku">SKU: ${p.sku}</p>
                <p>${p.description}</p>

                <div class="quantity-control">
                    <label>Qty:</label>
                    <input id="qtyInput" type="number" min="1" value="1">
                </div>

                <button class="add-cart-btn" id="addToCartBtn">Add to Cart</button>
            </div>
        `;

        document.getElementById("addToCartBtn").addEventListener("click", () => {
            let qty = parseInt(document.getElementById("qtyInput").value, 10);
            if (isNaN(qty) || qty < 1) qty = 1;

            addToCart(p, qty);
            alert("Added to cart!");
        });
    }


function addToCart(product, quantity) {
    console.log("Adding to cart:", product, "Qty:", quantity);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log("Current cart:", cart);

    const existing = cart.find(item => item.id === product.id);

    if (existing) {
        existing.quantity += quantity;
        console.log("Updated existing:", existing);
    } else {
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        };
        console.log("Adding new item:", newItem);
        cart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("Cart saved:", cart);
}

    function renderRelated(related) {
        relatedContainer.innerHTML = "";

        related.forEach(r => {
            const img = `https://picsum.photos/seed/${r.id}/300/300`;

            const div = document.createElement("div");
            div.classList.add("related-card");

            div.innerHTML = `
                <img src="${img}" alt="${r.name}">
                <h3>${r.name}</h3>
                <p>$${r.price.toFixed(2)}</p>
            `;

            div.addEventListener("click", () => {
                window.location.href = `/htmls/product.html?id=${r.id}`;
            });

            relatedContainer.appendChild(div);
        });
    }

    function renderReviews(reviews) {
        reviewsContainer.innerHTML = "";

        reviews.forEach(r => {
            const div = document.createElement("div");
            div.classList.add("review");

            div.innerHTML = `
                <h4>${r.title} — ⭐ ${r.rating}</h4>
                <p><strong>${r.user}</strong></p>
                <p>${r.comment}</p>
            `;

            reviewsContainer.appendChild(div);
        });
    }

});
