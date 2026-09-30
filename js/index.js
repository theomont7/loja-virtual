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


    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);

        const cartBadge = document.getElementById("cartCount");
        if (cartBadge) cartBadge.textContent = count;
    }
    updateCartCount();



    fetch("../data/products.json")
        .then(res => res.json())
        .then(products => {
            const featuredContainer = document.querySelector(".product-list");

            
            const featured = products.sort(() => Math.random() - 0.5).slice(0, 8);

            featured.forEach(product => {
                const card = document.createElement("div");
                card.classList.add("product-card");

              
                const imageURL = `https://picsum.photos/seed/${product.id}/300/300`;

                card.innerHTML = `
                    <img src="${imageURL}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button onclick="window.location.href='product.html?id=${product.id}'">
                        View Product
                    </button>
                `;

                featuredContainer.appendChild(card);
            });
        })
        .catch(err => console.error("Featured product error:", err));



fetch("../data/products.json")
    .then(res => res.json())
    .then(products => {
        const slider = document.getElementById("productSlider");
        let index = 0;
        const visibleCards = 4;
        const cardWidth = 240; 

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "slider-card";

            const imageURL = `https://picsum.photos/seed/slider${product.id}/300/300`;

            card.innerHTML = `
                <img src="${imageURL}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
            `;

            slider.appendChild(card);
        });

        function slide() {
            index++;
            if (index > products.length - visibleCards) {
                index = 0;
            }
            slider.style.transform = `translateX(-${index * cardWidth}px)`;
        }

        let autoSlide = setInterval(slide, 3000);

        document.getElementById("slideLeft").onclick = () => {
            index = Math.max(index - 1, 0);
            slider.style.transform = `translateX(-${index * cardWidth}px)`;
        };

        document.getElementById("slideRight").onclick = () => {
            index = Math.min(index + 1, products.length - visibleCards);
            slider.style.transform = `translateX(-${index * cardWidth}px)`;
        };
    })
    .catch(err => console.error("Slider error:", err));




   

});
