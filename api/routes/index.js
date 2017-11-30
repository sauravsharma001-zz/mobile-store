const express = require("express");
const router = express.Router();

var ctrlMobile = require("../controllers/mobile.controller.js");
var ctrlUsers = require("../controllers/user.controller.js");
var ctrlCart = require("../controllers/cart.controller.js");
var ctrlUserOrderDetails = require("../controllers/userorderdetail.controller.js");

// Routes related to Mobile
router
  .route("/mobiles")
  .get(ctrlMobile.mobileGetAll)
  .post(ctrlMobile.mobileAddOne);

router
  .route("/mobiles/search")
  .get(ctrlMobile.mobileSearch);

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

router
  .route("/cart")
  .get(ctrlCart.cartGetAll)
  .post(ctrlCart.cartAddOne);

router
  .route("/cart/:cartId")
  .get(ctrlCart.cartGetOne)
  .put(ctrlCart.cartUpdateOne)
  .delete(ctrlCart.cartDeleteOne);

router
  .route("/orders")
  .get(ctrlUsers.authenticate, ctrlUserOrderDetails.orderGetOneByUserId)
  .post(ctrlUsers.authenticate, ctrlUserOrderDetails.orderAddOneByUserId);

router
  .route("/orders/:orderId")
  .get(ctrlUsers.authenticate, ctrlUserOrderDetails.orderGetOne);

module.exports = router;
