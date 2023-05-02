const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../tokenGenerate/generateToken");

//used for registering the user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  //checking if the emial has been registered before
  const userExists = await User.findOne({ email });
  //if there is, throw 400 error code
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  //creat the user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  //if created user is completed, throw the 201 succesful status code and return the variables except password because password
  //will be encrypted
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User Already Exists");
  }
  res.json({
    name,
    email,
  });
});

//used for login of the user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, authUser };
