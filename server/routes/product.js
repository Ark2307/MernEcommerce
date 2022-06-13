const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/AdminTasks");

const {
  getAllProducts,
  getProduct,
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/Products");
const {
  isAuthenticated,
  authorizedRole,
} = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/products").get(getAllProducts);
ROUTER.route("/product/:id").get(getProduct);
ROUTER.route("/product/review").put(isAuthenticated, createReview);
ROUTER.route("/product/reviews").get(getAllReviews);
ROUTER.route("/product/reviews").delete(isAuthenticated, deleteReview);

ROUTER.route("/admin/product/create").post(
  isAuthenticated,
  authorizedRole("admin"),
  createProduct
);
ROUTER.route("/admin/product/:id").put(
  isAuthenticated,
  authorizedRole("admin"),
  updateProduct
);
ROUTER.route("/admin/product/:id").delete(
  isAuthenticated,
  authorizedRole("admin"),
  deleteProduct
);

module.exports = ROUTER;
