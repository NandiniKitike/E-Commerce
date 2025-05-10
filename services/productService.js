const Product = require("../models/Product");

// Create Product
exports.createProduct = async (data) => {
  try {
    const { name, quantity } = data;

    if (!name || !quantity) {
      throw new Error("Product name and quantity are required.");
    }

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      existingProduct.quantity += quantity;
      await existingProduct.save();
      return {
        status: 200,
        message: "Product quantity updated successfully",
        data: existingProduct,
      };
    }

    const product = new Product(data);
    await product.save();
    return {
      status: 201,
      message: "Product created successfully",
      data: product,
    };
  } catch (error) {
    console.error("Error in createProduct:", error.message);
    throw new Error("Error in creating/updating product");
  }
};

// Get All Products
exports.getAllProducts = async () => {
  try {
    const products = await Product.find();
    return {
      status: 200,
      message: "Products retrieved successfully",
      data: products,
    };
  } catch (error) {
    console.error("Error in getAllProducts:", error.message);
    throw new Error("Error in retrieving products");
  }
};

// Get Product by ID
exports.getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return { status: 404, message: "Product not found" };
    }
    return {
      status: 200,
      message: "Product retrieved successfully",
      data: product,
    };
  } catch (error) {
    console.error("Error in getProductById:", error.message);
    throw new Error("Error in retrieving product");
  }
};

// Update Product
exports.updateProduct = async (id, data) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return { status: 404, message: "Product not found" };
    }

    Object.assign(product, data);
    await product.save();

    return {
      status: 200,
      message: "Product updated successfully",
      data: product,
    };
  } catch (error) {
    console.error("Error in updateProduct:", error.message);
    throw new Error("Error in updating product");
  }
};

// Delete Product
exports.deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return { status: 404, message: "Product not found" };
    }

    return {
      status: 200,
      message: "Product deleted successfully",
      data: product,
    };
  } catch (error) {
    console.error("Error in deleteProduct:", error.message);
    throw new Error("Error in deleting product");
  }
};
