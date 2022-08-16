const express = require("express");
const { processPayment, sendStripeApiKey } = require("../controllers/Payments");
const { isAuthenticated } = require("../middlewares/authentication");

const ROUTER = express.Router();

ROUTER.route("/payment/process").post(isAuthenticated, processPayment);
ROUTER.route("/payment/stripeKey").get(isAuthenticated, sendStripeApiKey);

module.exports = ROUTER;
