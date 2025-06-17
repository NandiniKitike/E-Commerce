const Product = require("../models/Product");
const mongoose = require("mongoose");

const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

// One-time config (optional to call externally too)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.getAllProducts = async (filters, options) => {
  return await Product.find(filters)
    .skip(options.skip || 0)
    .limit(options.limit || 20)
    .sort(options.sort || { createdAt: -1 });
};

exports.getProductById = async (id) => {
  return await Product.findById(id);
};

//upload image

exports.uploadToCloudinary = async (file) => {
  try {
    const fileStr = `data:${file.mimetype};base64,${file.buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "products",
    });

    return result.secure_url;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

exports.createProduct = async (productData, userId) => {
  try {
    const newProduct = new Product({
      ...productData,
      created_by: userId,
    });
    return await newProduct.save();
  } catch (error) {
    throw new Error(`Product creation failed: ${error.message}`);
  }
};

exports.updateProductById = async (id, updateData) => {
  return await Product.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteProductById = async (id) => {
  return await Product.findByIdAndDelete(id);
};

// IMAGE MANAGEMENT

exports.addProductImage = async (productId, imageUrl, isPrimary) => {
  const product = await Product.findById(productId);
  if (!product) return null;

  // If new image is primary, reset other primary flags
  if (isPrimary) {
    product.images.forEach((img) => {
      img.is_primary = false;
    });
  }

  product.images.push({ image_url: imageUrl, is_primary: isPrimary });
  await product.save();
  return product;
};

exports.deleteProductImage = async (productId, imageId) => {
  const product = await Product.findById(productId);
  if (!product) return null;

  product.images = product.images.filter(
    (img) => img._id.toString() !== imageId
  );
  await product.save();
  return product;
};

// exports.checkStockStatus = async (productId) => {
//   const product = await Product.findById(productId).select(
//     "name stock_quantity"
//   );

//   if (!product) {
//     const error = new Error("Product not found");
//     error.statusCode = 404;
//     throw error;
//   }

//   return {
//     product_id: product._id,
//     name: product.name,
//     stock_quantity: product.stock_quantity,
//     in_stock: product.stock_quantity > 0,
//   };
// };

// exports.updateStockQuantity = async (productId, stock_quantity) => {
//   if (typeof stock_quantity !== "number" || stock_quantity < 0) {
//     throw new Error("Invalid stock quantity");
//   }

//   const product = await Product.findByIdAndUpdate(
//     productId,
//     { stock_quantity },
//     { new: true }
//   );

//   if (!product) throw new Error("Product not found");

//   return product;
// };
exports.toggleStatus = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  product.is_active = !product.is_active; // Toggle status
  await product.save();

  return product;
};

exports.getProductsByCategory = async (categoryId) => {
  try {
    const products = await Product.find({ category_id: categoryId });
    return { success: true, products };
  } catch (error) {
    console.error("Service Error:", error);
    throw new Error("Unable to fetch products by category.");
  }
};
