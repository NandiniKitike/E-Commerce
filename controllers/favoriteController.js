const favoriteService = require("../services/favoriteService");

// Add to favorites
exports.addFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const favorite = await favoriteService.addFavorite(userId, productId);
    res.status(201).json({ message: "Product added to favorites", favorite });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all favorites
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await favoriteService.getFavorites(userId);

    res.json({ favorites });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove from favorites
exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const result = await favoriteService.removeFavorite(userId, productId);
    res.json({ message: "Product removed from favorites", favorite: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
