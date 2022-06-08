const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
} = require("../controllers/Users");
const ROUTER = express.Router();

ROUTER.route("/register").post(registerUser);
ROUTER.route("/login").post(loginUser);
ROUTER.route("/logout").get(logoutUser);
ROUTER.route("/password/reset").post(forgotPassword);

module.exports = ROUTER;
