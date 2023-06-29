const express = require("express");
const {
  registerOrganizer,
  authOrganizer,
} = require("../controllers/organizerControllers");

const router = express.Router();

//to create a more comprehendible code within the api, post requests will be here
router.post("/register", registerOrganizer);
router.post("/login", authOrganizer);

module.exports = router;
