const express = require("express");
const router = express.Router();

var ctrlMobile = require("../controllers/mobile.controller.js");
var ctrlUsers = require("../controllers/user.controller.js");
var ctrlUserOrderDetails = require("../controllers/userorderdetail.controller.js");


// Testing
router
  .route("/test")
  .post(ctrlMobile.test);

// Routes related to Mobile
router
  .route("/mobiles")
  .get(ctrlMobile.mobileGetAll)
  .post(ctrlMobile.mobileAddOne);

router
  .route("/mobiles/:mobileId")
  .get(ctrlMobile.mobileGetOne)
  .post(ctrlMobile.mobileUpdateOne)
  .delete(ctrlMobile.mobileDeleteOne)
  //.delete(ctrlUsers.authenticate, ctrlMobile.mobileDeleteOne);

router
  .route("/users/login")
  .post(ctrlUsers.login);

router
  .route("/users/register")
  .post(ctrlUsers.register);

router
  .route("/users/emailcheck")
  .post(ctrlUsers.emailcheck);

module.exports = router;
