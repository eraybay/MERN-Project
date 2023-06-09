const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const organizerSchema = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

//before the creation of the model using .pre,,  encrypting the password is essential
organizerSchema.pre("save", async function (next) {
  //if password is not encrypted, "modified", then continue
  if (!this.isModified("password")) {
    next();
  }
  //adding 10 salt digits to increase security
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//matching the encrypted passwords with each other using the bcrypt.compare method
organizerSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Organizer = mongoose.model("Organizer", organizerSchema);

module.exports = Organizer;
