const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");

// Add product to favorites
router.post("/add", authMiddleware, favoriteController.addFavorite);

// Remove product from favorites
router.delete(
  "/remove",
  authMiddleware,
  favoriteController.removeFromFavorites
);

// Get all favorites for a user
router.get("/getData", authMiddleware, favoriteController.getFavorites);

module.exports = router;
