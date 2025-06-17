const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/add", authMiddleware, cartController.addToCart);
router.get("/getcart", authMiddleware, cartController.getCart);
router.put("/update", authMiddleware, cartController.updateCartItem);
router.delete(
  "/remove/:productId",
  authMiddleware,
  cartController.removeCartItem
);
router.delete("/clear", authMiddleware, cartController.clearCart);
router.get("/count", authMiddleware, cartController.getCartItemCount);

module.exports = router;
