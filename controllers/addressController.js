const addressService = require("../services/addressService");

// Create a new address
exports.createAddress = async (req, res) => {
  try {
    const address = await addressService.createAddress(req.user.id, req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await addressService.getAddresses(req.user.id);
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an address
exports.updateAddress = async (req, res) => {
  try {
    const updatedAddress = await addressService.updateAddress(
      req.user.id,
      req.params.id,
      req.body
    );
    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const result = await addressService.deleteAddress(
      req.user._id,
      req.params.id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
