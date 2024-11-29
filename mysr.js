const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const port = 5506;
const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.static(__dirname)); // Serve static files

// MongoDB Connection
mongoose
    .connect("mongodb://127.0.0.1:27017/cartDB")
    .then(() => {
        console.log("MongoDB connected successfully.");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Schema for Cart Items
const cartItemSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    quantity: Number,
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

// Serve the cart page
app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "cart.html"));
});

// API to save cart data
app.post("/save-cart", async (req, res) => {
    const cartItems = req.body;

    try {
        await CartItem.insertMany(cartItems); // Save cart items to MongoDB
        res.status(200).send("Cart items saved successfully!");
    } catch (error) {
        console.error("Error saving cart items:", error);
        res.status(500).send("Failed to save cart items.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
