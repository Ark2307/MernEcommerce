const express = require("express");

const {
  getAllProducts,
  getProduct,
  createReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/Products");
const { isAuthenticated } = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/all").get(getAllProducts);
ROUTER.route("/:id").get(getProduct);
ROUTER.route("/review").put(isAuthenticated, createReview);
ROUTER.route("/reviews").get(getAllReviews);
ROUTER.route("/reviews").delete(isAuthenticated, deleteReview);

module.exports = ROUTER;
