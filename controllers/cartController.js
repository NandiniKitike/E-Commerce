const cartService = require("../services/cartService");

const getCart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const cart = await cartService.getCartByUserId(userId);
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Get Cart Error (Controller):", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

async function updateCartItem(req, res) {
  try {
    const userId = req.user?.id;
    const { product_id, quantity } = req.body;

    if (!product_id || typeof quantity !== "number") {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const cart = await cartService.updateItemQuantity(
      userId,
      product_id,
      quantity
    );
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Update Cart Item Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
async function removeCartItem(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID required" });
    }

    const cart = await cartService.removeItemFromCart(userId, productId);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function clearCart(req, res) {
  try {
    const userId = req.user.id;
    const cart = await cartService.clearUserCart(userId);
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Clear Cart Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function getCartItemCount(req, res) {
  try {
    const userId = req.user.id;
    const count = await cartService.getCartItemCount(userId);
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Get Cart Count Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// <--- Move addToCart here before export
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // From authMiddleware
    const { items } = req.body; // Expecting array of { product_id, quantity }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Items array is required" });
    }

    const updatedCart = await cartService.addItemsToCart(userId, items);

    return res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    console.error("Add to cart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartItemCount,
  addToCart,
};
