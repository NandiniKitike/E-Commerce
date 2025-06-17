const Category = require("../models/Category");

async function createCategory(data) {
  const category = new Category(data);
  return await category.save();
}

async function getAllCategories() {
  return await Category.find();
}

async function getCategoryById(id) {
  return await Category.findById(id);
}

async function updateCategoryById(id, data) {
  return await Category.findByIdAndUpdate(id, data, { new: true });
}

async function deleteCategoryById(id) {
  return await Category.findByIdAndDelete(id);
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
