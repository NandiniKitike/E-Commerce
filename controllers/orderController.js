const orderService = require("../services/orderService");

// Place order
exports.placeOrder = async (req, res) => {
  const { userId, address, paymentMethod } = req.body;

  if (!userId || !address || !paymentMethod) {
    return res
      .status(400)
      .json({ message: "User ID, address, and payment method are required" });
  }

  try {
    const result = await orderService.placeOrder(
      userId,
      address,
      paymentMethod
    );
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Order Placement Controller Error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
// Get all orders of a specific user
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await orderService.getUserOrders(userId);
    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await orderService.getOrderById(orderId);
    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const result = await orderService.updateOrderStatus(orderId, status);
    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// ancel a specific order
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await orderService.cancelOrder(orderId);
    return res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
exports.updateShippingAddress = async (req, res) => {
  try {
    const orderId = req.params.id;
    const newAddress = req.body.address;

    const response = await orderService.updateShippingAddress(
      orderId,
      newAddress
    );
    return res.status(response.status).json(response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
