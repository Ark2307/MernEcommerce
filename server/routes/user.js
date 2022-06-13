const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/AdminTasks");
const { forgotPassword, resetPassword } = require("../controllers/Passwords");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../controllers/Users");
const {
  isAuthenticated,
  authorizedRole,
} = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/user/register").post(registerUser);
ROUTER.route("/user/login").post(loginUser);
ROUTER.route("/user/logout").get(logoutUser);
ROUTER.route("/user/details").get(isAuthenticated, getUserDetails);
ROUTER.route("/user/updatePassword").put(isAuthenticated, updatePassword);
ROUTER.route("/user/updateProfile").put(isAuthenticated, updateProfile);

ROUTER.route("/user/password/forgot").post(forgotPassword);
ROUTER.route("/user/password/reset/:token").put(resetPassword);

ROUTER.route("/admin/user/allUsers").get(
  isAuthenticated,
  authorizedRole("admin"),
  getAllUsers
);

ROUTER.route("/admin/user/:id").get(
  isAuthenticated,
  authorizedRole("admin"),
  getSingleUser
);

ROUTER.route("/admin/user/:id").put(
  isAuthenticated,
  authorizedRole("admin"),
  updateUserRole
);

ROUTER.route("/admin/user/:id").delete(
  isAuthenticated,
  authorizedRole("admin"),
  deleteUser
);

module.exports = ROUTER;
