const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

//------------------User Management---------------
exports.getAllUsers = async () => {
  try {
    return await User.find({ role: "user" }).select("-password");
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
};

exports.blockUser = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error("Error blocking user: " + error.message);
  }
};

exports.unblockUser = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error("Error unblocking user: " + error.message);
  }
};

exports.deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
};

//--------------------Order Management-----------------------
exports.getAllOrders = async () => {
  try {
    return await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price");
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
};

exports.updateOrderStatus = async (orderId, status) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.status = status;
    await order.save();
    return order;
  } catch (error) {
    throw new Error("Error updating order status: " + error.message);
  }
};

//--------------------Admin Authentication-------------------

// Admin Registration
exports.registerAdmin = async (adminData) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phone,
      role,
      password,
      permissions,
      city,
    } = adminData;
    console.log(adminData);

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return { status: 400, message: "Admin already exists" };

    // Validate fields (basic validation)
    if (!email || !password)
      return { status: 400, message: "Email and password are required" };

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      firstname,
      lastname,
      email,
      phone,
      role: role || "admin",
      password: hashedPassword,
      permissions,
      city,
    });

    await newAdmin.save();
    return {
      status: 201,
      message: "Admin registered successfully",
      data: {
        id: newAdmin._id,
        firstname: newAdmin.firstname,
        lastname: newAdmin.lastname,
        email: newAdmin.email,
        phone: newAdmin.phone,
        role: newAdmin.role,
        city: newAdmin.city,
        permissions: newAdmin.permissions,
      },
    };
  } catch (error) {
    throw new Error("Error registering admin: " + error.message);
  }
};

// Admin Login
exports.loginAdmin = async (email, password) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return { status: 404, message: "Admin not found" };

    // const isMatch = await bcrypt.compare(password, admin.password);
    // console.log("Password matched?", isMatch);

    // if (!isMatch) return { status: 400, message: "Invalid credentials" };
    // if (password === admin.password) {
    //   return { status: 200, message: "Login successful", data: { token } };
    // }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { status: 200, message: "Login successful", data: { token } };
  } catch (error) {
    return { status: 500, message: "Login failed", error: error.message };
  }
};
