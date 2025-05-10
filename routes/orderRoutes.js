const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
// Place a new order (user must be authenticated)
router.post("/place", authMiddleware, orderController.placeOrder);

// Get all orders of a specific user
router.get("/user/:userId", orderController.getUserOrders);

// Get a specific order by ID
router.get("/:orderId", authMiddleware, orderController.getOrderById);

// Update status of an order
router.put("/:orderId/status", orderController.updateOrderStatus);

// Cancel a specific order (using DELETE for cancellation)
router.delete("/cancel/:orderId", authMiddleware, orderController.cancelOrder);
router.put("/orders/:id/address", orderController.updateShippingAddress);

module.exports = router;
