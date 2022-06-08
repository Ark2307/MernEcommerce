const Product = require("../models/productSchema");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandling");

const catchAsync = require("../middlewares/tryCatchError");

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

// get all products
exports.getAllProducts = catchAsync(async (req, res) => {
  const resultPerPage = 7;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  // now as search function has returned the class with keyword
  // we can use all of its methods

  const products = await apiFeature.query;
  res.status(201).json({
    success: true,
    products,
    productCount,
  });
});

// get a single product details
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json(error);
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
