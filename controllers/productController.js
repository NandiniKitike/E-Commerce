const productService = require("../services/productService");
const mongoose = require("mongoose");
const Category = require("./productController");
const cloudinary = require("../config/cloudinary");

// Get all products with optional filters & pagination
exports.getAllProducts = async (req, res) => {
  try {
    const filters = {};

    if (req.query.is_active) filters.is_active = req.query.is_active === "true";

    if (
      req.query.category_id &&
      mongoose.Types.ObjectId.isValid(req.query.category_id)
    )
      filters.category_id = req.query.category_id;

    if (req.query.name)
      filters.name = { $regex: req.query.name, $options: "i" };

    const options = {
      skip: parseInt(req.query.skip) || 0,
      limit: parseInt(req.query.limit) || 20,
      sort: req.query.sort || { createdAt: -1 },
    };

    const products = await productService.getAllProducts(filters, options);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await productService.getProductById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.createProduct = async (req, res) => {
//   try {
//     if (!req.user || !req.user.id) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: user not authenticated" });
//     }

//     const { name, description, price, stock_quantity, is_active, category_id } =
//       req.body;

//     if (!name || !description || !price) {
//       return res.status(400).json({ message: "Required fields are missing" });
//     }

//     let imageUrl = "";

//     // if (req.file) {
//     //   const result = await new Promise((resolve, reject) => {
//     //     cloudinary.uploader
//     //       .upload_stream(
//     //         { resource_type: "image", folder: "products" },
//     //         (error, result) => {
//     //           if (error) return reject(error);
//     //           resolve(result);
//     //         }
//     //       )
//     //       .end(req.file.buffer);
//     //   });

//     //   imageUrl = result.secure_url;
//     // }

//     const productData = {
//       name,
//       description,
//       price: mongoose.Types.Decimal128.fromString(price.toString()),
//       stock_quantity: stock_quantity || 0,
//       category_id,
//       is_active: is_active !== undefined ? is_active : true,
//       image: imageUrl,
//       created_by: req.user.id,
//     };

//     const product = await productService.createProduct(productData);

//     return res.status(201).json({
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     console.error("Error in createProduct:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.createProduct = async (req, res) => {
  try {
    console.log(req.user.id);
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: user not authenticated" });
    }

    const { name, description, price, stock_quantity, is_active, category_id } =
      req.body;

    if (!name || !description || !price) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    let result = await productService.createProduct(req.body, req.user.id);
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Error in createProduct:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//image upload

exports.uploadImage = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "File is required" });
    }

    const imagesPromise = req.files.map((file) =>
      productService.uploadToCloudinary(file)
    );

    const imageUrls = await Promise.all(imagesPromise);
    return res.status(200).json({ url: imageUrls });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// exports.createProduct = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Images required" });
//     }

//     const productData = JSON.parse(req.body.CreateProductForm);

//     // Upload all images to Cloudinary
//     const imageUrls = [];
//     for (const file of req.files) {
//       const result = await uploadImage(file.buffer);
//       imageUrls.push(result.secure_url);
//     }

//     // Save product data including image URLs
//     const newProduct = new Product({
//       ...productData,
//       images: imageUrls,
//     });

//     await newProduct.save();

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product: newProduct,
//     });
//   } catch (error) {
//     console.error("Error in createProduct:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// Update product (admin only)

exports.updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    updateData.updated_by = req.user.id; // tracking who updated

    if (updateData.price !== undefined) {
      updateData.price = mongoose.Types.Decimal128.fromString(
        updateData.price.toString()
      );
    }

    const updatedProduct = await productService.updateProductById(
      id,
      updateData
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProductById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete product (admin only)
exports.deleteProductById = async (req, res) => {
  try {
    const deleted = await productService.deleteProductById(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProductById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Upload product image (admin only)
exports.uploadProductImage = async (req, res) => {
  try {
    const productId = req.params.id;
    const { image_url, is_primary } = req.body;
    if (!image_url)
      return res.status(400).json({ message: "Image URL is required" });

    const product = await productService.addProductImage(
      productId,
      image_url,
      !!is_primary
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(201).json({ message: "Image added", product });
  } catch (error) {
    console.error("Error in uploadProductImage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete product image (admin only)
exports.deleteProductImage = async (req, res) => {
  try {
    const { id: productId, imageId } = req.params;

    const product = await productService.deleteProductImage(productId, imageId);
    if (!product)
      return res.status(404).json({ message: "Product or Image not found" });

    res.status(200).json({ message: "Image deleted", product });
  } catch (error) {
    console.error("Error in deleteProductImage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// exports.getStockStatus = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid product ID",
//       });
//     }

//     const stockStatus = await productService.checkStockStatus(productId);

//     return res.status(200).json({
//       success: true,
//       message: "Stock status fetched successfully",
//       data: stockStatus,
//     });
//   } catch (error) {
//     return res.status(error.statusCode || 500).json({
//       success: false,
//       message: error.message || "Something went wrong",
//     });
//   }
// };

// exports.changeStockQuantity = async (req, res) => {
//   try {
//     const updatedProduct = await productService.updateStockQuantity(
//       req.params.id,
//       req.body.stock_quantity
//     );

//     res.status(200).json({
//       message: "Stock quantity updated successfully",
//       product: updatedProduct,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.toggleInStockStatus = async (req, res) => {
  try {
    const updatedProduct = await productService.toggleStatus(req.params.id);
    res.status(200).json({
      message: "Stock status updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await productService.getProductsByCategory(categoryId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
