const Address = require("../models/Address");

// Get all addresses for the user
exports.getUserAddresses = async (userId) => {
  return await Address.find({ user_id: userId });
};

// Get address by ID
exports.getAddressById = async (id) => {
  return await Address.find({
    user_id: id,
  });
};

// Create new address
exports.createAddress = async (addressData) => {
  if (addressData.is_default) {
    await Address.updateMany(
      { user_id: addressData.user_id },
      { is_default: false }
    );
  }
  return await Address.create(addressData);
};

// Update address
exports.updateAddress = async (id, updateData) => {
  return await Address.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete address
exports.deleteAddress = async (id) => {
  return await Address.findByIdAndDelete(id);
};
