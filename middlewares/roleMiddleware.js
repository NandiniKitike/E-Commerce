module.exports = (role) => {
  return (req, res, next) => {
    // Ensure req.user is populated (after successful authentication)
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
