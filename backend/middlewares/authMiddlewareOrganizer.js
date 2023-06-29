const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Organizer = require("../models/organizerModel");
require("dotenv").config();

const protectOrganizer = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //This line is getting the JWT (JSON Web Token) from the Authorization header of the HTTP request. Typically, the Authorization header looks like this: Authorization: Bearer YOUR_JWT_TOKEN_HERE. The split(" ")[1] part is splitting the header value by a space character and taking the second part, which is the actual JWT.
      //your normal json token looks like this: Authorization: Bearer <your_token_here>
      token = req.headers.authorization.split(" ")[1];
      //This line is verifying the JWT. JWTs are cryptographically signed to ensure their integrity. When you call jwt.verify, it checks that the JWT was signed with the secret key. If the token was manipulated or signed with a different key, jwt.verify will throw an error. If the JWT is valid, jwt.verify returns the payload of the JWT, which is then stored in the decoded variable. The payload often contains information about the user who owns the JWT.
      const decoded = jwt.verify(token, process.env.JWT_SECRETTT);
      //This line is using the id field from the JWT payload to fetch the user from your database. It then attaches the user to the req object, but it tells Mongoose not to include the password field (select("-password")). This means that req.user will contain the user object for the rest of your middleware functions to use, but it won't contain the user's password.
      req.organizer = await Organizer.findById(decoded.id).select("-password");

      //if everything is ok, continue to process the method.
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protectOrganizer;
