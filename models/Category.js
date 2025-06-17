const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    images: [{ type: String }],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Category", categorySchema);
