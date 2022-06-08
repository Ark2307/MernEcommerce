const ErrorHandler = require("../utils/errorHandling");
const catchAsyncErrors = require("../middlewares/tryCatchError");
const User = require("../models/userSchema");
const sendToken = require("../utils/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
  const message = `Your password reset token is: \n\n ${resetPasswordUrl}\n\n If you have not requested it , kindly ignore.`;

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

// now we have send the token
// need a function that can reset the password with that token

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // so for now we have a reset password token
  // user database has a hashed value of token so we will create the token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // find user now using this hashed value
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords mismatch"), 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  // for login after password change
  sendToken(user, 200, res);
});
