var mongoose = require("mongoose");
var Mobile = mongoose.model("Mobile");
var Test = mongoose.model("Test");
var fs = require('fs');

// To Get All To-do list
module.exports.mobileGetAll = function(req, res)  {

  var offset = 0;
  var count = 9;
  var maxCount = 10;
  var sortCond = "-price.value";
  var filterCond = {};

  if(Object.keys(req.query).length > 0) {
    filterCond.$and = [];
  }

  if(req.query.os)  {
    if(typeof req.query.os == 'string')
        filterCond.$and.push({'os': {$regex: '.*(' + req.query.os + ').*' }});
    else  {
        filterCond.$and.push({'os': {$regex: '.*(' + req.query.os[0] + '|' + req.query.os[1] + ').*' }});
    }
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
    offset = parseInt(req.query.offset, 10);
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
    .exec(function(err, todoList) {
      if(err) {
        res
          .status(500)
          .json(err);
      }
      else {
        res
          .status(200)
          .json(todoList);
      }
    });
};

module.exports.mobileAddOne = function(req, res)  {
  console.log("Adding a mobile");
  if(req.body && req.body.name && req.body.brand && req.body.os
     && req.body.cpu && req.body.gpu && req.body.display && req.body.display.size
     && req.body.display.resolution && req.body.memory && req.body.memory.ram
     && req.body.battery && req.body.battery.power && req.body.price && req.body.camera
     && req.body.price.value)  {
    Mobile
      .create({
        name: req.body.name,
        brand: req.body.brand,
        os: req.body.os,
        display:  {
          size: req.body.display.size,
          resolution:  req.body.display.resolution
        },
        cpu: req.body.cpu,
        gpu: req.body.gpu,
        memory:	{
          ram: req.body.memory.ram,
          unit: req.body.memory.unit
        },
        camera: {
          primary: req.body.camera.primary,
          secondary: {
            imagesensor: req.body.camera.secondary.imagesensor,
            focallength: req.body.camera.secondary.focallength,
            unit: req.body.camera.secondary.unit
          }
        },
        battery: {
          power: req.body.battery.power,
          unit:	req.body.battery.unit
        },
        price:  {
          value: req.body.price.value,
          unit: req.body.price.unit
        },
        isdeleted:  false
      },  function(err, mobile) {
        if(err) {
          res
            .status(400)
            .json(err);
        }
        else {
          res
            .status(201)
            .json(mobile);
        }
      });
    }
    else {
        res
          .status(400)
          .json({'error': 'All required fields not provided'});
    }
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

module.exports.test = function(req, res)  {
  console.log('image', req.file.path);
  console.log('contentType', req.file.mimetype);
  console.log('body', req.body);
  res
    .status(200)
    .json({"success": true});
  // Test
  //   .create({
  //      img.data = req.body.;
  //      img.contentType = 'image/png';
  //   },  function(err, mobile) {
  //     if(err) {
  //       res
  //         .status(400)
  //         .json(err);
  //     }
  //     else {
  //       res
  //         .status(201)
  //         .json(mobile);
  //     }
  //   });
}
