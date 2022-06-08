const ErrorHandler = require("../utils/errorHandling");
const catchAsyncErrors = require("../middlewares/tryCatchError");
const User = require("../models/userSchema");
const sendToken = require("../utils/token");

// register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    profilePic: {
      url: "Check Url",
      public_key: "profile key",
    },
  });

  sendToken(user, 201, res);
});

// login user

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler("Email and Password are required fields", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Enter valid email or password", 401));
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Enter valid email or password", 401));
  }

  sendToken(user, 200, res);
});

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});
