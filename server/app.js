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
const orderRoute = require("./routes/order");
const adminRoute = require("./routes/admin");

APP.use("/api/check/product", productsRoute);
APP.use("/api/check/user", userRoute);
APP.use("/api/check/order", orderRoute);
APP.use("/api/check/admin", adminRoute);

// error middleware used here
APP.use(errorMiddleware);

module.exports = APP;
