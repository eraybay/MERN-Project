const express = require("express");
const { registerUser, authUser } = require("../controllers/userControllers");

const router = express.Router();

//to create a more comprehendible code within the api, post requests will be here
router.post("/", registerUser);
router.post("/login", authUser);

module.exports = router;
