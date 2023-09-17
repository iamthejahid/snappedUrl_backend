const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/snapped_url");

    console.log("database is connected");
  } catch (error) {
    console.log("database is not connected");
    console.log(error.message);
    process.exit(1);
  }
};
