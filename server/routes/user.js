const express = require("express");
const { registerUser, loginUser } = require("../controllers/Users");
const ROUTER = express.Router();

ROUTER.route("/register").post(registerUser);
ROUTER.route("/login").post(loginUser);
module.exports = ROUTER;
