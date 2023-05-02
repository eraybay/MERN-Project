const jwt = require("jsonwebtoken");
require("dotenv").config();

//generating a token to verify the account of the user and keep the informations on the browser for 15 day
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETTT, {
    expiresIn: "15d",
  });
};
module.exports = generateToken;
