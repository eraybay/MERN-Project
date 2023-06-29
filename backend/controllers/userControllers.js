const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../tokenGenerate/generateToken");

//used for registering the user
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    adress_line_1,
    adress_line_2,
    district,
    province,
    description,
    confirmpassword,
    age,
  } = req.body;
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
  if (age < 7 || age > 18) {
    return res
      .status(400)
      .json({ message: "Please enter a valid age between 7 and 18" });
  }
  //checking if the emial has been registered before
  const userExists = await User.findOne({ email });
  //if there is, throw 400 error code
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  //creat the user with given variables
  const user = await User.create({
    name,
    email,
    password,
    adress_line_1,
    adress_line_2,
    district,
    province,
    description,
    age,
  });
  //if created user is completed, throw the 201 succesful status code and return the variables except password because password
  //will be encrypted
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      adress_line_1: user.adress_line_1,
      adress_line_2: user.adress_line_2,
      district: user.district,
      province: user.province,
      description: user.description,
      token: generateToken(user._id),
      age: user.age,
    });
  } else {
    res.status(400);
    throw new Error("Error while creating the user");
  }
});

//used for login of the clients
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      adress_line_1: user.adress_line_1,
      adress_line_2: user.adress_line_2,
      district: user.district,
      province: user.province,
      description: user.description,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  //id is obtained from protect middleware
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.adress_line_1 = req.body.adress_line_1 || user.adress_line_1;
    user.adress_line_2 = req.body.adress_line_2 || user.adress_line_2;
    user.district = req.body.district || user.district;
    user.province = req.body.province || user.province;
    user.description = req.body.description || user.description;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      pic: updatedUser.pic,
      adress_line_1: updatedUser.adress_line_1,
      adress_line_2: updatedUser.adress_line_2,
      district: updatedUser.district,
      province: updatedUser.province,
      description: updatedUser.description,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found!");
  }
});
module.exports = { registerUser, authUser, updateUserProfile };
