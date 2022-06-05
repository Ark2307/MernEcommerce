const express = require("express");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Products");

const ROUTER = express.Router();

ROUTER.route("/products").get(getAllProducts);
ROUTER.route("/product/create").post(createProduct);
ROUTER.route("/product/:id").put(updateProduct);
ROUTER.route("/product/:id").delete(deleteProduct);

module.exports = ROUTER;
