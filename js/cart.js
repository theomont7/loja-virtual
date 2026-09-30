document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const loginLink = document.getElementById("loginLink");
    const profileLink = document.getElementById("profileLink");
    if (loginLink && profileLink) {
        loginLink.style.display = "none";
        profileLink.style.display = "inline-block";
    }

    const cartItemsDiv = document.getElementById("cartItems");

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cartItemsDiv.innerHTML = "";

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
            updateSummary(cart);
            return;
        }

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <img src="https://picsum.photos/seed/${item.id}/200/200">
                <div class="cart-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>

                <input type="number" min="1" value="${item.quantity}" class="qty-input" data-index="${index}">
                
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartItemsDiv.appendChild(div);
        });

        addEventListeners();
        updateSummary(cart);
    }

    function addEventListeners() {
        document.querySelectorAll(".qty-input").forEach(input => {
            input.addEventListener("change", e => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const i = e.target.dataset.index;
                let newQty = parseInt(e.target.value, 10);
                if (isNaN(newQty) || newQty < 1) newQty = 1;
                cart[i].quantity = newQty;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", e => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const i = e.target.dataset.index;
                cart.splice(i, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            });
        });
    }

    function updateSummary(cart) {
        let subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
        let tax = subtotal * 0.13;
        let total = subtotal + tax;

        document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("tax").textContent = `$${tax.toFixed(2)}`;
        document.getElementById("total").textContent = `$${total.toFixed(2)}`;
    }

    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            window.location.href = "checkout.html";
        });
    }

    renderCart();
});
