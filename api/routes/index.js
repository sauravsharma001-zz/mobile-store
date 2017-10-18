const express = require("express");
const router = express.Router();

var ctrlMobile = require("../controllers/mobile.controller.js");
var ctrlUsers = require("../controllers/user.controller.js");
var ctrlUserOrderDetails = require("../controllers/userorderdetail.controller.js");

router
  .route("mobile")
  .get(ctrlUsers.authenticate, ctrlMobile.todoGetAll);

router
  .route("/users/login")
  .post(ctrlUsers.login);

router
  .route("/users/register")
  .post(ctrlUsers.register);

module.exports = router;
