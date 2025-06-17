const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../Middleware/authMiddleware");

// ✅ Put specific routes before dynamic routes
router.post("/", authMiddleware, orderController.placeOrder);
// router.get("/getorders", authMiddleware, orderController.getMyOrders);
router.get("/getallorder", authMiddleware, orderController.getAllOrders); // moved up
// router.get("/:id/track", authMiddleware, orderController.trackOrder);
// router.put("/:id/status", authMiddleware, orderController.updateOrderStatus);
// router.put("/:id/cancel", authMiddleware, orderController.cancelOrder);
router.get("/user", authMiddleware, orderController.getOrderById); // moved down

module.exports = router;
// router.post("/create-order", createRazorpayOrder);
console.log(orderController);
