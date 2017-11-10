var mongoose = require("mongoose");

var accessoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  brand:  {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  compatibility:  {
    type: [String]
  }
  price:  {
    type: String,
    required: true
  },
  image:  {
    type: String
  },
  isdeleted:  {
    type: Boolean,
    default: false
  }
});

mongoose.model("Accessory", accessoriesSchema);
