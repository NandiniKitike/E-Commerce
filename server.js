const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectCloudinary = require("./config/cloudinary.js");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Add cookie-parser middleware to parse cookies
app.use(cookieParser());

// Configure CORS with credentials support
app.use(
  cors({
    origin: ["http://localhost:5173", "https://frontend-ecom-woad.vercel.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectDB();
// connectCloudinary();

const userRoutes = require("./routes/userRoute.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const addressRoutes = require("./routes/addressRoutes.js");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); // Fixed typo here

app.use("/api/auth", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/payments", paymentRoutes); // Fixed typo here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
