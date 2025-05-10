const User = require("../models/User");
const Order = require("../models/Order");
const Address = require("../models/Address");
const Favorite = require("../models/Favorite");
const jwt = require("jsonwebtoken");
// Register user
exports.register = async (userData) => {
  try {
    const { firstname, lastname, email, password, phone, city } = userData;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 400, message: "User already exists" };
    }
    console.log(userData);
    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      phone,
      city,
    });
    console.log(User);
    // Return success message
    return {
      status: 201,
      message: "User registered successfully",
      data: newUser,
    };
  } catch (err) {
    console.log(err);
    throw new Error("Registration failed: " + err.message);
  }
};

// Login user
exports.login = async (loginData) => {
  try {
    const { email, password } = loginData;

    const user = await User.findOne({ email });
    if (!user) {
      return { status: 400, message: "User not found" };
    }

    const token = jwt.sign(
      { id: user._id }, // optionally add role here if you use roles
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      status: 200,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        city: user.city,
      },
    };
  } catch (err) {
    console.error("Login error:", err);
    return { status: 500, message: "Server error", error: err.message };
  }
};

// Get user profile (excluding password)
const mongoose = require("mongoose");

exports.getProfile = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return { status: 400, message: "Invalid User ID" };
  }

  const user = await User.findById(userId).select("-password");
  if (!user) {
    return { status: 404, message: "User Not Found" };
  }

  return { status: 200, data: user };
};

// Update user profile
exports.updateProfile = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
  }).select("-password");
  if (!user) {
    return { status: 404, message: "User Not Found" };
  }
  return { status: 200, message: "Profile updated successfully", data: user };
};

// // Get user order history
// exports.getOrderHistory = async (userId) => {
//   const orders = await Order.find({ userId });
//   if (!orders) {
//     return { status: 404, message: "No orders found" };
//   }
//   return { status: 200, data: orders };
// };

// // Add new address
// exports.addAddress = async (userId, addressData) => {
//   const address = new Address({ userId, ...addressData });
//   await address.save();
//   return { status: 201, message: "Address added successfully", data: address };
// };

// // Get user address
// exports.getAddress = async (userId) => {
//   const address = await Address.findOne({ userId });
//   if (!address) {
//     return { status: 404, message: "Address not found" };
//   }
//   return { status: 200, data: address };
// };

// // Add product to favorites
// exports.addToFavorites = async (userId, productId) => {
//   const user = await User.findById(userId);
//   if (!user) {
//     return { status: 404, message: "User not found" };
//   }

//   if (user.favorites.includes(productId)) {
//     return { status: 400, message: "Product already in favorites" };
//   }

//   user.favorites.push(productId);
//   await user.save();

//   return {
//     status: 200,
//     message: "Product added to favorites",
//     data: user.favorites,
//     productName: productId.name,
//   };
// };

// // Remove product from favorites
// exports.removeFromFavorite = async (userId, productId) => {
//   try {
//     const favorite = await Favorite.findOneAndDelete({ userId, productId });
//     if (!favorite) {
//       return { status: 404, message: "Favorite not found" };
//     }
//     return { status: 200, message: "Product removed from favorites" };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: 500,
//       message: "Internal Server Error",
//       error: error.message,
//     };
//   }
// };

// // Get favorite products
// exports.getFavorite = async (userId) => {
//   const favorites = await Favorite.find({ userId }).populate("productId");
//   if (!favorites || favorites.length === 0) {
//     return { status: 404, message: "No favorites found" };
//   }
//   return { status: 200, data: favorites };
// };
