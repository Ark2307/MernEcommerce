const express = require("express");
const APP = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middlewares/error");

APP.use(express.json());

// cookie used here
APP.use(cookieParser());

// import your routes here
const productsRoute = require("./routes/product");
const userRoute = require("./routes/user");

APP.use("/api/check", productsRoute);
APP.use("/api/check", userRoute);

// error middleware used here
APP.use(errorMiddleware);

module.exports = APP;
