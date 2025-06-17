const categoryService = require("../services/categoryService");

exports.createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory({
      ...req.body,
      created_by: req.user.id,
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCategoryById = async (req, res) => {
  try {
    const category = await categoryService.updateCategoryById(
      req.params.id,
      req.body
    );

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    const category = await categoryService.deleteCategoryById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
