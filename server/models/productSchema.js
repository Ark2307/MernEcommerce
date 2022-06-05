const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of the product"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description of the product"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price of the product"],
    maxLength: [7, "Value cannot exceed 7 characters"],
  },
  category: {
    type: String,
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      public_key: {
        type: String,
        required: true,
      },
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 1,
    maxLength: [4, "Value cannot exceed 4 characters"],
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
