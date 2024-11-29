const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const port = 5506;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/cartDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connection successful"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Schema definition
const orderSchema = new mongoose.Schema({
    phone: String,
    product: String,
});

// Model creation
const Order = mongoose.model("Order", orderSchema);

// Serve the form
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "orderForm.html"));
});

// Handle form submission
app.post("/place-order", async (req, res) => {
    const { phone, product } = req.body;

    try {
        const order = new Order({ phone, product });
        await order.save();
        console.log("Order placed:", order);
        res.send("Order placed successfully!");
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).send("An error occurred while placing the order.");
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
