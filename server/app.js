const express = require("express");
const APP = express();

APP.use(express.json());

// import your routes here
const productsRoute = require("./routes/product");
APP.use("/api/check", productsRoute);

module.exports = APP;
