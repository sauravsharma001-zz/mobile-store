var mongoose = require("mongoose");

var addressSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  apartment:  {
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
  country: {
    type: String,
    required: true
  },
  zipcode:  {
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
  email:  {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone:  {
    type: String
  },
  photo: String,
  address: addressSchema
});

mongoose.model("User", userSchema);
