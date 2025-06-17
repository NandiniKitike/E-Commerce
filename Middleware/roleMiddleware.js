function roleMiddleware(roles) {
  return (req, res, next) => {
    const userRole = req.user?.role; // User role is set in authMiddleware

    if (!userRole) {
      console.warn(
        "Role not found in request object. Ensure authMiddleware is properly applied."
      );
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!roles.includes(userRole)) {
      console.warn(
        `Access denied for role: ${userRole}. Required roles: ${roles.join(
          ", "
        )}`
      );
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }

    next(); // Proceed to the next middleware or route handler
  };
}

module.exports = roleMiddleware;
