const asyncHandler = require("express-async-handler");
const Organizer = require("../models/organizerModel");
const generateToken = require("../tokenGenerate/generateToken");

const registerOrganizer = asyncHandler(async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Email format is wrong" });
  }
  const organizerExists = await Organizer.findOne({ email });
  //if there is, throw 400 error code
  if (organizerExists) {
    res.status(400);
    throw new Error(
      "The Organizer account that you have tried to set already exists"
    );
  }

  const organizer = await Organizer.create({
    name,
    email,
    password,
  });
  if (organizer) {
    //201 status code means succesful HTTP request has been sent and we will respond with the name and email
    res.status(201).json({
      name: organizer.name,
      email: organizer.email,
      token: generateToken(organizer._id),
    });
  }
});

const authOrganizer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const organizer = await Organizer.findOne({ email });
  if (organizer && (await organizer.matchPassword(password))) {
    res.status(200).json({
      _id: organizer._id,
      name: organizer.name,
      email: organizer.email,
      token: generateToken(organizer._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerOrganizer, authOrganizer };
