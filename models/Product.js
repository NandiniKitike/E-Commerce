const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,

      min: 1,
    },
    stock: {
      type: Number,

      min: 0,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  { timeStamps: true }
);
const product = mongoose.model("Product", productSchema);
module.exports = product;
