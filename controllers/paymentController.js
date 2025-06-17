const paymentService = require("../services/paymentService");
exports.processPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod, transactionId } = req.body;
    const payment = await paymentService.processPayment(
      orderId,
      amount,
      paymentMethod,
      transactionId
    );
    res
      .status(201)
      .json({ message: "Payment processed successfully", payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPaymentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const payment = await paymentService.getPaymentDetails(orderId);
    res.json({ payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.refundPayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await paymentService.refundPayment(paymentId);
    res.json({ message: "Payment refunded successfully", payment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
