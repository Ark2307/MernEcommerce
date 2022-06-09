const Product = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandling");
const User = require("../models/userSchema");
const sendToken = require("../utils/token");
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

// register a user
exports.registerUser = tryCatchError(async (req, res, next) => {
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
