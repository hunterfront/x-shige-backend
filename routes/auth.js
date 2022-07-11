const express = require("express");
const router = express.Router();
const expressJoi = require("@escook/express-joi");
const { signin_schema, signup_schema } = require("../schema/auth");

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
router.post(
  "/api/auth/signup",
  [
    expressJoi(signup_schema, { allowUnknown: true, stripUnknown: false }),
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted,
  ],
  controller.signup
);
router.post("/api/auth/signin", [expressJoi(signin_schema)], controller.signin);

module.exports = router;
