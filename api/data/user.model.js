var mongoose = require("mongoose");

var addressSchema = new mongoose.Schema({
  line_1: {
    type: String,
    required: true
  },
  line_2:  {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip:  {
    type: Number,
    required: true
  }
});

var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  address: addressSchema,
  email:  {
    type: String,
    unique: true,
    required: true
  },
  phone:  {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  userrole: {
    type: String,
    required: true,
    default: 'customer'
  }
});

mongoose.model("User", userSchema);
