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

  res.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};
