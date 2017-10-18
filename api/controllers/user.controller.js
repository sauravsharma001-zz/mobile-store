var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var User = mongoose.model("User");

module.exports.register = function(req, res)  {

};

module.exports.authenticate = function(req, res, next)  {
  var headerExists = req.headers.authorization;
    if(headerExists)  {
      var token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, "s3cr3t", function(error, decoded)  {
          if(error) {
              console.log(error);
              res
                .status(401)
                .json({"message": "Unauthorized"});
          }
          else {
            req.user = decoded.username;
            next();
          }
      });
    }
    else {
          res
            .status(403)
            .json({"message": "No token provided"});
    }
};

module.exports.login = function(req, res) {
  console.log("logging in user");
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email
  }).exec(function(err, user)  {
    if(err) {
      console.log(err);
      res
        .status(400)
        .json(err);
    }
    else if(user != null || user != undefined){

       if(bcrypt.compareSync(password, user.password) ) {
        console.log("User found", user);
        var name = user.firstname + ' ' + user.lastname;
        console.log("Name: ", name);
        var token = jwt.sign({name: name}, "s3cr3t", {expiresIn: 3600});
        res
          .status(200)
          .json({success: true, token: token, name: name});
      }
      else {
        res
          .status(401)
          .json({"message": "Unauthorized"});
      }
    }
    else {
      res
        .status(401)
        .json({"message": "Unauthorized"});
    }
  });
};
