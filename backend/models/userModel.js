const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    adress_line_1: {
      type: String,
      required: true,
    },
    adress_line_2: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 7,
      max: 18,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//before the creation of the model using .pre,,  encrypting the password is essential
userSchema.pre("save", async function (next) {
  //if password is not encrypted, "modified", then continue
  if (!this.isModified("password")) {
    next();
  }
  //adding 10 salt digits to increase security
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//matching the encrypted passwords with each other using the bcrypt.compare method
userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
