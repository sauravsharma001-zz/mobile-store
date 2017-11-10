var mongoose = require("mongoose");

var displaySchema = new mongoose.Schema({
    size: {
      type: Number,
      required: true
    },
    resolution: {
      type: String,
      required: true
    }
});

var ramSchema = new mongoose.Schema({
  ram:  {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true,
    default: 'GB'
  }
});

var cameraConfigSchema = new mongoose.Schema({
    imagesensor:  {
      type: Number,
      required: true
    },
    focallength:  {
      type: String
    },
    unit:{
      type: String,
      required: true,
      default: 'MP'
    }
});

var cameraSchema = new mongoose.Schema({
    primary: [cameraConfigSchema],
    secondary: cameraConfigSchema
});

var priceSchema = new mongoose.Schema({
    value:  {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true,
      default: 'USD'
    }
});

var batterySchema = new mongoose.Schema({
    power:  {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true,
      default: 'mAh'
    }

});

var mobileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  brand:  {
    type: String,
    required: true
  },
  os:  {
    type: String,
    required: true
  },
  display:  displaySchema,
  cpu:  {
    type: String,
    required: true
  },
  gpu:  {
    type: String
  },
  memory: ramSchema,
  camera: cameraSchema,
  battery: batterySchema,
  price:  priceSchema,
  image:  {
     type: String
  },
  isdeleted:  {
    type: Boolean,
    default: false
  }
});

mongoose.model("Mobile", mobileSchema);
