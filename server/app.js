const express = require("express");
const APP = express();

const errorMiddleware = require("./middlewares/error");

APP.use(express.json());

// import your routes here
const productsRoute = require("./routes/product");
const userRoute = require("./routes/user");

APP.use("/api/check", productsRoute);
APP.use("/api/check", userRoute);

// error middleware used here
APP.use(errorMiddleware);

module.exports = APP;
