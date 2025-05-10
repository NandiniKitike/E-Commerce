const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (userId, address, paymentMethod) => {
  try {
    const cart = await Cart.findOne({ userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return { status: 400, message: "Cart is empty" };
    }

    let totalAmount = 0;

    // Calculate total amount and validate product existence
    const orderItems = cart.items.map((item) => {
      if (!item.product) {
        throw new Error("Invalid product in cart");
      }

      totalAmount += item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    // Create order
    const order = new Order({
      userId,
      address,
      paymentMethod,
      items: orderItems,
      totalAmount,
      status: "pending",
    });

    await order.save();

    // Clear the cart after placing the order
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    return {
      status: 200,
      message: "Order placed successfully",
      data: order,
    };
  } catch (error) {
    console.error("Order Service Error:", error.message);
    return {
      status: 500,
      message: "Internal server error",
      error: error.message,
    };
  }
};
// Get all orders for a user
exports.getUserOrders = async (userId) => {
  try {
    const orders = await Order.find({ userId })
      .populate("items.product")
      .select();
    if (!orders.length) {
      return { status: 404, message: "No orders found" };
    }

    return {
      status: 200,
      message: "Orders fetched successfully",
      data: orders,
    };
  } catch (err) {
    console.error(err);
    return { status: 500, message: "Server error", error: err.message };
  }
};

// Get a specific order by ID
exports.getOrderById = async (orderId) => {
  try {
    const order = await Order.findById(orderId).populate("items.product");
    if (!order) {
      return { status: 404, message: "Order not found" };
    }

    return { status: 200, message: "Order fetched successfully", data: order };
  } catch (err) {
    console.error(err);
    return { status: 500, message: "Server error", error: err.message };
  }
};

// Update order status
exports.updateOrderStatus = async (orderId, status) => {
  const validStatuses = ["pending", "processing", "completed", "cancelled"];
  if (!validStatuses.includes(status)) {
    return { status: 400, message: "Invalid status" };
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return { status: 404, message: "Order not found" };
    }

    order.status = status;
    await order.save();

    return { status: 200, message: "Order status updated", data: order };
  } catch (err) {
    console.error(err);
    return { status: 500, message: "Server error", error: err.message };
  }
};

// Cancel an order

// Cancel an order
exports.cancelOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return { status: 404, message: "Order not found" };
    }

    console.log("Order before cancellation:", JSON.stringify(order, null, 2));

    if (order.status === "completed") {
      return { status: 400, message: "Completed orders cannot be cancelled" };
    }

    order.items = [];
    order.status = "cancelled";
    order.totalAmount = 0;

    await order.save();

    console.log("Order after cancellation:", JSON.stringify(order, null, 2));

    return {
      status: 200,
      message: "Order cancelled successfully",
      data: order,
    };
  } catch (err) {
    console.error("Error during order cancellation:", err);
    return { status: 500, message: "Server error", error: err.message };
  }
};
