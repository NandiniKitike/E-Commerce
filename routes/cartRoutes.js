const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");

router.post("/add", cartController.addToCart);
router.get("/getcart", cartController.getCart);
router.put("/update", cartController.updateCartItem);
router.delete("/remove/:productId", cartController.removeCartItem);
router.delete("/clear", cartController.clearCart);
router.get("/count", cartController.getCartItemCount);

module.exports = router;
