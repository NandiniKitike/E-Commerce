const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const authMiddleware = require("../Middleware/authMiddleware");
const roleMiddleware = require("../Middleware/roleMiddleware");
// Get all addresses for the logged-in user
router.get(
  "/getAllAdress",
  authMiddleware,
  roleMiddleware(["customer"]),
  addressController.getUserAddresses
);

// Get address by ID
router.get("/getAddress", authMiddleware, addressController.getAddressById);

// Create new address
router.post(
  "/createAdr",
  authMiddleware,

  addressController.createAddress
);

// Update address
router.put("/updateAddress/:id", addressController.updateAddress);

// Delete address
router.delete("/delAddress/:id", addressController.deleteAddress);

module.exports = router;
