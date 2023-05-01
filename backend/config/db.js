const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log("CONNECTED DB!!" + conn.connection.host);
  } catch (error) {
    console.error(error + ":(");
    process.exit();
  }
};

module.exports = connectDB;
