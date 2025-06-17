const addressService = require("../services/addressService");

// Get all addresses for the logged-in user
exports.getUserAddresses = async (req, res) => {
  try {
    const addresses = await addressService.getUserAddresses(req.user.id);
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error in getUserAddresses:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get address by ID
exports.getAddressById = async (req, res) => {
  try {
    const address = await addressService.getAddressById(req.user.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (error) {
    console.error("Error in getAddressById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create new address
exports.createAddress = async (req, res) => {
  try {
    const addressData = { ...req.body, user_id: req.user.id };
    const address = await addressService.createAddress(addressData);
    res.status(201).json({ message: "Address created successfully", address });
  } catch (error) {
    console.error("Error in createAddress:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const updatedAddress = await addressService.updateAddress(
      req.params.id,
      req.body
    );
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Error in updateAddress:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const deleted = await addressService.deleteAddress(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAddress:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
