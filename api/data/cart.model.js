var mongoose = require("mongoose");

var priceSchema = new mongoose.Schema({
    value:  {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true,
      default: 'USD'
    }
});

var productSchema = new mongoose.Schema({
    productId: {
      type: Number,
      required: true
    },
    price:  priceSchema,
    quantity: {
      type: Number,
      required: true
    }
});

var cartSchema = new mongoose.Schema({
  product:[productSchema],
  totalPrice:{
    type: Number,
    required: true
  },
  userId:{
    type: String
  }
});

mongoose.model("Cart", cartSchema);
