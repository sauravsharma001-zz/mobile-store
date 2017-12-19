var mongoose = require("mongoose");
var Mobile = mongoose.model("Mobile");
var fs = require('fs');

// To Search mobile with keyword
module.exports.mobileSearch = function(req, res)  {

    var sortCond = "-price.value";
    var count = 9;
    if(!req.query.keyword && !req.query.name)  {
      res
        .status(500)
        .json({message: 'keyword not provided'});
    }
    else {
      var filterCond = {};
      if(req.query.keyword) {
        filterCond.$text = {};
        filterCond.$text.$search = req.query.keyword;
      }
      else {
          filterCond.name = req.query.name;
      }
      Mobile
        .find(filterCond)
        .select("-cpu -gpu  -memory -camera")
        .sort(sortCond)
        .limit(count)
        .exec(function(err, mobileList) {
          if(err) {
            res
              .status(500)
              .json(err);
          }
          else {

            Mobile.count(filterCond, function(err, c) {
              var response = {};
              response.mobiles = mobileList;
              response.totalCount = c;
              res
                .status(200)
                .json(response);
            });
          }
        });
    }
}

// To Get All To-do list
module.exports.mobileGetAll = function(req, res)  {

  var offset = 0;
  var count = 9;
  var maxCount = 10;
  var sortCond = "-price.value";
  var filterCond = {};
  filterCond.$and = [];
  filterCond.$and.push({isdeleted: false});

  // if(Object.keys(req.query).length > 0 && !(Object.keys(req.query).length === 1 && req.query.offset)) {
  //   filterCond.$and = [];
  // }

  if(req.query.os)  {
    if(typeof req.query.os == 'string')
        filterCond.$and.push({'os': {$regex: '.*(' + req.query.os + ').*' }});
    else  {
        filterCond.$and.push({'os': {$regex: '.*(' + req.query.os[0] + '|' + req.query.os[1] + ').*' }});
    }
  }

  if(req.query.name)  {
    filterCond.$and.push({name: req.query.name});
  }

  if(req.query.brand)  {
      filterCond.$and.push({brand: req.query.brand});
  }

  if(req.query.price )  {
      if(typeof req.query.price == 'string') {
          filterCond.$and.push({"price.value": {$gte : parseInt(req.query.price.split(',')[0]), $lt: parseInt(req.query.price.split(',')[1]) }});
      }
      else {
        var $or = {};
        $or.$or = [];
        for(var i = 0; i < req.query.price.length; i++)  {
          console.log({"price.value": {$gte : parseInt(req.query.price[i].split(',')[0]), $lt: parseInt(req.query.price[i].split(',')[1]) }});
          $or.$or.push({"price.value": {$gte : parseInt(req.query.price[i].split(',')[0]), $lt: parseInt(req.query.price[i].split(',')[1]) }});
        }
        filterCond.$and.push($or);
      }
  }

  if(req.query.screen)  {
    if(typeof req.query.screen == 'string') {
        filterCond.$and.push({"display.size": {$gte : parseInt(req.query.screen.split(',')[0]), $lt: parseInt(req.query.screen.split(',')[1]) }});
    }
    else {
      var $or = {};
      $or.$or = [];
      for(var i = 0; i < req.query.screen.length; i++)  {
        console.log({"display.size": {$gte : parseInt(req.query.screen[i].split(',')[0]), $lt: parseInt(req.query.screen[i].split(',')[1]) }});
        $or.$or.push({"display.size": {$gte : parseInt(req.query.screen[i].split(',')[0]), $lt: parseInt(req.query.screen[i].split(',')[1]) }});
      }
      filterCond.$and.push($or);
    }
  }

  if(req.query.battery)  {
    if(typeof req.query.battery == 'string') {
        filterCond.$and.push({"battery.power": {$gte : parseInt(req.query.battery.split(',')[0]), $lt: parseInt(req.query.battery.split(',')[1]) }});
    }
    else {
      var $or = {};
      $or.$or = [];
      for(var i = 0; i < req.query.battery.length; i++)  {
        console.log({"battery.power": {$gte : parseInt(req.query.battery[i].split(',')[0]), $lt: parseInt(req.query.battery[i].split(',')[1]) }});
        $or.$or.push({"battery.power": {$gte : parseInt(req.query.battery[i].split(',')[0]), $lt: parseInt(req.query.battery[i].split(',')[1]) }});
      }
      filterCond.$and.push($or);
    }
  }

  if(req.query && req.query.offset)   {
    offset = parseInt(req.query.offset*count, 10);
  }

  if(req.query && req.query.count)   {
    count = parseInt(req.query.count, 10);
  }

  if(isNaN(offset) || isNaN(count))   {
    res
      .status(400)
      .json({
        "message": "If supplied in querying count and offset should be number"
      });
    return;
  }

  if(count > maxCount)    {
    res
      .status(400)
      .json({
        "message": "Count limit of "+ maxCount + " exceeded"
      });
    return;
  }

  console.log(filterCond);
  Mobile
    .find(filterCond)
    .select("-cpu -gpu  -memory -camera")
    .sort(sortCond)
    .skip(offset)
    .limit(count)
    .exec(function(err, mobileList) {
      if(err) {
        res
          .status(500)
          .json(err);
      }
      else {

        Mobile.count(filterCond, function(err, c) {
          var response = {};
          response.mobiles = mobileList;
          response.totalCount = c;
          res
            .status(200)
            .json(response);
        });
      }
    });
};

