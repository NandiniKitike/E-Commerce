const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController"); // Make sure this is imported correctly
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const Admin = require("../models/Admin");

// Admin Registration & Login (correct controller used now)
router.post("/register", adminController.registerAdmin); // Corrected to adminController
router.post("/login", adminController.loginAdmin); // Corrected to adminController

// Admin Routes (Requires authentication and admin role)
router.use(authMiddleware); // Check JWT
router.use(roleMiddleware("admin")); // Check admin role

// User management
router.get("/users", adminController.getAllUsers);
router.put("/users/:id/block", adminController.blockUser);
router.put("/users/:id/unblock", adminController.unblockUser);
router.delete("/users/:id", adminController.deleteUser);

// Product management
// router.post("/products", adminController.createProduct);
router.put("/products/:id", adminController.updateProduct);
router.delete("/products/:id", adminController.deleteProduct);

// Order management
router.get("/orders", adminController.getAllOrders);
router.put("/orders/:id/status", adminController.updateOrderStatus);

module.exports = router;
