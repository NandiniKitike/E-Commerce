const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController"); // Fixed import path
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Public Routes
router.get("/", productController.getAllProducts); // Public: Get all products
router.get("/Byid/:id", productController.getProductById); // Public: Get a product by ID

// Admin Routes
router.post(
  "/createProduct",
  authMiddleware,
  roleMiddleware("admin"),
  productController.createProduct // Admin: Create a new product
);

router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.updateProduct // Admin: Update an existing product (fixed typo)
);

router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  productController.deleteProduct // Admin: Delete a product
);

module.exports = router;
