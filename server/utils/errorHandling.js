// extend error class for handling errors
class ErrorHandler extends Error {
  // as we want to send a message and a status code as a json ,
  // we will make a constructor of them

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
