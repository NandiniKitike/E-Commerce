const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      enum: ["onlinePayment", "cod"],
      required: true,
    },
    transaction_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);
module.exports = mongoose.model("Payment", paymentSchema);
