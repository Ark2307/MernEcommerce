const { findById, findByIdAndDelete } = require("../models/productSchema");
const Product = require("../models/productSchema");

// created product here -- (only admin)
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json(err);
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({ success: true, products });
  } catch (error) {
    res.status(400).json(error);
  }
};

// get a single product details
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
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
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
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
exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
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
