const adminService = require("../services/adminService");
const validators = require("../utils/validators");

exports.registerAdmin = async (req, res) => {
  try {
    const response = await adminService.registerAdmin(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    console.log("hello password");
    const response = await adminService.loginAdmin(
      req.body.email,
      req.body.password
    );
    console.log("password");
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

//--------------------User Management---------------------
exports.getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const user = await adminService.blockUser(req.params.id);
    res.status(200).json({ message: "User blocked", user });
  } catch (err) {
    console.error("Error blocking user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const user = await adminService.unblockUser(req.params.id);
    res.status(200).json({ message: "User unblocked successfully", user });
  } catch (err) {
    console.error("Error unblocking user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await adminService.deleteUser(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//------------------Product Management--------------------------
// exports.createProduct = async (req, res) => {
//   try {
//     const product = await adminService.createProduct(req.body);
//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

exports.updateProduct = async (req, res) => {
  try {
    const product = await adminService.updateProduct(req.params.id, req.body);
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await adminService.deleteProduct(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//-------------------------Order Management-------------------------
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await adminService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await adminService.updateOrderStatus(req.params.id, status);
    res.status(200).json({ message: "Status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
