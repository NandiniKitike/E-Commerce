const orderService = require("../services/orderService");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req);
    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    console.error("Order Error:", err.message);
    res.status(400).json({ error: err.message });
  }
};
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paisa
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const response = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Razorpay order creation failed",
      error: err.message,
    });
  }
};
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.user.id);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single order by ID (user or admin)
exports.getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await orderService.getOrdersByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      order: orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// Update order status (admin only)
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     // if (req.user.role !== "admin") {
//     //   return res.status(403).json({ error: "Unauthorized" });
//     // }

//     const updated = await orderService.updateOrderStatus(
//       req.params.id,
//       req.body.status
//     );
//     res.status(200).json({ message: "Order status updated", updated });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderService.updateOrderStatus(id, status);

    return res.json({
      success: true,
      message: "Order status updated",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Status update error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update order status",
    });
  }
};

// Cancel order (user only, if not shipped)
exports.cancelOrder = async (req, res) => {
  try {
    const result = await orderService.cancelOrder(
      req.params.id,
      req.user._id,
      req.user.role
    );
    res.status(200).json({ message: "Order cancelled", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Track order (user or admin)
exports.trackOrder = async (req, res) => {
  try {
    const status = await orderService.trackOrderStatus(req.params.id, req.user);
    res.status(200).json({ status });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   return res.status(403).json({ error: "Unauthorized" });
    // }

    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
