const cartService = require("../services//cartService");
//add product in cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Get user ID from the authenticated user

  try {
    const result = await cartService.addToCart(userId, productId, quantity);
    return res.status(result.status).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error("Add to Cart Error:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
//get user cart
exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await cartService.getCart(userId);
    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
//update item quantity
exports.updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const result = await cartService.updateCartItem(
      userId,
      productId,
      quantity
    );
    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
//remove item from the cart
exports.removeCartItem = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;
  try {
    const result = await cartService.removeCartItem(userId, productId);
    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
