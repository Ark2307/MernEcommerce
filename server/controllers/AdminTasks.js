const Product = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandling");
const User = require("../models/userSchema");
const Order = require("../models/orderSchema");
const tryCatchError = require("../middlewares/tryCatchError");

// created product here -- (only admin)
exports.createProduct = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json(err);
  }
};

// update product -- (only admin)
exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// delete product --(only admin)
exports.deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.remove();
    res.status(201).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

// get all users
exports.getAllUsers = tryCatchError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// get a user by its id
exports.getSingleUser = tryCatchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User with this id does not exist", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update user force
exports.updateUserRole = tryCatchError(async (req, res, next) => {
  // name and email
  //profile image to be later
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User with this id does not exist", 400));
  }

  user = await User.findByIdAndUpdate(req.params.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "profile updated successfully",
  });
});

// delete user
exports.deleteUser = tryCatchError(async (req, res, next) => {
  // cloudinary to be removed later

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User with this id does not exist", 400));
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});

// get order by its id
exports.getSingleOrder = tryCatchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order with this id does not exist"), 400);
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get all orders
exports.getAllOrders = tryCatchError(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});
