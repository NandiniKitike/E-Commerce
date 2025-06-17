const mongoose = require("mongoose");
const cartItemSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});
const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
