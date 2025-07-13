// const User = require("../models/User");

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// // Register User
// async function registerUser(userData) {
//   const { first_name, last_name, email, password, phone, role } = userData;
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw new Error("User already exists");
//   }
//   const newUser = new User({
//     first_name,
//     last_name,
//     email,
//     password,
//     first_name,
//     last_name,
//     phone,
//     role,
//     is_active: true,
//   });
//   await newUser.save();
//   return { success: true, message: "User registered successfully" };
// }

// //admin regis

// async function registeradmin(userData) {
//   const { first_name, last_name, email, password, phone, role } = userData;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   // Create new admin
//   const newUser = new User({
//     first_name,
//     last_name,
//     email,
//     password,
//     first_name,
//     last_name,
//     phone,
//     role,
//     is_active: true,
//   });
//   await newUser.save();
//   return { success: true, message: "User registered successfully" };
// }

// // Login User
// async function loginUser(credentials) {
//   const { email, password } = credentials;
//   const user = await User.findOne({ email });
//   if (!user) {
//     return {
//       status: 404,
//       success: false,
//       message: "User not found",
//     };
//   }
//   if (password !== user.password) {
//     return {
//       status: 401,
//       success: false,
//       message: "Invalid password",
//     };
//   }
//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "1h",
//     }
//   );
//   return {
//     status: 200,
//     success: true,
//     token,
//   };
// }

// // Login admin
// // async function loginAdmin(credentials) {
// //   const { email, password } = credentials;
// //   const user = await User.findOne({ email });
// //   if (!user) {
// //     throw new Error("Invalid email or password");
// //   }
// //   if (user.role !== "admin") {
// //     throw new Error("Access denied. Only admin users can log in here.");
// //   }

// const loginAdmin = async (credentials) => {
//   const { email, password } = credentials;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return {
//       success: false,
//       status: 401,
//       message: "Invalid email or password",
//     };
//   }

//   if (user.role?.trim().toLowerCase() !== "admin") {
//     return {
//       success: false,
//       status: 403,
//       message: "Access denied. Only admin users can log in here.",
//     };
//   }

//   if (user.password !== password) {
//     return {
//       success: false,
//       status: 401,
//       message: "Invalid email or password",
//     };
//   }
//   const token = jwt.sign({ id: user._id, role: user.role }, "nandini", {
//     expiresIn: "1d",
//   });

//   return {
//     success: true,
//     status: 200,
//     message: "Login successful",
//     token,
//     user: {
//       id: user._id,
//       email: user.email,
//       role: user.role,
//     },
//   };
// };

// // Check if password matches

// // Generate JWT token
// // const token = jwt.sign(
// //   { id: user._id, role: user.role },
// //   process.env.JWT_SECRET,
// //   {
// //     expiresIn: "1h",
// //   }
// // );

// // return { success: true, token };

// // Get User Profile
// async function getUserProfile(userId) {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }

//   return {
//     id: user._id,
//     username: user.username,
//     email: user.email,
//     first_name: user.first_name,
//     last_name: user.last_name,
//     phone: user.phone,
//     role: user.role,
//     is_active: user.is_active,
//   };
// }

// // Update User Profile
// async function updateUserProfile(userId, updatedData) {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Update user fields
//   Object.assign(user, updatedData);
//   user.updated_at = new Date();

//   // Save updated user
//   await user.save();

//   return { success: true, message: "User profile updated successfully", user };
// }

// //---------------admin------------------
// // const admin = require("../models/User");
// async function getAllUsers() {
//   return await User.find({});
// }

// async function updateUser(userId, data) {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }
//   Object.assign(user, data);
//   return await user.save();
// }

// async function deleteUser(userId) {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }
//   return await user.deleteOne();
// }

// async function changeUserRole(userId, role) {
//   const user = await User.findById(userId);
//   if (!user) {
//     throw new Error("User not found");
//   }
//   user.role = role;
//   user.updated_at = new Date();
//   return await user.save();
// }

// //logout admin
// async function logoutAdminWithCookie() {
//   return {
//     success: true,
//     message: "Admin logged out and cookie cleared.",
//   };
// }
// async function getCurrentUser(id) {
//   return await User.findById(id).select("-password");
// }

// module.exports = {
//   registerUser,
//   loginUser,
//   loginAdmin,
//   getUserProfile,
//   updateUserProfile,
//   getAllUsers,
//   updateUser,
//   deleteUser,
//   changeUserRole,
//   registeradmin,
//   logoutAdminWithCookie,
//   getCurrentUser,
// };
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "nandini"; // ideally use env variable

// Generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });
}

// Register Customer
async function registerCustomer({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const user = new User({ name, email, password, role: "customer" });
  await user.save();

  const token = generateToken(user);
  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  };
}

// Login Customer
async function loginCustomer({ email, password }) {
  const user = await User.findOne({ email });

  if (!user || user.role !== "customer") {
    throw new Error("Invalid credentials");
  }

  // Plain text password comparison (NOT SECURE for real applications)
  if (user.password !== password) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
    token,
  };
}

// Register Admin
async function registerAdmin({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }
  const user = new User({ name, email, password, role: "admin" });
  await user.save();

  const token = generateToken(user);
  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  };
}

// Login Admin
async function loginAdmin({ email, password }) {
  const user = await User.findOne({ email });
  if (!user || user.password !== password || user.role !== "admin") {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user);
  return {
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  };
}

// Get user profile by id
async function getUserProfile(userId) {
  const user = await User.findById(userId).select("-password -__v");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
async function getUserById(userId) {
  try {
    const user = await User.findById(userId).select("-password"); // Exclude password
    return user;
  } catch (error) {
    console.error("authService error:", error.message);
    throw error;
  }
}
async function getAdminById(userId) {
  try {
    const user = await User.findById(userId).select("-password");
    return user;
  } catch (error) {
    console.error("userService error:", error.message);
    throw error;
  }
}

// exports.logoutAdminWithCookie = async (adminId) => {
//   try {
//     console.log(`Admin user ${adminId} logged out`);

//     return { success: true, message: "Admin logged out successfully" };
//   } catch (error) {
//     throw new Error("Logout process failed");
//   }
// };

module.exports = {
  registerCustomer,
  loginCustomer,
  registerAdmin,
  loginAdmin,
  getUserProfile,
  logoutAdminWithCookie,
  getAdminById,
  getUserById,
  logoutUser,
};
// //logout admin
async function logoutAdminWithCookie() {
  return {
    success: true,
    message: "Admin logged out successfull",
  };
}

async function getUserById(userId) {
  // Find user by id excluding password field
  return await User.findById(userId).select("-password");
}
async function logoutUser(userId) {
  try {
    // Optional: Update user’s session status in DB
    // Example: set isLoggedIn = false
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    console.log(`User ${userId} logged out`);
    return { success: true, message: "User logged out" };
  } catch (error) {
    console.error("logoutUser error:", error.message);
    throw error;
  }
}
