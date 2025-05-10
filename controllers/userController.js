const userService = require("../services/userService");
const authMiddleware = require("../middlewares/authMiddleware");
/// User registration
exports.register = async (req, res) => {
  try {
    const response = await userService.register(req.body);
    return res.status(response.status).json(response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const response = await userService.login(req.body);
    return res.status(response.status).json(response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await userService.getProfile(userId);
    return res.status(response.status).json(response);
  } catch (err) {
    console.error(err);
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const response = await userService.updateProfile(req.user.id, req.body);
    return res.status(response.status).json(response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// // Get user order history
// exports.getOrderHistory = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const response = await userService.getOrderHistory(userId);
//     return res.status(response.status).json(response);
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };

// // Add new address
// exports.addAddress = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const response = await userService.addAddress(userId, req.body);
//     return res.status(response.status).json(response);
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };

// // Get user address
// exports.getAddress = async (req, res) => {
//   try {
//     const response = await userService.getAddress(req.user.id);
//     return res.status(response.status).json(response);
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };

// // Add product to favorites
// exports.addToFavorites = async (req, res) => {
//   try {
//     const userId = req.user.id; // from auth middleware
//     const { productId } = req.body;

//     const response = await userService.addToFavorites(userId, productId);
//     return res.status(response.status).json(response);
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };

// // Remove product from favorites
// const removeFavorite = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { productId } = req.query;

//     if (!productId) {
//       return res.status(400).json({ message: "Product ID is required" });
//     }

//     await Favorite.findOneAndDelete({ userId, productId });
//     res.status(200).json({ message: "Favorite removed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Get favorite products
// exports.getFavorite = async (req, res) => {
//   try {
//     const response = await userService.getFavorite(req.user.id);
//     return res.status(response.status).json(response);
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };
