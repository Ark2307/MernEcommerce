const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxlength: [50, "Maximum characters reached"],
    minlength: [4, "Too short a name. Please Enter your full name"],
  },

  email: {
    type: String,
    required: [true, "Enter email address"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Enter your password to continue"],
    minlength: [6, "Your password must be atleast 6 characters"],
    select: false,
  },

  profilePic: {
    url: {
      type: String,
      required: true,
    },
    public_key: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// encrypt password
userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// JWT token for user
userModel.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRY_TIME,
  });
};

// check password here

userModel.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// method for password reset
userModel.methods.passwordResetToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // now we will hash these random bytes by sha256 to secure data
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userModel);
