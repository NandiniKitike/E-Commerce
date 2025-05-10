const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");
// Add or update product in cart

exports.addToCart = async (userId, productId, quantity) => {
  if (quantity <= 0) {
    return { status: 400, message: "Quantity must be a positive number" };
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return { status: 404, message: "Product not found" };
    }

    // Check if there's enough stock
    if (product.stock < quantity) {
      return { status: 400, message: "Not enough stock available" };
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ product: productId, quantity, price: product.price }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Update existing item quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item to the cart
        cart.items.push({ product: productId, quantity, price: product.price });
      }
    }

    // Save the cart and handle database issues
    await cart.save();

    // Populate the product details for each item in the cart
    await cart.populate({
      path: "items.product",
      select: "name price imageUrl", // Include the necessary fields
    });

    // Return success response with updated cart
    return { status: 200, message: "Item added to cart", data: cart };
  } catch (error) {
    // Log full error stack for debugging
    console.error("Cart Save Error:", error.stack);

    return {
      status: 500,
      message: "Internal server error",
      error: error.message,
    };
  }
};
// Get user cart
exports.getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate("items");
  if (!cart) return { status: 404, message: "Cart not found" };
  return { status: 200, data: cart };
};

// Remove item from cart
exports.removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return { status: 400, message: "cart not found" };
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex > -1) {
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  } else {
    return { status: 404, message: "Item not found in the cart" };
  }

  try {
    await cart.save();

    return { status: 200, message: "Item added to cart", data: cart };
  } catch (error) {
    console.error("Cart Save Error:", error.message);
    return {
      status: 500,
      message: "Internal server error",
      error: error.message,
    };
  }
};
