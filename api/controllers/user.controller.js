var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("jsonwebtoken");
var User = mongoose.model("User");

module.exports.register = function(req, res)  {
  var userDetails = req.body;
  userDetails.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  console.log('req', userDetails);

  User.create(userDetails, function(err, newUser)  {
    if(err) {
      console.log('error', err);
      res
        .status(400)
        .json(err);
    }
    else  {
      console.log('res', newUser);
        res
          .status(201)
          .json();
    }
  });
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
            req.user = decoded.name;
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

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email
  }).exec(function(err, user)  {
    if(err) {
      console.log('err', err);
      res
        .status(400)
        .json(err);
    }
    else if(user != null || user != undefined){
       if(bcrypt.compareSync(password, user.password) ) {
        var name = user.firstname + ' ' + user.lastname;
        var token = jwt.sign({name: user.email}, "s3cr3t", {expiresIn: 3600});
        res
          .status(200)
          .json({success: true, token: token, name: name, email: user.email, userrole: user.userrole});
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

module.exports.emailcheck = function(req, res)  {
  User.find({
          email: req.body.email
      }, function(err, email) {
          if (err) throw err;
          console.log('us', email);
          if (email.length==1) {
              res
              .status(200)
              .json({emailexists : true});
          }
          else
          {
            res.status(200)
            .json({emailexists : false});

          }
    })
};
