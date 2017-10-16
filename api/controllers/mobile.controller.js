var mongoose = require("mongoose");
var Mobile = mongoose.model("Mobile");

// To Get All To-do list
module.exports.todoGetAll = function(req, res)  {
  var offset = 0;
  var count = 5;
  var maxCount = 10;

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

  /*Mobile
    .find()
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
    });*/
};
