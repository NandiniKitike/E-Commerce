// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({
//       message: "Access denied. No token provided or invalid format.",
//     });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, "nandini"); // Same secret used here

//     req.user = {
//       id: decoded.id,
//       role: decoded.role,
//     };

//     next();
//   } catch (err) {
//     console.error("Token verification error:", err.message);
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // ✅ Get token from cookie
  const express = require("express");
  const cookieParser = require("cookie-parser");

  const app = express();
  console.log(token, "token");
  app.use(cookieParser());
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   console.log("No token or invalid format:", authHeader);
  //   return res.status(401).json({ message: "Access denied" });
  // }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