module.exports.mobileAddOne = function(req, res)  {

  var mobile = JSON.parse(req.body.mobile);
  if(req.file)
    mobile.image = req.file.path.substring(req.file.path.lastIndexOf("\\")+1);
  Mobile
    .create(mobile,  function(err, newMobile) {
      if(err) {
        res
          .status(400)
          .json(err);
      }
      else {
        res
          .status(201)
          .json(newMobile);
      }
    });
};

module.exports.mobileGetOne = function(req, res)  {
   var mobileId = req.params.mobileId;
   Mobile
      .findById(mobileId)
      .exec(function(err, mobile){
        var response = {
              status: 200,
              message: mobile
          };
        if(err)  {
            response.status = 500;
            response.message = err;
        }
        else if(!mobile)  {
            response.status = 404;
            response.message = {"message": "Mobile ID not found"};
        }
        res
          .status(response.status)
          .json(response.message);
      });
};

module.exports.mobileUpdateOne = function(req, res)  {

    var mobileId = req.params.mobileId;
    var updatedMobile = JSON.parse(req.body.mobile);
    if(req.file)
      updatedMobile.image = req.file.path.substring(req.file.path.lastIndexOf("\\")+1);

    Mobile
        .findById(mobileId)
        .exec(function(err, mobile) {
            var response = {
                status: 200,
                message: mobile
            }
            if(err) {
                response.status = 500;
                response.message = err;
            }
            else if(!mobile)   {
                response.status = 404;
                response.message = {"message": "Mobile ID not found"};
            }
            if(response.status != 200)    {
                res
                    .status(response.status)
                    .json(response.message);
            }
            else    {
                mobile.name = updatedMobile.name;
                mobile.brand = updatedMobile.brand;
                mobile.os = updatedMobile.os;
                mobile.image = updatedMobile.image;
                mobile.display.size = updatedMobile.display.size;
                mobile.display.resolution = updatedMobile.display.resolution;
                mobile.memory.ram = updatedMobile.memory.ram;
                mobile.cpu = updatedMobile.cpu;
                mobile.gpu = updatedMobile.gpu;
                mobile.battery.power = updatedMobile.battery.power;
                mobile.camera.primary[0].imagesensor = updatedMobile.camera.primary[0].imagesensor;
                mobile.camera.secondary.imagesensor = updatedMobile.camera.secondary.imagesensor;
                mobile.price.value = updatedMobile.price.value;
                mobile.availableQuantity = updatedMobile.availableQuantity;

                mobile.save(function(err, mobileUpdated)  {
                    if(err) {
                        res
                            .status(500)
                            .json(err);
                    }
                    else    {
                        res
                            .status(204)
                            .json(mobileUpdated);
                    }
                });
            }
        });

};

module.exports.mobileDeleteOne = function(req, res)  {
    var mobileId = req.params.mobileId;
    Mobile
       .findById(mobileId)
       .select("isdeleted")
       .exec(function(err, mobile){
         var response = {
               status: 200,
               message: mobile
           };
         if(err)  {
             response.status = 500;
             response.message = err;
         }
         else if(!mobile)  {
             response.status = 404;
             response.message = {"message": "Mobile ID not found"};
         }
         if(response.status != 200)    {
             res
                 .status(response.status)
                 .json(response.message);
         }
         else {
            mobile.isdeleted = true;
            mobile.save(function(err, mobilUpdated) {
              if(err) {
                  res
                    .status(500)
                    .json(err);
              }
              else    {
                  res
                    .status(204)
                    .json({"message": "mobile deleted"});
              }
          });
       }
     });

};
