const Address = require("../models/Address");

// Create a new address
exports.createAddress = async (userId, addressData) => {
  const {
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  } = addressData;

  const address = new Address({
    user: userId,
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  });

  return address.save();
};

// Get all addresses for a user
exports.getAddresses = async (userId) => {
  return Address.find({ user: userId });
};

// Update an address
exports.updateAddress = async (userId, addressId, addressData) => {
  const {
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    isDefault,
  } = addressData;

  const address = await Address.findOne({ _id: addressId, user: userId });
  if (!address) throw new Error("Address not found");

  if (isDefault) {
    await Address.updateMany({ user: userId }, { isDefault: false });
  }

  address.fullName = fullName || address.fullName;
  address.phoneNumber = phoneNumber || address.phoneNumber;
  address.addressLine1 = addressLine1 || address.addressLine1;
  address.addressLine2 = addressLine2 || address.addressLine2;
  address.city = city || address.city;
  address.state = state || address.state;
  address.postalCode = postalCode || address.postalCode;
  address.country = country || address.country;
  address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

  return address.save();
};

// Delete an address
exports.deleteAddress = async (userId, addressId) => {
  const address = await Address.findOneAndDelete({
    _id: addressId,
    user: userId,
  });
  if (!address) throw new Error("Address not found");
  return { message: "Address deleted successfully" };
};
