const express = require("express");
const { createOrder, myOrders } = require("../controllers/Orders");
const { isAuthenticated } = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/new").post(isAuthenticated, createOrder);
ROUTER.route("/myOrders").get(isAuthenticated, myOrders);

module.exports = ROUTER;
