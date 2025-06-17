const userServices = require("../services/userServices");

exports.registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    const result = await userServices.registerCustomer({
      name,
      email,
      password,
    });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const result = await userServices.loginCustomer({ email, password });

    // Set token in HTTP-only cookie
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.JWT_SECRET === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send user data as response
    return res.status(200).json({ success: true, user: result.user });
  } catch (err) {
    return res.status(401).json({ success: false, message: err.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    const result = await userServices.registerAdmin({ name, email, password });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const result = await userServices.loginAdmin({ email, password });
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.JWT_SECRET === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      user: result.user,
      token: result.token, // optional for frontend
    });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

// Profile route for both roles
exports.getProfile = async (req, res) => {
  try {
    // req.user set by authMiddleware
    const userId = req.user.id;
    const profile = await userServices.getUserProfile(userId);
    res.json(profile);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
exports.logoutAdmin = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const result = await userServices.logoutAdminWithCookie(req.user.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.isCustomerAuth = async (req, res) => {
  try {
    const user = await userServices.getUserById(req.user.id);

    if (!user || user.role !== "customer") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Authenticated as customer",
      user,
    });
  } catch (error) {
    console.error("is-auth error:", error); // full error object
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await userServices.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getCurrentAdmin = async (req, res) => {
  try {
    const user = await userServices.getAdminById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("adminController error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
