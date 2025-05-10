const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure email is unique
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email regex validation
      "Please provide a valid email address",
    ],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits long"], // Validate phone number format
  },
  role: {
    type: String,
    enum: ["admin", "superAdmin"],
    default: "admin", // Fixed the default role
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"], // Ensure password is long enough
  },
  permissions: {
    type: [String],
    default: [],
  },
  city: {
    type: String,
    required: true,
  },
});

// Hash password before saving the admin
adminSchema.pre("save", async function (next) {
  // Only hash the password if it's modified or newly created
  if (!this.isModified("password")) return next();

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Continue with the save
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

// Add method to compare passwords (useful for login)
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the Admin model
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
