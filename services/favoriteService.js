const Favorite = require("../models/Favorite");
const Product = require("../models/Product");
exports.addFavorites = async (userId, productId) => {
  const existing = await Favorite.findOne({ userId, productId });
  if (existing) {
    return { status: 400, message: "Product already in favorites" };
  }
  const favorite = new Favorite({ userId, productId });
  await favorite.save();
  const product = await Product.findById(productId);
  return {
    status: 200,
    message: "Product added to favorites",
    data: {
      productId,
      productName: product.name,
    },
  };
};

exports.removeFromFavorites = async (userId, productId) => {
  const result = await Favorite.findOneAndDelete({ userId, productId });
  if (!result) {
    return { status: 404, message: "Favorite not found" };
  }
  return { status: 200, message: "Product removed from favorites" };
};

exports.getFavorites = async (userId) => {
  console.log("User ID:", userId); // Check if the userId is coming correctly

  const favorites = await Favorite.find({ userId }).populate("productId");

  console.log("Favorites:", favorites); // Check the fetched data

  return {
    status: 200,
    message: "Favorites fetched successfully",
    data: favorites,
  };
};
