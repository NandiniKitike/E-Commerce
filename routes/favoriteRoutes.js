const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const favoriteController = require("../controllers/favoriteController");

// Add to favorites
router.post("/addfavorites", authMiddleware, favoriteController.addFavorite);

// Get all favorites
router.get("/getfavorites", authMiddleware, favoriteController.getFavorites);

// Remove from favorites
router.delete(
  "/deletefavorites/:productId",
  authMiddleware,
  favoriteController.removeFavorite
);

module.exports = router;
