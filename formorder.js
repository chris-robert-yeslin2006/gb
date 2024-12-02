// const placeOrderBtn = document.getElementById("placeOrderBtn");
//         const modalOverlay = document.getElementById("modalOverlay");
//         const orderFormModal = document.getElementById("orderFormModal");
//         const closeModal = document.getElementById("closeModal");

//         // Show modal on button click
//         placeOrderBtn.addEventListener("click", () => {
//             modalOverlay.style.display = "block";
//             orderFormModal.style.display = "block";
//         });

//         // Close modal
//         closeModal.addEventListener("click", () => {
//             modalOverlay.style.display = "none";
//             orderFormModal.style.display = "none";
//         });

//         // Close modal when clicking outside
//         modalOverlay.addEventListener("click", () => {
//             modalOverlay.style.display = "none";
//             orderFormModal.style.display = "none";
//         });

//         // Get necessary DOM elements
// // const placeOrderBtn = document.getElementById("placeOrderBtn");
// // const modalOverlay = document.getElementById("modalOverlay");
// // const orderFormModal = document.getElementById("orderFormModal");
// // const closeModal = document.getElementById("closeModal");
// const productsInput = document.querySelector('input[name="Products"]'); // Products input field

// // Show modal and populate the products field
// placeOrderBtn.addEventListener("click", () => {
//     // Retrieve cart items from localStorage
//     const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
//     // Extract product names
//     const productNames = cartItems.map(item => item.name).join(", ");

//     // Populate the "Products" input field
//     productsInput.value = productNames;

//     // Show the modal and overlay
//     modalOverlay.style.display = "block";
//     orderFormModal.style.display = "block";
// });

// // Close modal
// closeModal.addEventListener("click", () => {
//     modalOverlay.style.display = "none";
//     orderFormModal.style.display = "none";
// });

// // Close modal when clicking outside
// modalOverlay.addEventListener("click", () => {
//     modalOverlay.style.display = "none";
//     orderFormModal.style.display = "none";
// });

// document.getElementById("form").addEventListener("submit", function (e) {
//     e.preventDefault(); // Prevent the default form submission
//     const messageElement = document.getElementById("message");
//     messageElement.textContent = "Submitting..";
//     messageElement.style.display = "block";
//     messageElement.style.color = "gold";
//     document.getElementById("submit-button").disabled = true;

//     // Collect the form data
//     const formData = new FormData(this);
//     const keyValuePairs = [];
//     for (const pair of formData.entries()) {
//         keyValuePairs.push(pair[0] + "=" + encodeURIComponent(pair[1]));
//     }
//     const formDataString = keyValuePairs.join("&");

//     // Send a POST request to your Google Apps Script
//     fetch(
//         "https://script.google.com/macros/s/AKfycbyVIccqwhe-S5Gs5YAM3L6cBYgF6paB5AO0UgD_yTA5KuwcUKPU4mpFH0Ha9i0ZnnnrWA/exec",
//         {
//             method: "POST",
//             body: formDataString,
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//         }
//     )
//     .then(function (response) {
//         if (response.ok) {
//             return response.json(); // Assuming the script returns JSON
//         } else {
//             throw new Error("Failed to submit the form.");
//         }
//     })
//     .then(function () {
//         messageElement.textContent = "Order placed successfully!";
//         messageElement.style.color = "gold";
//         document.getElementById("form").reset();
//         document.getElementById("submit-button").disabled = false;

//         setTimeout(() => {
//             messageElement.style.display = "none";
//         }, 2600);
//     })
//     .catch(function (error) {
//         console.error(error);
//         messageElement.textContent = "An error occurred while placing the order.";
//         messageElement.style.color = "red";
//         document.getElementById("submit-button").disabled = false;
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    const modalOverlay = document.getElementById("modalOverlay");
    const orderFormModal = document.getElementById("orderFormModal");
    const closeModal = document.getElementById("closeModal");
    const productsInput = document.querySelector('input[name="Products"]');

    // Show modal on button click
    placeOrderBtn.addEventListener("click", () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        if (cartItems.length === 0) {
            alert("Your cart is empty! Add items before placing an order.");
            return;
        }

        const productNames = cartItems.map(item => `${item.name} (x${item.quantity})`).join(", ");
        productsInput.value = productNames;

        modalOverlay.style.display = "block";
        orderFormModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        modalOverlay.style.display = "none";
        orderFormModal.style.display = "none";
    });

    modalOverlay.addEventListener("click", () => {
        modalOverlay.style.display = "none";
        orderFormModal.style.display = "none";
    });

    // Handle form submission
    document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const messageElement = document.getElementById("message");

        // Ensure #message exists
        if (!messageElement) {
            console.error("The element with id 'message' does not exist in the DOM.");
            return;
        }

        messageElement.textContent = "Submitting...";
        messageElement.style.display = "block";
        messageElement.style.color = "gold";
        document.getElementById("submit-button").disabled = true;

        const formData = new FormData(this);
        const keyValuePairs = [];
        for (const pair of formData.entries()) {
            keyValuePairs.push(pair[0] + "=" + encodeURIComponent(pair[1]));
        }
        const formDataString = keyValuePairs.join("&");

        fetch(
            "https://script.google.com/macros/s/AKfycbyVIccqwhe-S5Gs5YAM3L6cBYgF6paB5AO0UgD_yTA5KuwcUKPU4mpFH0Ha9i0ZnnnrWA/exec", // Replace with your URL
            {
                method: "POST",
                body: formDataString,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to submit the form.");
            }
        })
        .then(() => {
            messageElement.textContent = "Order placed successfully!";
            messageElement.style.color = "green";
            document.getElementById("form").reset();
            document.getElementById("submit-button").disabled = false;

            // Clear cart and hide modal
            localStorage.removeItem("cart");
            modalOverlay.style.display = "none";
            orderFormModal.style.display = "none";
        })
        .catch(error => {
            console.error(error);
            messageElement.textContent = "An error occurred while placing the order.";
            messageElement.style.color = "red";
            document.getElementById("submit-button").disabled = false;
        });
    });
});
