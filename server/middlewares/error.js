// as error can't be used directly , we will put a middleware in between
const ErrorHandler = require("../utils/errorHandling");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error!";
  // console.log(err);

  // handling cast errors from mongoDB(eg -> length of id is long but you
  // type only 2-3 letters)

  if (err.name === "CastError") {
    const message = `Invalid resource : ${err.path}`;
    //console.log(err);
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON web token is invalid , try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT expires
  if (err.name === "TokenExpireError") {
    const message = `JSON web token has expired , try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
