const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userControllers");
const protectUser = require("../middlewares/authMiddlewareUser");

const router = express.Router();

//to create a more comprehendible code within the api, post requests will be here
router.post("/register", registerUser);
router.post("/login", authUser);
router.route("/profile").post(protectUser, updateUserProfile);

module.exports = router;
