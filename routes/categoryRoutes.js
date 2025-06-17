const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin"]),
  categoryController.createCategory
);
module.exports = router;
router.get("/getCategories", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.put(
  "/categoryupdate/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  categoryController.updateCategoryById
);
router.delete(
  "/delCategory/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  categoryController.deleteCategoryById
);
