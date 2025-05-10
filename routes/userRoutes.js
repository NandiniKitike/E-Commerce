const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");
//register user
router.post("/userregister", userController.register);
//login
router.post("/userlogin", userController.login);
// Get user profile
router.get("/profile/:id", userController.getProfile);

// Update user profile
router.put("/updateprofile/:id", authMiddleware, userController.updateProfile);
//delete user
//router.delete("/delete", userController.deleteUser);

// // Get user order history
// router.get("/orders/:id", userController.getOrderHistory);

// Add product to favorites
// router.post("/favorites", authMiddleware, userController.addToFavorites);

// // Remove product from favorites
// router.delete(
//   "/favorites/:productId",
//   authMiddleware,
//   userController.removeFromFavorite
// );

// // Get favorite products
// router.get("/getfavorite", userController.getFavorite);

module.exports = router;
