const express = require("express");
const { forgotPassword, resetPassword } = require("../controllers/Passwords");
const { registerUser, loginUser, logoutUser } = require("../controllers/Users");
const ROUTER = express.Router();

ROUTER.route("/register").post(registerUser);
ROUTER.route("/login").post(loginUser);
ROUTER.route("/logout").get(logoutUser);
ROUTER.route("/password/forgot").post(forgotPassword);
ROUTER.route("/password/reset/:token").put(resetPassword);

module.exports = ROUTER;
