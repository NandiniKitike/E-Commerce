const productService = require("../services/productService");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const response = await productService.createProduct(req.body);
    res.status(response.status).json(response);
  } catch (err) {
    console.error("Error in createProduct controller:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const response = await productService.getAllProducts();
    res.status(200).json(response);
  } catch (err) {
    console.error("Error in getAllProducts controller:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productService.getProductById(id);
    res.status(response.status).json(response);
  } catch (err) {
    console.error("Error in getProductById controller:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productService.updateProduct(id, req.body);
    res.status(response.status).json(response);
  } catch (err) {
    console.error("Error in updateProduct controller:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await productService.deleteProduct(id);
    res.status(response.status).json(response);
  } catch (err) {
    console.error("Error in deleteProduct controller:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
