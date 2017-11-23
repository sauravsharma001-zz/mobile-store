var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    productId:  {
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
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
}, { _id : false });

var userOrderDetailSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    orderdate:  {
        type: Date,
        default: Date.now
    },
    product:  [productSchema],
    totalPrice:  {
      type: Number,
      required: true
    }
});

mongoose.model("UserOrderDetail", userOrderDetailSchema);
