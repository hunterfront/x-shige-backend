const express = require("express");
const router = express.Router();
const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

router.get("/my/test/all", controller.allAccess);
router.get("/my/test/user", controller.userBoard);
router.get("/my/test/mod", [authJwt.isModerator], controller.moderatorBoard);
router.get("/my/test/admin", [authJwt.isAdmin], controller.adminBoard);

module.exports = router;
