const express = require("express");

const { forgotPassword, resetPassword } = require("../controllers/Passwords");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/Users");
const { isAuthenticated } = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/register").post(registerUser);
ROUTER.route("/login").post(loginUser);
ROUTER.route("/logout").get(logoutUser);
ROUTER.route("/details").get(isAuthenticated, getUserDetails);
ROUTER.route("/updatePassword").put(isAuthenticated, updatePassword);
ROUTER.route("/updateProfile").put(isAuthenticated, updateProfile);

ROUTER.route("/password/forgot").post(forgotPassword);
ROUTER.route("/password/reset/:token").put(resetPassword);

module.exports = ROUTER;
