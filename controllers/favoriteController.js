const favoriteService = require("../services/favoriteService");
exports.addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;
    const result = await favoriteService.addFavorite(userId, productId);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.query;
    const userId = req.user.id;
    const result = await favoriteService.removeFromFavorites(userId, productId);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await favoriteService.getFavorites(userId);
    res.status(result.status).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
