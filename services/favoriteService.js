const Favorite = require("../models/Favorite");

// Add to favorites
exports.addFavorite = async (userId, productId) => {
  // Check if already in favorites
  const existingFavorite = await Favorite.findOne({
    user_id: userId,
    product_id: productId,
  });
  if (existingFavorite) {
    throw new Error("Product is already in favorites");
  }

  const favorite = new Favorite({ user_id: userId, product_id: productId });
  await favorite.save();
  return favorite;
};

// Get all favorites for a user
exports.getFavorites = async (userId) => {
  return await Favorite.find({ user_id: userId }).populate(
    "product_id",
    "name price description"
  );
};

// Remove from favorites
exports.removeFavorite = async (userId, productId) => {
  const result = await Favorite.findOneAndDelete({
    user_id: userId,
    product_id: productId,
  });
  if (!result) {
    throw new Error("Favorite not found");
  }
  return result;
};
