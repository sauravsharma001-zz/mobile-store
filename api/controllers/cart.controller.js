var mongoose = require("mongoose");
var Mobile = mongoose.model("Mobile");
var Cart = mongoose.model("Cart");
var User = mongoose.model("User");
var fs = require('fs');

module.exports.cartGetAll = function(req, res) {
  var userId = mongoose.Types.ObjectId(req.user.id);
  Cart
    .find({userId: userId})
    .exec(function(err, cart) {
      var response = {
        status: 200,
        message: cart
      };
      if(err)  {
        response.status = 500;
        response.message = err;
      }
      else if(!cart)  {
        response.status = 404;
        response.message = {"message": "Cart ID not found"};
      }
      res
        .status(response.status)
        .json(response.message);
  });
};

module.exports.cartGetOne = function(req, res) {
  var cartId = mongoose.Types.ObjectId(req.params.cartId);
  Cart
    .findById(cartId)
    .exec(function(err, cart){
      var response = {
        status: 200,
        message: cart
      };
      if(err)  {
        response.status = 500;
        response.message = err;
      }
      else if(!cart)  {
        response.status = 404;
        response.message = {"message": "Cart ID not found"};
      }
      res
        .status(response.status)
        .json(response.message);
  });
};

module.exports.cartAddOne = function(req, res) {
  var userId = mongoose.Types.ObjectId(req.user.id);
  var productId = mongoose.Types.ObjectId(req.body.productId);
  if(typeof req.body.productId == "undefined") {
    var response = {
      status: 400,
      message: "Product-id not provided."
    };
    return res
      .status(status)
      .json(message);
  }
  else {
    Mobile
      .findById(productId)
      .exec(function(err, mobile) {
        if(mobile == null) {
          response.status = 400;
          response.message = "Mobile not found."
          return res
            .status(response.status)
            .json(response.message)
        }
        else {
          Cart
          .create({
            product: {
              productId: productId,
              price: {
                value: mobile.price.value,
                unit: mobile.price.unit
              },
              quantity: 1
            },
            totalPrice: mobile.price.value,
            userId: userId,
            isdeleted: false
          }, function(err, cart) {
              if(err) {
                res
                  .status(400)
                  .json(err);
              }
              else {
                res
                  .status(201)
                  .json(cart);
              }
          });
        }
    });
  }
};

module.exports.cartUpdateOne = function(req, res) {
  var count = req.query.count;
  Cart
    .findById(cartId)
    .exec(function(err, cart) {
      var response = {
        status: 200,
        message: "Cart updated."
      };
      if (err) {
        response.status = 500;
        response.message = err;
      }
      else if(!cartId) {
        response.status = 404;
        response.message = {"message": "Cart ID not found"};
      }
      if(response.status != 200)    {
        res
          .status(response.status)
          .json(response.message);
      }
      else {
        cart.product.quantity = count;
        cart.totalPrice = count * cart.product.price.value;
        cart.save(function (err) {
          if(err) throw err;
          res
            .status(response.status)
            .json(response.message);
        });
      }
  });
};

module.exports.cartDeleteOne = function(req, res) {
  var cartId = mongoose.Types.ObjectId(req.params.cartId);
  Cart
    .findById(cartId)
    .select("isdeleted")
    .exec(function(err, cart){
      var response = {
        status: 200,
        message: cartId
      };
      if(err)  {
        response.status = 500;
        response.message = err;
      }
      else if(!cartId)  {
        response.status = 404;
        response.message = {"message": "Cart ID not found"};
      }
      if(response.status != 200)    {
        res
          .status(response.status)
          .json(response.message);
      }
      else {
        cart.isdeleted = true;
        cart.save(function(err, cartUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          }
          else {
            res
              .status(204)
              .json({"message": "cart deleted"});
            }
        });
      }
  });
};
