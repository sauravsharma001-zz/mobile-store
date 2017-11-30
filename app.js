require("./api/data/db.js");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var routes = require("./api/routes");
var http = require("http");
var app = express();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './dist/assets/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

// Defining the port to run on
const port = process.env.PORT || 3000;
app.set("port", port);

// To Allow CORS calls
app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:4200', 'http://localhost:4200', 'http://192.168.0.6:4200', 'http://192.168.0.6'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// Enable parsing of posted forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Using Multer to upload the photo on the server side
app.use(multer({storage: storage }).single('mobileImage'));

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, "dist")));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

// Add middleware to console log every request
app.use(function(req, res, next)  {
  console.log(req.method, req.url);
  next();
});

// Add some routing
app.use("/api", routes);
app.use("*", (req, res) =>  {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// To verify the listen is up and running
var server = app.listen(app.get("port"), function() {
  var port = server.address().port;
  console.log("Magic happens on port " + port);
});
