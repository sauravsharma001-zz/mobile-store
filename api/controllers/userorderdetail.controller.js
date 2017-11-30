var mongoose = require("mongoose");
var UserOrderDetail = mongoose.model("UserOrderDetail");
var User = mongoose.model("User");

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
    });
};
