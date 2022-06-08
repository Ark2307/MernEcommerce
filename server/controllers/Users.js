const ErrorHandler = require("../utils/errorHandling");
const catchAsyncErrors = require("../middlewares/tryCatchError");
const User = require("../models/userSchema");
const sendToken = require("../utils/token");
const sendEmail = require("../utils/sendEmail");

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

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // get token here
  const resetToken = user.passwordResetToken();

  // save the token in user database
  await user.save({ validateBeforeSave: false });

  // reset password url
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/check/password/reset/${resetToken}`;

  // now send message
  const message = `Your password reset token is: \n\n ${resetPasswordUrl}\n\n If ypu have not requested it , kindly ignore.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password recovery for Apni Dukaan",
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to the email address: ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});
