const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const { CError, ERROR } = require("../constants/ERROR.js");
const db = require("../models");
const User = db.User;

isAdmin = (req, res, next) => {
  User.findByPk(req.auth.id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      return next(new CError(ERROR.PERMISSION_DENIED, "需要admin权限"));
    });
  });
};
isModerator = (req, res, next) => {
  User.findByPk(req.auth.id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      return next(new CError(ERROR.PERMISSION_DENIED, "需要moderator权限"));
    });
  });
};
isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.auth.id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      return next(
        new CError(ERROR.PERMISSION_DENIED, "需要moderator 或 admin权限")
      );
    });
  });
};
const authJwt = {
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
