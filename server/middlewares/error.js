// as error can't be used directly , we will put a middleware in between
const ErrorHandler = require("../utils/errorHandling");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server error!";

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};
