const express = require("express");
const { creatOrder, myOrders } = require("../controllers/Orders");
const { isAuthenticated } = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/new").post(isAuthenticated, creatOrder);
ROUTER.route("/myOrders").get(isAuthenticated, myOrders);

module.exports = ROUTER;
