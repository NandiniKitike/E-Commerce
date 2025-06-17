const Payment = require("../models/Payment");
exports.processPayment = async (
  orderId,
  amount,
  paymentMethod,
  transactionId
) => {
  const payment = new Payment({
    order_id: orderId,
    amount,
    payment_method: paymentMethod,
    transaction_id: transactionId,
    status: "completed",
  });

  await payment.save();
  return payment;
};

exports.getPaymentDetails = async (orderId) => {
  return await Payment.findOne({ order_id: orderId });
};

exports.refundPayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error("Payment not found");

  payment.status = "refunded";
  await payment.save();

  return payment;
};
