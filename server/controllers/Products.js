const Product = require("../models/productSchema");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandling");

const catchAsync = require("../middlewares/tryCatchError");

// get all products
exports.getAllProducts = catchAsync(async (req, res) => {
  const resultPerPage = 8;
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
    const product = await Product.findById(req.query.id);
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

// create or update a review/comment
exports.createReview = catchAsync(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product does not exist", 400));
  }

  const isReviewed = product.reviews.find(
    (key) => key.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((key) => {
      if (key.user.toString() === req.user._id.toString()) {
        (key.rating = rating), (key.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0,
    c = 0;
  product.reviews.forEach((key) => {
    avg += key.rating;
    if (key.rating > 0) c++;
  });
  avg /= c;

  product.ratings = avg;

  // console.log(avg);

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Thank you for adding your feedback",
  });
});

// get all reviews
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(
      new ErrorHandler(`Product with the id ${req.query.id} does not exist`),
      400
    );
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// delete a review
exports.deleteReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(
      new ErrorHandler(`Product with the id ${req.query.id} does not exist`),
      400
    );
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  //calculate average rat
  let avg = 0,
    c = 0;
  reviews.forEach((key) => {
    avg += key.rating;
    if (key.rating > 0) c++;
  });
  avg /= c;

  const ratings = avg;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "review deleted successfully",
  });
});
