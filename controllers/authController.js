const authService = require("../services/authService");
exports.registerAdmin = async (req, res) => {
  try {
    const response = await authService.register(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const response = await authService.login(req.body);
    res.status(response.status).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
