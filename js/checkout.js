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

    const errorBox = document.getElementById("checkoutError");
    const form = document.getElementById("checkoutForm");
    const summaryItemsDiv = document.getElementById("summaryItems");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        summaryItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        updateSummary(cart);
        if (form) {
            form.querySelector(".place-order-btn").disabled = true;
            form.querySelector(".place-order-btn").textContent = "Cart is empty";
        }
        return;
    }

    renderSummaryItems(cart);
    updateSummary(cart);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const postal = document.getElementById("postal").value.trim();
        const delivery = document.getElementById("delivery").value;

        if (!fullName || !email || !phone || !address || !city || !postal) {
            showError("Please fill in all required fields.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            showError("Please enter a valid email address.");
            return;
        }

        if (phone.length < 6) {
            showError("Please enter a valid phone number.");
            return;
        }

        const order = {
            id: "NW-" + Date.now(),
            name: fullName,
            email,
            phone,
            address,
            city,
            postal,
            delivery,
            items: cart,
            totals: calculateTotals(cart)
        };

        localStorage.setItem("lastOrder", JSON.stringify(order));

        localStorage.removeItem("cart");

        window.location.href = "confirmation.html";
    });

    function showError(msg) {
        errorBox.textContent = msg;
        errorBox.style.display = "block";
    }

    function renderSummaryItems(cart) {
        summaryItemsDiv.innerHTML = "";
        cart.forEach(item => {
            const row = document.createElement("div");
            row.classList.add("summary-item");

            row.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            summaryItemsDiv.appendChild(row);
        });
    }

    function calculateTotals(cart) {
        let subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
        let tax = subtotal * 0.13;
        let total = subtotal + tax;
        return { subtotal, tax, total };
    }

    function updateSummary(cart) {
        const totals = calculateTotals(cart);
        document.getElementById("subtotal").textContent = `$${totals.subtotal.toFixed(2)}`;
        document.getElementById("tax").textContent = `$${totals.tax.toFixed(2)}`;
        document.getElementById("total").textContent = `$${totals.total.toFixed(2)}`;
    }

});
