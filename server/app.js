const express = require("express");
const APP = express();

const errorMiddleware = require("./middlewares/error");

APP.use(express.json());

// import your routes here
const productsRoute = require("./routes/product");
APP.use("/api/check", productsRoute);

// error middleware used here
APP.use(errorMiddleware);

module.exports = APP;
