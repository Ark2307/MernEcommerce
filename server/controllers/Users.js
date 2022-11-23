const ErrorHandler = require("../utils/errorHandling");
const catchAsyncErrors = require("../middlewares/tryCatchError");
const User = require("../models/userSchema");
const sendToken = require("../utils/token");

// const cloudinary = require("cloudinary");

// register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  const userExist = await User.findOne({ email });
  // if (userExist === null) {
  //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //     folder: "avatars",
  //     width: 150,
  //     crop: "scale",
  //   });

  const user = await User.create({
    name,
    email,
    password,
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

  res.status(200).json({
    message: "Successful Logged In",
    user,
  });

  // sendToken(user, 200, res);
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

// get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.user);
  const user = await User.findById(req.user.id);
  // console.log(user);

  res.status(200).json({
    success: true,
    user,
  });
});

// update your password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordCorrect = await user.comparePassword(req.body.currPassword);

  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Enter valid current password", 401));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match"), 400);
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  // name and email
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.profilePic !== "") {
    const user = await User.findById(req.user.id);
    // const imgId = user.profilePic.public_key;

    // await cloudinary.v2.uploader.destroy(imgId);

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });

    // newUserDetails.profilePic = {
    //   url: myCloud.secure_url,
    //   public_key: myCloud.public_id,
    // };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "profile updated successfully",
  });
});
