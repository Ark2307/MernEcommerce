const Order = require("../models/orderSchema");
const catchAsync = require("../middlewares/tryCatchError");

// create a new order
exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    addressInfo,
    orderedProduct,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const newOrder = await Order.create({
    addressInfo,
    orderedProduct,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    newOrder,
  });
});

// orders of a user
exports.myOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});
