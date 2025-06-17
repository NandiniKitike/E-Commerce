const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");
const paymentController = require("../controllers/paymentController");

// Process payment for an order
router.post(
  "/process",
  authMiddleware,
  roleMiddleware(["admin"]),
  paymentController.processPayment
);

// Get payment details for a specific order
router.get(
  "/:orderId",
  authMiddleware,
  roleMiddleware(["admin"]),
  paymentController.getPaymentDetails
);
// Admin - Process refund
router.post("/refund/:id", authMiddleware, paymentController.refundPayment);

module.exports = router;
