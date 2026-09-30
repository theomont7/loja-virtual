document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");
    const loginLink = document.getElementById("loginLink");
    const profileLink = document.getElementById("profileLink");

    if (token) {
        loginLink.style.display = "none";
        profileLink.style.display = "inline-block";
    }


    const order = JSON.parse(localStorage.getItem("lastOrder"));

    if (!order) {
        window.location.href = "cart.html";
        return;
    }

    const detailBox = document.getElementById("orderDetails");

    let itemsHTML = "";
    order.items.forEach(item => {
        itemsHTML += `
            <div class="item-line">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });

    detailBox.innerHTML = `
        <div class="detail-row"><strong>Order ID:</strong> ${order.id}</div>
        <div class="detail-row"><strong>Name:</strong> ${order.name}</div>
        <div class="detail-row"><strong>Email:</strong> ${order.email}</div>
        <div class="detail-row"><strong>Phone:</strong> ${order.phone}</div>
        <div class="detail-row"><strong>Address:</strong> ${order.address}, ${order.city}</div>
        <div class="detail-row"><strong>Postal Code:</strong> ${order.postal}</div>
        <div class="detail-row"><strong>Delivery:</strong> ${order.delivery}</div>

        <h3 style="margin-top:15px;">Order Items</h3>
        <div class="items-list">
            ${itemsHTML}
        </div>

        <h3 style="margin-top:15px;">Totals</h3>
        <div class="detail-row"><strong>Subtotal:</strong> $${order.totals.subtotal.toFixed(2)}</div>
        <div class="detail-row"><strong>Tax (13%):</strong> $${order.totals.tax.toFixed(2)}</div>
        <div class="detail-row"><strong>Total:</strong> $${order.totals.total.toFixed(2)}</div>
    `;
});
