const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

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
  //request of the email and password to start the login procedure
  const { email, password } = req.body;
  //finding the email in DB
  const user = await User.findOne({ email });
  //checking whether the inputted mail matches the password using AND method
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser };
