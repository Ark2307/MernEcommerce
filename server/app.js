const express = require("express");
const APP = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/error");

APP.use(express.json());

// config
dotenv.config({ path: "server/config/config.env" });

// cookie used here
APP.use(cookieParser());
APP.use(cors());
APP.use(bodyParser.urlencoded({ extended: true }));
APP.use(fileUpload());

// import your routes here
const productsRoute = require("./routes/product");
const userRoute = require("./routes/user");
const orderRoute = require("./routes/order");
const adminRoute = require("./routes/admin");
const paymentRoute = require("./routes/payments");

APP.use("/api/check/product", productsRoute);
APP.use("/api/check/user", userRoute);
APP.use("/api/check/order", orderRoute);
APP.use("/api/check/admin", adminRoute);
APP.use("/api/check", paymentRoute);

// error middleware used here
APP.use(errorMiddleware);

module.exports = APP;
