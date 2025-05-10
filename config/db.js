require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.error("Error occurring while connecting to the DB:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
