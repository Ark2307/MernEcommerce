const express = require("express");
const { registerUser } = require("../controllers/AdminTasks");
const { forgotPassword, resetPassword } = require("../controllers/Passwords");
const {
  loginUser,
  logoutUser,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/Users");
const { isAuthenticated } = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/user/register").post(registerUser);
ROUTER.route("/user/login").post(loginUser);
ROUTER.route("/user/logout").get(logoutUser);
ROUTER.route("/user/details").get(isAuthenticated, getUserDetails);
ROUTER.route("/user/updatePassword").put(isAuthenticated, updatePassword);
ROUTER.route("/user/updateProfile").put(isAuthenticated, updateProfile);

ROUTER.route("/user/password/forgot").post(forgotPassword);
ROUTER.route("/user/password/reset/:token").put(resetPassword);

module.exports = ROUTER;
