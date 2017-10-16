var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    productid:  {
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
});

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
    orderbillamount:  {
      type: Number,
      required: true
    }
});

mongoose.model("UserOrderDetail", userOrderDetailSchema);
