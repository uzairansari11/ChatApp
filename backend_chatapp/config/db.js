const mongoose = require("mongoose");
require("dotenv").config();
const connection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB Successfully");
  } catch (error) {
    console.log("Could not Connected to DB Successfully" + error.message);
    process.exit();
  }
};

module.exports = { connection };
