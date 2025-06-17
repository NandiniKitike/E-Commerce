// const express = require("express");
// const router = express.Router();
// const userControllers = require("../controllers/userControllers");
// const authMiddleware = require("../Middleware/authMiddleware");
// const roleMiddleware = require("../Middleware/roleMiddleware");

// router.post("/register", userControllers.registerUser);
// router.post("/login", userControllers.loginUser);
// router.post("/adminregister", userControllers.registeradmin);
// router.post(
//   "/adminlogin",

//   userControllers.loginAdmin
// );
// router.post("/logout", authMiddleware, userControllers.logoutUser);
// router.post("/logoutadmin", userControllers.logoutAdmin);
// //router.post("/logout");
// router.get(
//   "/user/:userId",
//   authMiddleware,
//   roleMiddleware(["customer"]),
//   userControllers.getUserProfile
// );
// router.put(
//   "/updateuser",
//   authMiddleware,
//   roleMiddleware(["customer"]),
//   userControllers.updateUserProfile
// );

// module.exports = router;
// //------------------admin---------------------
// // const express = require("express");
// // const router = express.Router();
// // const adminController = require("../controllers/adminController");
// // const authMiddleware = require("../Middleware/authMiddleware");
// router.get(
//   "/users",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   userControllers.getAllUsers
// );
// router.put(
//   "/users/:id",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   userControllers.updateUser
// );
// router.delete(
//   "/deluser/:id",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   userControllers.deleteUser
// );
// router.put(
//   "/updateUser/:id",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   userControllers.changeUserRole
// );
// // module.exports = router;
// router.get(
//   "/me",
//   authMiddleware,
//   roleMiddleware(["customer"]),
//   userControllers.getCurrentUser
// );
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
