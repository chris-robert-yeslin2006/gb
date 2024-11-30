
        const cartItemsContainer = document.getElementById("cartItems");
        const emptyMessage = document.getElementById("emptyMessage");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Render cart items
        function renderCart() {
            cartItemsContainer.innerHTML = "";

            if (cart.length === 0) {
                emptyMessage.style.display = "block";
                return;
            } else {
                emptyMessage.style.display = "none";
            }

            cart.forEach((item, index) => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                    <p>Quantity:${item.quantity}</p>
                    <button onclick="increaseQuantity(${index})">+</button>
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
        }

        // Increase quantity
        function increaseQuantity(index) {
            cart[index].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }

        // Decrease quantity
        function decreaseQuantity(index) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); // Remove item if quantity is 0
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }

        // Remove item from cart
        function removeFromCart(index) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }

        // Export cart data as JSON
        function exportCart() {
            const cartJSON = JSON.stringify(cart, null, 2); // Convert to JSON (pretty format)
            console.log("Cart Data in JSON:", cartJSON); // Log JSON to console
        }

        renderCart();
 