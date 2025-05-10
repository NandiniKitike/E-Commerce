const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const authMiddleware = require("../middlewares/authMiddleware");
const Address = require("../models/Address");
router.post("/createAddr", authMiddleware, addressController.createAddress);
router.get("/getAddr/:userId", authMiddleware, addressController.getAddresses);
router.put(
  "/updateAddr/:userId",
  authMiddleware,
  addressController.updateAddress
);
router.delete("/deleteAddr", addressController.deleteAddress);
module.exports = router;
