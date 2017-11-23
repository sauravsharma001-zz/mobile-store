var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    productId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    brand:  {
      type: String,
      required: true
    },
    image:  {
      type: String,
      required: true
    },
    price:  {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
}, { _id : false });

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
