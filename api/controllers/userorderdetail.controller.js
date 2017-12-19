var mongoose = require("mongoose");
var UserOrderDetail = mongoose.model("UserOrderDetail");
var User = mongoose.model("User");
var Mobile = mongoose.model("Mobile");
var Cart = mongoose.model("Cart");

module.exports.orderGetOneByUserId = function(req, res)  {

  console.log('user', req.user);
  User
    .findOne({email: req.user})
    .exec(function(err, user) {
      if(err) {
          res
            .status(400)
            .json('Invalid User used for uploading data');
      }
      else if(user){
        UserOrderDetail
           .find({userId: user._id})
           .sort('-orderdate')
           .exec(function(err, order){
             var response = {
                   status: 200,
                   message: order
               };
             if(err)  {
                 response.status = 500;
                 response.message = err;
             }
             else if(!order)  {
                 response.status = 404;
                 response.message = {"message": "No Order found"};
             }
             res
               .status(response.status)
               .json(response.message);
           });
       }
       else {
         res
           .status(400)
           .json("No User found");
       }
     });
};

module.exports.orderGetOne = function(req, res)  {

  var orderId = req.params.orderId;
  UserOrderDetail
     .findById(orderId)
     .exec(function(err, order){
       var response = {
             status: 200,
             message: order
         };
       if(err)  {
           response.status = 500;
           response.message = err;
       }
       else if(!order)  {
           response.status = 404;
           response.message = {"message": "Order ID not found"};
       }
       res
         .status(response.status)
         .json(response.message);
     });
};


module.exports.orderAddOneByUserId = function(req, res)  {

  var newOrderDetail = req.body;
  var cart = JSON.parse(JSON.stringify(newOrderDetail));
  User
    .find({email: req.user})
    .exec(function(err, user) {
      if(err) {
          res
            .status(400)
            .json('Invalid User used for uploading data');
      }
      else{
        newOrderDetail.userId = user[0]._id;
        var filterCond = {};
        filterCond.$or = [];
        for(var i = 0; i < newOrderDetail.product.length; i++)  {
          filterCond.$or.push({_id: newOrderDetail.product[i].productId});
        }
        var soldProduct = [];
        var outOfStockProduct = [];
        var soldProductAmt = 0;
        var outOfStockProductAmt = 0;
        Mobile
           .find(filterCond)
           .select("availableQuantity price")
           .exec(function(err, mobile){
             for(var i = 0; i < newOrderDetail.product.length; i++)  {
               for(var j = 0; j < mobile.length; j++) {
                  if(newOrderDetail.product[i].productId == mobile[j]._id && mobile[j].availableQuantity >= newOrderDetail.product[i].quantity) {
                    soldProduct.push(newOrderDetail.product[i]);
                    soldProductAmt += newOrderDetail.product[i].quantity * mobile[j].price.value;
                    mobile[j].availableQuantity -= newOrderDetail.product[i].quantity;
                    mobile[j].save();
                    break;
                  }
                  else {
                    outOfStockProduct.push(newOrderDetail.product[i]);
                    outOfStockProductAmt += newOrderDetail.product[i].quantity * mobile[j].price.value;
                    break;
                  }
                }
             }
             newOrderDetail.product = soldProduct;
             newOrderDetail.totalPrice = soldProductAmt;
             delete newOrderDetail._id;
             cart.product = outOfStockProduct;
             cart.totalPrice = outOfStockProductAmt;
             console.log('cart', cart);
             console.log('newOrderDetail', newOrderDetail);
             if(outOfStockProduct.length == 0)  {
               Cart
                 .findByIdAndRemove(cart._id)
                 .exec(function(err, cart){});
             }
             else {
               Cart
                 .findById(cart._id)
                 .exec(function(err, oldcart) {
                     oldcart.product = outOfStockProduct;
                     oldcart.totalPrice = outOfStockProductAmt;
                     oldcart.save(function (err, updatedCart) {});
               });
             }
             if(soldProduct.length > 0)  {
               UserOrderDetail
                   .create(newOrderDetail,  function (err, orderDetail) {
                     if(err) {
                       console.log(err);
                         res
                             .status(400)
                             .json(err);
                     }
                     else    {
                         res
                             .status(201)
                             .json(orderDetail);
                     }
                 });
               }
               else {
                 res
                     .status(400)
                     .json({message: "Mobile not in stock"});
               }
           });
      }
    });
};
