const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/Products");
const {
  isAuthenticated,
  authorizedRole,
} = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/products").get(getAllProducts);
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
ROUTER.route("/product/:id").get(getProduct);

module.exports = ROUTER;
