const express = require("express");
const {
  isAuthenticated,
  authorizedRole,
} = require("../middlewares/authentication");

// product controller methods
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/AdminTasks");

// user controller methods
const {
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/AdminTasks");

const { getSingleOrder } = require("../controllers/AdminTasks");

const ROUTER = express.Router();

// all admin product routes
ROUTER.route("/product/create").post(
  isAuthenticated,
  authorizedRole("admin"),
  createProduct
);
ROUTER.route("/product/:id").put(
  isAuthenticated,
  authorizedRole("admin"),
  updateProduct
);
ROUTER.route("/product/:id").delete(
  isAuthenticated,
  authorizedRole("admin"),
  deleteProduct
);

// all admin user routes
ROUTER.route("/user/allUsers").get(
  isAuthenticated,
  authorizedRole("admin"),
  getAllUsers
);

ROUTER.route("/user/:id").get(
  isAuthenticated,
  authorizedRole("admin"),
  getSingleUser
);

ROUTER.route("/user/:id").put(
  isAuthenticated,
  authorizedRole("admin"),
  updateUserRole
);

ROUTER.route("/admin/user/:id").delete(
  isAuthenticated,
  authorizedRole("admin"),
  deleteUser
);

// all admin order routes
ROUTER.route("/:id").get(
  isAuthenticated,
  authorizedRole("admin"),
  getSingleOrder
);

module.exports = ROUTER;
