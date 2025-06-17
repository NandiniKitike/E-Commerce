const Cart = require("../models/Cart");

// Get Cart

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user?.id; // should be set by authMiddleware
    const cart = await Cart.find({
      user_id: userId,
    }).populate("items.product_id");
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Quantity
const updateItemQuantity = async (userId, product_id, quantity) => {
  const cart = await Cart.findOne({ user_id: userId });

  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (item) => item?.product_id?.toString() === product_id
  );

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ product_id, quantity });
  }

  await cart.save();
  return cart;
};

// Remove item
const removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items
    .map((item) => {
      if (item.product_id.toString() === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return null;
      }
      return item;
    })
    .filter(Boolean);
  await cart.save();
  return cart;
};

// Clear cart
const clearUserCart = async (userId) => {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = [];
  await cart.save();
  return cart;
};

// Count items
const getCartItemCount = async (userId) => {
  const cart = await Cart.findOne({ user_id: userId });
  return cart ? cart.items.length : 0;
};

// ✅ EXPORT ALL FUNCTIONS
module.exports = {
  getCartByUserId,
  updateItemQuantity,
  removeItemFromCart,
  clearUserCart,
  getCartItemCount,
  addItemsToCart,
};

async function addItemsToCart(userId, items) {
  // Find existing cart for the user
  let cart = await Cart.findOne({ user_id: userId });

  if (!cart) {
    // Create new cart if none exists
    cart = new Cart({
      user_id: userId,
      items: [],
    });
  }

  // Merge new items into existing cart
  for (const newItem of items) {
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === newItem.product_id
    );

    if (existingItemIndex > -1) {
      // If product exists in cart, update quantity
      cart.items[existingItemIndex].quantity += newItem.quantity;
    } else {
      // Else, push new product item
      cart.items.push(newItem);
    }
  }

  await cart.save();
  return cart;
}
