const mongoose = require("mongoose");
const Product = require("../models/product");
const Order = require("../models/Order");
const User = require("../models/User");
const Address = require("../models/Address");

exports.createOrder = async (req) => {
  try {
    const { address_id, items, payment_method } = req.body;
    const user_id = req.user?.id;

    if (!user_id) throw new Error("Unauthorized: User not found");

    if (
      !address_id ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !payment_method
    ) {
      throw new Error("Missing required fields");
    }

    if (!mongoose.Types.ObjectId.isValid(address_id)) {
      throw new Error("Invalid address ID format");
    }

    const address = await Address.findById(address_id);
    if (!address) throw new Error("Invalid address");

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      if (!mongoose.Types.ObjectId.isValid(item.product_id)) {
        throw new Error("Invalid product ID format");
      }

      const product = await Product.findById(item.product_id);
      if (!product || !product.is_active) {
        throw new Error(`Invalid or inactive product`);
      }

      if (item.quantity > product.stock_quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      const price = product.price;
      const quantity = item.quantity;
      totalAmount += price * quantity;

      orderItems.push({
        product_id: product._id,
        quantity,
        price: Number(price),
      });

      // Update stock
      product.stock_quantity -= quantity;
      await product.save();
    }

    const newOrder = await Order.create({
      user_id,
      address_id,
      total_amount: Number(totalAmount),
      payment_method,
      orderItems,
      status: "pending",
    });

    return newOrder;
  } catch (error) {
    throw new Error(error.message || "Order creation failed");
  }
};
exports.getUserOrders = async (userId) => {
  try {
    const orders = await Order.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .populate("orderItems.product_id")
      .populate("address_id");

    return orders;
  } catch (error) {
    console.log(error);
  }
};

// exports.getOrderById = async (orderId) => {
//   console.log(orderId);
//   const order = await Order.findById(orderId)
//     .populate("orderItems.product_id")
//     .populate("address_id");

//   if (!order) throw new Error("Order not found");
//   // if (user.role !== "admin" && String(order.user_id) !== String(user._id)) {
//   //   throw new Error("Unauthorized to view this order");
//   // }

//   return order;
// };

exports.getOrdersByUserId = async (userId) => {
  try {
    const orders = await Order.find({ user_id: userId })
      .populate("orderItems.product_id")
      .populate("address_id");

    if (!orders || orders.length === 0) {
      throw new Error("No orders found for this user");
    }

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};

exports.updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  order.status = status;
  await order.save();

  return order;
};

exports.cancelOrder = async (orderId, userId, role) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  const isUser = String(order.user_id) === String(userId);
  // if (role !== "admin" && !isUser) throw new Error("Unauthorized");

  if (["shipped", "delivered"].includes(order.status)) {
    throw new Error("Cannot cancel shipped/delivered order");
  }

  order.status = "cancelled";
  return await order.save();
};

exports.trackOrderStatus = async (orderId, user) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  const isUser = String(order.user_id) === String(user._id);
  // if (user.role !== "admin" && !isUser) throw new Error("Unauthorized");

  return order.status;
};

exports.getAllOrders = async () => {
  return await Order.find({})
    .sort({ createdAt: -1 })
    .populate("user_id")
    .populate("orderItems.product_id")
    .populate("address_id");
};
