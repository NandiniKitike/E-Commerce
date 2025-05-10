const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");
router.post("/add", authMiddleware, cartController.addToCart);
router.delete("/remove", authMiddleware, cartController.removeCartItem);
router.get("/", cartController.getCart);
module.exports = router;
