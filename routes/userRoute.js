const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");

// Customer routes
router.post("/customer/register", userControllers.registerCustomer);
router.post("/customer/login", userControllers.loginCustomer);

router.post("/logoutadmin", authMiddleware, userControllers.logoutAdmin);
// Admin routes
router.post("/admin/register", userControllers.registerAdmin);
router.post("/admin/login", userControllers.loginAdmin);
router.post("/logout", authMiddleware, userControllers.logoutUser);
// Example protected route for admin only
router.get(
  "/admin/profile",
  authMiddleware,
  roleMiddleware(["admin"]),
  userControllers.getProfile
);

// Example protected route for customer only
router.get(
  "/customer/profile",
  authMiddleware,
  roleMiddleware(["customer"]),
  userControllers.getProfile
);
router.get("/auth/me", authMiddleware, userControllers.getCurrentUser);
router.get("/admin/me", authMiddleware, userControllers.getCurrentAdmin);
module.exports = router;
