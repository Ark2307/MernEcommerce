const ErrorHandler = require("../utils/errorHandling");
const tryCatchError = require("./tryCatchError");
// const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

exports.isAuthenticated = tryCatchError(async (req, res, next) => {
  // const { token } = req.cookies;
  // //   console.log(token);

  // if (!token) {
  //   return next(new ErrorHandler("Login required.Invalid access", 401));
  // }

  // const decodedData = jwt.verify(token, process.env.JWT_KEY);
  // req.user = await User.findById(decodedData.id);
  // next();

  // console.log(req);

  const { isAuthenticated, email } = req.body;
  // console.log("Hi");
  // console.log(email);
  if (!isAuthenticated) {
    return next(new ErrorHandler("Login required. Invalid access", 401));
  }
  // console.log(req.user);
  req.user = await User.findOne({ email });

  next();
});

exports.authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} do not have access over this resource`,
          403
        )
      );
    }

    next();
  };
};
