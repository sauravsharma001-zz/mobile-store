var mongoose = require("mongoose");

var mobileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

mongoose.model("Mobile", mobileSchema);
