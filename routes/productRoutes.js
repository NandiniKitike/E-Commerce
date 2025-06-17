const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage(); // buffer instead of disk
const upload = multer({ storage });

const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");
// Public routes
router.get("/getAllProducts", productController.getAllProducts);
router.get("/getProduct/:id", productController.getProductById);
// router.get("/check-stock/:productId", productController.getStockStatus);
// router.put("/update-stock/:id", productController.changeStockQuantity);
router.put("/toggle-stock/:id", productController.toggleInStockStatus);
router.get("/category/:categoryId", productController.getProductsByCategory);

// Admin-only routes
// router.post(
//   "/createProduct",
//   authMiddleware,
//   roleMiddleware(["admin"]),
//   upload.array("images"),
//   productController.createProduct
// );

router.post("/createProduct", authMiddleware, productController.createProduct);

//ulpad image
router.post(
  "/upload-image",
  upload.array("files", 4),
  productController.uploadImage
);

router.put(
  "/updateProduct/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.updateProductById
);
router.delete(
  "/delProduct/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.deleteProductById
);

// Product images management (admin only)
router.post(
  "/:id/images",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.uploadProductImage
);
router.delete(
  "/:id/images/:imageId",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.deleteProductImage
);

module.exports = router;
