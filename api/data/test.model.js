var mongoose = require("mongoose");

var testSchema = new mongoose.Schema({
  img: { data: Buffer,
    contentType: String
  }
});

mongoose.model("Test", testSchema);
