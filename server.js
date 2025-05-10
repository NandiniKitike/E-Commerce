// Import necessary modules
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./config/db.js"); // Make sure you have a file to connect to your DB
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware to parse incoming JSON requests
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const addressRoutes = require("./routes/addressRoutes");

// Use Routes
app.use("/api/admin", adminRoutes); // Add the correct route prefix
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
