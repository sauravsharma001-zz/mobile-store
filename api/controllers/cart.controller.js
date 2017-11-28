var mongoose = require("mongoose");
var Mobile = mongoose.model("Mobile");
var Cart = mongoose.model("Cart");
var User = mongoose.model("User");
var fs = require('fs');

module.exports.cartGetAll = function(req, res) {

  //var userId = req.user;
  User
    .find({email: 'sauravsharma001@gmail.com'})
    .exec(function(err, user) {
      if(err) {
          res
            .status(400)
            .json('Invalid User used for uploading data');
      }
      else{
        Cart
          .findOne({userId: user[0]._id})
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
      }
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

  var newCartDetail = req.body;
  User
    .findOne({email: 'sauravsharma001@gmail.com'})
    .exec(function(err, user) {
      if(err) {
          res
            .status(400)
            .json('Invalid User used for uploading data');
      }
      else{
        newCartDetail.userId = user._id;
        Cart
          .findOne({userId: user._id})
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
              newCartDetail.totalPrice = newCartDetail.product[0].quantity * newCartDetail.product[0].price;
              Cart
                .create(newCartDetail, function(err, cart) {
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
            else{
              var found = false;
              for(var i = 0; i < cart.product.length; i++)  {
                if(cart.product[i].productId === newCartDetail.product[0].productId) {
                  cart.product[i].quantity += 1;
                  found = true;
                }
              }
              if(!found)  {
                cart.product.push(newCartDetail.product[0]);
              }
              cart.totalPrice += newCartDetail.product[0].price;
              cart.save(function (err, updatedCart) {
                if(err) {
                  res
                    .status(500)
                    .json(err);
                }
                else {
                  res
                    .status(response.status)
                    .json(updatedCart);
                }
              });
            }
        });
        // Cart
        //   .create(newCartDetail, function(err, cart) {
        //       if(err) {
        //         res
        //           .status(400)
        //           .json(err);
        //       }
        //       else {
        //         res
        //           .status(201)
        //           .json(cart);
        //       }
        // });
      }
  });
}

module.exports.cartUpdateOne = function(req, res) {

  var cartId = req.params.cartId;
  Cart
    .findById(cartId)
    .exec(function(err, cart) {
      var response = {
        status: 200,
        message: {"message": "Cart updated"}
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
        cart.product = req.body.product;
        cart.totalPrice = req.body.totalPrice;
        cart.save(function (err, updatedCart) {
          if(err) throw err;
          res
            .status(response.status)
            .json(updatedCart);
        });
      }
  });
};

module.exports.cartDeleteOne = function(req, res) {

  var cartId = req.params.cartId;
  Cart
    .findByIdAndRemove(cartId)
    .exec(function(err, cart){
      if(err)  {
        res
          .status(500)
          .json(err);
      }
      else {
        res
          .status(204)
          .json();
      }
  });
};
